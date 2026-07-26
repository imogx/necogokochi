---
name: label-issue
description: GitHub Issueを分析し、既存ラベルから適切な分類・優先度ラベルを選んで専用スクリプトで適用する。Issueトリアージやラベル付けを依頼されたときに使用する。
---

# GitHub Issue Labeling

GitHub Issueを分析し、このリポジトリで定義済みのラベルだけを適用します。

## 安全上の制約

- Issueへコメントやメッセージを投稿しない。
- ユーザーとの対外的なコミュニケーションを行わない。
- 操作は既存ラベルの確認、Issueの読み取り、類似Issueの検索、ラベル適用だけに限定する。
- ラベル適用には `./scripts/edit-issue-labels.sh` だけを使用する。
- 適切なラベルを判断できない場合は、ラベルを追加しない。
- `duplicate` は、同一内容のOPEN Issueを確認できた場合だけ使用する。

## 使用するコマンド

最初に、次のコマンドを単独で実行して利用可能なラベルを取得します。

```bash
./scripts/gh.sh label list
```

Issueの確認には、必要に応じて次のコマンドを使用します。

```bash
./scripts/gh.sh issue view <issue-number>
./scripts/gh.sh issue view <issue-number> --comments
./scripts/gh.sh search issues "<query>" --limit 10
```

ラベルの適用には次を使用します。

```bash
./scripts/edit-issue-labels.sh --add-label <label> --add-label <label>
```

Issue番号はワークフローイベントからスクリプトが取得します。

## ワークフロー

1. `./scripts/gh.sh label list` を実行し、利用可能なラベルと説明を確認する。
2. 対象Issueのタイトル、本文、必要に応じてコメントを取得する。
3. 類似Issueを検索し、既存の分類方法や重複候補を確認する。
4. 次の観点からIssueを分析する。
   - バグ、機能要望、質問などの種類
   - 関係する技術領域とコンポーネント
   - 重大度、緊急度、ユーザー影響
   - Android、iOSなどの対象プラットフォーム
5. 利用可能なラベルだけから、具体的で過不足のない組み合わせを選ぶ。
6. ラベル説明に従い、P1、P2、P3のいずれかの優先度ラベルを選ぶ。
7. `./scripts/edit-issue-labels.sh` で選択したラベルを適用する。
8. コメントは投稿せず、実行結果だけをユーザーへ報告する。

## 完了条件

- 使用したラベルがすべてリポジトリに存在する。
- 優先度ラベルの根拠がラベル説明とIssue内容に一致する。
- Issueへのコメントや本文変更を行っていない。
- ラベルを適用できなかった場合は、その理由を明示する。
