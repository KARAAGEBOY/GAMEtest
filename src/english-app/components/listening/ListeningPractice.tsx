import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { allPhrases } from '../../data/phrases';
import { useSpeechSynthesis } from '../../hooks/useSpeech';
import { Phrase } from '../../types';

export const ListeningPractice: React.FC = () => {
  const { darkMode, progress, incrementListeningCount, setView } = useAppStore();
  const { speak, isSpeaking, isSupported } = useSpeechSynthesis();

  const [currentPhrases, setCurrentPhrases] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [listenCount, setListenCount] = useState(0);

  useEffect(() => {
    const availableDays = [...progress.completedDays, progress.currentDay];
    const phrases = allPhrases.filter(p => availableDays.includes(p.day));
    const shuffled = phrases.sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentPhrases(shuffled);
  }, [progress.completedDays, progress.currentDay]);

  const currentPhrase = currentPhrases[currentIndex];

  const handleListen = (rate: number = 0.9) => {
    if (currentPhrase && isSupported) {
      speak(currentPhrase.english, rate);
      setListenCount(c => c + 1);
      incrementListeningCount();
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setListenCount(0);
    if (currentIndex < currentPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const shuffled = currentPhrases.sort(() => Math.random() - 0.5);
      setCurrentPhrases([...shuffled]);
      setCurrentIndex(0);
    }
  };

  if (!currentPhrase) {
    return (
      <div className={`min-h-screen pb-20 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className="mb-4">No phrases available for practice.</p>
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

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="Listening Practice" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Browser Support Warning */}
        {!isSupported && (
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
              Speech synthesis is not supported in this browser.
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="flex justify-between items-center mb-6">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Phrase {currentIndex + 1} of {currentPhrases.length}
          </span>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Listened: {listenCount}x
          </span>
        </div>

        {/* Instructions */}
        <div className={`rounded-2xl p-6 mb-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Listen and try to understand
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentPhrase.japanese}
          </p>
        </div>

        {/* Audio Controls */}
        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {/* Main Listen Button */}
          <button
            onClick={() => handleListen(0.9)}
            disabled={isSpeaking}
            className={`w-full py-6 mb-4 rounded-2xl flex flex-col items-center justify-center gap-2 ${
              isSpeaking
                ? 'bg-green-300'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
          >
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-lg">
              {isSpeaking ? 'Playing...' : 'Listen'}
            </span>
          </button>

          {/* Speed Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => handleListen(0.6)}
              disabled={isSpeaking}
              className={`flex-1 py-3 rounded-xl font-medium ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } transition-colors`}
            >
              Slow (0.6x)
            </button>
            <button
              onClick={() => handleListen(1.2)}
              disabled={isSpeaking}
              className={`flex-1 py-3 rounded-xl font-medium ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } transition-colors`}
            >
              Fast (1.2x)
            </button>
          </div>
        </div>

        {/* Show Answer */}
        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {showAnswer ? (
            <div>
              <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentPhrase.english}
              </p>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                /{currentPhrase.pronunciation}/
              </p>
              <button
                onClick={() => handleListen(0.9)}
                disabled={isSpeaking}
                className={`w-full py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition-colors`}
              >
                Listen Again
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className={`w-full py-4 rounded-xl font-medium ${
                darkMode ? 'bg-blue-900/50 hover:bg-blue-900/70 text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              } transition-colors`}
            >
              Show Answer
            </button>
          )}
        </div>

        {/* Navigation */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Next Phrase
        </button>

        {/* Tips */}
        <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Listening Tips
          </h4>
          <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>- Listen at least 3 times before checking the answer</li>
            <li>- Try to repeat what you hear in your head</li>
            <li>- Focus on the rhythm and intonation</li>
            <li>- Use slow speed for difficult phrases</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
