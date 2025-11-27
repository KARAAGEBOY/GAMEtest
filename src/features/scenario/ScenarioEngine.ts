import { IScenarioEngine, SceneDefinition, AutomaticEvent } from '@/types';
import { FlagManager } from '@/features/flag/FlagManager';

/**
 * シナリオエンジン
 * シーン定義の読み込み、シーンフロー管理、自動イベント実行を担当
 */
export class ScenarioEngine implements IScenarioEngine {
  private currentScene: SceneDefinition | null;
  private sceneHistory: SceneDefinition[];
  private flagManager: FlagManager;
  private sceneCache: Map<string, SceneDefinition>;

  constructor(flagManager: FlagManager) {
    this.currentScene = null;
    this.sceneHistory = [];
    this.flagManager = flagManager;
    this.sceneCache = new Map();
  }

  /**
   * シーンを読み込み
   * @param sceneId - シーンID
   */
  async loadScene(sceneId: string): Promise<SceneDefinition> {
    // キャッシュをチェック
    if (this.sceneCache.has(sceneId)) {
      const cachedScene = this.sceneCache.get(sceneId)!;
      this.setCurrentScene(cachedScene);
      return cachedScene;
    }

    try {
      // シーンデータを動的インポート
      const sceneData = await this.fetchSceneData(sceneId);

      // キャッシュに保存
      this.sceneCache.set(sceneId, sceneData);

      // 現在のシーンとして設定
      this.setCurrentScene(sceneData);

      // 自動イベントを実行
      if (sceneData.automaticEvents) {
        for (const event of sceneData.automaticEvents) {
          if (event.trigger === 'sceneStart') {
            this.executeAutomaticEvent(event);
          }
        }
      }

      return sceneData;
    } catch (error) {
      console.error(`Failed to load scene: ${sceneId}`, error);
      throw new Error(`Scene not found: ${sceneId}`);
    }
  }

  /**
   * シーンデータを取得
   * @param sceneId - シーンID
   */
  private async fetchSceneData(sceneId: string): Promise<SceneDefinition> {
    // シーンIDからファイルパスを推測
    // 例: "loop1_day1_opening" -> "/src/data/scenarios/loop1/day1.json"
    const [loopPart, dayPart] = sceneId.split('_');
    const loopId = loopPart.replace('loop', '');
    const dayId = dayPart.replace('day', '');

    try {
      // JSONファイルを動的インポート
      const module = await import(`@/data/scenarios/loop${loopId}/day${dayId}.json`);

      // JSONから該当するシーンを検索
      const scenes = module.default.scenes || [module.default];
      const scene = scenes.find((s: SceneDefinition) => s.sceneId === sceneId);

      if (!scene) {
        throw new Error(`Scene ${sceneId} not found in file`);
      }

      return scene;
    } catch (error) {
      // フォールバック: ダミーシーンを返す（開発中）
      console.warn(`Scene file not found, returning dummy scene for ${sceneId}`);
      return this.createDummyScene(sceneId);
    }
  }

  /**
   * ダミーシーンを作成（開発用）
   */
  private createDummyScene(sceneId: string): SceneDefinition {
    return {
      sceneId,
      loopId: 1,
      dayId: 1,
      title: 'ダミーシーン',
      narrative: {
        text: `これは ${sceneId} のダミーシーンです。`,
        speaker: 'narrator',
      },
      backgroundImage: '',
      characters: [],
      choices: [],
    };
  }

  /**
   * 現在のシーンを設定
   */
  private setCurrentScene(scene: SceneDefinition): void {
    this.currentScene = scene;
    this.sceneHistory.push(scene);
  }

  /**
   * シーン遷移
   * @param nextSceneId - 次のシーンID
   */
  transitionScene(nextSceneId: string): void {
    // 現在のシーンの終了イベントを実行
    if (this.currentScene?.automaticEvents) {
      for (const event of this.currentScene.automaticEvents) {
        if (event.trigger === 'sceneEnd') {
          this.executeAutomaticEvent(event);
        }
      }
    }

    // 次のシーンを読み込み（非同期なので Promise を返す）
    this.loadScene(nextSceneId).catch((error) => {
      console.error('Failed to transition scene:', error);
    });
  }

  /**
   * 自動イベントを実行
   * @param event - 自動イベント
   */
  executeAutomaticEvent(event: AutomaticEvent): void {
    // 条件チェック
    if (event.condition) {
      const conditionMet = this.evaluateCondition(event.condition);
      if (!conditionMet) {
        return;
      }
    }

    // アクションを実行
    switch (event.action) {
      case 'setFlag':
        // 条件からフラグを設定（実装は簡略化）
        break;
      case 'showCharacterReaction':
        // キャラクターリアクションを表示（UIレイヤーで処理）
        console.log(`Character reaction: ${event.narrative}`);
        break;
      case 'playSound':
        // サウンドを再生（Audio APIで処理）
        break;
      case 'gotoScene':
        // シーン遷移
        if (event.narrative) {
          this.transitionScene(event.narrative);
        }
        break;
    }
  }

  /**
   * 条件文字列を評価
   * @param condition - 条件文字列
   */
  private evaluateCondition(condition: string): boolean {
    try {
      // 簡易的な条件評価
      // 例: "flagExists(loop_1.jin4_met) AND currentLoop > 1"

      // flagExists関数をエミュレート
      const flagExistsPattern = /flagExists\(([^)]+)\)/g;
      let evaluatedCondition = condition.replace(
        flagExistsPattern,
        (_, flagPath) => {
          const value = this.flagManager.getFlag(flagPath);
          return value ? 'true' : 'false';
        }
      );

      // currentLoopなどの変数を置き換え（実装は簡略化）
      evaluatedCondition = evaluatedCondition
        .replace(/AND/g, '&&')
        .replace(/OR/g, '||');

      // 安全でない eval は避け、基本的な比較のみサポート
      // 本番環境では適切なパーサーを使用すべき
      return evaluatedCondition.includes('true');
    } catch (error) {
      console.error('Failed to evaluate condition:', condition, error);
      return false;
    }
  }

  /**
   * 現在のシーンを取得
   */
  getCurrentScene(): SceneDefinition | null {
    return this.currentScene;
  }

  /**
   * シーン履歴を取得
   */
  getSceneHistory(): SceneDefinition[] {
    return this.sceneHistory;
  }

  /**
   * キャッシュをクリア
   */
  clearCache(): void {
    this.sceneCache.clear();
  }
}
