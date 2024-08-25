import { useMemo } from "react";
import { useStore } from "@/store/useStore";

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
    <section className="pointer-events-none absolute bottom-[22px] left-0 right-0 z-[99] hidden items-center justify-center md:flex">
      <div className="rounded bg-secondary px-2 font-mono text-sm text-foreground">
        <span>
          {stats.lines} Lines, {stats.words} Words, {stats.characters}{" "}
          Characters
        </span>
      </div>
    </section>
  );
}
