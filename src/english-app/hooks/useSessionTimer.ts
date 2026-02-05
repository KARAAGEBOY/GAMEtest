import { useState, useEffect, useCallback, useRef } from 'react';
import { SessionStep } from '../types';

const STEP_DURATIONS: Record<SessionStep, number> = {
  overview: 0,
  phrases: 15 * 60,   // 15 min in seconds
  listening: 15 * 60,
  speaking: 15 * 60,
  quiz: 15 * 60,
  complete: 0,
};


export const useSessionTimer = () => {
  const [totalElapsed, setTotalElapsed] = useState(0); // total seconds
  const [stepElapsed, setStepElapsed] = useState(0);   // current step seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<SessionStep>('overview');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTotalElapsed(t => t + 1);
        setStepElapsed(s => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTotalElapsed(0);
    setStepElapsed(0);
    setCurrentStep('overview');
  }, []);

  const goToStep = useCallback((step: SessionStep) => {
    setCurrentStep(step);
    setStepElapsed(0);
    if (step !== 'overview' && step !== 'complete') {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, []);

  const stepDuration = STEP_DURATIONS[currentStep] || 0;
  const stepRemaining = Math.max(0, stepDuration - stepElapsed);
  const stepProgress = stepDuration > 0 ? Math.min(100, (stepElapsed / stepDuration) * 100) : 0;
  const isStepOvertime = stepElapsed > stepDuration && stepDuration > 0;

  const totalMinutes = Math.floor(totalElapsed / 60);
  const totalSessionProgress = Math.min(100, (totalElapsed / 3600) * 100); // 60 min total

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    totalElapsed,
    totalMinutes,
    totalSessionProgress,
    stepElapsed,
    stepRemaining,
    stepProgress,
    isStepOvertime,
    isRunning,
    currentStep,
    start,
    pause,
    reset,
    goToStep,
    formatTime,
  };
};
