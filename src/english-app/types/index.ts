// English Booster 30 - Type Definitions
// Redesigned: 15 sessions every other day, 1 hour each

export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string;
  category: Category;
  session: number; // 1-15
  example?: string;
  exampleJa?: string;
}

export type Category =
  | 'greeting'
  | 'daily'
  | 'shopping'
  | 'restaurant'
  | 'travel'
  | 'business'
  | 'social'
  | 'emergency'
  | 'opinion'
  | 'emotion';

// A single learning session (every other day, 1 hour)
export interface Session {
  session: number;       // 1-15
  calendarDay: number;   // Actual day in the 30-day plan (1,3,5,...,29)
  title: string;
  titleJa: string;
  description: string;
  category: Category;
  phrases: Phrase[];
  // 1-hour session breakdown (minutes)
  timeAllocation: SessionTimeAllocation;
}

export interface SessionTimeAllocation {
  phraseStudy: number;    // 15 min
  listening: number;      // 15 min
  speaking: number;       // 15 min
  quizReview: number;     // 15 min
}

// Session step within a 1-hour session
export type SessionStep = 'overview' | 'phrases' | 'listening' | 'speaking' | 'quiz' | 'complete';

export interface UserProgress {
  currentSession: number;       // 1-15
  completedSessions: number[];
  streak: number;               // consecutive sessions completed
  lastStudyDate: string;
  startDate: string;            // When the 30-day program started
  masteredPhrases: string[];
  reviewPhrases: string[];
  badges: Badge[];
  stats: StudyStats;
}

export interface StudyStats {
  totalStudyTime: number; // in minutes
  totalSessions: number;
  quizCorrect: number;
  quizTotal: number;
  speakingAttempts: number;
  listeningCount: number;
  flashcardReviews: number;
}

export type BadgeType =
  | 'first_lesson'
  | 'week_streak'
  | 'perfect_quiz'
  | 'speaking_master'
  | 'halfway'
  | 'completion'
  | 'hour_warrior'
  | 'consistency';

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  earnedAt?: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  type: 'english_to_japanese' | 'japanese_to_english' | 'fill_blank' | 'listening';
  question: string;
  correctAnswer: string;
  options: string[];
  phraseId: string;
}

export interface SpeechResult {
  transcript: string;
  confidence: number;
  isCorrect: boolean;
  similarity: number;
}

export type ViewType =
  | 'home'
  | 'lesson'
  | 'session-flow'
  | 'speaking'
  | 'listening'
  | 'flashcard'
  | 'quiz'
  | 'dashboard';

export interface AppState {
  currentView: ViewType;
  selectedSession: number | null;
  currentStep: SessionStep;
  isLoading: boolean;
  error: string | null;
}
