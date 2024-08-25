import { useEffect } from "react";
import { useStore } from "./store/useStore";

import { getDecodedParam } from "./lib/url";

import Editor from "./components/editor/editor";
import ButtonsNav from "./components/nav-buttons";
import Stats from "./components/editor/stats";
import Terminal from "./components/editor/terminal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "./components/ui/resizable";

import { LoaderCircleIcon } from "lucide-react";

function App() {
  const { direction, setCode, initializePyodide, isPyodideLoading } =
    useStore();

  // Initialize Pyodide and ( set the code from URL params if present )
  useEffect(() => {
    initializePyodide();

    const urlParams = new URLSearchParams(window.location.search);
    const encodedParam = urlParams.get("v");
    if (encodedParam) {
      const decodedCode = getDecodedParam(encodedParam);
      if (decodedCode) {
        setCode(decodedCode);
      }
    }
  }, [initializePyodide, setCode]);

  if (isPyodideLoading) {
    return (
      <section className="absolute z-[999] flex h-screen w-full flex-col items-center justify-center gap-3 bg-background text-foreground">
        <LoaderCircleIcon className="h-32 w-32 animate-spin" />
        <h1 className="font-bold">Loading Python Playground</h1>
      </section>
    );
  }

  return (
    <main className="flex h-screen flex-col">
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
      <Stats />
    </main>
  );
}

export default App;
