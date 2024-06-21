import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";

import { Button } from "./components/ui/button";
import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

function App() {
  const [pyodide, loading] = usePyodide();
  const { code, output, error, setCode, setOutput, setError } = useStore();

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
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  };

  return (
    <main className="h-screen flex flex-col">
      <h1>Pyodide in React</h1>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-none border"
      >
        <ResizablePanel defaultSize={50}>
          <Editor handleRunCode={handleRunCode} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full overflow-auto">
            <div className="output">
              <h2>Output:</h2>
              <pre>{output}</pre>
              <p>{loading ? "Loading..." : ""}</p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default App;
