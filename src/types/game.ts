/**
 * ゲームセッション全体の状態
 */
export interface GameSession {
  sessionId: string;
  currentLoop: number;
  currentDay: number;
  gameStatus: GameStatus;
  difficulty: Difficulty;
  createdAt: string;
  lastSavedAt: string;
  totalPlayTime: number;
  characterStates: Record<string, CharacterState>;
  flagSystem: FlagSystem;
  inventory: Item[];
  currentSceneId: string;
  endingType: string | null;
}

export type GameStatus = 'menu' | 'playing' | 'paused' | 'ended';
export type Difficulty = 'easy' | 'normal' | 'hard';

/**
 * フラグシステム
 */
export interface FlagSystem {
  globalFlags: GlobalFlags;
  loopFlags: Record<string, LoopFlags>;
  characterTrustLevels: Record<string, number>;
  choiceHistory: Record<string, ChoiceRecord[]>;
  eventLog: EventLogEntry[];
}

export interface GlobalFlags {
  firstLoopCompleted: boolean;
  introSkipped: boolean;
  cityWarningLevel: number;
  masterBetrayal: boolean;
  [key: string]: boolean | number | string;
}

export interface LoopFlags {
  jin4_met: boolean;
  jin4_trust: number;
  otsu_met: boolean;
  otsu_trust: number;
  jiheibei_met: boolean;
  jiheibei_trust: number;
  kito_met: boolean;
  kito_trust: number;
  evidence_found: boolean;
  escaped: boolean;
  executionDate: boolean;
  [key: string]: boolean | number | string;
}

export interface ChoiceRecord {
  sceneId: string;
  choiceText: string;
  choiceId: string;
  timestamp: string;
}

export interface EventLogEntry {
  loop: number;
  day: number;
  event: string;
  result: string;
  timestamp?: string;
}

/**
 * キャラクター状態
 */
export interface CharacterState {
  characterId: string;
  name: string;
  currentLoop: number;
  trustLevel: number;
  suspicionLevel: number;
  lastSeenDay: number;
  dialogueHistory: DialogueRecord[];
  relationships: Record<string, number>;
  status: CharacterStatus;
  visibleState: CharacterVisibleState;
}

export type CharacterStatus = 'alive' | 'dead' | 'escaped';
export type CharacterVisibleState = 'present' | 'absent' | 'hidden';

export interface DialogueRecord {
  loop: number;
  day: number;
  dialogueId: string;
  chosenPath: string;
}

/**
 * アイテム
 */
export interface Item {
  itemId: string;
  name: string;
  description: string;
  type: ItemType;
  usable: boolean;
}

export type ItemType = 'key_item' | 'evidence' | 'tool' | 'misc';

/**
 * シーン定義
 */
export interface SceneDefinition {
  sceneId: string;
  loopId: number;
  dayId: number;
  title: string;
  narrative: Narrative;
  backgroundImage: string;
  characters: CharacterInScene[];
  bgm?: string;
  se?: string;
  choices: Choice[];
  automaticEvents?: AutomaticEvent[];
}

export interface Narrative {
  text: string;
  speaker: string; // 'narrator' or character ID
}

export interface CharacterInScene {
  characterId: string;
  xPosition: 'left' | 'center' | 'right';
  expression: string;
  scale?: number;
}

export interface Choice {
  choiceId: string;
  text: string;
  nextSceneId: string;
  flagsApplied: FlagOperation[];
  conditionRequired: FlagCondition | null;
  visible: boolean;
  disabled?: boolean;
}

export interface FlagOperation {
  flagType: FlagType;
  targetId?: string;
  operation: FlagOperationType;
  value: number | boolean | string;
  maxValue?: number;
  minValue?: number;
}

export type FlagType = 'characterTrust' | 'globalFlag' | 'loopFlag' | 'eventLog';
export type FlagOperationType = 'set' | 'increase' | 'decrease';

export interface FlagCondition {
  type: 'characterTrust' | 'globalFlag' | 'loopFlag';
  targetId?: string;
  operator: ComparisonOperator;
  value: number | boolean | string;
  flagName?: string;
}

export type ComparisonOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';

export interface AutomaticEvent {
  eventId: string;
  trigger: EventTrigger;
  condition: string | null;
  action: EventAction;
  narrative?: string;
}

export type EventTrigger = 'sceneStart' | 'sceneEnd' | 'dayStart' | 'dayEnd';
export type EventAction = 'showCharacterReaction' | 'playSound' | 'setFlag' | 'gotoScene';

/**
 * エンディング定義
 */
export interface EndingDefinition {
  endingId: string;
  endingType: EndingType;
  title: string;
  requiredFlags: EndingFlagCondition[];
  endingSceneId: string;
  narrative: string;
  videoAsset?: string;
  achievementUnlocked?: string;
  displayOrder: number;
}

export type EndingType = 'badEnding' | 'trueEnding';

export interface EndingFlagCondition {
  flagName: string;
  requiredValue?: number | boolean | string;
  comparison?: ComparisonOperator;
}

/**
 * セーブデータ
 */
export interface SaveData {
  version: string;
  slotId: number;
  timestamp: number;
  playTime: number;
  currentLoop: number;
  currentDay: number;
  currentSceneId: string;
  gameState: GameSession;
  flagSystem: FlagSystem;
  characterStates: Record<string, CharacterState>;
}

export interface SaveMetadata {
  slotId: number;
  timestamp: number;
  loop: number;
  day: number;
  playTime: number;
  sceneTitle?: string;
}

/**
 * キャラクター定義データ
 */
export interface CharacterDefinition {
  characterId: string;
  name: string;
  role: string;
  age: number;
  description: string;
  trustLevelMax: number;
  initialImages: Record<string, string>;
}
