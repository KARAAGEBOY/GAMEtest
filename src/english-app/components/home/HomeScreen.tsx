import React, { useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { sessions } from '../../data/phrases';

export const HomeScreen: React.FC = () => {
  const { darkMode, progress, placementScore, setView, selectSession, updateStreak, startSession } = useAppStore();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const currentSessionData = sessions.find(s => s.session === progress.currentSession) || sessions[0];
  const completionRate = Math.round((progress.completedSessions.length / 15) * 100);
  const nextSession = Math.min(progress.currentSession, 15);

  const handleStartSession = () => {
    selectSession(nextSession);
    startSession();
    setView('session-flow');
  };

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="English Booster 30" />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
              Session {nextSession} / 15
            </span>
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
              Day {currentSessionData.calendarDay}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-1">
            {currentSessionData.titleJa}
          </h2>
          <p className="text-blue-100 mb-4 text-sm">
            {currentSessionData.title} - {currentSessionData.description}
          </p>
          <button
            onClick={handleStartSession}
            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
          >
            {progress.completedSessions.includes(nextSession)
              ? 'Review This Session'
              : 'Start 1-Hour Session'}
          </button>
        </div>

        {/* Placement Score */}
        {placementScore !== null && (
          <div className={`rounded-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Placement Score</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{placementScore}%</p>
              </div>
              <div className="text-right">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Target</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {Math.min(100, placementScore + 30)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Progress
          </h3>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Completion</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{completionRate}%</span>
            </div>
            <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xl font-bold text-blue-500">{progress.completedSessions.length}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sessions</div>
            </div>
            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xl font-bold text-green-500">{progress.masteredPhrases.length}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mastered</div>
            </div>
            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xl font-bold text-orange-500">{progress.streak}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Streak</div>
            </div>
            <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-xl font-bold text-purple-500">{progress.stats.totalStudyTime}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Minutes</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Practice
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setView('speaking')}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <span className="text-3xl mb-2">🎤</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Speaking</span>
            </button>
            <button
              onClick={() => setView('listening')}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-50 hover:bg-green-100'
              }`}
            >
              <span className="text-3xl mb-2">🎧</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Listening</span>
            </button>
            <button
              onClick={() => setView('flashcard')}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <span className="text-3xl mb-2">🃏</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Flashcards</span>
            </button>
            <button
              onClick={() => setView('quiz')}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-yellow-50 hover:bg-yellow-100'
              }`}
            >
              <span className="text-3xl mb-2">❓</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Quiz</span>
            </button>
          </div>
        </div>

        {/* Program Info */}
        <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            30-Day Program
          </h3>
          <div className="grid grid-cols-5 gap-1">
            {sessions.map((s) => {
              const isCompleted = progress.completedSessions.includes(s.session);
              const isCurrent = s.session === nextSession;
              return (
                <button
                  key={s.session}
                  onClick={() => {
                    selectSession(s.session);
                    setView('session-flow');
                  }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                        : darkMode
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {isCompleted ? '✓' : s.session}
                </button>
              );
            })}
          </div>
        </div>

        {/* Earned Badges */}
        {progress.badges.filter(b => b.earnedAt).length > 0 && (
          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Earned Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {progress.badges.filter(b => b.earnedAt).map((badge) => (
                <div
                  key={badge.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
