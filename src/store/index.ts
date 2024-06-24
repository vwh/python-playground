import { create } from "zustand";

type State = {
  code: string;
  output: string;
  error: string | null;
  direction: "horizontal" | "vertical";
};

type Actions = {
  setCode: (code: string) => void;
  setOutput: (newOutput: string) => void;
  clearOutput: (defaultValue?: string) => void;
  setError: (error: string | null) => void;
  setDirection: (direction: "horizontal" | "vertical") => void;
};

export const useStore = create<State & Actions>((set) => ({
  code: `import sys\n\nprint("Python", sys.version)\n\n# https://vwh.github.io/python-playground/`,
  output: "Running Python 3.12.1",
  error: null,
  direction: "vertical",
  setCode: (code) => set({ code }),
  setOutput: (newOutput) =>
    set((state) => ({
      output: state.output + "\n" + newOutput,
    })),
  clearOutput: (defaultValue) =>
    set({ output: defaultValue ? defaultValue : "" }),
  setError: (error) => set({ error }),
  setDirection: (direction) => set({ direction }),
}));
