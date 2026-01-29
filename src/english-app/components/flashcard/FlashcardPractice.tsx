import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { allPhrases } from '../../data/phrases';
import { useSpeechSynthesis } from '../../hooks/useSpeech';
import { Phrase } from '../../types';

export const FlashcardPractice: React.FC = () => {
  const { darkMode, progress, addMasteredPhrase, addReviewPhrase, incrementFlashcardReviews, setView } = useAppStore();
  const { speak, isSupported } = useSpeechSynthesis();

  const [cards, setCards] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const availableDays = [...progress.completedDays, progress.currentDay];
    const phrases = allPhrases.filter(p => availableDays.includes(p.day));
    // Prioritize review phrases
    const reviewPhrases = phrases.filter(p => progress.reviewPhrases.includes(p.id));
    const otherPhrases = phrases.filter(p => !progress.reviewPhrases.includes(p.id) && !progress.masteredPhrases.includes(p.id));
    const combined = [...reviewPhrases, ...otherPhrases.sort(() => Math.random() - 0.5)].slice(0, 20);
    setCards(combined);
  }, [progress.completedDays, progress.currentDay, progress.reviewPhrases, progress.masteredPhrases]);

  const currentCard = cards[currentIndex];
  const remaining = cards.length - currentIndex;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentCard && isSupported) {
      speak(currentCard.english, 0.9);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentCard) return;

    setAnimationClass(direction === 'right' ? 'slide-right' : 'slide-left');
    incrementFlashcardReviews();

    if (direction === 'right') {
      addMasteredPhrase(currentCard.id);
      setMasteredCount(c => c + 1);
    } else {
      addReviewPhrase(currentCard.id);
      setReviewCount(c => c + 1);
    }

    setTimeout(() => {
      setAnimationClass('');
      setIsFlipped(false);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };

  const handleRestart = () => {
    const availableDays = [...progress.completedDays, progress.currentDay];
    const phrases = allPhrases.filter(p => availableDays.includes(p.day));
    const shuffled = phrases.sort(() => Math.random() - 0.5).slice(0, 20);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCount(0);
    setReviewCount(0);
  };

  if (cards.length === 0) {
    return (
      <div className={`min-h-screen pb-20 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="mb-4">No flashcards available.</p>
          <button
            onClick={() => setView('lesson')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Start a Lesson First
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= cards.length) {
    return (
      <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header title="Flashcards" showBack />
        <main className="max-w-lg mx-auto px-4 py-6">
          <div className={`rounded-2xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Session Complete!
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <p className="text-3xl font-bold text-green-500">{masteredCount}</p>
                <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Mastered</p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                <p className="text-3xl font-bold text-orange-500">{reviewCount}</p>
                <p className={`text-sm ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Need Review</p>
              </div>
            </div>
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Practice Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="Flashcards" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <span className="text-green-500 font-medium">{masteredCount} mastered</span>
            <span className="text-orange-500 font-medium">{reviewCount} to review</span>
          </div>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {remaining} left
          </span>
        </div>

        {/* Card */}
        <div className="perspective-1000 mb-6">
          <div
            onClick={handleFlip}
            className={`relative w-full h-64 cursor-pointer transition-all duration-300 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            } ${animationClass}`}
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : '',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <p className={`text-lg mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Japanese
              </p>
              <p className={`text-2xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentCard.japanese}
              </p>
              <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Tap to flip
              </p>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center ${
                darkMode ? 'bg-blue-900' : 'bg-blue-500'
              } text-white shadow-lg`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <p className="text-lg mb-2 opacity-80">English</p>
              <p className="text-2xl font-bold text-center mb-2">
                {currentCard.english}
              </p>
              <p className="text-sm opacity-70">
                /{currentCard.pronunciation}/
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className={`text-center text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Did you know this phrase?
        </p>

        {/* Swipe Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleSwipe('left')}
            className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              darkMode ? 'bg-orange-900/50 hover:bg-orange-900/70 text-orange-400' : 'bg-orange-100 hover:bg-orange-200 text-orange-600'
            } transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need Review
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
              darkMode ? 'bg-green-900/50 hover:bg-green-900/70 text-green-400' : 'bg-green-100 hover:bg-green-200 text-green-600'
            } transition-colors`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Got It!
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </main>

      <style>{`
        .slide-right {
          animation: slideRight 0.3s ease-out forwards;
        }
        .slide-left {
          animation: slideLeft 0.3s ease-out forwards;
        }
        @keyframes slideRight {
          to {
            transform: translateX(150%) rotate(20deg);
            opacity: 0;
          }
        }
        @keyframes slideLeft {
          to {
            transform: translateX(-150%) rotate(-20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
