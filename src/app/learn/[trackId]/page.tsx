'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTrackById } from '@/data/tracks';
import { isModuleCompleted, getTrackProgress } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';
import ScrollReveal from '@/components/ScrollReveal';

export default function TrackPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const track = getTrackById(trackId);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!track) return <div className="text-center py-20 text-gray-400">Track not found</div>;

  const progress = mounted ? getTrackProgress(track.id, track.modules.length) : { percentage: 0, completed: 0, total: track.modules.length };

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-gray-400 hover:text-[#1A1F36] mb-6 inline-block">← Back to Home</Link>

      <ScrollReveal>
        <div className="mb-8">
          <div className="text-6xl mb-4">{track.icon}</div>
          <h1 className="text-4xl font-black mb-2 text-[#1A1F36]">{track.title}</h1>
          <p className="text-gray-500 text-lg mb-4">{track.description}</p>
          <ProgressBar percentage={progress.percentage} color={track.color} showLabel />
        </div>
      </ScrollReveal>

      <div className="space-y-4 mb-12">
        {track.modules.map((mod, i) => {
          const completed = mounted && isModuleCompleted(track.id, mod.id);
          const prevOk = i === 0 || (mounted && isModuleCompleted(track.id, track.modules[i - 1].id));
          const locked = !prevOk && !completed;

          return (
            <ScrollReveal key={mod.id} delay={i * 100}>
              {locked ? (
                <div className="rounded-2xl border border-gray-100 p-6 opacity-40 bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400">{i + 1}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-400">{mod.title}</h3>
                      <p className="text-sm text-gray-300">{mod.description}</p>
                    </div>
                    <span className="text-gray-300">🔒</span>
                  </div>
                </div>
              ) : (
                <Link href={`/learn/${track.id}/${mod.id}`}
                  className="card-interactive block rounded-2xl border border-gray-200 p-6 bg-white"
                  style={completed ? { borderColor: '#22c55e40' } : {}}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: completed ? '#dcfce7' : track.color + '15', color: completed ? '#16a34a' : track.color }}>{i + 1}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1A1F36]">{mod.title}</h3>
                      <p className="text-sm text-gray-500">{mod.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">{mod.xpReward} XP</span>
                      {completed ? <span className="text-green-500 text-xl">✓</span> : <span style={{ color: track.color }} className="font-bold">→</span>}
                    </div>
                  </div>
                </Link>
              )}
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={600}>
        <div className={`rounded-2xl border p-8 text-center ${progress.percentage === 100 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-xl font-bold mb-2 text-[#1A1F36]">{track.certificationTitle}</h3>
          {progress.percentage === 100 ? (
            <Link href={`/certificate/${track.id}`} className="inline-block mt-2 px-6 py-2 rounded-lg font-semibold text-white bg-[#E8192C] hover:bg-[#C41525] transition-all shadow-sm">
              View Certificate →
            </Link>
          ) : (
            <p className="text-sm text-gray-500">Complete all 6 modules to unlock your certification</p>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
