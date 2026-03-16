'use client';

export default function ProgressBar({ percentage, color = '#00E6B9' }: { percentage: number; color?: string }) {
  return (
    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
}
