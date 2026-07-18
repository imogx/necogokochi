# ねこごこち

猫を触る前に、その子の気持ちを**予習**できるインタラクティブサイト。

🐱 **https://imurar.github.io/necogokochi/**

## 概要

猫の部位ボタンを選ぶと、触られたときに示しやすい反応・感情パターンが表示されます。  
さらに「触れ合う猫のタイプ」（人懐っこい・人見知りなど）を選ぶと、反応の説明がそのタイプに合わせて変化します。

**想定ユーザー**
- 友人・実家・義実家などで猫と触れ合う機会はあるが、扱いに慣れていない人
- これから猫を飼おうと考えている人

## 技術スタック

| 要素 | 技術 |
|---|---|
| フレームワーク | Astro 5（SSG） |
| インタラクション | React 19（Astro Islands） |
| 言語 | TypeScript（strict） |
| スタイリング | Tailwind CSS v4 |
| ホスティング | GitHub Pages |
| CI/CD | GitHub Actions |

## ディレクトリ構成

```
src/
├── components/
│   └── NecoInteractive.tsx  # 部位・猫タイプ選択と反応表示（React Island）
├── data/
│   └── reactions.ts         # 部位ごとの反応・猫タイプ別の上書きデータ
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro          # トップページ
└── styles/
    └── global.css

public/                      # タイトル画像・猫タイプ画像などの静的アセット
scripts/                     # Issue運用（ラベル付け等）用のスクリプト
```

## 開発

```bash
npm install       # 依存関係のインストール
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド（dist/ に出力）
npm run preview   # ビルド結果のプレビュー
```

## CI/CD

- `main` ブランチへの push をトリガーに、GitHub Actions で Astro サイトをビルドし GitHub Pages へ自動デプロイします。
- Issue / PR 上で `@claude` にメンションすると Claude Code が応答し、PR レビューや Issue トリアージも自動化されています（詳細は [`.docs/github-workflows.md`](.docs/github-workflows.md) を参照）。
