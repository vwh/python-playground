import { useCallback } from "react";
import { useStore } from "@/store";

import { Button } from "./ui/button";
import Settings from "./settings";
import ModeToggle from "./mode-toggle";
import { Separator } from "./ui/separator";

import { ReplaceIcon, PlayIcon, TrashIcon } from "lucide-react";

export default function ButtonsNav() {
  const { setDirection, direction, clearOutput, setError, runCode, code } =
    useStore();

  const handleChangeDirection = useCallback(() => {
    setDirection(direction === "vertical" ? "horizontal" : "vertical");
  }, [direction, setDirection]);

  const handleCodeDelete = useCallback(() => {
    clearOutput("Running Python 3.12.1");
    setError(null);
  }, [clearOutput, setError]);

  const handleRunCode = useCallback(async () => {
    await runCode(code);
  }, [runCode, code]);

  return (
    <>
      <section className="flex justify-between gap-2 bg-background p-2">
        <div className="flex grow items-center justify-center gap-1">
          <Button
            title="Execute the code"
            onClick={handleRunCode}
            variant="secondary"
          >
            <PlayIcon className="h-5 w-5" />
            <span className="ml-2">Run</span>
          </Button>
          <Button
            title="Clear the terminal"
            onClick={handleCodeDelete}
            variant="secondary"
          >
            <TrashIcon className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">Clear Terminal</span>
          </Button>
          <Button
            title="Change direction"
            variant="secondary"
            onClick={handleChangeDirection}
          >
            <ReplaceIcon className="h-5 w-5" />
            <span className="ml-2 hidden md:inline">Direction</span>
          </Button>
          <Settings />
          <ModeToggle />
        </div>
      </section>
      <Separator />
    </>
  );
}
