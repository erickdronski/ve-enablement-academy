'use client';

import { useState, useEffect } from 'react';
import { tracks } from '@/data/tracks';
import { badges } from '@/data/badges';
import {
  getProfile, setProfile, getTotalPoints, getCompletedModuleCount,
  getPassedQuizCount, getTrackProgress, getRecentActivity
} from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import BadgeCard from '@/components/BadgeCard';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setName(getProfile().name);
  }, []);

  function handleNameBlur() {
    setProfile(name);
  }

  if (!mounted) return <div className="px-6 py-12 max-w-5xl mx-auto"><p className="text-gray-500">Loading...</p></div>;

  const points = getTotalPoints();
  const completedModules = getCompletedModuleCount();
  const passedQuizzes = getPassedQuizCount();
  const activities = getRecentActivity().slice(0, 10);

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      {/* Name input */}
      <div className="mb-10">
        <label className="block text-sm text-gray-400 mb-2">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleNameBlur}
          placeholder="Enter your name..."
          className="w-full max-w-sm px-4 py-2.5 bg-[#111] border border-[#222] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#00E6B9] transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-[#00E6B9]">{points}</p>
          <p className="text-sm text-gray-500 mt-1">Total Points</p>
        </div>
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-white">{completedModules}<span className="text-lg text-gray-500">/15</span></p>
          <p className="text-sm text-gray-500 mt-1">Modules Completed</p>
        </div>
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-white">{passedQuizzes}</p>
          <p className="text-sm text-gray-500 mt-1">Quizzes Passed</p>
        </div>
      </div>

      {/* Track progress */}
      <h2 className="text-xl font-bold mb-4">Track Progress</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {tracks.map(track => {
          const p = getTrackProgress(track.id, track.modules.length);
          return (
            <div key={track.id} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{track.icon}</span>
                <h3 className="font-semibold">{track.title}</h3>
              </div>
              <ProgressBar percentage={p.percentage} color={track.color} />
              <p className="text-xs text-gray-500 mt-2">{p.completed} of {p.total} · {p.percentage}%</p>
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <h2 className="text-xl font-bold mb-4">Badges</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-10">
        {badges.map(badge => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>

      {/* Recent activity */}
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No activity yet. Start learning to see your progress here!</p>
      ) : (
        <div className="space-y-3">
          {activities.map((act, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <span className="text-lg">
                {act.type === 'module' ? '📖' : act.type === 'quiz' ? '📝' : '🏅'}
              </span>
              <span className="text-gray-300 flex-1">{act.label}</span>
              <span className="text-gray-600 text-xs">{new Date(act.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
