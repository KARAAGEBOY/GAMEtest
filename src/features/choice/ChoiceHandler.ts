import {
  IChoiceHandler,
  SceneDefinition,
  Choice,
} from '@/types';
import { FlagManager } from '@/features/flag/FlagManager';
import { ScenarioEngine } from '@/features/scenario/ScenarioEngine';
import { store } from '@/store/store';
import { applyFlagOperation, setCurrentScene } from '@/store/gameSlice';

/**
 * 選択肢ハンドラー
 * 選択肢の表示条件判定、選択肢クリック時の処理を担当
 */
export class ChoiceHandler implements IChoiceHandler {
  private flagManager: FlagManager;
  private scenarioEngine: ScenarioEngine;

  constructor(flagManager: FlagManager, scenarioEngine: ScenarioEngine) {
    this.flagManager = flagManager;
    this.scenarioEngine = scenarioEngine;
  }

  /**
   * 表示可能な選択肢を取得
   * @param scene - 現在のシーン
   */
  getVisibleChoices(scene: SceneDefinition): Choice[] {
    return scene.choices.filter((choice) => {
      // 基本的な可視性チェック
      if (!choice.visible) {
        return false;
      }

      // 条件が設定されている場合はチェック
      if (choice.conditionRequired) {
        return this.flagManager.checkFlag(choice.conditionRequired);
      }

      return true;
    });
  }

  /**
   * 選択肢を処理
   * @param choice - 選択された選択肢
   */
  handleChoice(choice: Choice): void {
    // 選択肢を記録
    this.recordChoice(choice);

    // フラグ操作を適用してシーン遷移
    this.applyChoiceFlagsAndTransition(choice);
  }

  /**
   * 選択肢を記録
   * @param choice - 選択された選択肢
   */
  recordChoice(choice: Choice): void {
    const state = store.getState();
    const currentLoop = state.game.currentLoop;
    const loopKey = `loop_${currentLoop}`;

    const choiceRecord = {
      sceneId: state.game.currentSceneId || '',
      choiceText: choice.text,
      choiceId: choice.choiceId,
      timestamp: new Date().toISOString(),
    };

    // 選択履歴に追加（FlagSystemに記録）
    const flagSystem = this.flagManager.getFlagSystem();
    if (!flagSystem.choiceHistory[loopKey]) {
      flagSystem.choiceHistory[loopKey] = [];
    }
    flagSystem.choiceHistory[loopKey].push(choiceRecord);
  }

  /**
   * 選択肢のフラグ操作を適用してシーン遷移
   * @param choice - 選択された選択肢
   */
  applyChoiceFlagsAndTransition(choice: Choice): void {
    // フラグ操作を適用
    for (const flagOperation of choice.flagsApplied) {
      // Reduxストアに反映
      store.dispatch(applyFlagOperation(flagOperation));

      // FlagManagerにも反映（同期）
      this.flagManager.applyFlagOperation(flagOperation);
    }

    // シーン遷移
    this.transitionToNextScene(choice.nextSceneId);
  }

  /**
   * 次のシーンに遷移
   * @param nextSceneId - 次のシーンID
   */
  private async transitionToNextScene(nextSceneId: string): Promise<void> {
    try {
      const nextScene = await this.scenarioEngine.loadScene(nextSceneId);
      store.dispatch(setCurrentScene(nextScene));
    } catch (error) {
      console.error('Failed to transition to next scene:', error);
    }
  }
}
