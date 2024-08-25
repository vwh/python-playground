import { useCallback, memo } from "react";
import { useStore } from "@/store/useStore";

import { Button } from "./ui/button";
import Settings from "./settings";
import ModeToggle from "./theme/mode-toggle";

import {
  ReplaceIcon,
  PlayIcon,
  TrashIcon,
  LoaderCircleIcon
} from "lucide-react";

const ButtonsNav = () => {
  const {
    setDirection,
    direction,
    clearOutput,
    setError,
    runCode,
    code,
    isCodeExecuting
  } = useStore();

  const handleDirectionChange = useCallback(() => {
    setDirection(direction === "vertical" ? "horizontal" : "vertical");
  }, [direction, setDirection]);

  const handleTerminalClear = useCallback(() => {
    clearOutput("Running Python 3.12.1");
    setError(null);
  }, [clearOutput, setError]);

  const handleRunCode = useCallback(() => {
    runCode(code);
  }, [runCode, code]);

  return (
    <nav className="mb-2 w-full rounded-b-lg bg-gray-900 px-4 py-2">
      <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-between md:gap-2">
        <div className="flex flex-wrap items-center gap-1 md:gap-2">
          <NavButton
            onClick={handleRunCode}
            disabled={isCodeExecuting}
            icon={
              isCodeExecuting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <PlayIcon />
              )
            }
            label="Run"
          />
          <NavButton
            onClick={handleTerminalClear}
            disabled={isCodeExecuting}
            icon={<TrashIcon />}
            label="Clear Terminal"
          />
          <NavButton
            onClick={handleDirectionChange}
            icon={<ReplaceIcon />}
            label="Toggle Direction"
          />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Settings />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

const NavButton = memo(
  ({
    onClick,
    disabled,
    icon,
    label
  }: {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ReactNode;
    label: string;
  }) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="secondary"
      className="text-foreground"
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </Button>
  )
);

NavButton.displayName = "NavButton";

export default memo(ButtonsNav);
