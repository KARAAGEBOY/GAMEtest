import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GameSession,
  FlagSystem,
  CharacterState,
  SceneDefinition,
  FlagOperation,
  Item,
} from '@/types';

interface GameState {
  currentLoop: number;
  currentDay: number;
  currentSceneId: string | null;
  currentScene: SceneDefinition | null;
  gameStatus: 'menu' | 'playing' | 'paused' | 'ended';
  difficulty: 'easy' | 'normal' | 'hard';
  sessionId: string;
  createdAt: string;
  lastSavedAt: string;
  totalPlayTime: number;
  flagSystem: FlagSystem;
  characterStates: Record<string, CharacterState>;
  inventory: Item[];
  endingType: string | null;
}

const initialFlagSystem: FlagSystem = {
  globalFlags: {
    firstLoopCompleted: false,
    introSkipped: false,
    cityWarningLevel: 0,
    masterBetrayal: false,
  },
  loopFlags: {
    loop_1: {
      jin4_met: false,
      jin4_trust: 0,
      otsu_met: false,
      otsu_trust: 0,
      jiheibei_met: false,
      jiheibei_trust: 0,
      kito_met: false,
      kito_trust: 0,
      evidence_found: false,
      escaped: false,
      executionDate: false,
    },
  },
  characterTrustLevels: {
    jin4: 0,
    otsu: 0,
    jiheibei: 0,
    kito: 0,
  },
  choiceHistory: {},
  eventLog: [],
};

