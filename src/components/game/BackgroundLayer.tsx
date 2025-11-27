import React from 'react';

interface BackgroundLayerProps {
  backgroundImage: string;
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ backgroundImage }) => {
  // 背景画像がない場合はデフォルトの背景を表示
  if (!backgroundImage) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
    );
  }

  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    />
  );
};

export default BackgroundLayer;
