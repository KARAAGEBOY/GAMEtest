import React, { useState, useEffect } from 'react';
import { SaveManager } from '@/features/save/SaveManager';
import { SaveMetadata } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { loadGame } from '@/store/gameSlice';

interface SaveLoadMenuProps {
  mode: 'save' | 'load';
  onClose: () => void;
}

const SaveLoadMenu: React.FC<SaveLoadMenuProps> = ({ mode, onClose }) => {
  const dispatch = useAppDispatch();
  const [saveManager] = useState(() => new SaveManager());
  const [saves, setSaves] = useState<SaveMetadata[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  useEffect(() => {
    loadSaveList();
  }, []);

  const loadSaveList = () => {
    const saveList = saveManager.listSaves();
    setSaves(saveList);
  };

  const handleSave = async (slotId: number) => {
    try {
      await saveManager.saveGame(slotId);
      loadSaveList();
      alert(`スロット ${slotId} にセーブしました`);
    } catch (error) {
      alert('セーブに失敗しました');
      console.error(error);
    }
  };

  const handleLoad = async (slotId: number) => {
    try {
      const gameSession = await saveManager.loadGame(slotId);
      dispatch(loadGame(gameSession));
      alert(`スロット ${slotId} からロードしました`);
      onClose();
    } catch (error) {
      alert('ロードに失敗しました');
      console.error(error);
    }
  };

  const handleDelete = async (slotId: number) => {
    if (confirm(`スロット ${slotId} を削除しますか？`)) {
      try {
        await saveManager.deleteSlot(slotId);
        loadSaveList();
        alert(`スロット ${slotId} を削除しました`);
      } catch (error) {
        alert('削除に失敗しました');
        console.error(error);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ja-JP');
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}時間${minutes}分`;
  };

  const getSaveData = (slotId: number) => {
    return saves.find((s) => s.slotId === slotId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-4 border-game-accent rounded-lg p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-game text-game-highlight">
            {mode === 'save' ? 'セーブ' : 'ロード'}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-game-highlight"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((slotId) => {
            const saveData = getSaveData(slotId);
            const isEmpty = !saveData;

            return (
              <div
                key={slotId}
                className={`border-2 rounded p-4 cursor-pointer transition-all ${
                  selectedSlot === slotId
                    ? 'border-game-highlight bg-gray-800'
                    : 'border-gray-700 hover:border-game-accent'
                }`}
                onClick={() => setSelectedSlot(slotId)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-game text-white">
                    スロット {slotId}
                  </h3>
                  {!isEmpty && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(slotId);
                      }}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      削除
                    </button>
                  )}
                </div>

                {isEmpty ? (
                  <p className="text-gray-500 text-sm">空きスロット</p>
                ) : (
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>ループ {saveData.loop} - {saveData.day}日目</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(saveData.timestamp)}
                    </p>
                    <p className="text-xs text-gray-400">
                      プレイ時間: {formatPlayTime(saveData.playTime)}
                    </p>
                  </div>
                )}

                {mode === 'save' && selectedSlot === slotId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(slotId);
                    }}
                    className="mt-2 w-full game-button text-sm py-1"
                  >
                    このスロットにセーブ
                  </button>
                )}

                {mode === 'load' && !isEmpty && selectedSlot === slotId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoad(slotId);
                    }}
                    className="mt-2 w-full game-button text-sm py-1"
                  >
                    このスロットからロード
                  </button>
                )}
              </div>
            );
          })}

          {/* オートセーブスロット */}
          <div className="border-2 border-blue-700 rounded p-4 col-span-2">
            <h3 className="text-xl font-game text-blue-400 mb-2">
              オートセーブ (スロット 10)
            </h3>
            {getSaveData(10) ? (
              <div className="text-sm text-gray-300 space-y-1">
                <p>ループ {getSaveData(10)!.loop} - {getSaveData(10)!.day}日目</p>
                <p className="text-xs text-gray-400">
                  {formatDate(getSaveData(10)!.timestamp)}
                </p>
                {mode === 'load' && (
                  <button
                    onClick={() => handleLoad(10)}
                    className="mt-2 game-button text-sm py-1"
                  >
                    オートセーブからロード
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">オートセーブなし</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="game-button">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveLoadMenu;
