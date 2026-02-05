import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useSessionTimer } from '../../hooks/useSessionTimer';
import { useSpeechSynthesis, useSpeechRecognition, useSpeechEvaluation } from '../../hooks/useSpeech';
import { getSessionByNumber, allPhrases } from '../../data/phrases';
import { QuizQuestion, SessionStep } from '../../types';

const STEPS: { key: SessionStep; label: string; labelJa: string; icon: string; minutes: number }[] = [
  { key: 'phrases', label: 'Phrase Study', labelJa: 'フレーズ学習', icon: '📚', minutes: 15 },
  { key: 'listening', label: 'Listening', labelJa: 'リスニング', icon: '🎧', minutes: 15 },
  { key: 'speaking', label: 'Speaking', labelJa: 'スピーキング', icon: '🎤', minutes: 15 },
  { key: 'quiz', label: 'Quiz & Review', labelJa: 'クイズ & 復習', icon: '❓', minutes: 15 },
];

export const SessionFlow: React.FC = () => {
  const {
    darkMode, selectedSession, setView, selectSession, setStep: setAppStep,
    completeSession, addMasteredPhrase, incrementListeningCount,
    incrementSpeakingAttempts, incrementQuizStats, startSession, endSession, progress,
  } = useAppStore();

  const timer = useSessionTimer();
  const { speak, isSpeaking, isSupported: synthSupported } = useSpeechSynthesis();
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: recogSupported } = useSpeechRecognition();
  const { evaluate } = useSpeechEvaluation();

  const session = selectedSession ? getSessionByNumber(selectedSession) : null;
  const phrases = session?.phrases || [];

  // Step-level state
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [showJa, setShowJa] = useState(false);
  const [speakResult, setSpeakResult] = useState<{ similarity: number } | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => { startSession(); }, [startSession]);

  const currentPhrase = phrases[phraseIdx];
  const dm = darkMode;

  const handleStartStep = (step: SessionStep) => {
    timer.goToStep(step);
    setAppStep(step);
    setPhraseIdx(0);
    setShowJa(false);
    setSpeakResult(null);
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizScore(0);

    if (step === 'quiz') {
      const qs = phrases.sort(() => Math.random() - 0.5).slice(0, 12).map((p, i) => {
        const type = i % 2 === 0 ? 'english_to_japanese' : 'japanese_to_english';
        const wrong = allPhrases.filter(x => x.id !== p.id).sort(() => Math.random() - 0.5).slice(0, 3);
        const correct = type === 'english_to_japanese' ? p.japanese : p.english;
        return {
          id: `sq-${p.id}`, type: type as QuizQuestion['type'],
          question: type === 'english_to_japanese' ? p.english : p.japanese,
          correctAnswer: correct,
          options: [...wrong.map(w => type === 'english_to_japanese' ? w.japanese : w.english), correct].sort(() => Math.random() - 0.5),
          phraseId: p.id,
        };
      });
      setQuizQuestions(qs);
    }
  };

  const handleComplete = () => {
    timer.pause();
    endSession();
    if (selectedSession) completeSession(selectedSession);
    timer.goToStep('complete');
    setAppStep('complete');
  };

  const handleExit = () => {
    timer.reset();
    endSession();
    setView('home');
    selectSession(null);
  };

  if (!session) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <p>Session not found.</p>
      </div>
    );
  }

  // --- Overview ---
  if (timer.currentStep === 'overview') {
    return (
      <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`px-4 py-4 flex items-center gap-3 ${dm ? 'bg-gray-800' : 'bg-white'} border-b ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
          <button onClick={handleExit} className={`p-1 rounded-lg ${dm ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold">Session {session.session} / 15</h1>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
          <div className={`rounded-2xl p-6 ${dm ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'} text-white`}>
            <p className="text-sm opacity-80 mb-1">Day {session.calendarDay} of 30</p>
            <h2 className="text-2xl font-bold mb-1">{session.title}</h2>
            <p className="opacity-90">{session.titleJa}</p>
            <p className="text-sm mt-3 opacity-70">{session.description}</p>
          </div>

          <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className="font-semibold mb-1">1時間セッション</h3>
            <p className={`text-sm mb-4 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>4ステップで学習 ({phrases.length} フレーズ)</p>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.key} className={`flex items-center gap-4 p-3 rounded-xl ${dm ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{s.labelJa}</p>
                    <p className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{s.label} - {s.minutes}分</p>
                  </div>
                  <span className={`text-sm font-mono ${dm ? 'text-gray-500' : 'text-gray-400'}`}>STEP {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleStartStep('phrases')}
            className="w-full py-4 rounded-xl font-bold text-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            セッション開始
          </button>
        </main>
      </div>
    );
  }

  // --- Complete ---
  if (timer.currentStep === 'complete') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${dm ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Session {session.session} Complete!</h2>
          <p className={`mb-6 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
            学習時間: {timer.formatTime(timer.totalElapsed)}
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className="text-3xl font-bold text-blue-500">{phrases.length}</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>フレーズ学習</p>
            </div>
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className="text-3xl font-bold text-green-500">{quizScore}</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>クイズ正解数</p>
            </div>
          </div>
          <div className={`p-4 rounded-xl mb-6 ${dm ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`text-sm ${dm ? 'text-blue-400' : 'text-blue-600'}`}>
              次のセッションは明後日です。休息日にはフラッシュカードで復習しましょう。
            </p>
          </div>
          <button onClick={handleExit} className="w-full py-4 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white">
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  // --- Shared step header ---
  const stepInfo = STEPS.find(s => s.key === timer.currentStep) || STEPS[0];
  const stepIndex = STEPS.findIndex(s => s.key === timer.currentStep);

  const StepHeader = () => (
    <div className={`sticky top-0 z-40 ${dm ? 'bg-gray-800' : 'bg-white'} border-b ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{stepInfo.icon}</span>
            <span className="font-semibold">{stepInfo.labelJa}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-mono ${timer.isStepOvertime ? 'text-red-500' : dm ? 'text-gray-400' : 'text-gray-500'}`}>
              {timer.isStepOvertime ? '+' : ''}{timer.formatTime(timer.isStepOvertime ? timer.stepElapsed - stepInfo.minutes * 60 : timer.stepRemaining)}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${dm ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              {timer.formatTime(timer.totalElapsed)} / 60:00
            </span>
          </div>
        </div>
        {/* Step progress dots */}
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <div key={s.key} className={`flex-1 h-1.5 rounded-full ${i < stepIndex ? 'bg-green-500' : i === stepIndex ? 'bg-blue-500' : dm ? 'bg-gray-700' : 'bg-gray-200'}`} />
          ))}
        </div>
        {/* Step timer bar */}
        <div className={`h-1 mt-1 rounded-full ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div className={`h-full rounded-full transition-all duration-1000 ${timer.isStepOvertime ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(100, timer.stepProgress)}%` }} />
        </div>
      </div>
    </div>
  );

  const NextStepButton = () => {
    const nextStep = STEPS[stepIndex + 1];
    return (
      <button
        onClick={() => nextStep ? handleStartStep(nextStep.key) : handleComplete()}
        className="w-full py-4 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white transition-colors"
      >
        {nextStep ? `次へ: ${nextStep.labelJa}` : 'セッション完了'}
      </button>
    );
  };

  // --- STEP 1: Phrases ---
  if (timer.currentStep === 'phrases') {
    return (
      <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <StepHeader />
        <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className={dm ? 'text-gray-400' : 'text-gray-500'}>{phraseIdx + 1} / {phrases.length}</span>
          </div>
          {currentPhrase && (
            <div className={`rounded-2xl p-6 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <p className={`text-2xl font-bold mb-2 ${dm ? 'text-white' : 'text-gray-900'}`}>{currentPhrase.english}</p>
              <p className={`text-sm mb-4 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>/{currentPhrase.pronunciation}/</p>
              {showJa ? (
                <p className={`text-lg ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{currentPhrase.japanese}</p>
              ) : (
                <button onClick={() => setShowJa(true)} className={`text-sm px-4 py-2 rounded-lg ${dm ? 'bg-gray-700' : 'bg-gray-100'}`}>日本語を表示</button>
              )}
              <div className="flex gap-3 mt-4">
                <button onClick={() => { if (synthSupported) { speak(currentPhrase.english, 0.9); incrementListeningCount(); } }} disabled={isSpeaking}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 ${isSpeaking ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                  🔊 {isSpeaking ? '再生中...' : '聞く'}
                </button>
                <button onClick={() => { if (synthSupported) { speak(currentPhrase.english, 0.6); incrementListeningCount(); } }} disabled={isSpeaking}
                  className={`py-3 px-4 rounded-xl ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>ゆっくり</button>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => { setPhraseIdx(Math.max(0, phraseIdx - 1)); setShowJa(false); }} disabled={phraseIdx === 0}
              className={`flex-1 py-3 rounded-xl font-medium ${phraseIdx === 0 ? dm ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : dm ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}>前へ</button>
            <button onClick={() => { setPhraseIdx(Math.min(phrases.length - 1, phraseIdx + 1)); setShowJa(false); }} disabled={phraseIdx === phrases.length - 1}
              className={`flex-1 py-3 rounded-xl font-medium ${phraseIdx === phrases.length - 1 ? dm ? 'bg-gray-800 text-gray-600' : 'bg-gray-100 text-gray-400' : 'bg-blue-500 text-white'}`}>次へ</button>
          </div>
          <button onClick={() => { addMasteredPhrase(currentPhrase.id); setPhraseIdx(Math.min(phrases.length - 1, phraseIdx + 1)); setShowJa(false); }}
            className={`w-full py-3 rounded-xl font-medium ${progress.masteredPhrases.includes(currentPhrase?.id || '') ? 'bg-green-500 text-white' : dm ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'}`}>
            {progress.masteredPhrases.includes(currentPhrase?.id || '') ? '習得済み ✓' : '習得済みにする'}
          </button>
          <div className="flex justify-center gap-1 flex-wrap">
            {phrases.map((p, i) => (
              <button key={p.id} onClick={() => { setPhraseIdx(i); setShowJa(false); }}
                className={`w-3 h-3 rounded-full ${i === phraseIdx ? 'bg-blue-500' : progress.masteredPhrases.includes(p.id) ? 'bg-green-500' : dm ? 'bg-gray-600' : 'bg-gray-300'}`} />
            ))}
          </div>
          <NextStepButton />
        </main>
      </div>
    );
  }

  // --- STEP 2: Listening ---
  if (timer.currentStep === 'listening') {
    return (
      <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <StepHeader />
        <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
          <div className={`p-4 rounded-xl ${dm ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <p className={`text-sm mb-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{phraseIdx + 1} / {phrases.length}</p>
            <p className={`text-lg mb-2 ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{currentPhrase?.japanese}</p>
            <p className={`text-sm ${dm ? 'text-gray-500' : 'text-gray-400'}`}>英語を聞いて理解しましょう</p>
          </div>
          <button onClick={() => { if (synthSupported && currentPhrase) { speak(currentPhrase.english, 0.9); incrementListeningCount(); } }} disabled={isSpeaking}
            className={`w-full py-6 rounded-2xl flex flex-col items-center gap-2 ${isSpeaking ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'} text-white`}>
            <span className="text-4xl">🎧</span>
            <span className="font-semibold text-lg">{isSpeaking ? '再生中...' : '聞く'}</span>
          </button>
          <div className="flex gap-3">
            <button onClick={() => { if (synthSupported && currentPhrase) { speak(currentPhrase.english, 0.6); incrementListeningCount(); } }} disabled={isSpeaking}
              className={`flex-1 py-3 rounded-xl ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>ゆっくり (0.6x)</button>
            <button onClick={() => { if (synthSupported && currentPhrase) { speak(currentPhrase.english, 1.2); incrementListeningCount(); } }} disabled={isSpeaking}
              className={`flex-1 py-3 rounded-xl ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>速く (1.2x)</button>
          </div>
          {showJa ? (
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-xl font-bold">{currentPhrase?.english}</p>
              <p className={`text-sm ${dm ? 'text-gray-500' : 'text-gray-400'}`}>/{currentPhrase?.pronunciation}/</p>
            </div>
          ) : (
            <button onClick={() => setShowJa(true)} className={`w-full py-3 rounded-xl ${dm ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>答えを見る</button>
          )}
          <div className="flex gap-3">
            <button onClick={() => { setPhraseIdx(Math.max(0, phraseIdx - 1)); setShowJa(false); }} disabled={phraseIdx === 0}
              className={`flex-1 py-3 rounded-xl ${phraseIdx === 0 ? 'opacity-40' : ''} ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>前へ</button>
            <button onClick={() => { setPhraseIdx(Math.min(phrases.length - 1, phraseIdx + 1)); setShowJa(false); }} disabled={phraseIdx === phrases.length - 1}
              className={`flex-1 py-3 rounded-xl ${phraseIdx === phrases.length - 1 ? 'opacity-40' : ''} bg-blue-500 text-white`}>次へ</button>
          </div>
          <NextStepButton />
        </main>
      </div>
    );
  }

  // --- STEP 3: Speaking ---
  if (timer.currentStep === 'speaking') {
    const handleMicDown = () => { resetTranscript(); setSpeakResult(null); startListening(); };
    const handleMicUp = () => { stopListening(); };

    // evaluate after transcript updates
    useEffect(() => {
      if (transcript && !isListening && currentPhrase) {
        const res = evaluate(transcript, currentPhrase.english);
        setSpeakResult(res);
        incrementSpeakingAttempts();
        if (res.similarity >= 85) addMasteredPhrase(currentPhrase.id);
      }
    }, [transcript, isListening]);

    return (
      <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <StepHeader />
        <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
          <div className={`rounded-2xl p-6 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <p className={`text-sm mb-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{phraseIdx + 1} / {phrases.length}</p>
            <p className="text-xl font-bold mb-1">{currentPhrase?.english}</p>
            <p className={`text-sm ${dm ? 'text-gray-500' : 'text-gray-400'}`}>/{currentPhrase?.pronunciation}/</p>
            <p className={`text-base mt-2 ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{currentPhrase?.japanese}</p>
          </div>
          <button onClick={() => { if (synthSupported && currentPhrase) { speak(currentPhrase.english, 0.9); incrementListeningCount(); } }} disabled={isSpeaking}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 ${isSpeaking ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
            🔊 お手本を聞く
          </button>
          {recogSupported && (
            <div className="flex flex-col items-center gap-2">
              <button onMouseDown={handleMicDown} onMouseUp={handleMicUp} onTouchStart={handleMicDown} onTouchEnd={handleMicUp}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 scale-110 animate-pulse' : dm ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <svg className={`w-10 h-10 ${isListening ? 'text-white' : dm ? 'text-gray-300' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{isListening ? '聞いています...' : '長押しして話す'}</p>
            </div>
          )}
          {!recogSupported && (
            <div className={`p-3 rounded-xl ${dm ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
              <p className={`text-sm ${dm ? 'text-yellow-400' : 'text-yellow-700'}`}>このブラウザは音声認識非対応です。Chromeをお使いください。</p>
            </div>
          )}
          {transcript && <div className={`p-3 rounded-lg ${dm ? 'bg-gray-700' : 'bg-gray-100'}`}><p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>あなたの発話:</p><p className="font-medium">{transcript}</p></div>}
          {speakResult && (
            <div className={`p-4 rounded-xl text-center ${speakResult.similarity >= 70 ? dm ? 'bg-green-900/30' : 'bg-green-50' : dm ? 'bg-red-900/30' : 'bg-red-50'}`}>
              <p className={`text-3xl font-bold ${speakResult.similarity >= 70 ? 'text-green-500' : 'text-red-500'}`}>{speakResult.similarity}%</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{speakResult.similarity >= 85 ? 'Excellent!' : speakResult.similarity >= 70 ? 'Good!' : 'Try again!'}</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => { setPhraseIdx(Math.max(0, phraseIdx - 1)); setSpeakResult(null); resetTranscript(); }} disabled={phraseIdx === 0}
              className={`flex-1 py-3 rounded-xl ${phraseIdx === 0 ? 'opacity-40' : ''} ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>前へ</button>
            <button onClick={() => { setPhraseIdx(Math.min(phrases.length - 1, phraseIdx + 1)); setSpeakResult(null); resetTranscript(); }} disabled={phraseIdx === phrases.length - 1}
              className={`flex-1 py-3 rounded-xl ${phraseIdx === phrases.length - 1 ? 'opacity-40' : ''} bg-blue-500 text-white`}>次へ</button>
          </div>
          <NextStepButton />
        </main>
      </div>
    );
  }

  // --- STEP 4: Quiz ---
  if (timer.currentStep === 'quiz') {
    const cq = quizQuestions[quizIdx];
    const isQuizDone = quizIdx >= quizQuestions.length || !cq;

    if (isQuizDone) {
      return (
        <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
          <StepHeader />
          <main className="max-w-lg mx-auto px-4 py-6 text-center space-y-6">
            <div className="text-5xl">🏆</div>
            <h2 className="text-2xl font-bold">クイズ結果</h2>
            <p className={`text-5xl font-bold ${quizScore >= quizQuestions.length * 0.7 ? 'text-green-500' : 'text-yellow-500'}`}>
              {Math.round((quizScore / quizQuestions.length) * 100)}%
            </p>
            <p className={dm ? 'text-gray-400' : 'text-gray-500'}>{quizScore} / {quizQuestions.length} 正解</p>
            <NextStepButton />
          </main>
        </div>
      );
    }

    return (
      <div className={`min-h-screen pb-8 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <StepHeader />
        <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
          <div className="flex justify-between text-sm">
            <span className={dm ? 'text-gray-400' : 'text-gray-500'}>問題 {quizIdx + 1} / {quizQuestions.length}</span>
            <span className="text-green-500 font-medium">正解: {quizScore}</span>
          </div>
          <div className={`rounded-2xl p-6 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className={`text-sm mb-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
              {cq.type === 'english_to_japanese' ? '日本語訳を選んでください' : '英語訳を選んでください'}
            </p>
            <p className="text-xl font-bold">{cq.question}</p>
          </div>
          <div className="space-y-3">
            {cq.options.map((opt, i) => {
              const isSel = quizSelected === opt;
              const isCorr = opt === cq.correctAnswer;
              const showG = quizAnswered && isCorr;
              const showR = quizAnswered && isSel && !isCorr;
              return (
                <button key={i} onClick={() => {
                  if (quizAnswered) return;
                  setQuizSelected(opt);
                  setQuizAnswered(true);
                  const correct = opt === cq.correctAnswer;
                  incrementQuizStats(correct);
                  if (correct) setQuizScore(s => s + 1);
                }} disabled={quizAnswered}
                  className={`w-full p-4 rounded-xl text-left transition-all shadow-sm ${showG ? 'bg-green-500 text-white' : showR ? 'bg-red-500 text-white' : isSel ? 'ring-2 ring-blue-500' : ''} ${!quizAnswered ? dm ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50' : dm ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${showG ? 'bg-green-600' : showR ? 'bg-red-600' : dm ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {showG ? '✓' : showR ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {quizAnswered && (
            <button onClick={() => { setQuizIdx(quizIdx + 1); setQuizSelected(null); setQuizAnswered(false); }}
              className="w-full py-4 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white">
              {quizIdx < quizQuestions.length - 1 ? '次の問題' : '結果を見る'}
            </button>
          )}
        </main>
      </div>
    );
  }

  return null;
};
