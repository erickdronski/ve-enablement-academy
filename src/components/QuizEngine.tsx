'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/data/tracks';
import { saveQuizScore } from '@/lib/store';

interface QuizEngineProps {
  questions: QuizQuestion[];
  trackId: string;
  moduleId: string;
  onComplete: (score: number, total: number) => void;
}

export default function QuizEngine({ questions, trackId, moduleId, onComplete }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const answered = selected !== null;
  const isCorrect = selected === q?.correctIndex;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore(s => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      const finalScore = score + (isCorrect ? 0 : 0); // score already updated
      saveQuizScore(trackId, moduleId, score, questions.length);
      setFinished(true);
      onComplete(score, questions.length);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  if (finished) {
    const passed = score >= Math.ceil(questions.length * 0.8);
    return (
      <div className="text-center py-12">
        {passed && (
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
        )}
        <h3 className="text-2xl font-bold mb-2">
          {passed ? 'Congratulations!' : 'Keep Practicing!'}
        </h3>
        <p className="text-lg text-gray-300 mb-2">
          You scored <span className="font-bold text-white">{score}</span> out of{' '}
          <span className="font-bold text-white">{questions.length}</span>
        </p>
        <p className={`text-sm font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
          {passed ? '✅ PASSED (80%+ required)' : '❌ FAILED — 80% required to pass'}
        </p>
        {passed && (
          <div className="mt-6 flex justify-center gap-2 text-4xl">
            {'🎊✨🏆✨🎊'.split('').map((e, i) => (
              <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
          Question {current + 1} of {questions.length}
        </h3>
        <span className="text-sm text-gray-500">{score} correct so far</span>
      </div>
      <p className="text-lg font-medium text-white mb-6">{q.question}</p>
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let classes = 'w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ';
          if (!answered) {
            classes += 'border-[#222] bg-[#111] hover:border-[#00E6B9] hover:bg-[#0a1a1a] cursor-pointer';
          } else if (idx === q.correctIndex) {
            classes += 'border-green-500 bg-green-500/10 text-green-300';
          } else if (idx === selected) {
            classes += 'border-red-500 bg-red-500/10 text-red-300';
          } else {
            classes += 'border-[#222] bg-[#111] opacity-50';
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={classes}>
              <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-4 p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-500/10 border border-green-500/30 text-green-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'}`}>
          <p className="font-semibold mb-1">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
          <p className="text-gray-300">{q.explanation}</p>
        </div>
      )}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-2.5 bg-[#00E6B9] text-black font-semibold rounded-lg hover:bg-[#00ccaa] transition-colors"
        >
          {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
