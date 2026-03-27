import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, StudyStats, Badge, BadgeType, ViewType, SessionStep } from '../types';

// ─── Badge Definitions ───────────────────────────────────────────────────────

const INITIAL_BADGES: Badge[] = [
  { id: 'first_lesson', name: 'First Step', description: 'Complete your first session', icon: '🎯' },
  { id: 'week_streak', name: 'Week Streak', description: 'Complete 4 consecutive sessions', icon: '🔥' },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz (10+ questions)', icon: '⭐' },
  { id: 'speaking_master', name: 'Speaking Master', description: 'Complete 50+ speaking attempts', icon: '🎤' },
  { id: 'halfway', name: 'Halfway There', description: 'Complete 8 sessions', icon: '🏃' },
  { id: 'completion', name: 'Champion', description: 'Complete all 15 sessions', icon: '🏆' },
  { id: 'hour_warrior', name: 'Hour Warrior', description: 'Complete 5 full 1-hour sessions', icon: '⏱️' },
  { id: 'consistency', name: 'Consistency King', description: 'No missed session days', icon: '📅' },
];

// ─── Initial Values ──────────────────────────────────────────────────────────

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
  currentSession: 1,
  completedSessions: [],
  streak: 0,
  lastStudyDate: '',
  startDate: '',
  masteredPhrases: [],
  reviewPhrases: [],
  badges: INITIAL_BADGES,
  stats: INITIAL_STATS,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns 'YYYY-MM-DD' for a given Date (local time). */
function toDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Returns the number of calendar days between two 'YYYY-MM-DD' strings. */
function daysBetween(a: string, b: string): number {
  const msPerDay = 86400000;
  const dateA = new Date(a + 'T00:00:00');
  const dateB = new Date(b + 'T00:00:00');
  return Math.round((dateB.getTime() - dateA.getTime()) / msPerDay);
}

/**
 * For a 15-session every-other-day program, session N falls on calendar day (N-1)*2 + 1.
 * i.e. session 1 = day 1, session 2 = day 3, session 3 = day 5, ... session 15 = day 29.
 */
function sessionToCalendarDay(session: number): number {
  return (session - 1) * 2 + 1;
}

// ─── Store Interface ─────────────────────────────────────────────────────────

interface AppState {
  // ── View State ──
  currentView: ViewType;
  selectedSession: number | null;
  currentStep: SessionStep;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
  isOnboarded: boolean;

  // ── User Progress ──
  progress: UserProgress;
  sessionStartTime: number | null;
  sessionElapsedMinutes: number;

  // ── Placement / Final Test ──
  placementScore: number | null;
  finalScore: number | null;

  // ── View Actions ──
  setView: (view: ViewType) => void;
  selectSession: (session: number | null) => void;
  setStep: (step: SessionStep) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleDarkMode: () => void;
  completeOnboarding: () => void;

  // ── Progress Actions ──
  completeSession: (session: number) => void;
  addMasteredPhrase: (phraseId: string) => void;
  addReviewPhrase: (phraseId: string) => void;
  removeReviewPhrase: (phraseId: string) => void;
  updateStreak: () => void;
  earnBadge: (badgeId: BadgeType) => void;

  // ── Stats Actions ──
  startSession: () => void;
  endSession: () => void;
  incrementQuizStats: (correct: boolean) => void;
  incrementSpeakingAttempts: () => void;
  incrementListeningCount: () => void;
  incrementFlashcardReviews: () => void;

  // ── Test Actions ──
  setPlacementScore: (score: number) => void;
  setFinalScore: (score: number) => void;

  // ── Other ──
  resetProgress: () => void;
  isRestDay: () => boolean;
  getNextSessionDate: () => string;
  getCalendarDay: () => number;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Initial State ──────────────────────────────────────────────────────

      currentView: 'home',
      selectedSession: null,
      currentStep: 'overview' as SessionStep,
      isLoading: false,
      error: null,
      darkMode: false,
      isOnboarded: false,

      progress: INITIAL_PROGRESS,
      sessionStartTime: null,
      sessionElapsedMinutes: 0,

      placementScore: null,
      finalScore: null,

      // ── View Actions ───────────────────────────────────────────────────────

      setView: (view) => set({ currentView: view }),

      selectSession: (session) => set({ selectedSession: session }),

