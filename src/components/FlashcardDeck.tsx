'use client';
import { useState } from 'react';
import { Flashcard } from '@/data/tracks';

export default function FlashcardDeck({ flashcards }: { flashcards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knewIt, setKnewIt] = useState(0);
  const [done, setDone] = useState(false);

  if (flashcards.length === 0) return null;

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🧠</div>
        <h4 className="text-xl font-bold mb-2">Flashcards Complete!</h4>
        <p className="text-gray-400">You knew {knewIt} out of {flashcards.length} cards</p>
        <button onClick={() => { setCurrentIndex(0); setIsFlipped(false); setKnewIt(0); setDone(false); }}
          className="mt-4 px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] transition-all text-sm">Practice Again</button>
      </div>
    );
  }

  const card = flashcards[currentIndex];
  const advance = (knew: boolean) => {
    if (knew) setKnewIt(k => k + 1);
    setIsFlipped(false);
    if (currentIndex + 1 >= flashcards.length) setDone(true);
    else setTimeout(() => setCurrentIndex(i => i + 1), 200);
  };

  return (
    <div>
      <div className="text-sm text-gray-400 mb-3">Card {currentIndex + 1} of {flashcards.length}</div>
      <div className="cursor-pointer mb-4" onClick={() => setIsFlipped(!isFlipped)} style={{ perspective: '1000px' }}>
        <div className={`relative w-full min-h-[200px] transition-transform duration-500`} style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : '' }}>
          <div className="absolute inset-0 rounded-xl border border-[#333] bg-[#111] p-6 flex flex-col justify-center items-center" style={{ backfaceVisibility: 'hidden' }}>
            <span className="text-xs text-gray-500 mb-2">{card.category}</span>
            <p className="text-lg font-semibold text-center">{card.front}</p>
            <span className="text-xs text-gray-500 mt-4">Click to flip</span>
          </div>
          <div className="absolute inset-0 rounded-xl border border-[#00E6B9]/30 bg-[#0a1a15] p-6 flex flex-col justify-center items-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className="text-lg text-center" style={{ color: '#00E6B9' }}>{card.back}</p>
          </div>
        </div>
      </div>
      {isFlipped && (
        <div className="flex gap-3 justify-center">
          <button onClick={() => advance(true)} className="px-5 py-2 rounded-lg bg-green-600/20 border border-green-600/40 text-green-400 hover:bg-green-600/30 transition-all">✓ Got It</button>
          <button onClick={() => advance(false)} className="px-5 py-2 rounded-lg bg-red-600/20 border border-red-600/40 text-red-400 hover:bg-red-600/30 transition-all">✗ Review</button>
        </div>
      )}
    </div>
  );
}
