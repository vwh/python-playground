import { useState, useEffect } from "react";

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!window.loadPyodide) {
        console.error("Pyodide script not loaded.");
        return;
      }
      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);
      setLoading(false);
    };
    load();
  }, []);

  return [pyodide, loading];
};
