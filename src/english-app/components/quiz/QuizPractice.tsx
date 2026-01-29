import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { allPhrases } from '../../data/phrases';
import { Phrase, QuizQuestion } from '../../types';

const generateQuestions = (phrases: Phrase[], count: number = 10): QuizQuestion[] => {
  const shuffled = [...phrases].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((phrase, index) => {
    const type = index % 2 === 0 ? 'english_to_japanese' : 'japanese_to_english';

    // Get wrong answers from other phrases
    const otherPhrases = phrases.filter(p => p.id !== phrase.id);
    const wrongAnswers = otherPhrases
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => type === 'english_to_japanese' ? p.japanese : p.english);

    const correctAnswer = type === 'english_to_japanese' ? phrase.japanese : phrase.english;
    const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    return {
      id: `q-${phrase.id}`,
      type,
      question: type === 'english_to_japanese' ? phrase.english : phrase.japanese,
      correctAnswer,
      options,
      phraseId: phrase.id,
    };
  });
};

export const QuizPractice: React.FC = () => {
  const { darkMode, progress, incrementQuizStats, earnBadge, setView } = useAppStore();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const availableDays = [...progress.completedDays, progress.currentDay];
    const phrases = allPhrases.filter(p => availableDays.includes(p.day));
    if (phrases.length >= 4) {
      setQuestions(generateQuestions(phrases, 10));
    }
  }, [progress.completedDays, progress.currentDay]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    incrementQuizStats(isCorrect);

    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Check for perfect score badge
      if (score === questions.length) {
        earnBadge('perfect_quiz');
      }
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    const availableDays = [...progress.completedDays, progress.currentDay];
    const phrases = allPhrases.filter(p => availableDays.includes(p.day));
    setQuestions(generateQuestions(phrases, 10));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (questions.length === 0) {
    return (
      <div className={`min-h-screen pb-20 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="text-center px-4">
          <p className="mb-4">You need at least 4 phrases to start a quiz.</p>
          <button
            onClick={() => setView('lesson')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Learn Some Phrases First
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPerfect = score === questions.length;

    return (
      <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header title="Quiz Results" showBack />
        <main className="max-w-lg mx-auto px-4 py-6">
          <div className={`rounded-2xl p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <span className="text-6xl mb-4 block">
              {isPerfect ? '🏆' : percentage >= 70 ? '🎉' : '💪'}
            </span>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {isPerfect ? 'Perfect Score!' : percentage >= 70 ? 'Great Job!' : 'Keep Practicing!'}
            </h2>

            <div className={`text-5xl font-bold my-6 ${
              percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {percentage}%
            </div>

            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              You got {score} out of {questions.length} correct
            </p>

            {isPerfect && (
              <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
                <p className={`font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  Badge Earned: Perfect Score!
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setView('home')}
                className={`flex-1 py-3 rounded-xl font-medium ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 py-3 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="Quiz" showBack />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            Score: {score}
          </span>
        </div>

        <div className={`h-2 rounded-full mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {currentQuestion.type === 'english_to_japanese'
              ? 'What is the Japanese translation?'
              : 'What is the English translation?'}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentQuestion.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  showCorrect
                    ? 'bg-green-500 text-white'
                    : showWrong
                      ? 'bg-red-500 text-white'
                      : isSelected
                        ? 'ring-2 ring-blue-500'
                        : ''
                } ${
                  !isAnswered
                    ? darkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-white hover:bg-gray-50'
                    : darkMode
                      ? 'bg-gray-800'
                      : 'bg-white'
                } shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    showCorrect
                      ? 'bg-green-600'
                      : showWrong
                        ? 'bg-red-600'
                        : darkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-100'
                  }`}>
                    {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + index)}
                  </span>
                  <span className={`${
                    !showCorrect && !showWrong && (darkMode ? 'text-white' : 'text-gray-900')
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback & Next */}
        {isAnswered && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              selectedAnswer === currentQuestion.correctAnswer
                ? darkMode ? 'bg-green-900/30' : 'bg-green-50'
                : darkMode ? 'bg-red-900/30' : 'bg-red-50'
            }`}>
              <p className={`font-medium ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? darkMode ? 'text-green-400' : 'text-green-700'
                  : darkMode ? 'text-red-400' : 'text-red-700'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct! Well done!'
                  : `Incorrect. The answer was: ${currentQuestion.correctAnswer}`}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
