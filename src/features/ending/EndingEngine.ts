import {
  IEndingEngine,
  EndingDefinition,
  EndingFlagCondition,
} from '@/types';
import { FlagManager } from '@/features/flag/FlagManager';
import endingsData from '@/data/endings.json';

/**
 * エンディング判定エンジン
 * エンディング条件のチェックとトリガーを担当
 */
export class EndingEngine implements IEndingEngine {
  private flagManager: FlagManager;
  private endings: EndingDefinition[];

  constructor(flagManager: FlagManager) {
    this.flagManager = flagManager;
    this.endings = endingsData as EndingDefinition[];
  }

  /**
   * 現在の状態でアンロック可能なエンディングをチェック
   */
  checkEndingConditions(): EndingDefinition[] {
    const availableEndings: EndingDefinition[] = [];

    for (const ending of this.endings) {
      if (this.isEndingUnlocked(ending)) {
        availableEndings.push(ending);
      }
    }

    // displayOrderでソート
    return availableEndings.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * 利用可能なエンディング一覧を取得
   */
  getAvailableEndings(): EndingDefinition[] {
    return this.checkEndingConditions();
  }

  /**
   * エンディングをトリガー
   * @param endingId - エンディングID
   */
  triggerEnding(endingId: string): void {
    const ending = this.endings.find((e) => e.endingId === endingId);

    if (!ending) {
      console.error(`Ending not found: ${endingId}`);
      return;
    }

    console.log(`Triggering ending: ${ending.title}`);

    // エンディングシーンを表示する処理は、GameContainerで実装
    // ここでは通知のみ
  }

  /**
   * エンディングがロックされているか確認
   * @param endingId - エンディングID
   */
  isEndingLocked(endingId: string): boolean {
    const ending = this.endings.find((e) => e.endingId === endingId);
    if (!ending) return true;

    return !this.isEndingUnlocked(ending);
  }

  /**
   * エンディングの達成度を取得（0-100）
   * @param endingId - エンディングID
   */
  getEndingProgress(endingId: string): number {
    const ending = this.endings.find((e) => e.endingId === endingId);
    if (!ending) return 0;

    const totalConditions = ending.requiredFlags.length;
    if (totalConditions === 0) return 100;

    let metConditions = 0;

    for (const condition of ending.requiredFlags) {
      if (this.checkEndingCondition(condition)) {
        metConditions++;
      }
    }

    return Math.floor((metConditions / totalConditions) * 100);
  }

  /**
   * エンディングがアンロックされているか確認
   */
  private isEndingUnlocked(ending: EndingDefinition): boolean {
    for (const condition of ending.requiredFlags) {
      if (!this.checkEndingCondition(condition)) {
        return false;
      }
    }
    return true;
  }

  /**
   * エンディング条件をチェック
   */
  private checkEndingCondition(condition: EndingFlagCondition): boolean {
    const value = this.flagManager.getFlag(condition.flagName);

    if (value === undefined || value === null) {
      return false;
    }

    // 比較演算子が指定されている場合
    if (condition.comparison && condition.requiredValue !== undefined) {
      return this.compareValues(
        value,
        condition.comparison,
        condition.requiredValue
      );
    }

    // requiredValueが指定されている場合は等価比較
    if (condition.requiredValue !== undefined) {
      return value === condition.requiredValue;
    }

    // 値が存在するかどうかのみチェック
    return true;
  }

  /**
   * 値を比較
   */
  private compareValues(
    actual: unknown,
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte',
    expected: unknown
  ): boolean {
    switch (operator) {
      case 'eq':
        return actual === expected;
      case 'neq':
        return actual !== expected;
      case 'gt':
        return (actual as number) > (expected as number);
      case 'gte':
        return (actual as number) >= (expected as number);
      case 'lt':
        return (actual as number) < (expected as number);
      case 'lte':
        return (actual as number) <= (expected as number);
      default:
        return false;
    }
  }
}
