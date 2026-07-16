# GitHub Actions ワークフロー

このドキュメントでは `.github/workflows` 以下に定義されている GitHub Actions ワークフローの設定内容について説明します。

## 一覧

| ファイル | 名前 | 目的 |
|---|---|---|
| [`claude.yml`](../.github/workflows/claude.yml) | Claude Code | Issue / PR 上で `@claude` にメンションされた際に Claude Code を実行する |
| [`claude-code-review.yml`](../.github/workflows/claude-code-review.yml) | Claude Code Review | Pull Request に対して Claude Code による自動レビューを実行する |
| [`deploy.yml`](../.github/workflows/deploy.yml) | Deploy to GitHub Pages | `main` ブランチへの push をトリガーに、サイトをビルドして GitHub Pages にデプロイする |

## claude.yml

Issue や Pull Request 上のコメント・レビューで `@claude` にメンションされたときに、Claude Code を起動して対応するワークフローです。

### トリガー (`on`)

- `issue_comment` (`created`): Issue / PR のコメントが作成されたとき
- `pull_request_review_comment` (`created`): PR のレビューコメントが作成されたとき
- `issues` (`opened`, `assigned`): Issue が作成・アサインされたとき
- `pull_request_review` (`submitted`): PR レビューが送信されたとき

### 実行条件 (`if`)

いずれかのイベントの本文（コメント本文・レビュー本文・Issue 本文・Issue タイトル）に `@claude` という文字列が含まれる場合にのみジョブを実行します。

### 権限 (`permissions`)

| 権限 | 値 | 用途 |
|---|---|---|
| `contents` | `read` | リポジトリの内容を読み取る |
| `pull-requests` | `read` | PR の情報を読み取る |
| `issues` | `read` | Issue の情報を読み取る |
| `id-token` | `write` | OIDC トークンの発行（認証に使用） |
| `actions` | `read` | PR の CI 結果を Claude が参照するために必要 |

### ステップ

1. `actions/checkout@v4` でリポジトリをチェックアウト（`fetch-depth: 1` で最小限の履歴のみ取得）
2. `anthropics/claude-code-action@v1` を実行し、`CLAUDE_CODE_OAUTH_TOKEN` シークレットを使って Claude Code を起動
   - `additional_permissions: actions: read` により、PR の CI 結果を Claude が参照できるようにしている
   - `prompt` や `claude_args` はコメントアウトされており、必要に応じてカスタムプロンプトや追加オプション（例: `--allowed-tools`）を指定可能

## claude-code-review.yml

Pull Request が作成・更新されたときに、Claude Code のコードレビュー機能を自動実行するワークフローです。

### トリガー (`on`)

- `pull_request` (`opened`, `synchronize`, `ready_for_review`, `reopened`): PR の作成・更新・Draft 解除・再オープン時

対象ファイルを特定のパスに絞り込む `paths` フィルタはコメントアウトされており、現状は全ての変更が対象です。

### 実行条件

PR 作成者でフィルタする `if` 条件（外部コントリビューターや初回コントリビューターのみを対象にする等）はコメントアウトされており、現状は全ての PR に対して実行されます。

### 権限 (`permissions`)

| 権限 | 値 | 用途 |
|---|---|---|
| `contents` | `read` | リポジトリの内容を読み取る |
| `pull-requests` | `read` | PR の情報を読み取る |
| `issues` | `read` | Issue の情報を読み取る |
| `id-token` | `write` | OIDC トークンの発行（認証に使用） |

### ステップ

1. `actions/checkout@v4` でリポジトリをチェックアウト（`fetch-depth: 1`）
2. `anthropics/claude-code-action@v1` を実行し、Claude Code Review プラグインを使用してレビューを行う
   - `plugin_marketplaces`: `code-review` プラグインの取得元として `anthropics/claude-code` を指定
   - `plugins`: `code-review@claude-code-plugins` を使用
   - `prompt`: `/code-review:code-review <owner/repo>/pull/<PR番号>` を実行し、対象 PR のレビューを行う

## deploy.yml

`main` ブランチへの push をトリガーに、Astro で構築されたサイトをビルドし、GitHub Pages へデプロイするワークフローです。

### トリガー (`on`)

- `push` (`main` ブランチへの push)

### 権限 (`permissions`)

| 権限 | 値 | 用途 |
|---|---|---|
| `contents` | `read` | リポジトリの内容を読み取る |
| `pages` | `write` | GitHub Pages へのデプロイ |
| `id-token` | `write` | デプロイ時の認証（OIDC） |

### 同時実行制御 (`concurrency`)

- `group: "pages"` / `cancel-in-progress: false`
  同一グループ（`pages`）のデプロイは同時に走らせず、実行中のデプロイをキャンセルせずキューイングします。

### ジョブ

#### `build`

1. `actions/checkout@v4` でリポジトリをチェックアウト
2. `actions/setup-node@v4` で Node.js 20 をセットアップ（`npm` キャッシュ有効）
3. `npm ci` で依存パッケージをインストール
4. `npm run build` で Astro のビルドを実行（`astro build`）
5. `actions/upload-pages-artifact@v3` でビルド成果物（`dist/`）を Pages 用アーティファクトとしてアップロード

#### `deploy`

- `build` ジョブの完了後 (`needs: build`) に実行
- `environment: github-pages` を指定し、デプロイ結果の URL を `page_url` として出力
- `actions/deploy-pages@v4` でアップロード済みのアーティファクトを GitHub Pages にデプロイ
