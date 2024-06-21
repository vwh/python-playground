import { useStore } from "../store";

import MonacoEditor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface EditorProps {
  handleRunCode: () => void;
}

export default function Editor({ handleRunCode }: EditorProps) {
  const { code, setCode } = useStore();

  return (
    <div
      dir="ltr"
      className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] pt-4"
    >
      <MonacoEditor
        defaultLanguage="python"
        defaultValue="console.log('hello world')"
        theme="vs-dark"
        value={code}
        onChange={(e) => {
          if (e) setCode(e);
        }}
      />
      <Separator />
      <div className="bg-background flex w-full gap-2 p-2">
        <Button
          onClick={() => setCode("")}
          variant="destructive"
          className="grow"
        >
          Delete
        </Button>
        <Button onClick={handleRunCode} className="grow">
          Run
        </Button>
      </div>
    </div>
  );
}
