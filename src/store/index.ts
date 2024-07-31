import { create } from "zustand";
import { PyodideInterface } from "@/types";

type State = {
  code: string;
  output: string;
  error: string | null;
  direction: "horizontal" | "vertical";
  pyodide: PyodideInterface | null;
  loading: boolean;
};

type Actions = {
  setCode: (code: string) => void;
  setOutput: (newOutput: string) => void;
  clearOutput: (defaultValue?: string) => void;
  setError: (error: string | null) => void;
  setDirection: (direction: "horizontal" | "vertical") => void;
  initializePyodide: () => Promise<void>;
  runCode: (code: string) => Promise<void>;
};

export const useStore = create<State & Actions>((set, get) => ({
  code: `import sys\n\nprint("Python", sys.version)\n\n# https://github.com/vwh/python-playground`,
  output: "Running Python 3.12.1",
  error: null,
  direction: "vertical",
  pyodide: null,
  loading: true,

  setCode: (code) => set({ code }),
  setOutput: (newOutput) =>
    set((state) => ({
      output: state.output + "\n" + newOutput
    })),
  clearOutput: (defaultValue) =>
    set({ output: defaultValue ? defaultValue : "" }),
  setError: (error) => set({ error }),
  setDirection: (direction) => set({ direction }),

  initializePyodide: async () => {
    if (!window.loadPyodide) {
      set({ error: "Pyodide script not loaded.", loading: false });
      return;
    }

    try {
      const pyodideInstance = await window.loadPyodide();
      await pyodideInstance.loadPackage("micropip");
      const micropip = await pyodideInstance.pyimport("micropip");
      window.micropip = micropip;

      set({ pyodide: pyodideInstance, loading: false });
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      set({
        error: "Failed to load Pyodide. Please refresh the page and try again.",
        loading: false
      });
    }
  },

  runCode: async (code: string) => {
    const { pyodide, setError, setOutput } = get();
    if (!pyodide) return;

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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }
}));
