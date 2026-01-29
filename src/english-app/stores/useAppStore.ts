import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, StudyStats, Badge, BadgeType, ViewType } from '../types';

const INITIAL_BADGES: Badge[] = [
  { id: 'first_lesson', name: 'First Step', description: 'Complete your first lesson', icon: '🎯' },
  { id: 'week_streak', name: 'Week Warrior', description: 'Study 7 days in a row', icon: '🔥' },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '⭐' },
  { id: 'speaking_master', name: 'Speaking Master', description: 'Complete 50 speaking exercises', icon: '🎤' },
  { id: 'halfway', name: 'Halfway There', description: 'Complete 15 days of learning', icon: '🏃' },
  { id: 'completion', name: 'Champion', description: 'Complete all 30 days', icon: '🏆' },
];

const INITIAL_STATS: StudyStats = {
  totalStudyTime: 0,
  totalSessions: 0,
  quizCorrect: 0,
  quizTotal: 0,
  speakingAttempts: 0,
  listeningCount: 0,
  flashcardReviews: 0,
};

const INITIAL_PROGRESS: UserProgress = {
  currentDay: 1,
  completedDays: [],
  streak: 0,
  lastStudyDate: '',
  masteredPhrases: [],
  reviewPhrases: [],
  badges: INITIAL_BADGES,
  stats: INITIAL_STATS,
};

interface AppState {
  // View State
  currentView: ViewType;
  selectedDay: number | null;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;

  // User Progress
  progress: UserProgress;
  sessionStartTime: number | null;

