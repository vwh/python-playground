export interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<any>;
  loadPackage: (name: string) => Promise<void>;
  globals: {
    set: (key: string, value: any) => void;
  };
  pyimport: (name: string) => Promise<any>;
}

declare global {
  interface Window {
    loadPyodide: () => Promise<PyodideInterface>;
    micropip: {
      install: (
        packages: string | string[],
        keep_going?: boolean
      ) => Promise<void>;
    };
  }
}
