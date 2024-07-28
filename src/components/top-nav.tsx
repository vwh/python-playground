import { useStore } from "@/store";

import { Button } from "./ui/button";
import Settings from "./settings";

import { ReplaceIcon, PlayIcon, TrashIcon } from "lucide-react";

interface TopNavProps {
  handleRunCode: () => Promise<void>;
}

export default function TopNav({ handleRunCode }: TopNavProps) {
  const { setDirection, direction, clearOutput, setError } = useStore();

  function handleChangeDirection() {
    setDirection(direction === "vertical" ? "horizontal" : "vertical");
  }

  function handleCodeDelete() {
    clearOutput("Running Python 3.12.1");
    setError(null);
  }

  return (
    <section className="flex justify-between gap-2 bg-[#141110] p-2">
      <div className="flex grow items-center justify-center gap-2">
        <Button onClick={handleRunCode} variant="secondary">
          <PlayIcon className="h-5 w-5" />
          <span className="ml-2">Run</span>
        </Button>
        <Button onClick={handleCodeDelete} variant="secondary">
          <TrashIcon className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Clear Terminal</span>
        </Button>
        <Button variant="outline" onClick={handleChangeDirection}>
          <ReplaceIcon className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Direction</span>
        </Button>
        <Settings />
      </div>
    </section>
  );
}
