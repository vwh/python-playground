import { useEffect } from "react";
import { useStore } from "./store/useStore";

import { getDecodedParam } from "./lib/url";

import Editor from "./components/editor/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "./components/ui/resizable";
import ButtonsNav from "./components/nav-buttons";
import Stats from "./components/editor/stats";
import Terminal from "./components/editor/terminal";

import { LoaderCircleIcon } from "lucide-react";

function App() {
  const { direction, setCode, initializePyodide, isPyodideLoading } =
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
    <>
      <section
        className={`absolute z-[999] flex h-screen w-full flex-col items-center justify-center gap-3 bg-background text-foreground ${isPyodideLoading ? "" : "hidden"}`}
      >
        <LoaderCircleIcon className="h-32 w-32 animate-spin" />
        <h1 className="font-bold">Loading Python Playground</h1>
      </section>
      <main className="flex h-screen flex-col bg-background text-foreground">
        <ButtonsNav />
        <ResizablePanelGroup direction={direction}>
          <ResizablePanel defaultSize={65}>
            <Editor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35}>
            <Terminal />
          </ResizablePanel>
        </ResizablePanelGroup>
        {!isPyodideLoading && <Stats />}
      </main>
    </>
  );
}

export default App;
