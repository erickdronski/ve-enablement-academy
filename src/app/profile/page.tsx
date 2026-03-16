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

  if (!mounted) return <div className="max-w-4xl mx-auto py-8"><div className="h-96 animate-pulse bg-gray-100 rounded-xl" /></div>;

  const xp = getTotalXP();
  const modulesCompleted = getCompletedModuleCount();
  const quizzesPassed = getPassedQuizCount();
  const activity = getRecentActivity().slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-8 text-[#1A1F36]">Your Profile</h1>

      <div className="mb-8">
        <label className="text-sm text-gray-500 mb-1 block">Your Name</label>
        <input value={name} onChange={e => setName(e.target.value)} onBlur={() => setProfile(name)}
          placeholder="Enter your name..." className="w-full max-w-md px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#E8192C] focus:outline-none focus:ring-2 focus:ring-[#E8192C]/10 transition-all" />
      </div>

      <div className="mb-8"><XPCounter /></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total XP', value: xp, color: '#E8192C' },
          { label: 'Modules', value: `${modulesCompleted}/12`, color: '#0070F3' },
          { label: 'Quizzes', value: quizzesPassed, color: '#8B5CF6' },
          { label: 'Badges', value: `${badges.filter(b => isBadgeEarned(b.id)).length}/3`, color: '#FFAA00' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4 text-[#1A1F36]">Track Progress</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {tracks.map(t => {
          const p = getTrackProgress(t.id, t.modules.length);
          return (
            <div key={t.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{t.icon}</span>
                <span className="font-semibold text-[#1A1F36]">{t.title}</span>
              </div>
              <ProgressBar percentage={p.percentage} color={t.color} showLabel />
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mb-4 text-[#1A1F36]">Badges</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {badges.map(b => <BadgeCard key={b.id} badge={b} earned={isBadgeEarned(b.id)} earnedDate={getBadgeDate(b.id)} />)}
      </div>

      {activity.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-[#1A1F36]">Recent Activity</h2>
          <div className="space-y-2 mb-8">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-lg">{a.type === 'module' ? '📚' : a.type === 'quiz' ? '✅' : '🏆'}</span>
                <span className="text-sm flex-1 text-[#1A1F36]">{a.label}</span>
                <span className="text-xs text-gray-400">{new Date(a.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
