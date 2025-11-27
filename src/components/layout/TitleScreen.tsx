import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { startNewGame } from '@/store/gameSlice';

const TitleScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleNewGame = () => {
    dispatch(startNewGame({ difficulty: 'normal' }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold font-game mb-4 text-game-highlight">
          脱獄
        </h1>
        <p className="text-2xl font-game text-game-text">
          ～7日間のタイムループ～
        </p>

        <div className="mt-12 space-y-4">
          <button
            onClick={handleNewGame}
            className="game-button block mx-auto min-w-[200px]"
          >
            ニューゲーム
          </button>

          <button
            className="game-button block mx-auto min-w-[200px] opacity-50 cursor-not-allowed"
            disabled
          >
            ロード
          </button>

          <button
            className="game-button block mx-auto min-w-[200px] opacity-50 cursor-not-allowed"
            disabled
          >
            設定
          </button>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>江戸時代を舞台にしたタイムループ型ADV</p>
          <p className="mt-2">処刑までの7日間を繰り返し、真実を解き明かせ</p>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
