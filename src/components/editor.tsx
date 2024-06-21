import { useStore } from "../store";

import MonacoEditor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Loader from "./loader";

interface EditorProps {
  handleRunCode: () => void;
}

export default function Editor({ handleRunCode }: EditorProps) {
  const { code, setCode } = useStore();

  function handleCodeDelete() {
    setCode("");
  }

  function handleCodeOnChange(e: string | undefined) {
    if (e) {
      setCode(e);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] pt-4">
      <MonacoEditor
        defaultLanguage="python"
        defaultValue="console.log('hello world')"
        theme="vs-dark"
        value={code}
        loading=<Loader text="Loading Editor" />
        onChange={handleCodeOnChange}
      />
      <Separator />
      <div className="bg-background flex w-full gap-2 p-2 pb-3">
        <Button
          onClick={handleCodeDelete}
          variant="destructive"
          className="w-1/3"
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={handleRunCode} className="grow">
          Run
        </Button>
      </div>
    </div>
  );
}
