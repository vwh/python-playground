import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "@/store/useStore";

import Loader from "@/components/loader";

export default function Terminal() {
  const { output, error, setOutput, isPyodideLoading, runCode, pipInstall } =
    useStore();
  const [terminalCode, setTerminalCode] = useState<string>("");
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [output, scrollToBottom]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const code = formData.get("terminalCode") as string;
      if (code.trim()) {
        if (code.includes("pip install")) {
          await pipInstall(code);
        } else {
          setOutput(code);
          await runCode(code);
        }
        setTerminalCode("");
      }
    },
    [runCode, setOutput, pipInstall]
  );

  if (isPyodideLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-900">
        <Loader text="Initializing Python Environment" />
      </div>
    );
  }

  return (
    <div
      ref={outputRef}
      className="h-full w-full overflow-y-auto bg-gray-900 px-4 py-3 font-mono text-sm text-gray-300"
    >
      {(error || output) && (
        <div
          className={`whitespace-pre-wrap ${error ? "text-red-400" : "text-gray-300"}`}
        >
          {error || output}
        </div>
      )}
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <span className="text-green-400">&gt;&gt;&gt;</span>
        <input
          value={terminalCode}
          name="terminalCode"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTerminalCode(e.target.value)
          }
          className="w-full bg-transparent text-gray-300 outline-none"
          autoComplete="off"
          placeholder="..."
        />
      </form>
    </div>
  );
}
