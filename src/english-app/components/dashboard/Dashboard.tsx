import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';

export const Dashboard: React.FC = () => {
  const { darkMode, progress, resetProgress } = useAppStore();
  const { stats, badges, completedDays, masteredPhrases, streak } = progress;

  const quizAccuracy = stats.quizTotal > 0
    ? Math.round((stats.quizCorrect / stats.quizTotal) * 100)
    : 0;

  const earnedBadges = badges.filter(b => b.earnedAt);
  const lockedBadges = badges.filter(b => !b.earnedAt);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="Dashboard" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Overview Stats */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {completedDays.length}/30
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Days Completed</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {masteredPhrases.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phrases Mastered</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <p className={`text-3xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {streak}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Day Streak</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <p className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {stats.totalStudyTime}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Minutes Studied</p>
            </div>
          </div>
        </div>

        {/* Practice Stats */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Practice Stats
          </h3>
          <div className="space-y-4">
            {/* Speaking */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎤</span>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Speaking</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stats.speakingAttempts} attempts
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {stats.speakingAttempts >= 50 ? '🏆' : `${stats.speakingAttempts}/50`}
              </div>
            </div>

            {/* Listening */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎧</span>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Listening</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stats.listeningCount} plays
                  </p>
                </div>
              </div>
            </div>

            {/* Flashcards */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🃏</span>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Flashcards</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stats.flashcardReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">❓</span>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quiz</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stats.quizCorrect}/{stats.quizTotal} correct ({quizAccuracy}%)
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full ${
                quizAccuracy >= 80
                  ? 'bg-green-500 text-white'
                  : quizAccuracy >= 60
                    ? 'bg-yellow-500 text-white'
                    : darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-100'
              }`}>
                {quizAccuracy}%
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Badges ({earnedBadges.length}/{badges.length})
          </h3>

          {/* Earned Badges */}
          {earnedBadges.length > 0 && (
            <div className="mb-4">
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Earned</p>
              <div className="grid grid-cols-3 gap-3">
                {earnedBadges.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl text-center ${
                      darkMode ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50' : 'bg-gradient-to-br from-yellow-100 to-orange-100'
                    }`}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Badges */}
          {lockedBadges.length > 0 && (
            <div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Locked</p>
              <div className="grid grid-cols-3 gap-3">
                {lockedBadges.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} opacity-60`}
                  >
                    <span className="text-3xl grayscale">{badge.icon}</span>
                    <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {badge.name}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calendar View */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            30-Day Progress
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
              const isCompleted = completedDays.includes(day);
              const isCurrent = day === progress.currentDay;
              const isLocked = day > progress.currentDay && !isCompleted;

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                        ? 'bg-blue-500 text-white'
                        : isLocked
                          ? darkMode
                            ? 'bg-gray-700 text-gray-500'
                            : 'bg-gray-100 text-gray-400'
                          : darkMode
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isCompleted ? '✓' : day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Button */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Reset Progress
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Start fresh with a new 30-day journey. This will erase all your progress.
          </p>
          <button
            onClick={handleReset}
            className={`w-full py-3 rounded-xl font-medium ${
              darkMode
                ? 'bg-red-900/50 hover:bg-red-900/70 text-red-400'
                : 'bg-red-100 hover:bg-red-200 text-red-600'
            } transition-colors`}
          >
            Reset All Progress
          </button>
        </div>
      </main>
    </div>
  );
};
