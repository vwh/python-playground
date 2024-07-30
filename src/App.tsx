import { useEffect } from "react";
import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";

import { getDecodedParam } from "./lib/url";

import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "./components/ui/resizable";
import TopNav from "./components/top-nav";
import Stats from "./components/stats";
import Terminal from "./components/terminal";

function App() {
  const { loading, handleRunCode } = usePyodide();
  const { direction, setCode, code } = useStore();

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
    <main className="flex h-screen flex-col">
      <TopNav handleRunCode={async () => await handleRunCode(code)} />
      <ResizablePanelGroup direction={direction}>
        <ResizablePanel defaultSize={65}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <Terminal handleRunCode={handleRunCode} loading={loading} />
        </ResizablePanel>
      </ResizablePanelGroup>
      {!loading && <Stats />}
    </main>
  );
}

export default App;
