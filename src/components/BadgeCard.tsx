'use client';
import { Badge } from '@/data/badges';

export default function BadgeCard({ badge, earned, earnedDate }: { badge: Badge; earned: boolean; earnedDate?: string | null }) {
  return (
    <div className={`rounded-xl border p-6 text-center transition-all duration-300 ${earned ? 'border-gray-200 bg-white shadow-lg' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}
      style={earned ? { boxShadow: `0 8px 30px ${badge.color}15` } : {}}>
      <div className="text-5xl mb-3">{badge.emoji}</div>
      <h3 className="font-bold text-lg mb-1 text-[#1A1F36]">{badge.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
      {earned && earnedDate ? (
        <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: badge.color + '15', color: badge.color }}>
          Earned {new Date(earnedDate).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-xs text-gray-400">{badge.unlockCriteria}</span>
      )}
    </div>
  );
}
