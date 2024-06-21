import { useState } from "react";
import { usePyodide } from "./hooks/pyodide";
import { Button } from "./components/ui/button";

function App() {
  const [pyodide, loading] = usePyodide();

  const [code, setCode] = useState<string>(
    "print(1 + 2)\nprint('Hello from Pyodide')"
  );

  const [output, setOutput] = useState<string>("");

  const handleRunCode = async () => {
    if (pyodide) {
      try {
        const printOutput: string[] = [];
        pyodide.globals.set("print", (...args: any[]) => {
          const result = args.join(" ");
          printOutput.push(result);
          setOutput(printOutput.join("\n"));
        });

        await pyodide.runPythonAsync(code);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Pyodide in React</h1>
      <div className="code-editor">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Python code here..."
        />
        <Button onClick={handleRunCode}>Run</Button>
      </div>
      <div className="output">
        <h2>Output:</h2>
        <pre>{output}</pre>
        <p>{loading ? "Loading..." : ""}</p>
      </div>
    </div>
  );
}

export default App;
