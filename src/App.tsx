import { useEffect } from "react";
import { useStore } from "./store";

import { getDecodedParam } from "./lib/url";
import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "./components/ui/resizable";
import ButtonsNav from "./components/nav-buttons";
import Stats from "./components/stats";
import Terminal from "./components/terminal";

function App() {
  const { direction, setCode, runCode, initializePyodide, loading } =
    useStore();

  useEffect(() => {
    initializePyodide();
  }, [initializePyodide]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedParam = urlParams.get("v");
    if (encodedParam) {
      const decodedCode = getDecodedParam(encodedParam);
      if (decodedCode) {
        setCode(decodedCode);
      }
    }
  }, [setCode]);

  return (
    <main className="flex h-screen flex-col bg-background text-foreground">
      <ButtonsNav />
      <ResizablePanelGroup direction={direction}>
        <ResizablePanel defaultSize={65}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <Terminal handleRunCode={runCode} loading={loading} />
        </ResizablePanel>
      </ResizablePanelGroup>
      {!loading && <Stats />}
    </main>
  );
}

export default App;
