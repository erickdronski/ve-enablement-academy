'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTrackById } from '@/data/tracks';
import { isModuleCompleted, getTrackProgress } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function TrackPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const track = getTrackById(trackId);
  const [, setTick] = useState(0);

  useEffect(() => { setTick(1); }, []);

  if (!track) {
    return (
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-gray-400">Track not found.</p>
        <Link href="/" className="text-[#00E6B9] hover:underline text-sm mt-4 inline-block">← Back to Home</Link>
      </div>
    );
  }

  const progress = getTrackProgress(trackId, track.modules.length);

  function getModuleStatus(idx: number): 'completed' | 'available' | 'locked' {
    const mod = track!.modules[idx];
    if (isModuleCompleted(trackId, mod.id)) return 'completed';
    if (idx === 0) return 'available';
    if (isModuleCompleted(trackId, track!.modules[idx - 1].id)) return 'available';
    return 'locked';
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-gray-500 hover:text-[#00E6B9] transition-colors">← Back to Home</Link>

      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{track.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{track.title}</h1>
            <span
              className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide mt-1"
              style={{ backgroundColor: track.color + '22', color: track.color }}
            >
              {track.tier}
            </span>
          </div>
        </div>
        <p className="text-gray-400 mt-2 mb-4">{track.description}</p>
        <ProgressBar percentage={progress.percentage} color={track.color} />
        <p className="text-xs text-gray-500 mt-1">{progress.completed} of {progress.total} modules completed</p>
      </div>

      <div className="space-y-4">
        {track.modules.map((mod, idx) => {
          const status = getModuleStatus(idx);
          return (
            <div
              key={mod.id}
              className={`rounded-xl border p-5 transition-all ${
                status === 'locked'
                  ? 'border-[#1a1a1a] bg-[#0a0a0a] opacity-50 cursor-not-allowed'
                  : status === 'completed'
                  ? 'border-green-500/30 bg-green-500/5 card-hover'
                  : 'border-[#1a1a1a] bg-[#0d0d0d] card-hover'
              }`}
            >
              {status !== 'locked' ? (
                <Link href={`/tracks/${trackId}/modules/${mod.id}`} className="block">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        backgroundColor: status === 'completed' ? '#22c55e22' : track.color + '22',
                        color: status === 'completed' ? '#22c55e' : track.color,
                      }}
                    >
                      {status === 'completed' ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{mod.description}</p>
                    </div>
                    <span className="text-gray-500 text-lg">
                      {status === 'completed' ? '✅' : '→'}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-[#111] text-gray-600">
                    🔒
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-500">{mod.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{mod.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
