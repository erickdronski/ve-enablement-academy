'use client';
import { useState } from 'react';
import { QuizQuestion } from '@/data/tracks';
import { saveQuizScore } from '@/lib/store';

export default function QuizEngine({ questions, moduleId, trackId, onComplete }: {
  questions: QuizQuestion[]; moduleId: string; trackId: string; onComplete: (passed: boolean, score: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <button onClick={() => setStarted(true)} className="px-6 py-3 rounded-lg font-semibold text-black transition-all hover:scale-105" style={{ backgroundColor: '#00E6B9' }}>
        Start Quiz ({questions.length} questions)
      </button>
    );
  }

  const q = questions[currentIndex];
  const score = answers.reduce((s, a, i) => s + (a === questions[i].correctIndex ? 1 : 0), 0) + (isComplete ? 0 : 0);

  if (isComplete) {
    const finalScore = answers.reduce((s, a, i) => s + (a === questions[i].correctIndex ? 1 : 0), 0);
    const passed = finalScore >= Math.ceil(questions.length * 0.8);
    const stars = finalScore === questions.length ? '★★★' : passed ? '★★' : '★';
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{passed ? '🎉' : '📝'}</div>
        <div className="text-4xl font-bold mb-2">{stars}</div>
        <h3 className="text-2xl font-bold mb-2">{finalScore}/{questions.length} Correct</h3>
        <p className={`text-lg mb-6 ${passed ? 'text-green-400' : 'text-red-400'}`}>
          {passed ? 'You passed! Great job!' : 'Not quite — you need 80% to pass.'}
        </p>
        {passed ? (
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: '#00E6B920', color: '#00E6B9' }}>+25 XP earned</div>
        ) : (
          <button onClick={() => { setCurrentIndex(0); setSelectedAnswer(null); setAnswers([]); setIsComplete(false); }}
            className="px-6 py-3 rounded-lg font-semibold bg-[#222] hover:bg-[#333] transition-all">Retake Quiz</button>
        )}
      </div>
    );
  }

  const handleSelect = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    if (currentIndex + 1 >= questions.length) {
      const finalScore = newAnswers.reduce((s, a, i) => s + (a === questions[i].correctIndex ? 1 : 0), 0);
      saveQuizScore(trackId, moduleId, finalScore, questions.length);
      const passed = finalScore >= Math.ceil(questions.length * 0.8);
      onComplete(passed, finalScore);
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-400">Question {currentIndex + 1} of {questions.length}</span>
        <div className="flex gap-1 ml-auto">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < currentIndex ? 'bg-green-500' : i === currentIndex ? 'bg-[#00E6B9]' : 'bg-[#333]'}`} />
          ))}
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-4">{q.question}</h4>
      <div className="space-y-3 mb-4">
        {q.options.map((opt, i) => {
          let borderColor = '#222';
          let bg = 'bg-[#111]';
          if (selectedAnswer !== null) {
            if (i === q.correctIndex) { borderColor = '#22c55e'; bg = 'bg-green-500/10'; }
            else if (i === selectedAnswer) { borderColor = '#ef4444'; bg = 'bg-red-500/10'; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all ${bg} ${selectedAnswer === null ? 'hover:border-[#00E6B9] hover:bg-[#00E6B9]/5 cursor-pointer' : ''}`}
              style={{ borderColor }}>
              <span className="text-gray-400 mr-3">{String.fromCharCode(65 + i)}.</span>{opt}
              {selectedAnswer !== null && i === q.correctIndex && <span className="float-right text-green-400">✓</span>}
              {selectedAnswer !== null && i === selectedAnswer && i !== q.correctIndex && <span className="float-right text-red-400">✗</span>}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div className="mb-4 p-4 rounded-lg border border-[#333] bg-[#111]">
          <p className="text-sm text-gray-300">{q.explanation}</p>
        </div>
      )}
      {selectedAnswer !== null && (
        <button onClick={handleNext} className="px-6 py-2 rounded-lg font-semibold text-black" style={{ backgroundColor: '#00E6B9' }}>
          {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
