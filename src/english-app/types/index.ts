// English Booster 30 - Type Definitions

export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string;
  category: Category;
  day: number;
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

export interface DayLesson {
  day: number;
  title: string;
  titleJa: string;
  description: string;
  category: Category;
  phrases: Phrase[];
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  streak: number;
  lastStudyDate: string;
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
  | 'completion';

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
  | 'lesson-detail'
  | 'speaking'
  | 'listening'
  | 'flashcard'
  | 'quiz'
  | 'dashboard';

export interface AppState {
  currentView: ViewType;
  selectedDay: number | null;
  isLoading: boolean;
  error: string | null;
}
