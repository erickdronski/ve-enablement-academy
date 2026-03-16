'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tracks } from '@/data/tracks';
import { getTrackProgress } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const p: Record<string, number> = {};
    tracks.forEach(t => {
      p[t.id] = getTrackProgress(t.id, t.modules.length).percentage;
    });
    setProgress(p);
  }, []);

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      {/* Top right link */}
      <div className="flex justify-end mb-8">
        <Link href="/profile" className="text-sm text-gray-400 hover:text-[#00E6B9] transition-colors">
          👤 Profile
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#00E6B9] to-[#00B894] bg-clip-text text-transparent">
          VE Enablement Academy
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Master Value Engineering. Get Certified.
        </p>
        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">📚 <strong className="text-white">15</strong> Modules</span>
          <span className="flex items-center gap-2">❓ <strong className="text-white">75</strong> Quiz Questions</span>
          <span className="flex items-center gap-2">⏱ <strong className="text-white">~8</strong> Hours</span>
        </div>
      </div>

      {/* Track cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tracks.map(track => {
          const pct = progress[track.id] || 0;
          return (
            <div
              key={track.id}
              className="card-hover rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-6 flex flex-col"
            >
              <div className="text-4xl mb-3">{track.icon}</div>
              <h2 className="text-xl font-bold mb-1">{track.title}</h2>
              <p className="text-sm text-gray-400 mb-4 flex-1">{track.description}</p>
              <p className="text-xs text-gray-500 mb-2">{track.modules.length} modules</p>
              <ProgressBar percentage={pct} color={track.color} />
              <p className="text-xs text-gray-500 mt-1 mb-4">{pct}% complete</p>
              <Link
                href={`/tracks/${track.id}`}
                className="block text-center px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                style={{
                  backgroundColor: pct > 0 ? track.color + '22' : '#00E6B9',
                  color: pct > 0 ? track.color : '#000',
                }}
              >
                {pct > 0 ? 'Continue →' : 'Start Learning →'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
