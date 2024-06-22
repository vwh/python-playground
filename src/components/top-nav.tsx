import { useStore } from "../store";

import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";

import { Replace, Download, Upload, Play, Settings, Trash } from "lucide-react";

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
    micropip: {
      install: (packages: string, keep_going?: boolean) => Promise<void>;
    };
  }
}

interface TopNavProps {
  handleRunCode: () => Promise<void>;
}

export default function TopNav({ handleRunCode }: TopNavProps) {
  const {
    code,
    setCode,
    setDirection,
    direction,
    setError,
    setOutput,
    clearOutput,
  } = useStore();

  function handleChangeDirection() {
    setDirection(direction === "vertical" ? "horizontal" : "vertical");
  }

  function downloadCode() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code.py";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleCodeDelete() {
    setCode("");
    clearOutput("Running Python 3.12.1");
  }

  function shareCode() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", btoa(code));
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${urlParams.toString()}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
    navigator.clipboard.writeText(newUrl);
  }

  async function installPipPackage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e) {
      const packageName = e.currentTarget.lib.value;
      console.log(packageName);
      if (window.micropip) {
        const lib = packageName.replace("pip install ", "");
        try {
          await window.micropip.install(lib, true);
          setOutput(`pip install ${lib} successfully installed`);
          setError(null);
        } catch (e) {
          if (e instanceof Error) {
            setError(`Failed to install ${lib}, ${e.message}`);
          }
        }
      }
    }
  }

  return (
    <section className="flex gap-2 justify-between p-2 bg-[#141110]">
      <div className="flex gap-2 justify-center items-center grow">
        <Button onClick={handleRunCode} variant="secondary">
          <Play className="h-5 w-5" />
          <span className="ml-2">Run</span>
        </Button>
        <Button onClick={handleCodeDelete} variant="secondary">
          <Trash className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Delete</span>
        </Button>
        <Button variant="outline" onClick={handleChangeDirection}>
          <Replace className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Direction</span>
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Settings className="h-5 w-5" />
              <span className="ml-2">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerDescription>
                  Personalize your site experience here.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0 flex flex-col gap-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Download libraries
                  </p>
                  <form
                    className="border rounded p-2 flex gap-1"
                    onSubmit={installPipPackage}
                  >
                    <Input
                      type="text"
                      name="lib"
                      placeholder="pip install numpy"
                    />
                    <Button variant="outline" type="submit">
                      <Download className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Share your code
                  </p>
                  <div className="border rounded p-2 flex flex-col gap-1">
                    <Button variant="outline" onClick={downloadCode}>
                      <Download className="h-5 w-5" />
                      <span className="ml-2">Download Code</span>
                    </Button>
                    <Button variant="outline" onClick={shareCode}>
                      <Upload className="h-5 w-5" />
                      <span className="ml-2">Share Code</span>
                    </Button>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
