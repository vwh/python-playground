import { useCallback, useMemo } from "react";
import { useStore } from "@/store/useStore";

import MonacoEditor, { type OnMount } from "@monaco-editor/react";
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

  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily: "'Fira Code', monospace",
      fontLigatures: true,
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: "all",
      matchBrackets: "always",
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      formatOnPaste: true,
      formatOnType: true
    }),
    []
  );

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editor.focus();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg shadow-lg">
      <MonacoEditor
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={handleCodeOnChange}
        loading={<Loader text="Initializing Editor" />}
        // @ts-expect-error ts(2322)
        options={editorOptions}
        onMount={handleEditorDidMount}
        className="h-full w-full"
      />
    </div>
  );
}
