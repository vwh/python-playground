import { useStore } from "@/store";
import { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
  DownloadIcon,
  UploadIcon,
  SettingsIcon,
  LoaderIcon
} from "lucide-react";

declare global {
  interface Window {
    micropip: {
      install: (packages: string, keep_going?: boolean) => Promise<void>;
    };
  }
}

export default function Settings() {
  const { code, setOutput, setError } = useStore();
  const [isLibLoading, setIsLibLoading] = useState(false);

  function handleDownloadCode() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code.py";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function handlePipInstall(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e) {
      const packageName = e.currentTarget.lib.value;
      console.log(packageName);
      if (window.micropip) {
        const lib = packageName.replace("pip install ", "");
        try {
          setIsLibLoading(true);
          await window.micropip.install(lib, true);
          setOutput(`pip install ${lib} successfully installed`);
          setError(null);
        } catch (e) {
          if (e instanceof Error) {
            setError(`Failed to install ${lib}, ${e.message}`);
          }
        } finally {
          setIsLibLoading(false);
        }
      }
    }
  }

  function handleShareCode() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", btoa(code));
    const newUrl = `${window.location.origin}${
      window.location.pathname
    }?${urlParams.toString()}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
    navigator.clipboard.writeText(newUrl);
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">
          <SettingsIcon className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Settings</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-foreground">Settings</DrawerTitle>
            <DrawerDescription>
              Personalize your site experience here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4 pb-0">
            <div>
              <p className="mb-1 text-sm text-muted-foreground">
                Download libraries
              </p>
              <form className="flex gap-1" onSubmit={handlePipInstall}>
                <Input
                  type="text"
                  name="lib"
                  className="text-foreground"
                  placeholder="pip install numpy"
                  disabled={isLibLoading}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isLibLoading}
                >
                  {isLibLoading ? (
                    <LoaderIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <DownloadIcon className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
            <div>
              <p className="mb-1 text-sm text-foreground">Share your code</p>
              <div className="flex flex-col gap-1">
                <Button variant="secondary" onClick={handleDownloadCode}>
                  <DownloadIcon className="h-5 w-5" />
                  <span className="ml-2">Download Code</span>
                </Button>
                <Button variant="secondary" onClick={handleShareCode}>
                  <UploadIcon className="h-5 w-5" />
                  <span className="ml-2">Share Code</span>
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
