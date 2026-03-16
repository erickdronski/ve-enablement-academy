'use client';

import { Badge } from '@/data/badges';
import { isBadgeEarned, getBadgeDate } from '@/lib/store';

export default function BadgeCard({ badge }: { badge: Badge }) {
  const earned = isBadgeEarned(badge.id);
  const dateStr = getBadgeDate(badge.id);

  return (
    <div
      className={`relative rounded-xl border p-6 text-center transition-all duration-300 ${
        earned
          ? 'border-transparent bg-[#111] glow-teal'
          : 'border-[#222] bg-[#0d0d0d] opacity-50'
      }`}
      style={earned ? { boxShadow: `0 0 24px ${badge.color}33, 0 0 48px ${badge.color}11` } : {}}
    >
      <div className="text-5xl mb-3">{badge.emoji}</div>
      <h3 className="text-lg font-bold text-white mb-1">{badge.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
      <span
        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
        style={{ backgroundColor: badge.color + '22', color: badge.color }}
      >
        {badge.tier}
      </span>
      {earned && dateStr && (
        <p className="text-xs text-gray-500 mt-3">
          Earned {new Date(dateStr).toLocaleDateString()}
        </p>
      )}
      {!earned && (
        <p className="text-xs text-gray-600 mt-3">🔒 {badge.unlockCriteria}</p>
      )}
    </div>
  );
}
