'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tracks } from '@/data/tracks';
import { getTrackProgress } from '@/lib/store';
import ScrollReveal from '@/components/ScrollReveal';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const steps = [
    { icon: '📖', title: 'Learn', desc: 'Study each module' },
    { icon: '✅', title: 'Quiz', desc: 'Test your knowledge' },
    { icon: '🏆', title: 'Certify', desc: 'Earn your badge' },
    { icon: '🔗', title: 'Share', desc: 'Show the world' },
  ];

  const skills = ['ROI Modeling', 'Discovery Questions', '36 Capabilities', 'Maturity Scoring', 'Benefit Stories', 'Workshop Facilitation', 'Executive Deliverables', 'Product Mapping'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center py-16 md:py-24">
          <h1 className="text-5xl md:text-7xl font-black mb-2">
            <span className="bg-gradient-to-r from-[#00E6B9] to-[#06b6d4] bg-clip-text text-transparent">VE Enablement</span>
          </h1>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">Academy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Master Ivanti&apos;s Value Engineering Frameworks. Get Certified.</p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={200}>
        <div className="flex justify-center gap-8 mb-16 text-gray-400">
          <div className="text-center"><span className="text-2xl font-bold text-white">12</span><br />Modules</div>
          <div className="text-center"><span className="text-2xl font-bold text-white">60</span><br />Quiz Questions</div>
          <div className="text-center"><span className="text-2xl font-bold text-white">2</span><br />Certifications</div>
        </div>
      </ScrollReveal>

      {/* Tracks */}
      <ScrollReveal delay={300}>
        <h2 className="text-3xl font-bold text-center mb-8">Two Frameworks. One Mission.</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {tracks.map(track => {
            const progress = mounted ? getTrackProgress(track.id, track.modules.length) : { percentage: 0, completed: 0, total: track.modules.length };
            return (
              <Link key={track.id} href={`/learn/${track.id}`} className="card-interactive block rounded-xl border border-[#222] p-8 hover:border-opacity-50"
                style={{ borderColor: track.color + '40' }}>
                <div className="text-5xl mb-4">{track.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{track.title}</h3>
                <p className="text-gray-400 mb-4">{track.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full border border-[#333]">{track.modules.length} Modules</span>
                  <span className="text-xs px-3 py-1 rounded-full border border-[#333]">200 XP + Capstone</span>
                </div>
                <ProgressBar percentage={progress.percentage} color={track.color} />
                <div className="mt-4 text-sm font-semibold" style={{ color: track.color }}>
                  {progress.percentage > 0 ? `Continue → ${progress.percentage}%` : 'Start Learning →'}
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>

      {/* How It Works */}
      <ScrollReveal delay={200}>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {steps.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-xl border border-[#222] bg-[#111]">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-bold mb-1">{s.title}</div>
              <div className="text-xs text-gray-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Skills */}
      <ScrollReveal delay={200}>
        <h2 className="text-3xl font-bold text-center mb-8">Skills You&apos;ll Master</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skills.map(s => (
            <span key={s} className="px-4 py-2 rounded-full border border-[#333] text-sm text-gray-300 bg-[#111] hover:border-[#00E6B9] hover:text-[#00E6B9] transition-colors">{s}</span>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
