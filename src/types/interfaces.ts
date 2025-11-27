import {
  SceneDefinition,
  FlagSystem,
  FlagOperation,
  FlagCondition,
  EndingDefinition,
  GameSession,
  SaveMetadata,
  Choice,
  AutomaticEvent,
} from './game';

/**
 * シナリオエンジン
 */
export interface IScenarioEngine {
  loadScene(sceneId: string): Promise<SceneDefinition>;
  transitionScene(nextSceneId: string): void;
  executeAutomaticEvent(event: AutomaticEvent): void;
  getCurrentScene(): SceneDefinition | null;
  getSceneHistory(): SceneDefinition[];
}

/**
 * フラグマネージャー
 */
export interface IFlagManager {
  setFlag(flagPath: string, value: unknown): void;
  getFlag(flagPath: string): unknown;
  checkFlag(condition: FlagCondition): boolean;
  incrementFlag(flagPath: string, amount: number): void;
  resetLoopFlags(): void;
  getLoopFlags(loopId: number): FlagSystem['loopFlags'];
  applyFlagOperation(operation: FlagOperation): void;
  getFlagSystem(): FlagSystem;
}

/**
 * 選択肢ハンドラー
 */
export interface IChoiceHandler {
  getVisibleChoices(scene: SceneDefinition): Choice[];
  handleChoice(choice: Choice): void;
  recordChoice(choice: Choice): void;
  applyChoiceFlagsAndTransition(choice: Choice): void;
}

/**
 * エンディング判定エンジン
 */
export interface IEndingEngine {
  checkEndingConditions(): EndingDefinition[];
  getAvailableEndings(): EndingDefinition[];
  triggerEnding(endingId: string): void;
  isEndingLocked(endingId: string): boolean;
  getEndingProgress(endingId: string): number; // 0-100
}

/**
 * ループマネージャー
 */
export interface ILoopManager {
  getCurrentLoop(): number;
  advanceLoop(): void;
  resetToNewLoop(): void;
  getCurrentDay(): number;
  advanceDay(): void;
  triggerLoopReset(resetReason: 'execution' | 'failure'): void;
  getLoopData(loopId: number): FlagSystem['loopFlags'];
}

/**
 * セーブマネージャー
 */
export interface ISaveManager {
  saveGame(slotId: number): Promise<void>;
  loadGame(slotId: number): Promise<GameSession>;
  deleteSlot(slotId: number): Promise<void>;
  listSaves(): SaveMetadata[];
  autoSave(): Promise<void>;
  exportSave(slotId: number): string;
  importSave(jsonData: string): Promise<void>;
}
