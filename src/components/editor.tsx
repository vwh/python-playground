import { useStore } from "@/store";

import MonacoEditor from "@monaco-editor/react";
import { Separator } from "./ui/separator";
import Loader from "./loader";

export default function Editor() {
  const { code, setCode } = useStore();

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
        className="relative"
        onChange={handleCodeOnChange}
        loading=<Loader text="Loading Editor" />
      />
      <Separator />
    </div>
  );
}
