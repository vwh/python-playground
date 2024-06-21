import { useState } from "react";
import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";

import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import Loader from "./components/loader";
import { TopNav } from "./components/top-nav";

function App() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">(
    "vertical"
  );
  const { loading, handleRunCode } = usePyodide();
  const { output, error } = useStore();

  return (
    <main className="h-screen flex flex-col">
      <TopNav setDirection={setDirection} />
      <ResizablePanelGroup
        direction={direction}
        className="rounded-none border"
      >
        <ResizablePanel defaultSize={70}>
          <Editor handleRunCode={handleRunCode} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30}>
          <div className="h-full w-full overflow-auto p-2">
            <div className="output">
              {error ? (
                <pre className="text-red-500">{error}</pre>
              ) : (
                <pre>{output}</pre>
              )}
              {loading && (
                <Loader text="Downloading Pyodide, Python interpreter" />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}

export default App;
