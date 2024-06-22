import { useState, useEffect } from "react";
import { useStore } from "../store";

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { code, setOutput, setError } = useStore();

  const handleRunCode = async () => {
    if (pyodide) {
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
        }
      }
    }
  };

  const installPackage = async (packageName: string) => {
    if (pyodide && pyodide.micropip) {
      const lib = packageName.replace("pip install ", "");
      try {
        await pyodide.micropip.install(lib);
        setOutput(`pip install ${lib} successfully installed`);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(`Failed to install ${lib}, ${e.message}`);
        }
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!window.loadPyodide) {
        console.error("Pyodide script not loaded.");
        return;
      }
      const pyodideInstance = await window.loadPyodide();

      await pyodideInstance.loadPackage("micropip");
      const micropip = await pyodideInstance.pyimport("micropip");
      pyodideInstance.micropip = micropip;

      setPyodide(pyodideInstance);
      setLoading(false);
    };
    load();
  }, []);

  return { pyodide, loading, handleRunCode, installPackage };
};
