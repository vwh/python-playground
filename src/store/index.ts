import create from "zustand";

type State = {
  code: string;
  output: string;
  error: string | null;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setError: (error: string | null) => void;
  direction: "horizontal" | "vertical";
  setDirection: (direction: "horizontal" | "vertical") => void;
};

export const useStore = create<State>((set) => ({
  code: `import sys\n\nprint("Python", sys.version)`,
  output: "",
  error: null,
  setCode: (code) => set((state) => ({ ...state, code })),
  setOutput: (output) => set((state) => ({ ...state, output })),
  setError: (error) => set((state) => ({ ...state, error })),
  direction: "vertical",
  setDirection: (direction) => set((state) => ({ ...state, direction })),
}));