  // View Actions
  setView: (view: ViewType) => void;
  selectDay: (day: number | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleDarkMode: () => void;

  // Progress Actions
  completeDay: (day: number) => void;
  addMasteredPhrase: (phraseId: string) => void;
  addReviewPhrase: (phraseId: string) => void;
  removeReviewPhrase: (phraseId: string) => void;
  updateStreak: () => void;
  earnBadge: (badgeId: BadgeType) => void;

  // Stats Actions
  startSession: () => void;
  endSession: () => void;
  incrementQuizStats: (correct: boolean) => void;
  incrementSpeakingAttempts: () => void;
  incrementListeningCount: () => void;
  incrementFlashcardReviews: () => void;

  // Reset
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial State
      currentView: 'home',
      selectedDay: null,
      isLoading: false,
      error: null,
      darkMode: false,
      progress: INITIAL_PROGRESS,
      sessionStartTime: null,

      // View Actions
      setView: (view) => set({ currentView: view }),
      selectDay: (day) => set({ selectedDay: day }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Progress Actions
      completeDay: (day) => set((state) => {
        const completedDays = state.progress.completedDays.includes(day)
          ? state.progress.completedDays
          : [...state.progress.completedDays, day];

        const newProgress = {
          ...state.progress,
          completedDays,
          currentDay: Math.max(state.progress.currentDay, day + 1),
        };

        // Check for badges
        if (completedDays.length === 1 && !state.progress.badges.find(b => b.id === 'first_lesson')?.earnedAt) {
          const badges = state.progress.badges.map(b =>
            b.id === 'first_lesson' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
          newProgress.badges = badges;
        }

        if (completedDays.length >= 15 && !state.progress.badges.find(b => b.id === 'halfway')?.earnedAt) {
          const badges = newProgress.badges.map(b =>
            b.id === 'halfway' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
          newProgress.badges = badges;
        }

        if (completedDays.length >= 30 && !state.progress.badges.find(b => b.id === 'completion')?.earnedAt) {
          const badges = newProgress.badges.map(b =>
            b.id === 'completion' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
          newProgress.badges = badges;
        }

        return { progress: newProgress };
      }),

      addMasteredPhrase: (phraseId) => set((state) => ({
        progress: {
          ...state.progress,
          masteredPhrases: state.progress.masteredPhrases.includes(phraseId)
            ? state.progress.masteredPhrases
            : [...state.progress.masteredPhrases, phraseId],
          reviewPhrases: state.progress.reviewPhrases.filter(id => id !== phraseId),
        }
      })),

      addReviewPhrase: (phraseId) => set((state) => ({
        progress: {
          ...state.progress,
          reviewPhrases: state.progress.reviewPhrases.includes(phraseId)
            ? state.progress.reviewPhrases
            : [...state.progress.reviewPhrases, phraseId],
        }
      })),

      removeReviewPhrase: (phraseId) => set((state) => ({
        progress: {
          ...state.progress,
          reviewPhrases: state.progress.reviewPhrases.filter(id => id !== phraseId),
        }
      })),

      updateStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = state.progress.lastStudyDate;

        let newStreak = state.progress.streak;

        if (!lastDate) {
          newStreak = 1;
        } else if (lastDate === today) {
          // Already studied today, keep streak
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastDate === yesterdayStr) {
            newStreak = state.progress.streak + 1;
          } else {
            newStreak = 1;
          }
        }

        const newProgress = {
          ...state.progress,
          streak: newStreak,
          lastStudyDate: today,
        };

        // Check for week streak badge
        if (newStreak >= 7 && !state.progress.badges.find(b => b.id === 'week_streak')?.earnedAt) {
          newProgress.badges = state.progress.badges.map(b =>
            b.id === 'week_streak' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
        }

        return { progress: newProgress };
      }),

      earnBadge: (badgeId) => set((state) => ({
        progress: {
          ...state.progress,
          badges: state.progress.badges.map(b =>
            b.id === badgeId && !b.earnedAt
              ? { ...b, earnedAt: new Date().toISOString() }
              : b
          ),
        }
      })),

      // Stats Actions
      startSession: () => set({ sessionStartTime: Date.now() }),

      endSession: () => set((state) => {
        if (!state.sessionStartTime) return {};

        const sessionTime = Math.floor((Date.now() - state.sessionStartTime) / 60000); // in minutes

        return {
          sessionStartTime: null,
          progress: {
            ...state.progress,
            stats: {
              ...state.progress.stats,
              totalStudyTime: state.progress.stats.totalStudyTime + sessionTime,
              totalSessions: state.progress.stats.totalSessions + 1,
            }
          }
        };
      }),

      incrementQuizStats: (correct) => set((state) => {
        const newStats = {
          ...state.progress.stats,
          quizCorrect: state.progress.stats.quizCorrect + (correct ? 1 : 0),
          quizTotal: state.progress.stats.quizTotal + 1,
        };

        // Check for perfect quiz badge (after 10 questions with 100% accuracy)
        const accuracy = newStats.quizTotal >= 10
          ? (newStats.quizCorrect / newStats.quizTotal) * 100
          : 0;

        let badges = state.progress.badges;
        if (accuracy === 100 && newStats.quizTotal >= 10 && !badges.find(b => b.id === 'perfect_quiz')?.earnedAt) {
          badges = badges.map(b =>
            b.id === 'perfect_quiz' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
        }

        return {
          progress: {
            ...state.progress,
            stats: newStats,
            badges,
          }
        };
      }),

      incrementSpeakingAttempts: () => set((state) => {
        const newAttempts = state.progress.stats.speakingAttempts + 1;

        let badges = state.progress.badges;
        if (newAttempts >= 50 && !badges.find(b => b.id === 'speaking_master')?.earnedAt) {
          badges = badges.map(b =>
            b.id === 'speaking_master' ? { ...b, earnedAt: new Date().toISOString() } : b
          );
        }

        return {
          progress: {
            ...state.progress,
            stats: {
              ...state.progress.stats,
              speakingAttempts: newAttempts,
            },
            badges,
          }
        };
      }),

      incrementListeningCount: () => set((state) => ({
        progress: {
          ...state.progress,
          stats: {
            ...state.progress.stats,
            listeningCount: state.progress.stats.listeningCount + 1,
          }
        }
      })),

      incrementFlashcardReviews: () => set((state) => ({
        progress: {
          ...state.progress,
          stats: {
            ...state.progress.stats,
            flashcardReviews: state.progress.stats.flashcardReviews + 1,
          }
        }
      })),

      // Reset
      resetProgress: () => set({
        progress: INITIAL_PROGRESS,
        currentView: 'home',
        selectedDay: null,
      }),
    }),
    {
      name: 'english-booster-30-storage',
      partialize: (state) => ({
        progress: state.progress,
        darkMode: state.darkMode,
      }),
    }
  )
);
