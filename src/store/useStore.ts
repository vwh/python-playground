import { create } from "zustand";
import type { PyodideInterface } from "@/types";

type Direction = "horizontal" | "vertical";

interface State {
  code: string;
  output: string;
  error: string | null;
  direction: Direction;
  pyodide: PyodideInterface | null;
  isPyodideLoading: boolean;
  isCodeExecuting: boolean;
  isLibLoading: boolean;
}

interface Actions {
  setCode: (code: string) => void;
  setOutput: (newOutput: string) => void;
  clearOutput: (defaultValue?: string) => void;
  setError: (error: string | null) => void;
  setDirection: (direction: Direction) => void;
  initializePyodide: () => Promise<void>;
  pipInstall: (packageName: string) => Promise<void>;
  runCode: (code: string) => Promise<void>;
}

const initialState: State = {
  code: `import sys\n\nprint("Python", sys.version)\n\n# https://github.com/vwh/python-playground`,
  output: "Running Python 3.12.1",
  error: null,
  direction: "vertical",
  pyodide: null,
  isPyodideLoading: true,
  isCodeExecuting: false,
  isLibLoading: false
};

export const useStore = create<State & Actions>((set, get) => ({
  ...initialState,

  setCode: (code) => set({ code }),
  setOutput: (newOutput) =>
    set((state) => ({ output: `${state.output}\n${newOutput}` })),
  clearOutput: (defaultValue = "") => set({ output: defaultValue }),
  setError: (error) => set({ error }),
  setDirection: (direction) => set({ direction }),

  initializePyodide: async () => {
    if (!window.loadPyodide) {
      set({ error: "Pyodide script not loaded.", isPyodideLoading: false });
      return;
    }

    try {
      const pyodideInstance = await window.loadPyodide();
      await pyodideInstance.loadPackage("micropip");
      const micropip = await pyodideInstance.pyimport("micropip");
      window.micropip = micropip;
      set({ pyodide: pyodideInstance, isPyodideLoading: false });
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      set({
        error: "Failed to load Pyodide. Please refresh the page and try again.",
        isPyodideLoading: false
      });
    }
  },

  pipInstall: async (packageName: string) => {
    const { setOutput, setError } = get();
    const lib = packageName.replace("pip install ", "").trim();

    if (!window.micropip || !lib) return;
    set({ isLibLoading: true });

    try {
      await window.micropip.install(lib, true);
      setOutput(`pip install ${lib} successfully installed`);
      setError(null);
    } catch (e) {
      setError(`Failed to install ${lib}: ${(e as Error).message}`);
    } finally {
      set({ isLibLoading: false });
    }
  },

  runCode: async (code: string) => {
    const { pyodide, setError, setOutput } = get();
    if (!pyodide) return;

    set({ isCodeExecuting: true });
    try {
      setError(null);
      const printOutput: string[] = [];

      pyodide.globals.set("print", (...args: any[]) => {
        const result = args.join(" ");
        printOutput.push(result);
        setOutput(printOutput.join("\n"));
      });

      await pyodide.runPythonAsync(code);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      set({ isCodeExecuting: false });
    }
  }
}));
