'use client';
import { useState, useEffect } from 'react';
import { tracks } from '@/data/tracks';
import { badges } from '@/data/badges';
import { getProfile, setProfile, getTotalXP, getCompletedModuleCount, getPassedQuizCount, getTrackProgress, isBadgeEarned, getBadgeDate, getRecentActivity } from '@/lib/store';
import XPCounter from '@/components/XPCounter';
import BadgeCard from '@/components/BadgeCard';
import ProgressBar from '@/components/ProgressBar';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => { setMounted(true); setName(getProfile().name); }, []);

  const handleNameBlur = () => { setProfile(name); };

  if (!mounted) return <div className="max-w-4xl mx-auto py-8"><div className="h-96 animate-pulse bg-[#111] rounded-xl" /></div>;

  const xp = getTotalXP();
  const modulesCompleted = getCompletedModuleCount();
  const quizzesPassed = getPassedQuizCount();
  const activity = getRecentActivity().slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-8">Your Profile</h1>

      {/* Name */}
      <div className="mb-8">
        <label className="text-sm text-gray-400 mb-1 block">Your Name</label>
        <input value={name} onChange={e => setName(e.target.value)} onBlur={handleNameBlur}
          placeholder="Enter your name..." className="w-full max-w-md px-4 py-3 rounded-lg bg-[#111] border border-[#222] focus:border-[#00E6B9] focus:outline-none transition-colors" />
      </div>

      {/* XP */}
      <div className="mb-8"><XPCounter /></div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total XP', value: xp, color: '#00E6B9' },
          { label: 'Modules', value: `${modulesCompleted}/12`, color: '#3B82F6' },
          { label: 'Quizzes', value: quizzesPassed, color: '#8B5CF6' },
          { label: 'Badges', value: `${badges.filter(b => isBadgeEarned(b.id)).length}/3`, color: '#FFD700' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[#222] bg-[#111] p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Track Progress */}
      <h2 className="text-xl font-bold mb-4">Track Progress</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {tracks.map(t => {
          const p = getTrackProgress(t.id, t.modules.length);
          return (
            <div key={t.id} className="rounded-xl border border-[#222] bg-[#111] p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{t.icon}</span>
                <span className="font-semibold">{t.title}</span>
              </div>
              <ProgressBar percentage={p.percentage} color={t.color} showLabel />
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <h2 className="text-xl font-bold mb-4">Badges</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {badges.map(b => (
          <BadgeCard key={b.id} badge={b} earned={isBadgeEarned(b.id)} earnedDate={getBadgeDate(b.id)} />
        ))}
      </div>

      {/* Activity */}
      {activity.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-2 mb-8">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#111] border border-[#1a1a1a]">
                <span className="text-lg">{a.type === 'module' ? '📚' : a.type === 'quiz' ? '✅' : '🏆'}</span>
                <span className="text-sm flex-1">{a.label}</span>
                <span className="text-xs text-gray-500">{new Date(a.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