      setStep: (step) => set({ currentStep: step }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      completeOnboarding: () =>
        set((state) => ({
          isOnboarded: true,
          progress: {
            ...state.progress,
            startDate: state.progress.startDate || toDateStr(new Date()),
          },
        })),

      // ── Progress Actions ───────────────────────────────────────────────────

      completeSession: (session) =>
        set((state) => {
          const completedSessions = state.progress.completedSessions.includes(session)
            ? state.progress.completedSessions
            : [...state.progress.completedSessions, session];

          const newProgress: UserProgress = {
            ...state.progress,
            completedSessions,
            currentSession: Math.max(state.progress.currentSession, session + 1),
          };

          let badges = [...newProgress.badges];

          // first_lesson: Complete first session
          if (
            completedSessions.length >= 1 &&
            !badges.find((b) => b.id === 'first_lesson')?.earnedAt
          ) {
            badges = badges.map((b) =>
              b.id === 'first_lesson' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          // halfway: Complete 8 sessions
          if (
            completedSessions.length >= 8 &&
            !badges.find((b) => b.id === 'halfway')?.earnedAt
          ) {
            badges = badges.map((b) =>
              b.id === 'halfway' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          // completion: Complete all 15 sessions
          if (
            completedSessions.length >= 15 &&
            !badges.find((b) => b.id === 'completion')?.earnedAt
          ) {
            badges = badges.map((b) =>
              b.id === 'completion' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          newProgress.badges = badges;
          return { progress: newProgress };
        }),

      addMasteredPhrase: (phraseId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            masteredPhrases: state.progress.masteredPhrases.includes(phraseId)
              ? state.progress.masteredPhrases
              : [...state.progress.masteredPhrases, phraseId],
            reviewPhrases: state.progress.reviewPhrases.filter((id) => id !== phraseId),
          },
        })),

      addReviewPhrase: (phraseId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            reviewPhrases: state.progress.reviewPhrases.includes(phraseId)
              ? state.progress.reviewPhrases
              : [...state.progress.reviewPhrases, phraseId],
          },
        })),

      removeReviewPhrase: (phraseId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            reviewPhrases: state.progress.reviewPhrases.filter((id) => id !== phraseId),
          },
        })),

      /**
       * Every-other-day streak logic.
       * A streak is maintained as long as the user studies on each scheduled session day.
       * Skipping one day between sessions is expected (rest day) and does NOT break the streak.
       * The streak breaks only if more than 2 calendar days pass since the last study date.
       */
      updateStreak: () =>
        set((state) => {
          const today = toDateStr(new Date());
          const lastDate = state.progress.lastStudyDate;

          let newStreak = state.progress.streak;

          if (!lastDate) {
            // First ever study day
            newStreak = 1;
          } else if (lastDate === today) {
            // Already studied today -- keep streak unchanged
          } else {
            const gap = daysBetween(lastDate, today);

            if (gap <= 2) {
              // 1 day gap = next day (consecutive), 2 day gap = one rest day in between
              // Both are valid for an every-other-day schedule
              newStreak = state.progress.streak + 1;
            } else {
              // Missed a session window -- streak resets
              newStreak = 1;
            }
          }

          const newProgress: UserProgress = {
            ...state.progress,
            streak: newStreak,
            lastStudyDate: today,
          };

          let badges = [...newProgress.badges];

          // week_streak: 4 consecutive sessions
          if (newStreak >= 4 && !badges.find((b) => b.id === 'week_streak')?.earnedAt) {
            badges = badges.map((b) =>
              b.id === 'week_streak' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          // consistency: No missed session days -- check if ALL expected sessions have been
          // completed on time. We award this if the user has completed every session up to
          // currentSession-1 with a perfect streak equal to completedSessions count.
          if (
            newStreak >= newProgress.completedSessions.length &&
            newProgress.completedSessions.length >= 5 &&
            !badges.find((b) => b.id === 'consistency')?.earnedAt
          ) {
            badges = badges.map((b) =>
              b.id === 'consistency' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          newProgress.badges = badges;
          return { progress: newProgress };
        }),

      earnBadge: (badgeId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            badges: state.progress.badges.map((b) =>
              b.id === badgeId && !b.earnedAt
                ? { ...b, earnedAt: new Date().toISOString() }
                : b,
            ),
          },
        })),

      // ── Stats Actions ──────────────────────────────────────────────────────

      startSession: () =>
        set({
          sessionStartTime: Date.now(),
          sessionElapsedMinutes: 0,
        }),

      endSession: () =>
        set((state) => {
          if (!state.sessionStartTime) return {};

          const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);
          const newTotalSessions = state.progress.stats.totalSessions + 1;

          let badges = [...state.progress.badges];

          // hour_warrior: Complete 5 full 1-hour sessions (45+ min counts as full)
          const fullHourSessions =
            sessionMinutes >= 45
              ? newTotalSessions // approximate -- count this session as a full hour
              : newTotalSessions - 1;

          if (fullHourSessions >= 5 && !badges.find((b) => b.id === 'hour_warrior')?.earnedAt) {
            badges = badges.map((b) =>
              b.id === 'hour_warrior' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          return {
            sessionStartTime: null,
            sessionElapsedMinutes: sessionMinutes,
            progress: {
              ...state.progress,
              stats: {
                ...state.progress.stats,
                totalStudyTime: state.progress.stats.totalStudyTime + sessionMinutes,
                totalSessions: newTotalSessions,
              },
              badges,
            },
          };
        }),

      incrementQuizStats: (correct) =>
        set((state) => {
          const newStats: StudyStats = {
            ...state.progress.stats,
            quizCorrect: state.progress.stats.quizCorrect + (correct ? 1 : 0),
            quizTotal: state.progress.stats.quizTotal + 1,
          };

          let badges = [...state.progress.badges];

          // perfect_quiz: 100% accuracy on 10+ questions
          if (
            newStats.quizTotal >= 10 &&
            newStats.quizCorrect === newStats.quizTotal &&
            !badges.find((b) => b.id === 'perfect_quiz')?.earnedAt
          ) {
            badges = badges.map((b) =>
              b.id === 'perfect_quiz' ? { ...b, earnedAt: new Date().toISOString() } : b,
            );
          }

          return {
            progress: {
              ...state.progress,
              stats: newStats,
              badges,
            },
          };
        }),

      incrementSpeakingAttempts: () =>
        set((state) => {
          const newAttempts = state.progress.stats.speakingAttempts + 1;

          let badges = [...state.progress.badges];

          // speaking_master: 50+ speaking attempts
          if (newAttempts >= 50 && !badges.find((b) => b.id === 'speaking_master')?.earnedAt) {
            badges = badges.map((b) =>
              b.id === 'speaking_master' ? { ...b, earnedAt: new Date().toISOString() } : b,
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
            },
          };
        }),

      incrementListeningCount: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            stats: {
              ...state.progress.stats,
              listeningCount: state.progress.stats.listeningCount + 1,
            },
          },
        })),

      incrementFlashcardReviews: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            stats: {
              ...state.progress.stats,
              flashcardReviews: state.progress.stats.flashcardReviews + 1,
            },
          },
        })),

      // ── Test Actions ───────────────────────────────────────────────────────

      setPlacementScore: (score) => set({ placementScore: score }),

      setFinalScore: (score) => set({ finalScore: score }),

      // ── Other ──────────────────────────────────────────────────────────────

      resetProgress: () =>
        set({
          progress: { ...INITIAL_PROGRESS, badges: INITIAL_BADGES.map((b) => ({ ...b })) },
          currentView: 'home',
          selectedSession: null,
          currentStep: 'overview' as SessionStep,
          sessionStartTime: null,
          sessionElapsedMinutes: 0,
          isOnboarded: false,
          placementScore: null,
          finalScore: null,
        }),

      /**
       * Returns true if today is a rest day (even-numbered calendar day in the program).
       * Session days are odd calendar days: 1, 3, 5, ..., 29.
       * Rest days are even calendar days: 2, 4, 6, ..., 30.
       */
      isRestDay: () => {
        const state = get();
        if (!state.progress.startDate) return false;

        const today = toDateStr(new Date());
        const calendarDay = daysBetween(state.progress.startDate, today) + 1; // 1-indexed

        if (calendarDay < 1 || calendarDay > 30) return false;

        // Odd calendar days are session days, even are rest days
        return calendarDay % 2 === 0;
      },

      /**
       * Returns the date string (YYYY-MM-DD) of the next session day based on
       * startDate and currentSession.
       */
      getNextSessionDate: () => {
        const state = get();
        if (!state.progress.startDate) return toDateStr(new Date());

        const nextSession = state.progress.currentSession;
        // Session N falls on calendar day (N-1)*2 + 1
        const calendarDay = sessionToCalendarDay(Math.min(nextSession, 15));
        const startDate = new Date(state.progress.startDate + 'T00:00:00');
        const nextDate = new Date(startDate.getTime() + (calendarDay - 1) * 86400000);
        return toDateStr(nextDate);
      },

      /**
       * Returns the current calendar day in the 30-day program (1-30).
       * Returns 0 if the program has not started, or a value > 30 if past the end.
       */
      getCalendarDay: () => {
        const state = get();
        if (!state.progress.startDate) return 0;

        const today = toDateStr(new Date());
        return daysBetween(state.progress.startDate, today) + 1;
      },
    }),
    {
      name: 'english-booster-30-v2',
      partialize: (state) => ({
        progress: state.progress,
        darkMode: state.darkMode,
        isOnboarded: state.isOnboarded,
        placementScore: state.placementScore,
        finalScore: state.finalScore,
      }),
    },
  ),
);
