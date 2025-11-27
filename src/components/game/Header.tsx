import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import GameMenu from '@/components/ui/GameMenu';
import SaveLoadMenu from '@/components/ui/SaveLoadMenu';

const Header: React.FC = () => {
  const currentLoop = useAppSelector((state) => state.game.currentLoop);
  const currentDay = useAppSelector((state) => state.game.currentDay);
  const [showMenu, setShowMenu] = useState(false);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const [showLoadMenu, setShowLoadMenu] = useState(false);

  const handleOpenSave = () => {
    setShowMenu(false);
    setShowSaveMenu(true);
  };

  const handleOpenLoad = () => {
    setShowMenu(false);
    setShowLoadMenu(true);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-70 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="text-lg font-game">
              <span className="text-game-highlight">ループ:</span> {currentLoop} / 6
            </div>
            <div className="text-lg font-game">
              <span className="text-game-highlight">日数:</span> {currentDay} / 7
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowMenu(true)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              メニュー
            </button>
          </div>
        </div>
      </div>

      {showMenu && (
        <GameMenu
          onClose={() => setShowMenu(false)}
          onSave={handleOpenSave}
          onLoad={handleOpenLoad}
        />
      )}

      {showSaveMenu && (
        <SaveLoadMenu
          mode="save"
          onClose={() => setShowSaveMenu(false)}
        />
      )}

      {showLoadMenu && (
        <SaveLoadMenu
          mode="load"
          onClose={() => setShowLoadMenu(false)}
        />
      )}
    </>
  );
};

export default Header;
