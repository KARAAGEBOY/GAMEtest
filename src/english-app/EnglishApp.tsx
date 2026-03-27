import React, { useEffect } from 'react';
import { useAppStore } from './stores/useAppStore';
import { Onboarding } from './components/home/Onboarding';
import { Navigation } from './components/common/Navigation';
import { HomeScreen } from './components/home/HomeScreen';
import { LessonList } from './components/lesson/LessonList';
import { SessionFlow } from './components/lesson/SessionFlow';
import { SpeakingPractice } from './components/speaking/SpeakingPractice';
import { ListeningPractice } from './components/listening/ListeningPractice';
import { FlashcardPractice } from './components/flashcard/FlashcardPractice';
import { QuizPractice } from './components/quiz/QuizPractice';
import { Dashboard } from './components/dashboard/Dashboard';

export const EnglishApp: React.FC = () => {
  const { currentView, darkMode, isOnboarded, completeOnboarding, setPlacementScore, endSession } = useAppStore();

  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Show onboarding if not completed
  if (!isOnboarded) {
    return (
      <Onboarding
        darkMode={darkMode}
        onComplete={(score) => {
          setPlacementScore(score);
          completeOnboarding();
        }}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen />;
      case 'lesson':
        return <LessonList />;
      case 'session-flow':
        return <SessionFlow />;
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
      {currentView !== 'session-flow' && <Navigation />}
    </div>
  );
};

export default EnglishApp;
