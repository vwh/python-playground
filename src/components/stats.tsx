import { useMemo } from "react";
import { useStore } from "@/store";

interface CodeStats {
  lines: number;
  words: number;
  characters: number;
}

export default function Stats() {
  const { code } = useStore();

  const stats: CodeStats = useMemo(() => {
    const lines = code.split("\n").length;
    const words = code.trim().split(/\s+/).length;
    const characters = code.length;

    return { lines, words, characters };
  }, [code]);

  return (
    <section className="absolute bottom-3 left-0 right-0 z-[99] flex items-center justify-center">
      <div className="rounded bg-secondary px-2 font-mono text-sm text-foreground">
        <span>
          {stats.lines} Lines, {stats.words} Words, {stats.characters}{" "}
          Characters
        </span>
      </div>
    </section>
  );
}
