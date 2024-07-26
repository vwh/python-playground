import { useEffect, useState, useRef } from "react";
import { useStore } from "@/store";

import Loader from "./loader";

interface TerminalProps {
  handleRunCode: (code: string) => Promise<void>;
  loading: boolean;
}

export default function Terminal({ handleRunCode, loading }: TerminalProps) {
  const { output, error, setOutput } = useStore();
  const [terminalCode, setTerminalCode] = useState("");
  const outputRef = useRef<HTMLPreElement>(null);

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
    <pre
      ref={outputRef}
      className="h-full w-full overflow-x-auto bg-[#141110] p-4 text-white"
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
            className="flex items-center gap-1"
            onSubmit={terminalCodeSubmit}
          >
            <p>{">>"}</p>
            <input
              value={terminalCode}
              name="terminalCode"
              onChange={(e) => setTerminalCode(e.target.value)}
              className="border-none bg-transparent text-white outline-none"
              autoComplete="off"
              placeholder="..."
            />
          </form>
        </code>
      )}
    </pre>
  );
}
