# GitHub Actions ワークフロー

`.github/workflows` 以下に定義されているワークフローについてまとめる。

## claude.yml（Claude Code）

Issue や PR 上で `@claude` にメンションされた際に Claude Code を実行するワークフロー。

### トリガー

- `issue_comment`（`created`）
- `pull_request_review_comment`（`created`）
- `issues`（`opened`, `assigned`）
- `pull_request_review`（`submitted`）

### 実行条件

`jobs.claude.if` により、以下のいずれかを満たす場合のみ実行される。

- `issue_comment` イベントで、コメント本文に `@claude` が含まれる
- `pull_request_review_comment` イベントで、コメント本文に `@claude` が含まれる
- `pull_request_review` イベントで、レビュー本文に `@claude` が含まれる
- `issues` イベントで、Issue の本文またはタイトルに `@claude` が含まれる

### 権限（permissions）

- `contents: read`
- `pull-requests: read`
- `issues: read`
- `id-token: write`
- `actions: read`（PR 上の CI 結果を Claude が参照するために必要）

### 処理内容

1. `actions/checkout@v4` でリポジトリをチェックアウト（`fetch-depth: 1`）
2. `anthropics/claude-code-action@v1` を実行
   - `claude_code_oauth_token` に `secrets.CLAUDE_CODE_OAUTH_TOKEN` を使用
   - `additional_permissions` で `actions: read` を追加付与し、PR の CI 結果を参照可能にする
   - `prompt` や `claude_args` はコメントアウトされたオプション設定として用意されており、必要に応じてカスタムプロンプトやツール制限を指定できる

## claude-code-review.yml（Claude Code Review）

Pull Request に対して Claude Code による自動レビューを実行するワークフロー。

### トリガー

- `pull_request`（`opened`, `synchronize`, `ready_for_review`, `reopened`）

### 実行条件

- 現状は特定条件でのフィルタは行われておらず、上記トリガーで常に実行される
- PR 作成者や `FIRST_TIME_CONTRIBUTOR` などでフィルタする設定例がコメントアウトされている

### 権限（permissions）

- `contents: read`
- `pull-requests: read`
- `issues: read`
- `id-token: write`

### 処理内容

1. `actions/checkout@v4` でリポジトリをチェックアウト（`fetch-depth: 1`）
2. `anthropics/claude-code-action@v1` を実行
   - `plugin_marketplaces` で `anthropics/claude-code` のプラグインマーケットプレイスを指定
   - `plugins: 'code-review@claude-code-plugins'` で code-review プラグインを使用
   - `prompt` に `/code-review:code-review <repository>/pull/<PR番号>` を指定し、対象 PR のコードレビューを実行

## deploy.yml（Deploy to GitHub Pages）

`main` ブランチへの push を契機に Astro サイトをビルドし、GitHub Pages へデプロイするワークフロー。

### トリガー

- `push`（`main` ブランチ）

### 権限（permissions）

- `contents: read`
- `pages: write`
- `id-token: write`

### 同時実行制御（concurrency）

- グループ名 `"pages"` で同時実行を制御
- `cancel-in-progress: false` のため、実行中のデプロイをキャンセルせず、後続の実行は待機する

### ジョブ内容

#### build

1. `actions/checkout@v4` でリポジトリをチェックアウト
2. `actions/setup-node@v4` で Node.js 20 をセットアップ（`npm` キャッシュ有効）
3. `npm ci` で依存関係をインストール
4. `npm run build` でビルド
5. `actions/upload-pages-artifact@v3` で `dist/` を Pages 用アーティファクトとしてアップロード

#### deploy

- `build` ジョブに依存（`needs: build`）
- `environment` に `github-pages` を指定し、デプロイ結果の URL を出力
- `actions/deploy-pages@v4` でアーティファクトを GitHub Pages にデプロイ
