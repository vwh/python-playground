import { useCallback, memo } from "react";
import { useStore } from "@/store/useStore";

import { Button } from "./ui/button";
import Settings from "./settings";

import {
  ReplaceIcon,
  PlayIcon,
  Trash2Icon,
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
                <LoaderCircleIcon className="h-5 w-5 animate-spin" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )
            }
            label="Run"
            title="Execute Python Code"
          />
          <NavButton
            onClick={handleTerminalClear}
            disabled={isCodeExecuting}
            icon={<Trash2Icon className="h-5 w-5" />}
            label="Clear Terminal"
            title="Clear Terminal"
          />
          <NavButton
            onClick={handleDirectionChange}
            icon={<ReplaceIcon className="h-5 w-5" />}
            label={
              direction.substring(0, 1).toUpperCase() + direction.substring(1)
            }
            title="Change direction"
          />
        </div>
        <div className="flex items-center">
          <Settings />
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
    label,
    title
  }: {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ReactNode;
    label: string;
    title: string;
  }) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="secondary"
      className="text-foreground"
      title={title}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </Button>
  )
);

NavButton.displayName = "NavButton";

export default memo(ButtonsNav);
