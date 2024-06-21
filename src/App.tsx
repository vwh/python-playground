import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";

import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

function App() {
  const { loading, handleRunCode } = usePyodide();
  const { output, error } = useStore();

  return (
    <main className="h-screen flex flex-col">
      <section className="flex p-2">
        <h1>Pyodide in React</h1>
      </section>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-none border"
      >
        <ResizablePanel defaultSize={50}>
          <Editor handleRunCode={handleRunCode} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full overflow-auto p-2">
            <div className="output">
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
