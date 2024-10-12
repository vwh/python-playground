import { useEffect } from "react";
import { useStore } from "@/store/useStore";

import { getDecodedParam } from "@/lib/url";

import Editor from "@/components/editor/editor";
import ButtonsNav from "@/components/nav-buttons";
import Stats from "@/components/editor/stats";
import Terminal from "@/components/editor/terminal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";

export default function App() {
  const { direction, setCode, initializePyodide, isPyodideLoading } =
    useStore();

  // Initialize Pyodide and ( set the code from URL params if present )
  useEffect(() => {
    const initializeApp = async () => {
      await initializePyodide();

      const urlParams = new URLSearchParams(window.location.search);
      const encodedParam = urlParams.get("v");
      if (encodedParam) {
        const decodedCode = getDecodedParam(encodedParam);
        if (decodedCode) {
          setCode(decodedCode);
        }
      }
    };

    initializeApp();
  }, [initializePyodide, setCode]);

  if (isPyodideLoading) {
    return <LoadingScreen />;
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
        <ResizableHandle className="border-[1px]" withHandle />
        <ResizablePanel defaultSize={35}>
          <Terminal />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Stats />
    </main>
  );
}

function LoadingScreen() {
  return (
    <section className="absolute z-[999] flex h-screen w-full flex-col items-center justify-center gap-3 bg-background text-foreground">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
        <img
          src="./images/logo.webp"
          alt="logo"
          className="h-52 w-52 animate-pulse"
        />
        <p className="sm:text-1xl mt-2 animate-pulse whitespace-pre-wrap text-center text-xl font-semibold tracking-tighter text-white">
          Loading WebAssembly
        </p>
      </div>
    </section>
  );
}
