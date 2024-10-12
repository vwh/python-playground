import { useMemo } from "react";
import { useStore } from "@/store/useStore";

import { FileTextIcon, TypeIcon, HashIcon } from "lucide-react";

interface CodeStats {
  lines: number;
  words: number;
  characters: number;
}

export default function Stats() {
  const { code } = useStore();

  const stats: CodeStats = useMemo(
    () => ({
      lines: code.split("\n").length,
      words: code.trim().split(/\s+/).length,
      characters: code.length
    }),
    [code]
  );

  return (
    <div className="fixed bottom-1 left-1/2 z-50 hidden -translate-x-1/2 transform rounded-lg border border-accent md:block">
      <div className="tex flex items-center space-x-2 bg-secondary bg-opacity-80 px-4 py-2 text-foreground shadow-lg backdrop-blur-sm">
        <StatItem
          icon={<FileTextIcon size={16} />}
          value={stats.lines}
          label="Lines"
        />
        <StatItem
          icon={<TypeIcon size={16} />}
          value={stats.words}
          label="Words"
        />
        <StatItem
          icon={<HashIcon size={16} />}
          value={stats.characters}
          label="Chars"
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-1 space-x-1">
      <div className="flex items-center space-x-1">
        {icon}
        <span className="font-medium">{value}</span>
      </div>
      <span className="text-xs text-foreground/55">{label}</span>
    </div>
  );
}
