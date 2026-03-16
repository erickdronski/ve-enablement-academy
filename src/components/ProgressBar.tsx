'use client';

export default function ProgressBar({ percentage, color = '#00E6B9', showLabel = false }: { percentage: number; color?: string; showLabel?: boolean }) {
  return (
    <div className="w-full">
      {showLabel && <div className="text-xs text-gray-400 mb-1">{percentage}% complete</div>}
      <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
