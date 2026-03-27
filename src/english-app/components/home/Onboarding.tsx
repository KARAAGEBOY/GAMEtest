import React, { useState } from 'react';
import { allPhrases } from '../../data/phrases';
import { QuizQuestion } from '../../types';

// Generate placement/final test questions from all phrases
const generateTestQuestions = (count: number = 20): QuizQuestion[] => {
  const shuffled = [...allPhrases].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((phrase, index) => {
    const type = index % 3 === 0
      ? 'english_to_japanese'
      : index % 3 === 1
        ? 'japanese_to_english'
        : 'listening';

    const otherPhrases = allPhrases.filter(p => p.id !== phrase.id);
    const wrongAnswers = otherPhrases
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => type === 'english_to_japanese' ? p.japanese : p.english);

    const correctAnswer = type === 'english_to_japanese' ? phrase.japanese : phrase.english;
    const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

    return {
      id: `test-${phrase.id}`,
      type: type as QuizQuestion['type'],
      question: type === 'english_to_japanese' ? phrase.english : phrase.japanese,
      correctAnswer,
      options,
      phraseId: phrase.id,
    };
  });
};

interface OnboardingProps {
  darkMode: boolean;
  onComplete: (score: number) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ darkMode, onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'explain' | 'test' | 'result'>('welcome');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleStartTest = () => {
    setQuestions(generateTestQuestions(20));
    setStep('test');
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;
    setSelected(answer);
    setAnswered(true);
    if (answer === questions[currentQ].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setStep('result');
    }
  };

  const finalScore = Math.round((score / questions.length) * 100);

  const getLevel = (s: number): { label: string; labelJa: string; color: string } => {
    if (s >= 80) return { label: 'Advanced', labelJa: '上級', color: 'text-purple-500' };
    if (s >= 60) return { label: 'Intermediate', labelJa: '中級', color: 'text-blue-500' };
    if (s >= 40) return { label: 'Pre-Intermediate', labelJa: '初中級', color: 'text-green-500' };
    if (s >= 20) return { label: 'Elementary', labelJa: '初級', color: 'text-yellow-500' };
    return { label: 'Beginner', labelJa: '入門', color: 'text-orange-500' };
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h1 className="text-3xl font-bold mb-3">English Booster 30</h1>
          <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            30日間で英会話力を爆上げ
          </p>
          <div className={`mt-6 p-4 rounded-xl text-left space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold">隔日1時間 x 15セッション</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>科学的間隔学習で定着率UP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold">成果を数値で可視化</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Before/Afterで成長を実感</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎤</span>
              <div>
                <p className="font-semibold">アウトプット特化</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>聞く+話す+テストの3本柱</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep('explain')}
            className="w-full mt-8 py-4 rounded-xl font-bold text-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            始める
          </button>
        </div>
      </div>
    );
  }

  // Explain Screen
  if (step === 'explain') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-6">📝</div>
          <h2 className="text-2xl font-bold mb-3">実力診断テスト</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            まず今の英会話力を測定します。<br />
            20問の4択問題に答えてください。
          </p>
          <div className={`p-4 rounded-xl text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className="font-semibold mb-2">テストの流れ</h3>
            <ul className={`text-sm space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <li>- 英語→日本語、日本語→英語の4択問題</li>
              <li>- 制限時間なし、リラックスして回答</li>
              <li>- 結果をもとにあなたの現在レベルを判定</li>
              <li>- 30日後に再テストして成長を比較</li>
            </ul>
          </div>
          <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              わからなくても大丈夫。今のレベルを正確に知ることが成長の第一歩です。
            </p>
          </div>
          <button
            onClick={handleStartTest}
            className="w-full mt-8 py-4 rounded-xl font-bold text-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            診断スタート
          </button>
        </div>
      </div>
    );
  }

  // Test Screen
  if (step === 'test' && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className={`min-h-screen px-4 py-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-lg mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Question {currentQ + 1} / {questions.length}
              </span>
              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Placement Test
              </span>
            </div>
            <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className={`rounded-2xl p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {q.type === 'english_to_japanese'
                ? 'この英語の日本語訳は？'
                : 'この日本語の英語訳は？'}
            </p>
            <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === opt;
              const isCorrect = opt === q.correctAnswer;
              const showCorrect = answered && isCorrect;
              const showWrong = answered && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showCorrect ? 'bg-green-500 text-white'
                    : showWrong ? 'bg-red-500 text-white'
                    : isSelected ? 'ring-2 ring-blue-500'
                    : ''
                  } ${
                    !answered
                      ? darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      : darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-sm`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      showCorrect ? 'bg-green-600'
                      : showWrong ? 'bg-red-600'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              {currentQ < questions.length - 1 ? '次の問題' : '結果を見る'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Result Screen
  if (step === 'result') {
    const level = getLevel(finalScore);
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-md w-full text-center">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">診断結果</h2>

          <div className={`my-6 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={`text-6xl font-bold mb-2 ${level.color}`}>
              {finalScore}
              <span className="text-2xl">点</span>
            </p>
            <p className={`text-xl font-semibold ${level.color}`}>
              {level.labelJa} ({level.label})
            </p>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {score} / {questions.length} 問正解
            </p>
          </div>

          <div className={`p-4 rounded-xl text-left ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <p className={`font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              30日後の目標
            </p>
            <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              隔日1時間×15セッションで、このスコアを大幅に伸ばします。
              最終テストであなたの成長を数値で証明します。
            </p>
          </div>

          <div className={`mt-4 p-4 rounded-xl text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <p className="font-medium mb-2">あなたのプログラム</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className="text-lg font-bold">15</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>セッション</p>
              </div>
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className="text-lg font-bold">隔日</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>学習日</p>
              </div>
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p className="text-lg font-bold">60分</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/ セッション</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete(finalScore)}
            className="w-full mt-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white transition-opacity"
          >
            プログラム開始
          </button>
        </div>
      </div>
    );
  }

  return null;
};
