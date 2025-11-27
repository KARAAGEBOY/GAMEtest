# 脱獄 ～7日間のタイムループ～

江戸時代を舞台にしたタイムループ型アドベンチャーゲーム

## 概要

処刑が決まった主人公が、7日間のタイムループに囚われる。
仲間との信頼を深め、真実を解き明かし、運命を変えるストーリー。

## 技術スタック

- React 18 + TypeScript
- Redux Toolkit（状態管理）
- Tailwind CSS（スタイリング）
- Vite（ビルドツール）

## 開発

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト
npm run test

# E2Eテスト
npm run test:e2e
```

## プロジェクト構造

```
src/
├─ components/      # UIコンポーネント
├─ features/        # 機能別モジュール
├─ store/          # Redux store
├─ types/          # TypeScript型定義
├─ data/           # ゲームデータ（JSON）
├─ utils/          # ユーティリティ
└─ assets/         # 静的リソース
```

## ゲームシステム

- **ループシステム**: 7日間を最大6ループ繰り返す
- **フラグシステム**: キャラクター信頼度、イベントフラグ管理
- **マルチエンディング**: 4種類のエンディング（バッドエンド3種、トゥルーエンド1種）
- **セーブ/ロード**: 複数スロット対応のローカルセーブ

## ライセンス

All rights reserved.
