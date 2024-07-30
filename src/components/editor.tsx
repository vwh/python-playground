import { useStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";

import MonacoEditor from "@monaco-editor/react";
import { Separator } from "./ui/separator";
import Loader from "./loader";

export default function Editor() {
  const { code, setCode } = useStore();
  const { theme } = useTheme();

  function handleCodeOnChange(e: string | undefined) {
    if (e) {
      setCode(e);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background pt-4 text-foreground">
      <MonacoEditor
        defaultLanguage="python"
        defaultValue="console.log('hello world')"
        theme={theme === "dark" ? "vs-dark" : "vs"}
        value={code}
        className="relative"
        onChange={handleCodeOnChange}
        loading=<Loader text="Loading Editor" />
      />
      <Separator />
    </div>
  );
}
