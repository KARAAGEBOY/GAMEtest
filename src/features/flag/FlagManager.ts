import {
  FlagSystem,
  FlagOperation,
  FlagCondition,
  IFlagManager,
  EventLogEntry,
} from '@/types';

/**
 * フラグマネージャー
 * ゲーム内のフラグシステムを管理する
 */
export class FlagManager implements IFlagManager {
  private flagSystem: FlagSystem;

  constructor(initialFlagSystem?: FlagSystem) {
    this.flagSystem = initialFlagSystem || this.createInitialFlagSystem();
  }

  /**
   * 初期フラグシステムを作成
   */
  private createInitialFlagSystem(): FlagSystem {
    return {
      globalFlags: {
        firstLoopCompleted: false,
        introSkipped: false,
        cityWarningLevel: 0,
        masterBetrayal: false,
      },
      loopFlags: {},
      characterTrustLevels: {
        jin4: 0,
        otsu: 0,
        jiheibei: 0,
        kito: 0,
      },
      choiceHistory: {},
      eventLog: [],
    };
  }

  /**
   * フラグシステム全体を取得
   */
  getFlagSystem(): FlagSystem {
    return this.flagSystem;
  }

  /**
   * フラグの設定
   * @param flagPath - ドット記法のパス (例: "globalFlags.firstLoopCompleted")
   * @param value - 設定する値
   */
  setFlag(flagPath: string, value: unknown): void {
    const keys = flagPath.split('.');
    let current: any = this.flagSystem;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  /**
   * フラグの取得
   * @param flagPath - ドット記法のパス
   */
  getFlag(flagPath: string): unknown {
    const keys = flagPath.split('.');
    let current: any = this.flagSystem;

    for (const key of keys) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }

  /**
   * フラグの条件チェック
   * @param condition - チェックする条件
   */
  checkFlag(condition: FlagCondition): boolean {
    let value: unknown;

    switch (condition.type) {
      case 'characterTrust':
        if (!condition.targetId) return false;
        value = this.flagSystem.characterTrustLevels[condition.targetId];
        break;
      case 'globalFlag':
        if (!condition.flagName) return false;
        value = this.getFlag(`globalFlags.${condition.flagName}`);
        break;
      case 'loopFlag':
        if (!condition.flagName) return false;
        value = this.getFlag(condition.flagName);
        break;
      default:
        return false;
    }

    return this.compareValues(value, condition.operator, condition.value);
  }

  /**
   * 値の比較
   */
  private compareValues(
    actual: unknown,
    operator: FlagCondition['operator'],
    expected: unknown
  ): boolean {
    if (actual === undefined || actual === null) {
      return operator === 'neq' ? expected !== null : false;
    }

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

  /**
   * フラグの増分
   * @param flagPath - ドット記法のパス
   * @param amount - 増加量
   */
  incrementFlag(flagPath: string, amount: number): void {
    const currentValue = this.getFlag(flagPath);
    const newValue = (typeof currentValue === 'number' ? currentValue : 0) + amount;
    this.setFlag(flagPath, newValue);
  }

  /**
   * ループフラグのリセット
   */
  resetLoopFlags(): void {
    this.flagSystem.loopFlags = {};
  }

  /**
   * 特定ループのフラグを取得
   * @param loopId - ループID
   */
  getLoopFlags(loopId: number): FlagSystem['loopFlags'] {
    const loopKey = `loop_${loopId}`;
    return (this.flagSystem.loopFlags[loopKey] || {}) as any;
  }

  /**
   * フラグ操作を適用
   * @param operation - フラグ操作
   */
  applyFlagOperation(operation: FlagOperation): void {
    switch (operation.flagType) {
      case 'characterTrust':
        this.applyCharacterTrustOperation(operation);
        break;
      case 'globalFlag':
        this.applyGlobalFlagOperation(operation);
        break;
      case 'loopFlag':
        this.applyLoopFlagOperation(operation);
        break;
      case 'eventLog':
        this.addEventLog(operation);
        break;
    }
  }

  /**
   * キャラクター信頼度の操作
   */
  private applyCharacterTrustOperation(operation: FlagOperation): void {
    if (!operation.targetId) return;

    const currentTrust = this.flagSystem.characterTrustLevels[operation.targetId] || 0;
    let newTrust: number;

    switch (operation.operation) {
      case 'set':
        newTrust = operation.value as number;
        break;
      case 'increase':
        newTrust = currentTrust + (operation.value as number);
        break;
      case 'decrease':
        newTrust = currentTrust - (operation.value as number);
        break;
      default:
        return;
    }

    // 最小値・最大値の制約
    if (operation.maxValue !== undefined) {
      newTrust = Math.min(newTrust, operation.maxValue);
    }
    if (operation.minValue !== undefined) {
      newTrust = Math.max(newTrust, operation.minValue);
    }

    this.flagSystem.characterTrustLevels[operation.targetId] = newTrust;
  }

  /**
   * グローバルフラグの操作
   */
  private applyGlobalFlagOperation(operation: FlagOperation): void {
    if (!operation.targetId) return;

    const flagPath = `globalFlags.${operation.targetId}`;
    const currentValue = this.getFlag(flagPath);

    switch (operation.operation) {
      case 'set':
        this.setFlag(flagPath, operation.value);
        break;
      case 'increase':
        if (typeof currentValue === 'number') {
          this.setFlag(flagPath, currentValue + (operation.value as number));
        }
        break;
      case 'decrease':
        if (typeof currentValue === 'number') {
          this.setFlag(flagPath, currentValue - (operation.value as number));
        }
        break;
    }
  }

  /**
   * ループフラグの操作
   */
  private applyLoopFlagOperation(operation: FlagOperation): void {
    if (!operation.targetId) return;

    const flagPath = operation.targetId;
    const currentValue = this.getFlag(flagPath);

    switch (operation.operation) {
      case 'set':
        this.setFlag(flagPath, operation.value);
        break;
      case 'increase':
        if (typeof currentValue === 'number') {
          this.setFlag(flagPath, currentValue + (operation.value as number));
        }
        break;
      case 'decrease':
        if (typeof currentValue === 'number') {
          this.setFlag(flagPath, currentValue - (operation.value as number));
        }
        break;
    }
  }

  /**
   * イベントログの追加
   */
  private addEventLog(operation: FlagOperation): void {
    const logEntry = operation.value as unknown as EventLogEntry;
    this.flagSystem.eventLog.push(logEntry);
  }

  /**
   * 現在のループのフラグを初期化
   * @param loopId - ループID
   */
  initializeLoopFlags(loopId: number): void {
    const loopKey = `loop_${loopId}`;
    this.flagSystem.loopFlags[loopKey] = {
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
}