const initialState: GameState = {
  currentLoop: 1,
  currentDay: 1,
  currentSceneId: null,
  currentScene: null,
  gameStatus: 'menu',
  difficulty: 'normal',
  sessionId: '',
  createdAt: '',
  lastSavedAt: '',
  totalPlayTime: 0,
  flagSystem: initialFlagSystem,
  characterStates: {},
  inventory: [],
  endingType: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // ゲームセッション開始
    startNewGame: (state, action: PayloadAction<{ difficulty: 'easy' | 'normal' | 'hard' }>) => {
      state.sessionId = `session_${Date.now()}`;
      state.createdAt = new Date().toISOString();
      state.lastSavedAt = new Date().toISOString();
      state.difficulty = action.payload.difficulty;
      state.gameStatus = 'playing';
      state.currentLoop = 1;
      state.currentDay = 1;
      state.totalPlayTime = 0;
      state.flagSystem = { ...initialFlagSystem };
      state.characterStates = {};
      state.inventory = [];
      state.endingType = null;
    },

    // ゲーム状態を読み込み
    loadGame: (state, action: PayloadAction<GameSession>) => {
      const session = action.payload;
      state.sessionId = session.sessionId;
      state.currentLoop = session.currentLoop;
      state.currentDay = session.currentDay;
      state.gameStatus = session.gameStatus;
      state.difficulty = session.difficulty;
      state.createdAt = session.createdAt;
      state.lastSavedAt = session.lastSavedAt;
      state.totalPlayTime = session.totalPlayTime;
      state.flagSystem = session.flagSystem;
      state.characterStates = session.characterStates;
      state.inventory = session.inventory;
      state.currentSceneId = session.currentSceneId;
      state.endingType = session.endingType;
    },

    // 現在のシーンを設定
    setCurrentScene: (state, action: PayloadAction<SceneDefinition>) => {
      state.currentScene = action.payload;
      state.currentSceneId = action.payload.sceneId;
    },

    // ゲームステータスを変更
    setGameStatus: (state, action: PayloadAction<GameState['gameStatus']>) => {
      state.gameStatus = action.payload;
    },

    // 日数を進める
    advanceDay: (state) => {
      if (state.currentDay < 7) {
        state.currentDay++;
      }
    },

    // ループを進める
    advanceLoop: (state) => {
      if (state.currentLoop < 6) {
        state.currentLoop++;
        state.currentDay = 1;
        // ループフラグをリセット
        const newLoopKey = `loop_${state.currentLoop}`;
        state.flagSystem.loopFlags[newLoopKey] = {
          jin4_met: false,
          jin4_trust: 0,
          otsu_met: false,
          otsu_trust: 0,
          jiheibei_met: false,
          jiheibei_trust: 0,
          kito_met: false,
          kito_trust: 0,
          evidence_found: false,
          escaped: false,
          executionDate: false,
        };
      }
    },

    // ループリセット
    resetLoop: (state, action: PayloadAction<{ reason: 'execution' | 'failure' }>) => {
      if (state.currentLoop === 1) {
        state.flagSystem.globalFlags.firstLoopCompleted = true;
      }

      // イベントログに記録
      state.flagSystem.eventLog.push({
        loop: state.currentLoop,
        day: state.currentDay,
        event: 'loop_reset',
        result: action.payload.reason,
        timestamp: new Date().toISOString(),
      });

      // 新しいループに移行
      if (state.currentLoop < 6) {
        state.currentLoop++;
        state.currentDay = 1;
        const newLoopKey = `loop_${state.currentLoop}`;
        state.flagSystem.loopFlags[newLoopKey] = {
          jin4_met: false,
          jin4_trust: 0,
          otsu_met: false,
          otsu_trust: 0,
          jiheibei_met: false,
          jiheibei_trust: 0,
          kito_met: false,
          kito_trust: 0,
          evidence_found: false,
          escaped: false,
          executionDate: false,
        } as any;
      }
    },

    // フラグ操作を適用
    applyFlagOperation: (state, action: PayloadAction<FlagOperation>) => {
      const operation = action.payload;

      switch (operation.flagType) {
        case 'characterTrust': {
          if (!operation.targetId) break;
          const currentTrust = state.flagSystem.characterTrustLevels[operation.targetId] || 0;
          let newTrust = currentTrust;

          if (operation.operation === 'set') {
            newTrust = operation.value as number;
          } else if (operation.operation === 'increase') {
            newTrust = currentTrust + (operation.value as number);
          } else if (operation.operation === 'decrease') {
            newTrust = currentTrust - (operation.value as number);
          }

          if (operation.maxValue !== undefined) {
            newTrust = Math.min(newTrust, operation.maxValue);
          }
          if (operation.minValue !== undefined) {
            newTrust = Math.max(newTrust, operation.minValue);
          }

          state.flagSystem.characterTrustLevels[operation.targetId] = newTrust;
          break;
        }

        case 'globalFlag': {
          if (!operation.targetId) break;
          if (operation.operation === 'set') {
            state.flagSystem.globalFlags[operation.targetId] = operation.value as boolean | number | string;
          }
          break;
        }

        case 'loopFlag': {
          if (!operation.targetId) break;
          const loopKey = `loop_${state.currentLoop}`;
          if (!state.flagSystem.loopFlags[loopKey]) {
            state.flagSystem.loopFlags[loopKey] = {} as any;
          }

          if (operation.operation === 'set') {
            state.flagSystem.loopFlags[loopKey][operation.targetId] = operation.value as boolean | number | string;
          }
          break;
        }
      }
    },

    // アイテムを追加
    addItem: (state, action: PayloadAction<Item>) => {
      state.inventory.push(action.payload);
    },

    // アイテムを削除
    removeItem: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter(item => item.itemId !== action.payload);
    },

    // プレイ時間を更新
    updatePlayTime: (state, action: PayloadAction<number>) => {
      state.totalPlayTime += action.payload;
    },

    // エンディングを設定
    setEnding: (state, action: PayloadAction<string>) => {
      state.endingType = action.payload;
      state.gameStatus = 'ended';
    },
  },
});

export const {
  startNewGame,
  loadGame,
  setCurrentScene,
  setGameStatus,
  advanceDay,
  advanceLoop,
  resetLoop,
  applyFlagOperation,
  addItem,
  removeItem,
  updatePlayTime,
  setEnding,
} = gameSlice.actions;

export default gameSlice.reducer;
