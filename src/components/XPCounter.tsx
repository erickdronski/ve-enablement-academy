'use client';
import { useEffect, useState } from 'react';
import { getTotalXP, getLevel } from '@/lib/store';

const levels = [
  { name: 'Beginner', min: 0, max: 199, color: '#94A3B8' },
  { name: 'Intermediate', min: 200, max: 599, color: '#E8192C' },
  { name: 'Advanced', min: 600, max: 999, color: '#0070F3' },
  { name: 'Expert', min: 1000, max: 2000, color: '#FFAA00' },
];

export default function XPCounter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-16" />;

  const xp = getTotalXP();
  const level = getLevel();
  const lvl = levels.find(l => l.name === level) || levels[0];
  const progress = Math.min(((xp - lvl.min) / (lvl.max - lvl.min + 1)) * 100, 100);

  return (
    <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold" style={{ color: lvl.color }}>{level}</span>
        <span className="text-xs text-gray-400">{xp} XP</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: lvl.color }} />
      </div>
    </div>
  );
}
