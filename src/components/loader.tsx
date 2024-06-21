import { LoaderCircle } from "lucide-react";

export default function Loader({ text }: { text: string }) {
  return (
    <div className="flex gap-1 items-center">
      <LoaderCircle className="h-5 w-5 animate-spin" />
      <p>{text}</p>
    </div>
  );
}
