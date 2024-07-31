import React, { useState } from "react";
import { useStore } from "@/store";

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

export default function Settings() {
  const { code, setOutput, setError } = useStore();
  const [isLibLoading, setIsLibLoading] = useState(false);

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code.py";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePipInstall = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const packageName = (form.elements.namedItem("lib") as HTMLInputElement)
      .value;
    const lib = packageName.replace("pip install ", "").trim();

    if (!window.micropip || !lib) return;

    setIsLibLoading(true);
    try {
      await window.micropip.install(lib, true);
      setOutput(`pip install ${lib} successfully installed`);
      setError(null);
    } catch (e) {
      setError(`Failed to install ${lib}: ${(e as Error).message}`);
    } finally {
      setIsLibLoading(false);
    }
  };

  const handleShareCode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("v", btoa(code));
    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
    navigator.clipboard.writeText(newUrl);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          title="Toggle settings drawer"
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="hidden md:inline">Settings</span>
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
          <div className="flex flex-col gap-4 px-4 py-2 pb-0">
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
                  title="Download library"
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
                <Button
                  title="Download the code"
                  variant="secondary"
                  onClick={handleDownloadCode}
                  className="flex items-center justify-center"
                >
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  <span>Download Code</span>
                </Button>
                <Button
                  title="Share the code"
                  variant="secondary"
                  onClick={handleShareCode}
                  className="flex items-center justify-center"
                >
                  <UploadIcon className="mr-2 h-5 w-5" />
                  <span>Share Code</span>
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button title="Close the drawer" variant="secondary">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
