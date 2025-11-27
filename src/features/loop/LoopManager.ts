import { ILoopManager, FlagSystem } from '@/types';
import { FlagManager } from '@/features/flag/FlagManager';

/**
 * ループマネージャー
 * タイムループのカウント管理とリセット処理を担当
 */
export class LoopManager implements ILoopManager {
  private currentLoop: number;
  private currentDay: number;
  private flagManager: FlagManager;
  private readonly maxLoops: number = 6;
  private readonly maxDays: number = 7;

  constructor(
    flagManager: FlagManager,
    initialLoop: number = 1,
    initialDay: number = 1
  ) {
    this.currentLoop = initialLoop;
    this.currentDay = initialDay;
    this.flagManager = flagManager;
  }

  /**
   * 現在のループ番号を取得
   */
  getCurrentLoop(): number {
    return this.currentLoop;
  }

  /**
   * 次のループに進める
   */
  advanceLoop(): void {
    if (this.currentLoop < this.maxLoops) {
      this.currentLoop++;
      this.currentDay = 1;
      this.flagManager.initializeLoopFlags(this.currentLoop);
    }
  }

  /**
   * 現在の日数を取得
   */
  getCurrentDay(): number {
    return this.currentDay;
  }

  /**
   * 次の日に進める
   */
  advanceDay(): void {
    if (this.currentDay < this.maxDays) {
      this.currentDay++;
    }
  }

  /**
   * ループリセットをトリガー
   * @param resetReason - リセット理由（処刑 or 失敗）
   */
  triggerLoopReset(resetReason: 'execution' | 'failure'): void {
    // ループ完了フラグを設定
    if (this.currentLoop === 1) {
      this.flagManager.setFlag('globalFlags.firstLoopCompleted', true);
    }

    // イベントログに記録
    this.flagManager.applyFlagOperation({
      flagType: 'eventLog',
      operation: 'set',
      value: {
        loop: this.currentLoop,
        day: this.currentDay,
        event: 'loop_reset',
        result: resetReason,
        timestamp: new Date().toISOString(),
      } as any,
    });

    // 新しいループに移行
    this.resetToNewLoop();
  }

  /**
   * 新しいループにリセット
   */
  resetToNewLoop(): void {
    this.advanceLoop();

    // グローバルフラグとキャラクター信頼度は保持される
    // ループフラグのみリセットされる（FlagManager側で処理済み）
  }

  /**
   * 特定ループのデータを取得
   * @param loopId - ループID
   */
  getLoopData(loopId: number): FlagSystem['loopFlags'] {
    return this.flagManager.getLoopFlags(loopId);
  }

  /**
   * ループの最大数に達したか確認
   */
  isMaxLoopReached(): boolean {
    return this.currentLoop >= this.maxLoops;
  }

  /**
   * 処刑日（最終日）に達したか確認
   */
  isExecutionDay(): boolean {
    return this.currentDay >= this.maxDays;
  }

  /**
   * ループとデイをリセット（デバッグ用）
   */
  resetToStart(): void {
    this.currentLoop = 1;
    this.currentDay = 1;
    this.flagManager.resetLoopFlags();
    this.flagManager.initializeLoopFlags(1);
  }
}
