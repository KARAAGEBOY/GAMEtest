import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from '../common/Header';
import { allPhrases } from '../../data/phrases';
import { QuizQuestion } from '../../types';

// Generate final test
const generateFinalTest = (count: number = 20): QuizQuestion[] => {
  const shuffled = [...allPhrases].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((phrase, index) => {
    const type = index % 2 === 0 ? 'english_to_japanese' : 'japanese_to_english';
    const wrong = allPhrases.filter(p => p.id !== phrase.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const correct = type === 'english_to_japanese' ? phrase.japanese : phrase.english;
    return {
      id: `final-${phrase.id}`, type: type as QuizQuestion['type'],
      question: type === 'english_to_japanese' ? phrase.english : phrase.japanese,
      correctAnswer: correct,
      options: [...wrong.map(w => type === 'english_to_japanese' ? w.japanese : w.english), correct].sort(() => Math.random() - 0.5),
      phraseId: phrase.id,
    };
  });
};

export const Dashboard: React.FC = () => {
  const { darkMode, progress, placementScore, finalScore, setFinalScore, resetProgress } = useAppStore();
  const { stats, badges, completedSessions, masteredPhrases, streak } = progress;
  const dm = darkMode;

  // Final test state
  const [showFinalTest, setShowFinalTest] = useState(false);
  const [testQs, setTestQs] = useState<QuizQuestion[]>([]);
  const [testIdx, setTestIdx] = useState(0);
  const [testSel, setTestSel] = useState<string | null>(null);
  const [testAnswered, setTestAnswered] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [testDone, setTestDone] = useState(false);

  const quizAccuracy = stats.quizTotal > 0 ? Math.round((stats.quizCorrect / stats.quizTotal) * 100) : 0;
  const earnedBadges = badges.filter(b => b.earnedAt);
  const canTakeFinal = completedSessions.length >= 10;

  const startFinalTest = () => {
    setTestQs(generateFinalTest(20));
    setTestIdx(0); setTestSel(null); setTestAnswered(false); setTestScore(0); setTestDone(false);
    setShowFinalTest(true);
  };

  const handleTestAnswer = (opt: string) => {
    if (testAnswered) return;
    setTestSel(opt);
    setTestAnswered(true);
    if (opt === testQs[testIdx].correctAnswer) setTestScore(s => s + 1);
  };

  const handleTestNext = () => {
    if (testIdx < testQs.length - 1) {
      setTestIdx(testIdx + 1); setTestSel(null); setTestAnswered(false);
    } else {
      const score = Math.round(((testScore + (testSel === testQs[testIdx]?.correctAnswer ? 0 : 0)) / testQs.length) * 100);
      setFinalScore(score);
      setTestDone(true);
    }
  };

  // Final test UI
  if (showFinalTest && !testDone && testQs.length > 0) {
    const q = testQs[testIdx];
    return (
      <div className={`min-h-screen pb-20 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header title="Final Test" showBack onBack={() => setShowFinalTest(false)} />
        <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className={dm ? 'text-gray-400' : 'text-gray-500'}>Question {testIdx + 1} / {testQs.length}</span>
          </div>
          <div className={`h-2 rounded-full ${dm ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${((testIdx + 1) / testQs.length) * 100}%` }} />
          </div>
          <div className={`rounded-2xl p-6 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className={`text-sm mb-2 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{q.type === 'english_to_japanese' ? '日本語訳は？' : '英語訳は？'}</p>
            <p className="text-xl font-bold">{q.question}</p>
          </div>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const showG = testAnswered && opt === q.correctAnswer;
              const showR = testAnswered && testSel === opt && opt !== q.correctAnswer;
              return (
                <button key={i} onClick={() => handleTestAnswer(opt)} disabled={testAnswered}
                  className={`w-full p-4 rounded-xl text-left shadow-sm ${showG ? 'bg-green-500 text-white' : showR ? 'bg-red-500 text-white' : !testAnswered ? dm ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50' : dm ? 'bg-gray-800' : 'bg-white'}`}>
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
          {testAnswered && (
            <button onClick={handleTestNext} className="w-full py-4 rounded-xl font-medium bg-blue-500 text-white">{testIdx < testQs.length - 1 ? '次の問題' : '結果を見る'}</button>
          )}
        </main>
      </div>
    );
  }

  // Final test result
  if (showFinalTest && testDone) {
    const fScore = Math.round((testScore / testQs.length) * 100);
    const improvement = placementScore !== null ? fScore - placementScore : null;
    return (
      <div className={`min-h-screen pb-20 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header title="Final Result" />
        <main className="max-w-lg mx-auto px-4 py-6 text-center space-y-6">
          <div className="text-5xl">🎓</div>
          <h2 className="text-2xl font-bold">最終テスト結果</h2>
          {/* Before / After */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl ${dm ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`text-sm mb-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Before</p>
              <p className="text-4xl font-bold text-gray-400">{placementScore ?? '?'}%</p>
              <p className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>初回診断</p>
            </div>
            <div className={`p-5 rounded-2xl ${dm ? 'bg-blue-900/40' : 'bg-blue-50'}`}>
              <p className={`text-sm mb-1 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>After</p>
              <p className="text-4xl font-bold text-blue-500">{fScore}%</p>
              <p className={`text-xs ${dm ? 'text-blue-400' : 'text-blue-500'}`}>最終テスト</p>
            </div>
          </div>
          {improvement !== null && (
            <div className={`p-4 rounded-xl ${improvement > 0 ? dm ? 'bg-green-900/30' : 'bg-green-50' : dm ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`text-3xl font-bold ${improvement > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                {improvement > 0 ? '+' : ''}{improvement}%
              </p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                {improvement > 0 ? 'スコアが向上しました！' : improvement === 0 ? 'スコア変化なし' : '前回を下回りましたが、学習は確実に蓄積されています'}
              </p>
            </div>
          )}
          <button onClick={() => setShowFinalTest(false)} className="w-full py-4 rounded-xl bg-blue-500 text-white font-bold">ダッシュボードに戻る</button>
        </main>
      </div>
    );
  }

  // Main dashboard
  const handleReset = () => {
    if (window.confirm('全ての進捗がリセットされます。よろしいですか？')) resetProgress();
  };

  return (
    <div className={`min-h-screen pb-20 ${dm ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header title="成果ダッシュボード" />
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* Before/After Card */}
        <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold mb-4">Before / After</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-4 rounded-xl text-center ${dm ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>初回診断</p>
              <p className="text-3xl font-bold text-gray-400">{placementScore ?? '?'}%</p>
            </div>
            <div className={`p-4 rounded-xl text-center ${dm ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <p className={`text-sm ${dm ? 'text-blue-400' : 'text-blue-500'}`}>最終テスト</p>
              <p className={`text-3xl font-bold ${finalScore !== null ? 'text-blue-500' : dm ? 'text-gray-600' : 'text-gray-300'}`}>
                {finalScore !== null ? `${finalScore}%` : '---'}
              </p>
            </div>
          </div>
          {canTakeFinal ? (
            <button onClick={startFinalTest} className={`w-full py-3 rounded-xl font-medium ${finalScore !== null ? dm ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'}`}>
              {finalScore !== null ? '最終テストを再受験' : '最終テストを受ける'}
            </button>
          ) : (
            <p className={`text-sm text-center ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
              10セッション完了後に最終テストを受けられます ({completedSessions.length}/10)
            </p>
          )}
        </div>

        {/* Overview */}
        <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold mb-4">進捗概要</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`text-3xl font-bold ${dm ? 'text-blue-400' : 'text-blue-600'}`}>{completedSessions.length}/15</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>セッション完了</p>
            </div>
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className={`text-3xl font-bold ${dm ? 'text-green-400' : 'text-green-600'}`}>{masteredPhrases.length}</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>習得フレーズ</p>
            </div>
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <p className={`text-3xl font-bold ${dm ? 'text-orange-400' : 'text-orange-600'}`}>{streak}</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>連続ストリーク</p>
            </div>
            <div className={`p-4 rounded-xl ${dm ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <p className={`text-3xl font-bold ${dm ? 'text-purple-400' : 'text-purple-600'}`}>{stats.totalStudyTime}</p>
              <p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>学習時間(分)</p>
            </div>
          </div>
        </div>

        {/* Practice Stats */}
        <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold mb-4">練習統計</h3>
          <div className="space-y-3">
            {[
              { icon: '🎤', name: 'スピーキング', value: `${stats.speakingAttempts} 回` },
              { icon: '🎧', name: 'リスニング', value: `${stats.listeningCount} 回` },
              { icon: '🃏', name: 'フラッシュカード', value: `${stats.flashcardReviews} 回` },
              { icon: '❓', name: 'クイズ正答率', value: `${quizAccuracy}% (${stats.quizCorrect}/${stats.quizTotal})` },
            ].map(s => (
              <div key={s.name} className={`flex items-center justify-between p-3 rounded-xl ${dm ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-medium">{s.name}</span>
                </div>
                <span className={dm ? 'text-gray-300' : 'text-gray-600'}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 15-session grid */}
        <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold mb-4">セッション進捗</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }, (_, i) => i + 1).map(s => {
              const done = completedSessions.includes(s);
              const current = s === progress.currentSession;
              return (
                <div key={s} className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium ${done ? 'bg-green-500 text-white' : current ? 'bg-blue-500 text-white' : dm ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                  <span>{done ? '✓' : s}</span>
                  <span className="text-[10px] opacity-60">Day{s * 2 - 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <div className={`rounded-2xl p-5 ${dm ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-semibold mb-4">バッジ ({earnedBadges.length}/{badges.length})</h3>
          <div className="grid grid-cols-4 gap-2">
            {badges.map(b => (
              <div key={b.id} className={`p-2 rounded-xl text-center ${b.earnedAt ? dm ? 'bg-yellow-900/30' : 'bg-yellow-50' : dm ? 'bg-gray-700 opacity-40' : 'bg-gray-100 opacity-40'}`}>
                <span className={`text-2xl ${!b.earnedAt ? 'grayscale' : ''}`}>{b.icon}</span>
                <p className="text-[10px] mt-1">{b.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button onClick={handleReset} className={`w-full py-3 rounded-xl font-medium ${dm ? 'bg-red-900/40 text-red-400' : 'bg-red-100 text-red-600'}`}>
          全データリセット
        </button>
      </main>
    </div>
  );
};
