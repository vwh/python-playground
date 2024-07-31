import React, { useEffect, useState, useRef, useCallback } from "react";
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

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [output, scrollToBottom]);

  const terminalCodeSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fromTerminalCode = (
        form.elements.namedItem("terminalCode") as HTMLInputElement
      ).value.trim();

      if (fromTerminalCode) {
        setOutput(fromTerminalCode);
        await handleRunCode(fromTerminalCode);
        setTerminalCode("");
      }
    },
    [handleRunCode, setOutput]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTerminalCode(e.target.value);
    },
    []
  );

  if (loading) {
    return (
      <div className="p-4">
        <Loader text="Downloading Python" />
      </div>
    );
  }

  return (
    <pre
      ref={outputRef}
      className="h-full w-full overflow-x-auto bg-background p-4"
    >
      <code
        className={`w-full font-mono text-sm ${
          error ? "text-red-500" : "text-foreground"
        }`}
      >
        {error || output}
        <br />
        <form className="flex items-center gap-1" onSubmit={terminalCodeSubmit}>
          <p>&gt;&gt;</p>
          <input
            value={terminalCode}
            name="terminalCode"
            onChange={handleInputChange}
            className="w-full border-none bg-transparent text-foreground outline-none"
            autoComplete="off"
            placeholder="..."
          />
        </form>
      </code>
    </pre>
  );
}
