import { useEffect, useState } from "react";
import { useStore } from "@/store";

export default function Stats() {
  const { code } = useStore();
  const [stats, setStats] = useState({ lines: 0, words: 0, characters: 0 });

  useEffect(() => {
    const lines = code.split("\n").length;
    const words = code.split(/\s+/).filter((word) => word).length;
    const characters = code.length;

    setStats({ lines, words, characters });
  }, [code]);

  return (
    <section className="absolute bottom-2 left-0 right-0 z-[99] flex justify-center items-center">
      <div className="bg-secondary rounded font-mono text-sm px-2">
        <span>
          {stats.lines} Lines, {stats.words} Words, {stats.characters}{" "}
          Characters
        </span>
      </div>
    </section>
  );
}
