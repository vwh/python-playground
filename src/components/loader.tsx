import { LoaderCircleIcon } from "lucide-react";

export default function Loader({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1">
      <LoaderCircleIcon className="h-5 w-5 animate-spin" />
      <p>{text}</p>
    </div>
  );
}
