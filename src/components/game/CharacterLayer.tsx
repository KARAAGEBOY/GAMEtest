import React from 'react';
import { CharacterInScene } from '@/types';

interface CharacterLayerProps {
  characters: CharacterInScene[];
}

const CharacterLayer: React.FC<CharacterLayerProps> = ({ characters }) => {
  if (characters.length === 0) {
    return null;
  }

  const getPositionClass = (position: 'left' | 'center' | 'right') => {
    switch (position) {
      case 'left':
        return 'left-[10%]';
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      case 'right':
        return 'right-[10%]';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {characters.map((char, index) => (
        <div
          key={`${char.characterId}-${index}`}
          className={`absolute bottom-0 ${getPositionClass(char.xPosition)} transition-all duration-500`}
          style={{
            transform: `scale(${char.scale || 1})`,
          }}
        >
          {/* キャラクター画像のプレースホルダー */}
          <div className="w-64 h-96 bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">
              {char.characterId}
              <br />
              ({char.expression})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterLayer;
