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

import { Replace, Download, Upload, Play, Settings } from "lucide-react";

interface TopNavProps {
  handleRunCode: () => Promise<void>;
}

export function TopNav({ handleRunCode }: TopNavProps) {
  const { code, setDirection, direction } = useStore();

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
                <Button variant="outline" onClick={downloadCode}>
                  <Download className="h-5 w-5" />
                  <span className="ml-2">Download Code</span>
                </Button>
                <Button variant="outline" onClick={shareCode}>
                  <Upload className="h-5 w-5" />
                  <span className="ml-2">Share Code</span>
                </Button>
                {/* <Button onClick={codeMinifier}>
                Code Minifier <MinifierIcon className="w-5 h-5 ml-2" />
              </Button> */}
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
