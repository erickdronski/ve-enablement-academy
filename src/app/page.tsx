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
    { icon: '🔗', title: 'Share', desc: 'Post on LinkedIn' },
  ];

  const skills = ['ROI Modeling', 'Discovery Questions', '36 Capabilities', 'Maturity Scoring', 'Benefit Stories', 'Workshop Facilitation', 'Executive Deliverables', 'Product Mapping'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center py-16 md:py-24">
          <div className="inline-block mb-4">
            <span className="text-sm font-bold text-[#E8192C] tracking-widest uppercase">ivanti</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2 text-[#1A1F36]">
            VE Enablement
          </h1>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-[#E8192C] to-[#FF6B6B] bg-clip-text text-transparent">Academy</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Master Ivanti&apos;s Value Engineering Frameworks. Get Certified.</p>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal delay={200}>
        <div className="flex justify-center gap-8 md:gap-16 mb-16">
          {[{ n: '12', l: 'Modules' }, { n: '60', l: 'Quiz Questions' }, { n: '2', l: 'Certifications' }].map(s => (
            <div key={s.l} className="text-center">
              <span className="text-3xl font-black text-[#1A1F36]">{s.n}</span>
              <div className="text-sm text-gray-400">{s.l}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Tracks */}
      <ScrollReveal delay={300}>
        <h2 className="text-3xl font-bold text-center mb-2 text-[#1A1F36]">Two Frameworks. One Mission.</h2>
        <p className="text-center text-gray-500 mb-8">Choose your learning path or complete both to earn VE Master status.</p>
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {tracks.map(track => {
            const progress = mounted ? getTrackProgress(track.id, track.modules.length) : { percentage: 0, completed: 0, total: track.modules.length };
            return (
              <Link key={track.id} href={`/learn/${track.id}`}
                className="card-interactive block rounded-2xl border border-gray-200 p-8 bg-white hover:shadow-xl">
                <div className="text-5xl mb-4">{track.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-[#1A1F36]">{track.title}</h3>
                <p className="text-gray-500 mb-4">{track.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{track.modules.length} Modules</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">700 XP Total</span>
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
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {steps.map((s, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-bold text-[#1A1F36] mb-1">{s.title}</div>
              <div className="text-xs text-gray-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Skills */}
      <ScrollReveal delay={200}>
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A1F36]">Skills You&apos;ll Master</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skills.map(s => (
            <span key={s} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 bg-white hover:border-[#E8192C] hover:text-[#E8192C] transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </ScrollReveal>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-100">
        <span className="text-xs text-gray-400">Powered by <span className="font-bold text-[#E8192C]">ivanti</span> Value Engineering</span>
      </div>
    </div>
  );
}
