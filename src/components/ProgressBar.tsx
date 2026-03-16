'use client';

export default function ProgressBar({ percentage, color = '#E8192C', showLabel = false }: { percentage: number; color?: string; showLabel?: boolean }) {
  return (
    <div className="w-full">
      {showLabel && <div className="text-xs text-gray-400 mb-1">{percentage}% complete</div>}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
