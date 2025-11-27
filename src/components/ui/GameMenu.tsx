import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setGameStatus } from '@/store/gameSlice';

interface GameMenuProps {
  onClose: () => void;
  onSave: () => void;
  onLoad: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onClose, onSave, onLoad }) => {
  const dispatch = useAppDispatch();

  const handleReturnToTitle = () => {
    if (confirm('タイトルに戻りますか？（セーブしていないデータは失われます）')) {
      dispatch(setGameStatus('menu'));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-game-accent rounded-lg p-8 min-w-[400px]">
        <h2 className="text-3xl font-game text-game-highlight mb-6 text-center">
          メニュー
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="game-button w-full"
          >
            ゲームに戻る
          </button>

          <button onClick={onSave} className="game-button w-full">
            セーブ
          </button>

          <button onClick={onLoad} className="game-button w-full">
            ロード
          </button>

          <button
            onClick={handleReturnToTitle}
            className="game-button w-full bg-red-800 hover:bg-red-700"
          >
            タイトルに戻る
          </button>

          <button
            onClick={onClose}
            className="game-button w-full bg-gray-700 hover:bg-gray-600"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
