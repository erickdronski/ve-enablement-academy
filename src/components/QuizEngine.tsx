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
      <button onClick={() => setStarted(true)} className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 bg-[#E8192C] hover:bg-[#C41525] shadow-sm">
        Start Quiz ({questions.length} questions)
      </button>
    );
  }

  const q = questions[currentIndex];

  if (isComplete) {
    const finalScore = answers.reduce((s, a, i) => s + (a === questions[i].correctIndex ? 1 : 0), 0);
    const passed = finalScore >= Math.ceil(questions.length * 0.8);
    const stars = finalScore === questions.length ? '★★★' : passed ? '★★' : '★';
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{passed ? '🎉' : '📝'}</div>
        <div className="text-4xl font-bold mb-2 text-[#FFAA00]">{stars}</div>
        <h3 className="text-2xl font-bold mb-2 text-[#1A1F36]">{finalScore}/{questions.length} Correct</h3>
        <p className={`text-lg mb-6 ${passed ? 'text-green-600' : 'text-[#E8192C]'}`}>
          {passed ? 'You passed! Great job!' : 'Not quite — you need 80% to pass.'}
        </p>
        {passed ? (
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-200">+25 XP earned</div>
        ) : (
          <button onClick={() => { setCurrentIndex(0); setSelectedAnswer(null); setAnswers([]); setIsComplete(false); }}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-[#1A1F36] transition-all">Retake Quiz</button>
        )}
      </div>
    );
  }

  const handleSelect = (idx: number) => { if (selectedAnswer !== null) return; setSelectedAnswer(idx); };

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
    } else { setCurrentIndex(currentIndex + 1); }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-400">Question {currentIndex + 1} of {questions.length}</span>
        <div className="flex gap-1 ml-auto">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < currentIndex ? 'bg-green-500' : i === currentIndex ? 'bg-[#E8192C]' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-4 text-[#1A1F36]">{q.question}</h4>
      <div className="space-y-3 mb-4">
        {q.options.map((opt, i) => {
          let borderColor = '#E5E7EB';
          let bg = 'bg-white';
          if (selectedAnswer !== null) {
            if (i === q.correctIndex) { borderColor = '#22c55e'; bg = 'bg-green-50'; }
            else if (i === selectedAnswer) { borderColor = '#ef4444'; bg = 'bg-red-50'; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bg} ${selectedAnswer === null ? 'hover:border-[#E8192C] hover:bg-red-50/30 cursor-pointer' : ''}`}
              style={{ borderColor }}>
              <span className="text-gray-400 mr-3 font-semibold">{String.fromCharCode(65 + i)}.</span>
              <span className="text-[#1A1F36]">{opt}</span>
              {selectedAnswer !== null && i === q.correctIndex && <span className="float-right text-green-600 font-bold">✓</span>}
              {selectedAnswer !== null && i === selectedAnswer && i !== q.correctIndex && <span className="float-right text-red-500 font-bold">✗</span>}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div className="mb-4 p-4 rounded-lg border border-blue-100 bg-blue-50">
          <p className="text-sm text-blue-800">{q.explanation}</p>
        </div>
      )}
      {selectedAnswer !== null && (
        <button onClick={handleNext} className="px-6 py-2 rounded-lg font-semibold text-white bg-[#E8192C] hover:bg-[#C41525] transition-all shadow-sm">
          {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}
