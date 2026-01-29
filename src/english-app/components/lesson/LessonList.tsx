import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { dayLessons } from '../../data/phrases';

const categoryColors: Record<string, { bg: string; darkBg: string; text: string }> = {
  greeting: { bg: 'bg-blue-100', darkBg: 'bg-blue-900/30', text: 'text-blue-600' },
  daily: { bg: 'bg-green-100', darkBg: 'bg-green-900/30', text: 'text-green-600' },
  shopping: { bg: 'bg-pink-100', darkBg: 'bg-pink-900/30', text: 'text-pink-600' },
  restaurant: { bg: 'bg-orange-100', darkBg: 'bg-orange-900/30', text: 'text-orange-600' },
  travel: { bg: 'bg-cyan-100', darkBg: 'bg-cyan-900/30', text: 'text-cyan-600' },
  business: { bg: 'bg-purple-100', darkBg: 'bg-purple-900/30', text: 'text-purple-600' },
  social: { bg: 'bg-yellow-100', darkBg: 'bg-yellow-900/30', text: 'text-yellow-600' },
  emergency: { bg: 'bg-red-100', darkBg: 'bg-red-900/30', text: 'text-red-600' },
  opinion: { bg: 'bg-indigo-100', darkBg: 'bg-indigo-900/30', text: 'text-indigo-600' },
  emotion: { bg: 'bg-rose-100', darkBg: 'bg-rose-900/30', text: 'text-rose-600' },
};

export const LessonList: React.FC = () => {
  const { darkMode, progress, setView, selectDay } = useAppStore();

  const handleSelectDay = (day: number) => {
    selectDay(day);
    setView('lesson-detail');
  };

  return (
    <div className={`min-h-screen pb-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="30-Day Lessons" />

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-3">
          {dayLessons.map((lesson) => {
            const isCompleted = progress.completedDays.includes(lesson.day);
            const isLocked = lesson.day > progress.currentDay && !isCompleted;
            const isCurrent = lesson.day === progress.currentDay;
            const colors = categoryColors[lesson.category] || categoryColors.daily;

            return (
              <button
                key={lesson.day}
                onClick={() => !isLocked && handleSelectDay(lesson.day)}
                disabled={isLocked}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  isLocked
                    ? darkMode
                      ? 'bg-gray-800 opacity-50 cursor-not-allowed'
                      : 'bg-gray-100 opacity-50 cursor-not-allowed'
                    : darkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-white hover:shadow-md'
                } ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-center gap-4">
                  {/* Day Number */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                          ? 'bg-blue-500 text-white'
                          : darkMode
                            ? 'bg-gray-700 text-gray-400'
                            : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : isLocked ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      lesson.day
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? colors.darkBg : colors.bg} ${colors.text}`}>
                        {lesson.category}
                      </span>
                      {isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white">
                          Today
                        </span>
                      )}
                    </div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lesson.titleJa}
                    </p>
                  </div>

                  {/* Arrow */}
                  {!isLocked && (
                    <svg className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
