import { useStore } from "../store";

import { Button } from "./ui/button";
import { Replace, Download, Upload } from "lucide-react";

interface TopNavProps {
  setDirection: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>;
}

export function TopNav({ setDirection }: TopNavProps) {
  const { code } = useStore();

  function handleChangeDirection() {
    setDirection((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
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
    <section className="flex gap-2 justify-center items-center p-2">
      <Button variant="outline" onClick={handleChangeDirection}>
        <Replace className="h-5 w-5" />
        <span className="ml-2">Direction</span>
      </Button>
      <Button variant="outline" onClick={downloadCode}>
        <Download className="h-5 w-5" />
        <span className="ml-2">Download</span>
      </Button>
      <Button variant="outline" onClick={shareCode}>
        <Upload className="h-5 w-5" />
        <span className="ml-2">Share</span>
      </Button>
    </section>
  );
}
