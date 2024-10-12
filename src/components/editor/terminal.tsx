import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useStore } from "@/store/useStore";

import Loader from "@/components/loader";

interface CommandHandlers {
  [key: string]: (input: string) => Promise<void>;
}

export default function Terminal() {
  const {
    output,
    error,
    setOutput,
    isPyodideLoading,
    runCode,
    pipInstall,
    setError,
    clearOutput
  } = useStore();
  const [terminalCode, setTerminalCode] = useState<string>("");
  const outputRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  // Scroll to bottom on output change
  useEffect(() => {
    scrollToBottom();
  }, [output, scrollToBottom]);

  const getCwd = useCallback(async () => {
    await runCode("import os; print(os.getcwd())");
  }, [runCode]);

  const clearTerminal = useCallback(async () => {
    clearOutput("Running Python 3.12.1");
    setError(null);
  }, [clearOutput, setError]);

  const commandHandlers: CommandHandlers = useMemo(
    () => ({
      "pip install": async (input: string) => await pipInstall(input),
      "echo ": async (input: string) =>
        await setOutput(input.split(" ").slice(1).join(" ")),
      pwd: getCwd,
      cwd: getCwd,
      clear: clearTerminal,
      cls: clearTerminal
    }),
    [pipInstall, setOutput, getCwd, clearTerminal]
  );

  const handleReplSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const replInput = formData.get("terminalCode") as string;

      if (!replInput.trim()) return;

      setOutput(replInput);

      const handler = Object.entries(commandHandlers).find(([key]) =>
        replInput.startsWith(key)
      );

      if (handler) {
        await handler[1](replInput);
      } else {
        await runCode(replInput);
      }

      setTerminalCode("");
    },
    [runCode, setOutput, commandHandlers]
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
      <form className="flex items-center gap-2" onSubmit={handleReplSubmit}>
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
