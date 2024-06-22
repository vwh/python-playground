import { useEffect } from "react";
import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";

import { getDecodedParam } from "./lib/urlUtils";

import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import Loader from "./components/loader";
import TopNav from "./components/top-nav";
import Stats from "./components/stats";

function App() {
  const { loading, handleRunCode } = usePyodide();
  const { output, error, direction, setCode } = useStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const encodedParam = urlParams.get("v");
    if (encodedParam) {
      const decodedCode = getDecodedParam(encodedParam);
      if (decodedCode) {
        setCode(decodedCode);
      }
    }
  }, []);

  return (
    <main className="h-screen flex flex-col">
      <TopNav handleRunCode={handleRunCode} />
      <ResizablePanelGroup
        direction={direction}
        className="rounded-none border"
      >
        <ResizablePanel defaultSize={65}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <pre className="bg-[#141110] h-full w-full text-white overflow-x-auto p-4">
            {loading ? (
              <Loader text="Downloading Python" />
            ) : (
              <code
                className={
                  "w-full font-mono text-sm " +
                  (error ? "text-red-500" : "text-white")
                }
              >
                {error ? error : output ? output : "Running Python 3.12.1"}
              </code>
            )}
          </pre>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Stats />
    </main>
  );
}

export default App;
