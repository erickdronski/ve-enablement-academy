'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTrackById, getModuleById } from '@/data/tracks';
import { isModuleCompleted, completeModule, getQuizScore } from '@/lib/store';
import QuizEngine from '@/components/QuizEngine';

export default function ModulePage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const moduleId = params.moduleId as string;
  const track = getTrackById(trackId);
  const mod = getModuleById(trackId, moduleId);
  const [quizPassed, setQuizPassed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setTick(1);
    if (mod) {
      const existing = getQuizScore(trackId, moduleId);
      if (existing && existing.score >= Math.ceil(existing.total * 0.8)) setQuizPassed(true);
      setCompleted(isModuleCompleted(trackId, moduleId));
    }
  }, [trackId, moduleId, mod]);

  if (!track || !mod) {
    return (
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-gray-400">Module not found.</p>
        <Link href="/" className="text-[#00E6B9] hover:underline text-sm mt-4 inline-block">← Back to Home</Link>
      </div>
    );
  }

  // Find next module
  const currentIdx = track.modules.findIndex(m => m.id === moduleId);
  const nextModule = currentIdx < track.modules.length - 1 ? track.modules[currentIdx + 1] : null;

  function handleQuizComplete(score: number, total: number) {
    if (score >= Math.ceil(total * 0.8)) setQuizPassed(true);
  }

  function handleMarkComplete() {
    completeModule(trackId, moduleId);
    setCompleted(true);
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href={`/tracks/${trackId}`} className="hover:text-[#00E6B9] transition-colors">
          {track.icon} {track.title}
        </Link>
        <span>›</span>
        <span className="text-gray-300">{mod.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-8">{mod.title}</h1>

          <div className="space-y-6">
            {mod.content.map((para, idx) => {
              const isCallout = (idx + 1) % 3 === 0;
              return isCallout ? (
                <div key={idx} className="border-l-4 border-[#00E6B9] pl-4 py-2 bg-[#00E6B9]/5 rounded-r-lg">
                  <p className="text-gray-300 leading-relaxed">{para}</p>
                </div>
              ) : (
                <p key={idx} className="text-gray-300 leading-relaxed">{para}</p>
              );
            })}
          </div>

          {/* Quiz section */}
          <div className="mt-16 border-t border-[#1a1a1a] pt-8">
            <h2 className="text-2xl font-bold mb-6">📝 Knowledge Check</h2>
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
              <QuizEngine
                questions={mod.quiz}
                trackId={trackId}
                moduleId={moduleId}
                onComplete={handleQuizComplete}
              />
            </div>
          </div>

          {/* Post-quiz actions */}
          {quizPassed && !completed && (
            <div className="mt-8 text-center">
              <button
                onClick={handleMarkComplete}
                className="px-8 py-3 bg-[#00E6B9] text-black font-bold rounded-lg hover:bg-[#00ccaa] transition-colors text-lg"
              >
                ✅ Mark Module Complete
              </button>
            </div>
          )}

          {completed && (
            <div className="mt-8 text-center space-y-4">
              <p className="text-green-400 font-semibold text-lg">✅ Module Completed!</p>
              {nextModule ? (
                <Link
                  href={`/tracks/${trackId}/modules/${nextModule.id}`}
                  className="inline-block px-6 py-2.5 bg-[#00E6B9] text-black font-semibold rounded-lg hover:bg-[#00ccaa] transition-colors"
                >
                  Next Module: {nextModule.title} →
                </Link>
              ) : (
                <Link
                  href={`/tracks/${trackId}`}
                  className="inline-block px-6 py-2.5 bg-[#00E6B9]/20 text-[#00E6B9] font-semibold rounded-lg hover:bg-[#00E6B9]/30 transition-colors"
                >
                  🎉 Track Complete! View Track →
                </Link>
              )}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <Link href={`/tracks/${trackId}`} className="text-sm text-gray-500 hover:text-[#00E6B9] transition-colors">
              ← Back to {track.title}
            </Link>
          </div>
        </div>

        {/* Key takeaways sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#00E6B9] uppercase tracking-wide mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              {mod.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-[#00E6B9] mt-0.5 flex-shrink-0">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
