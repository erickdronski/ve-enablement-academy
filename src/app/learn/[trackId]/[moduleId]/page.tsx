'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTrackById, getModuleById } from '@/data/tracks';
import { completeModule, isModuleCompleted, earnBadge, getTrackProgress } from '@/lib/store';
import ScrollReveal from '@/components/ScrollReveal';
import QuizEngine from '@/components/QuizEngine';
import FlashcardDeck from '@/components/FlashcardDeck';

export default function ModulePage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const moduleId = params.moduleId as string;
  const track = getTrackById(trackId);
  const mod = getModuleById(trackId, moduleId);
  const [quizPassed, setQuizPassed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isModuleCompleted(trackId, moduleId)) { setCompleted(true); setQuizPassed(true); }
  }, [trackId, moduleId]);

  const handleQuizComplete = useCallback((passed: boolean) => {
    if (passed) setQuizPassed(true);
  }, []);

  const handleMarkComplete = useCallback(() => {
    completeModule(trackId, moduleId);
    setCompleted(true);
    const progress = getTrackProgress(trackId, track?.modules.length || 6);
    if (progress.percentage === 100) {
      const badgeId = trackId === 'roi-value' ? 'roi-certified' : 'capability-certified';
      earnBadge(badgeId);
      const otherTrack = trackId === 'roi-value' ? 'capability-maturity' : 'roi-value';
      const otherProgress = getTrackProgress(otherTrack, 6);
      if (otherProgress.percentage === 100) earnBadge('ve-master');
    }
  }, [trackId, moduleId, track]);

  if (!track || !mod) return <div className="text-center py-20 text-gray-400">Module not found</div>;

  const modIndex = track.modules.findIndex(m => m.id === moduleId);
  const nextModule = modIndex < track.modules.length - 1 ? track.modules[modIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1A1F36]">Home</Link><span>/</span>
        <Link href={`/learn/${trackId}`} className="hover:text-[#1A1F36]">{track.title}</Link><span>/</span>
        <span className="text-[#1A1F36]">{mod.title}</span>
      </div>

      <ScrollReveal>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-[#1A1F36]">{mod.title}</h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: track.color + '15', color: track.color }}>{mod.xpReward} XP</span>
          </div>
          <div className="h-1 w-20 rounded-full" style={{ backgroundColor: track.color }} />
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-[1fr_320px] gap-8 mb-12">
        <div className="space-y-4">
          {mod.content.map((p, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              {i % 3 === 2 ? (
                <div className="border-l-4 pl-4 py-3 rounded-r-lg bg-gray-50" style={{ borderColor: track.color }}>
                  <p className="text-gray-700 leading-relaxed">{p}</p>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">{p}</p>
              )}
            </ScrollReveal>
          ))}
        </div>
        <div className="md:sticky md:top-24 self-start">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="font-bold mb-3 text-[#1A1F36] flex items-center gap-2">💡 Key Takeaways</h4>
            <ul className="space-y-2">
              {mod.keyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5" style={{ color: track.color }}>✓</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {mod.flashcards.length > 0 && (
        <ScrollReveal>
          <div className="mb-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-[#1A1F36]">📝 Practice with Flashcards</h3>
            <FlashcardDeck flashcards={mod.flashcards} />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <div className="mb-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-[#1A1F36]">🧠 Test Your Knowledge</h3>
          {mounted && <QuizEngine questions={mod.quiz} moduleId={moduleId} trackId={trackId} onComplete={handleQuizComplete} />}
        </div>
      </ScrollReveal>

      {quizPassed && !completed && (
        <ScrollReveal>
          <div className="text-center py-8 rounded-2xl border-2 border-green-200 bg-green-50 mb-8">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Quiz Passed!</h3>
            <button onClick={handleMarkComplete} className="px-8 py-3 rounded-lg font-bold text-white bg-[#E8192C] hover:bg-[#C41525] transition-all shadow-sm hover:scale-105">
              Mark Module Complete ✓
            </button>
          </div>
        </ScrollReveal>
      )}

      {completed && (
        <div className="text-center py-8 rounded-2xl border-2 border-green-200 bg-green-50 mb-8">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-xl font-bold text-green-700 mb-4">Module Complete!</h3>
          {nextModule ? (
            <Link href={`/learn/${trackId}/${nextModule.id}`} className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#E8192C] hover:bg-[#C41525] transition-all shadow-sm">
              Next Module: {nextModule.title} →
            </Link>
          ) : (
            <Link href={`/certificate/${trackId}`} className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-[#FFAA00] hover:bg-[#E69900] transition-all shadow-sm">
              View Your Certificate 🏆
            </Link>
          )}
        </div>
      )}

      <div className="flex justify-between py-4 border-t border-gray-100 mt-8">
        <Link href={`/learn/${trackId}`} className="text-sm text-gray-400 hover:text-[#1A1F36]">← Back to {track.title}</Link>
      </div>
    </div>
  );
}
