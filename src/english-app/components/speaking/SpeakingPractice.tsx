import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { allPhrases } from '../../data/phrases';
import { useSpeechSynthesis, useSpeechRecognition, useSpeechEvaluation } from '../../hooks/useSpeech';
import { Phrase, SpeechResult } from '../../types';

export const SpeakingPractice: React.FC = () => {
  const { darkMode, progress, incrementSpeakingAttempts, addMasteredPhrase, setView } = useAppStore();
  const { speak, isSpeaking, isSupported: isSynthesisSupported } = useSpeechSynthesis();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: isRecognitionSupported } = useSpeechRecognition();
  const { evaluate } = useSpeechEvaluation();

  const [currentPhrases, setCurrentPhrases] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<SpeechResult | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const availableSessions = [...progress.completedSessions, progress.currentSession];
    const phrases = allPhrases.filter(p => availableSessions.includes(p.session));
    const shuffled = phrases.sort(() => Math.random() - 0.5).slice(0, 10);
    setCurrentPhrases(shuffled);
  }, [progress.completedSessions, progress.currentSession]);

  const currentPhrase = currentPhrases[currentIndex];

  const handleListen = () => {
    if (currentPhrase && isSynthesisSupported) {
      speak(currentPhrase.english, 0.9);
    }
  };

  const handleStartSpeaking = () => {
    resetTranscript();
    setResult(null);
    startListening();
  };

  const handleStopSpeaking = () => {
    stopListening();
  };

  useEffect(() => {
    if (transcript && !isListening && currentPhrase) {
      const evalResult = evaluate(transcript, currentPhrase.english);
      setResult(evalResult);
      setAttempts(a => a + 1);
      incrementSpeakingAttempts();

      if (evalResult.isCorrect && evalResult.similarity >= 85) {
        addMasteredPhrase(currentPhrase.id);
      }
    }
  }, [transcript, isListening, currentPhrase, evaluate, incrementSpeakingAttempts, addMasteredPhrase]);

  const handleNext = () => {
    setResult(null);
    resetTranscript();
    if (currentIndex < currentPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const shuffled = currentPhrases.sort(() => Math.random() - 0.5);
      setCurrentPhrases([...shuffled]);
      setCurrentIndex(0);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    resetTranscript();
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
            Start a Session First
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="Speaking Practice" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        {!isRecognitionSupported && (
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
              Speech recognition is not supported in this browser. Try Chrome for the best experience.
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Phrase {currentIndex + 1} of {currentPhrases.length}
          </span>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Attempts: {attempts}
          </span>
        </div>

        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentPhrase.english}
          </p>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            /{currentPhrase.pronunciation}/
          </p>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentPhrase.japanese}
          </p>
        </div>

        <button
          onClick={handleListen}
          disabled={isSpeaking}
          className={`w-full py-3 mb-6 rounded-xl flex items-center justify-center gap-2 ${
            isSpeaking ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-medium transition-colors`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" clipRule="evenodd" />
          </svg>
          {isSpeaking ? 'Playing...' : 'Listen First'}
        </button>

        {isRecognitionSupported && (
          <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Turn!
            </h3>
            <div className="flex justify-center mb-4">
              <button
                onMouseDown={handleStartSpeaking}
                onMouseUp={handleStopSpeaking}
                onTouchStart={handleStartSpeaking}
                onTouchEnd={handleStopSpeaking}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 scale-110 animate-pulse'
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <svg className={`w-10 h-10 ${isListening ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isListening ? 'Listening... Release to check' : 'Press and hold to speak'}
            </p>
            {transcript && (
              <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>You said:</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{transcript}</p>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className={`rounded-2xl p-6 mb-6 ${
            result.isCorrect
              ? darkMode ? 'bg-green-900/30' : 'bg-green-50'
              : darkMode ? 'bg-red-900/30' : 'bg-red-50'
          }`}>
            <div className="text-center mb-4">
              <span className="text-4xl">
                {result.similarity >= 85 ? '🎉' : result.isCorrect ? '👍' : '💪'}
              </span>
            </div>
            <div className="text-center mb-4">
              <p className={`text-2xl font-bold ${
                result.isCorrect
                  ? darkMode ? 'text-green-400' : 'text-green-600'
                  : darkMode ? 'text-red-400' : 'text-red-600'
              }`}>
                {result.similarity}% Match
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {result.similarity >= 85 ? 'Excellent!' : result.isCorrect ? 'Good job!' : 'Keep practicing!'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTryAgain}
                className={`flex-1 py-3 rounded-xl font-medium ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Try Again
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white"
              >
                Next Phrase
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
