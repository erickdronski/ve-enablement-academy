'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTrackById } from '@/data/tracks';
import { getProfile, getTrackProgress, getBadgeDate } from '@/lib/store';
import ProgressBar from '@/components/ProgressBar';

export default function CertificatePage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const track = getTrackById(trackId);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!track) return <div className="text-center py-20 text-gray-400">Track not found</div>;
  if (!mounted) return <div className="max-w-3xl mx-auto py-8"><div className="h-96 animate-pulse bg-gray-100 rounded-xl" /></div>;

  const progress = getTrackProgress(track.id, track.modules.length);
  const isComplete = progress.percentage === 100;
  const badgeId = trackId === 'roi-value' ? 'roi-certified' : 'capability-certified';
  const earnedDate = getBadgeDate(badgeId);
  const userName = getProfile().name || 'Your Name';

  if (!isComplete) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-3xl font-bold mb-4 text-[#1A1F36]">Certificate Locked</h1>
        <p className="text-gray-500 mb-6">Complete all 6 modules in {track.title} to unlock your certification.</p>
        <div className="max-w-md mx-auto mb-6"><ProgressBar percentage={progress.percentage} color={track.color} showLabel /></div>
        <Link href={`/learn/${trackId}`} className="inline-block px-6 py-3 rounded-lg font-semibold border border-gray-300 text-[#1A1F36] hover:bg-gray-50 transition-colors">
          Continue Learning →
        </Link>
      </div>
    );
  }

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ve-enablement-academy.vercel.app')}&title=${encodeURIComponent(`I earned my ${track.certificationTitle} from Ivanti's VE Enablement Academy!`)}`;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="no-print mb-4">
        <Link href={`/learn/${trackId}`} className="text-sm text-gray-400 hover:text-[#1A1F36]">← Back to {track.title}</Link>
      </div>

      <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl p-12 text-center mb-8" style={{ borderColor: track.color + '40' }}>
        <div className="text-sm font-bold text-[#E8192C] tracking-widest uppercase mb-2">ivanti</div>
        <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-8">Certificate of Achievement</div>
        <div className="text-6xl mb-6">{track.icon}</div>
        <h1 className="text-3xl font-black mb-2" style={{ color: track.color }}>{track.certificationTitle}</h1>
        <div className="h-px w-40 mx-auto my-6 bg-gray-200" />
        <p className="text-gray-400 mb-2">Awarded to</p>
        <h2 className="text-2xl font-bold mb-6 text-[#1A1F36]">{userName}</h2>
        <p className="text-gray-500 text-sm mb-2">
          For successfully completing all 6 modules in the {track.title} track,
          demonstrating proficiency in Ivanti Value Engineering frameworks.
        </p>
        {earnedDate && (
          <p className="text-sm text-gray-400 mt-4">{new Date(earnedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        )}
        <p className="text-xs text-gray-300 mt-6">Issued by Ivanti VE Enablement Academy</p>
      </div>

      <div className="no-print flex flex-wrap justify-center gap-4">
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-semibold bg-[#0077B5] text-white hover:scale-105 transition-transform shadow-sm">
          Share on LinkedIn 🔗
        </a>
        <button onClick={() => window.print()}
          className="px-6 py-3 rounded-lg font-semibold border border-gray-300 text-[#1A1F36] hover:bg-gray-50 transition-colors">
          Print / Save as PDF 📄
        </button>
      </div>
    </div>
  );
}
