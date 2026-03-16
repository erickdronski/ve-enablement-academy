'use client';
import { Badge } from '@/data/badges';

export default function BadgeCard({ badge, earned, earnedDate }: { badge: Badge; earned: boolean; earnedDate?: string | null }) {
  const glowClass = earned ? (badge.color === '#FFD700' ? 'glow-gold' : badge.color === '#8B5CF6' ? 'glow-purple' : 'glow-teal') : '';

  return (
    <div className={`rounded-xl border p-6 text-center transition-all duration-300 ${earned ? `border-[${badge.color}]/50 ${glowClass}` : 'border-[#222] opacity-40 grayscale'}`}
      style={earned ? { borderColor: badge.color + '80' } : {}}>
      <div className="text-5xl mb-3">{badge.emoji}</div>
      <h3 className="font-bold text-lg mb-1">{badge.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
      {earned && earnedDate ? (
        <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: badge.color + '20', color: badge.color }}>
          Earned {new Date(earnedDate).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-xs text-gray-500">{badge.unlockCriteria}</span>
      )}
    </div>
  );
}
