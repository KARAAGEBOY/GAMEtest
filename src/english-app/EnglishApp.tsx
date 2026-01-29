import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { Navigation } from './components/common/Navigation';
import { HomeScreen } from './components/home/HomeScreen';
import { LessonList } from './components/lesson/LessonList';
import { LessonDetail } from './components/lesson/LessonDetail';
import { SpeakingPractice } from './components/speaking/SpeakingPractice';
import { ListeningPractice } from './components/listening/ListeningPractice';
import { FlashcardPractice } from './components/flashcard/FlashcardPractice';
import { QuizPractice } from './components/quiz/QuizPractice';
import { Dashboard } from './components/dashboard/Dashboard';

export const EnglishApp: React.FC = () => {
  const { currentView, darkMode, endSession } = useAppStore();

  // End session on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen />;
      case 'lesson':
        return <LessonList />;
      case 'lesson-detail':
        return <LessonDetail />;
      case 'speaking':
        return <SpeakingPractice />;
      case 'listening':
        return <ListeningPractice />;
      case 'flashcard':
        return <FlashcardPractice />;
      case 'quiz':
        return <QuizPractice />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {renderView()}
      <Navigation />
    </div>
  );
};

export default EnglishApp;
