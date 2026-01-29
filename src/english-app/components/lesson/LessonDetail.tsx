import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { getLessonByDay } from '../../data/phrases';
import { useSpeechSynthesis } from '../../hooks/useSpeech';
import { Phrase } from '../../types';

export const LessonDetail: React.FC = () => {
  const { darkMode, selectedDay, progress, setView, completeDay, addMasteredPhrase, incrementListeningCount } = useAppStore();
  const { speak, isSpeaking, isSupported: isSpeechSupported } = useSpeechSynthesis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showJapanese, setShowJapanese] = useState(false);
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set());

  const lesson = selectedDay ? getLessonByDay(selectedDay) : null;

  if (!lesson) {
    return (
      <div className={`min-h-screen pb-20 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <p>Lesson not found</p>
      </div>
    );
  }

  const currentPhrase = lesson.phrases[currentIndex];
  const isLessonComplete = completedPhrases.size === lesson.phrases.length;

  const handleSpeak = (phrase: Phrase, rate: number = 0.9) => {
    if (isSpeechSupported) {
      speak(phrase.english, rate);
      incrementListeningCount();
    }
  };

  const handleNext = () => {
    if (!completedPhrases.has(currentPhrase.id)) {
      setCompletedPhrases(new Set([...completedPhrases, currentPhrase.id]));
    }
    setShowJapanese(false);

    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    setShowJapanese(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMaster = () => {
    addMasteredPhrase(currentPhrase.id);
    setCompletedPhrases(new Set([...completedPhrases, currentPhrase.id]));
    if (currentIndex < lesson.phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowJapanese(false);
    }
  };

  const handleCompleteLesson = () => {
    if (selectedDay) {
      completeDay(selectedDay);
    }
    setView('lesson');
  };

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        title={`Day ${lesson.day}: ${lesson.title}`}
        showBack
        onBack={() => setView('lesson')}
      />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Phrase {currentIndex + 1} of {lesson.phrases.length}
            </span>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {completedPhrases.size} completed
            </span>
          </div>
          <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / lesson.phrases.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Phrase Card */}
        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {/* English */}
          <div className="mb-6">
            <p className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentPhrase.english}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              /{currentPhrase.pronunciation}/
            </p>
          </div>

          {/* Japanese (Toggle) */}
          <div className="mb-6">
            {showJapanese ? (
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {currentPhrase.japanese}
              </p>
            ) : (
              <button
                onClick={() => setShowJapanese(true)}
                className={`text-sm px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Show Japanese
              </button>
            )}
          </div>

          {/* Audio Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSpeak(currentPhrase, 0.9)}
              disabled={isSpeaking}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${
                isSpeaking
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-medium transition-colors`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              {isSpeaking ? 'Playing...' : 'Listen'}
            </button>
            <button
              onClick={() => handleSpeak(currentPhrase, 0.6)}
              disabled={isSpeaking}
              className={`py-3 px-4 rounded-xl ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
            >
              <span className="text-sm">Slow</span>
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              currentIndex === 0
                ? darkMode
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === lesson.phrases.length - 1}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              currentIndex === lesson.phrases.length - 1
                ? darkMode
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next
          </button>
        </div>

        {/* Master Button */}
        <button
          onClick={handleMaster}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${
            progress.masteredPhrases.includes(currentPhrase.id)
              ? 'bg-green-500 text-white'
              : darkMode
                ? 'bg-green-800 hover:bg-green-700 text-white'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
          }`}
        >
          {progress.masteredPhrases.includes(currentPhrase.id) ? 'Mastered!' : 'Mark as Mastered'}
        </button>

        {/* Complete Lesson */}
        {isLessonComplete && (
          <div className="mt-6">
            <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
              <p className={`text-center font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                You've completed all phrases! Great job!
              </p>
            </div>
            <button
              onClick={handleCompleteLesson}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Complete Day {lesson.day}
            </button>
          </div>
        )}

        {/* Phrase Dots */}
        <div className="flex justify-center gap-1 mt-6 flex-wrap">
          {lesson.phrases.map((phrase, index) => (
            <button
              key={phrase.id}
              onClick={() => {
                setCurrentIndex(index);
                setShowJapanese(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500'
                  : completedPhrases.has(phrase.id)
                    ? 'bg-green-500'
                    : progress.masteredPhrases.includes(phrase.id)
                      ? 'bg-green-300'
                      : darkMode
                        ? 'bg-gray-600'
                        : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
