import { useCallback } from "react";
import { useStore } from "@/store/useStore";

import MonacoEditor from "@monaco-editor/react";
import Loader from "@/components/loader";

export default function Editor() {
  const { code, setCode } = useStore();

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
        theme={"vs-dark"}
        value={code}
        onChange={handleCodeOnChange}
        loading={<Loader text="Loading Editor" />}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14
        }}
      />
    </div>
  );
}
