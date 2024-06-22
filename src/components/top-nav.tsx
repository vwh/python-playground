import { useStore } from "../store";
import { usePyodide } from "../hooks/pyodide";

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

import {
  Replace,
  Download,
  Upload,
  Play,
  Settings,
  FileJson,
} from "lucide-react";

interface TopNavProps {
  handleRunCode: () => Promise<void>;
}

export function TopNav({ handleRunCode }: TopNavProps) {
  const { code, setDirection, direction } = useStore();
  const { installPackage } = usePyodide();

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

  function shareCode() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", btoa(code));
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${urlParams.toString()}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
    navigator.clipboard.writeText(newUrl);
  }

  // form submission
  async function installPipPackage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await installPackage(e.currentTarget.lib.value);
  }

  return (
    <section className="flex gap-2 justify-between p-2">
      <div className="flex gap-2 justify-center items-center grow">
        <Button onClick={handleRunCode} variant="secondary">
          <Play className="h-5 w-5" />
          <span className="ml-2">Run</span>
        </Button>
        <Button variant="outline" onClick={handleChangeDirection}>
          <Replace className="h-5 w-5" />
          <span className="ml-2">Direction</span>
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
                    className="border p-2 flex gap-1"
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
                  <div className="border p-2 flex flex-col gap-1">
                    <Button variant="outline" onClick={downloadCode}>
                      <Download className="h-5 w-5" />
                      <span className="ml-2">Download Code</span>
                    </Button>
                    <Button variant="outline" onClick={shareCode}>
                      <Upload className="h-5 w-5" />
                      <span className="ml-2">Share Code</span>
                    </Button>
                    <Button variant="outline">
                      <FileJson className="h-5 w-5" />
                      <span className="ml-2">Code Minifier</span>
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
