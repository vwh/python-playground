import { useCallback } from "react";
import { useStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";

import MonacoEditor from "@monaco-editor/react";
import { Separator } from "./ui/separator";
import Loader from "./loader";

export default function Editor() {
  const { code, setCode } = useStore();
  const { theme } = useTheme();

  const handleCodeOnChange = useCallback(
    (value: string | undefined) => {
      if (value) {
        setCode(value);
      }
    },
    [setCode]
  );

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background pt-4 text-foreground">
      <MonacoEditor
        defaultLanguage="python"
        theme={theme === "dark" ? "vs-dark" : "light"}
        value={code}
        onChange={handleCodeOnChange}
        loading={<Loader text="Loading Editor" />}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14
        }}
      />
      <Separator />
    </div>
  );
}
