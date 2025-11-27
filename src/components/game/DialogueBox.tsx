import React, { useState, useEffect } from 'react';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  characterImage?: string;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ speaker, text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30); // タイピング速度

    return () => clearInterval(interval);
  }, [text]);

  const handleClick = () => {
    if (!isComplete) {
      setDisplayedText(text);
      setIsComplete(true);
    }
  };

  const getSpeakerName = (speaker: string) => {
    if (speaker === 'narrator') return 'ナレーション';
    const nameMap: Record<string, string> = {
      jin4: '甚四',
      otsu: 'お通',
      jiheibei: '治兵衛',
      kito: '鬼頭',
      protagonist: '主人公',
    };
    return nameMap[speaker] || speaker;
  };

  return (
    <div className="dialogue-box cursor-pointer" onClick={handleClick}>
      <div className="mb-2">
        <span className="text-game-highlight font-bold text-xl font-game">
          {getSpeakerName(speaker)}
        </span>
      </div>
      <div className="text-lg leading-relaxed font-game">
        {displayedText}
        {!isComplete && <span className="animate-pulse">▼</span>}
      </div>
    </div>
  );
};

export default DialogueBox;
