import { useEffect, useState, useRef } from "react";
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
  const { output, error, direction, setCode, code, setOutput } = useStore();
  const [terminalCode, setTerminalCode] = useState("");
  const outputRef = useRef<HTMLPreElement>(null); // Ref for the <pre> element

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

  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [output]);

  async function terminalCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e) {
      const fromTerminalCode: string = e.currentTarget.terminalCode.value;
      setOutput(fromTerminalCode);
      await handleRunCode(fromTerminalCode);
      setTerminalCode("");
    }
  }

  return (
    <main className="h-screen flex flex-col">
      <TopNav handleRunCode={async () => await handleRunCode(code)} />
      <ResizablePanelGroup
        direction={direction}
        className="rounded-none border"
      >
        <ResizablePanel defaultSize={65}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <pre
            ref={outputRef}
            className="bg-[#141110] h-full w-full text-white overflow-x-auto p-4"
          >
            {loading ? (
              <Loader text="Downloading Python" />
            ) : (
              <code
                className={
                  "w-full font-mono text-sm " +
                  (error ? "text-red-500" : "text-white")
                }
              >
                {error ? error : output}
                <br />
                <form
                  className="flex gap-1 items-center"
                  onSubmit={terminalCodeSubmit}
                >
                  <p>{">>"}</p>
                  <input
                    value={terminalCode}
                    name="terminalCode"
                    onChange={(e) => setTerminalCode(e.target.value)}
                    className="text-white bg-transparent border-none outline-none"
                    autoComplete="off"
                    placeholder="..."
                  />
                </form>
              </code>
            )}
          </pre>
        </ResizablePanel>
      </ResizablePanelGroup>
      {!loading && <Stats />}
    </main>
  );
}

export default App;
