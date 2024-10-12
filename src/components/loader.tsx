import { LoaderCircleIcon } from "lucide-react";

interface LoaderProps {
  text: string;
}

export default function Loader({ text }: LoaderProps) {
  return (
    <div className="flex items-center gap-1 text-foreground">
      <LoaderCircleIcon className="h-5 w-5 animate-spin" />
      <p className="font-bold">{text}</p>
    </div>
  );
}
