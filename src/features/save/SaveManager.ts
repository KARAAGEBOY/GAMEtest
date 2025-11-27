import {
  ISaveManager,
  GameSession,
  SaveData,
  SaveMetadata,
} from '@/types';
import { store } from '@/store/store';

/**
 * セーブマネージャー
 * ゲーム状態の保存・読み込みを担当
 */
export class SaveManager implements ISaveManager {
  private readonly STORAGE_KEY_PREFIX = 'datsugoku_save_';
  private readonly METADATA_KEY = 'datsugoku_save_metadata';

  /**
   * ゲームをセーブ
   * @param slotId - セーブスロットID（1-10）
   */
  async saveGame(slotId: number): Promise<void> {
    if (slotId < 1 || slotId > 10) {
      throw new Error('Invalid slot ID. Must be between 1 and 10.');
    }

    const state = store.getState().game;

    // セーブデータを作成
    const saveData: SaveData = {
      version: '1.0',
      slotId,
      timestamp: Date.now(),
      playTime: state.totalPlayTime,
      currentLoop: state.currentLoop,
      currentDay: state.currentDay,
      currentSceneId: state.currentSceneId || '',
      gameState: {
        sessionId: state.sessionId,
        currentLoop: state.currentLoop,
        currentDay: state.currentDay,
        gameStatus: state.gameStatus,
        difficulty: state.difficulty,
        createdAt: state.createdAt,
        lastSavedAt: new Date().toISOString(),
        totalPlayTime: state.totalPlayTime,
        characterStates: state.characterStates,
        flagSystem: state.flagSystem,
        inventory: state.inventory,
        currentSceneId: state.currentSceneId || '',
        endingType: state.endingType,
      },
      flagSystem: state.flagSystem,
      characterStates: state.characterStates,
    };

    try {
      // LocalStorageに保存
      const storageKey = `${this.STORAGE_KEY_PREFIX}${slotId}`;
      localStorage.setItem(storageKey, JSON.stringify(saveData));

      // メタデータを更新
      this.updateMetadata(slotId, saveData);

      console.log(`Game saved to slot ${slotId}`);
    } catch (error) {
      console.error('Failed to save game:', error);
      throw new Error('セーブに失敗しました。');
    }
  }

  /**
   * ゲームをロード
   * @param slotId - セーブスロットID
   */
  async loadGame(slotId: number): Promise<GameSession> {
    if (slotId < 1 || slotId > 10) {
      throw new Error('Invalid slot ID. Must be between 1 and 10.');
    }

    try {
      const storageKey = `${this.STORAGE_KEY_PREFIX}${slotId}`;
      const savedData = localStorage.getItem(storageKey);

      if (!savedData) {
        throw new Error(`No save data found in slot ${slotId}`);
      }

      const saveData: SaveData = JSON.parse(savedData);

      console.log(`Game loaded from slot ${slotId}`);
      return saveData.gameState;
    } catch (error) {
      console.error('Failed to load game:', error);
      throw new Error('ロードに失敗しました。');
    }
  }

  /**
   * セーブスロットを削除
   * @param slotId - セーブスロットID
   */
  async deleteSlot(slotId: number): Promise<void> {
    if (slotId < 1 || slotId > 10) {
      throw new Error('Invalid slot ID. Must be between 1 and 10.');
    }

    try {
      const storageKey = `${this.STORAGE_KEY_PREFIX}${slotId}`;
      localStorage.removeItem(storageKey);

      // メタデータから削除
      this.removeMetadata(slotId);

      console.log(`Save slot ${slotId} deleted`);
    } catch (error) {
      console.error('Failed to delete save slot:', error);
      throw new Error('セーブデータの削除に失敗しました。');
    }
  }

  /**
   * セーブ一覧を取得
   */
  listSaves(): SaveMetadata[] {
    try {
      const metadataJson = localStorage.getItem(this.METADATA_KEY);
      if (!metadataJson) {
        return [];
      }

      const metadata: Record<number, SaveMetadata> = JSON.parse(metadataJson);
      return Object.values(metadata).sort((a, b) => a.slotId - b.slotId);
    } catch (error) {
      console.error('Failed to list saves:', error);
      return [];
    }
  }

  /**
   * オートセーブ
   */
  async autoSave(): Promise<void> {
    // スロット0を自動セーブ用に使用
    await this.saveGame(10); // スロット10をオートセーブ専用に
  }

  /**
   * セーブデータをエクスポート
   * @param slotId - セーブスロットID
   */
  exportSave(slotId: number): string {
    if (slotId < 1 || slotId > 10) {
      throw new Error('Invalid slot ID. Must be between 1 and 10.');
    }

    const storageKey = `${this.STORAGE_KEY_PREFIX}${slotId}`;
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
      throw new Error(`No save data found in slot ${slotId}`);
    }

    return savedData;
  }

  /**
   * セーブデータをインポート
   * @param jsonData - セーブデータJSON
   */
  async importSave(jsonData: string): Promise<void> {
    try {
      const saveData: SaveData = JSON.parse(jsonData);

      if (!saveData.version || !saveData.slotId) {
        throw new Error('Invalid save data format');
      }

      const storageKey = `${this.STORAGE_KEY_PREFIX}${saveData.slotId}`;
      localStorage.setItem(storageKey, jsonData);

      this.updateMetadata(saveData.slotId, saveData);

      console.log(`Save data imported to slot ${saveData.slotId}`);
    } catch (error) {
      console.error('Failed to import save:', error);
      throw new Error('セーブデータのインポートに失敗しました。');
    }
  }

  /**
   * メタデータを更新
   */
  private updateMetadata(slotId: number, saveData: SaveData): void {
    let metadata: Record<number, SaveMetadata> = {};

    const existingMetadata = localStorage.getItem(this.METADATA_KEY);
    if (existingMetadata) {
      metadata = JSON.parse(existingMetadata);
    }

    metadata[slotId] = {
      slotId,
      timestamp: saveData.timestamp,
      loop: saveData.currentLoop,
      day: saveData.currentDay,
      playTime: saveData.playTime,
      sceneTitle: saveData.gameState.currentSceneId,
    };

    localStorage.setItem(this.METADATA_KEY, JSON.stringify(metadata));
  }

  /**
   * メタデータから削除
   */
  private removeMetadata(slotId: number): void {
    const existingMetadata = localStorage.getItem(this.METADATA_KEY);
    if (!existingMetadata) return;

    const metadata: Record<number, SaveMetadata> = JSON.parse(existingMetadata);
    delete metadata[slotId];

    localStorage.setItem(this.METADATA_KEY, JSON.stringify(metadata));
  }
}
