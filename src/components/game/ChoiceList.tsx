import React from 'react';
import { Choice } from '@/types';

interface ChoiceListProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
}

const ChoiceList: React.FC<ChoiceListProps> = ({ choices, onChoiceSelect }) => {
  const visibleChoices = choices.filter((choice) => choice.visible);

  if (visibleChoices.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      {visibleChoices.map((choice) => (
        <button
          key={choice.choiceId}
          onClick={() => onChoiceSelect(choice)}
          disabled={choice.disabled}
          className="choice-button w-full"
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default ChoiceList;
