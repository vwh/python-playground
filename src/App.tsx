import { useEffect } from "react";
import { useStore } from "./store/useStore";

import { getDecodedParam } from "./lib/url";

import Editor from "./components/editor/editor";
import ButtonsNav from "./components/nav-buttons";
import Stats from "./components/editor/stats";
import Terminal from "./components/editor/terminal";
import Ripple from "@/components/magicui/ripple";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "./components/ui/resizable";

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
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
          <p className="z-10 animate-pulse whitespace-pre-wrap text-center text-2xl font-bold tracking-tighter text-white">
            Loading
          </p>
          <Ripple />
        </div>
      </section>
    );
  }

  return (
    <main className="flex h-screen flex-col bg-background md:mx-2 md:pb-3">
      <ButtonsNav />
      <ResizablePanelGroup
        className="border-t border-accent md:rounded-lg md:border"
        direction={direction}
      >
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
