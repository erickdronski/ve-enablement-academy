'use client';

import { useEffect, useState } from 'react';
import { badges } from '@/data/badges';
import BadgeCard from '@/components/BadgeCard';

export default function BadgesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="px-6 py-12 max-w-5xl mx-auto"><p className="text-gray-500">Loading...</p></div>;

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Your Badges</h1>
      <p className="text-gray-400 mb-8">Complete tracks and pass quizzes to unlock badges and prove your VE expertise.</p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {badges.map(badge => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
