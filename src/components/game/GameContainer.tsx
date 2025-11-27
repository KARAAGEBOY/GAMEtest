import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCurrentScene } from '@/store/gameSlice';
import Header from './Header';
import DialogueBox from './DialogueBox';
import ChoiceList from './ChoiceList';
import BackgroundLayer from './BackgroundLayer';
import CharacterLayer from './CharacterLayer';
import { ScenarioEngine } from '@/features/scenario/ScenarioEngine';
import { FlagManager } from '@/features/flag/FlagManager';
import { ChoiceHandler } from '@/features/choice/ChoiceHandler';
import { Choice } from '@/types';

const GameContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScene = useAppSelector((state) => state.game.currentScene);
  const flagSystem = useAppSelector((state) => state.game.flagSystem);

  const [managers] = useState(() => {
    const flagManager = new FlagManager(flagSystem);
    const scenarioEngine = new ScenarioEngine(flagManager);
    const choiceHandler = new ChoiceHandler(flagManager, scenarioEngine);
    return { flagManager, scenarioEngine, choiceHandler };
  });

  useEffect(() => {
    // 初回シーンの読み込み
    if (!currentScene) {
      managers.scenarioEngine.loadScene('loop1_day1_opening').then((scene) => {
        dispatch(setCurrentScene(scene));
      });
    }
  }, [currentScene, dispatch, managers.scenarioEngine]);

  const handleChoiceSelect = (choice: Choice) => {
    managers.choiceHandler.handleChoice(choice);
  };

  if (!currentScene) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-game-bg">
        <p className="text-white text-xl">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-game-bg">
      <Header />

      <div className="relative w-full h-full">
        <BackgroundLayer backgroundImage={currentScene.backgroundImage} />
        <CharacterLayer characters={currentScene.characters} />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <DialogueBox
            speaker={currentScene.narrative.speaker}
            text={currentScene.narrative.text}
          />

          {currentScene.choices.length > 0 && (
            <ChoiceList
              choices={currentScene.choices}
              onChoiceSelect={handleChoiceSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
