#!/bin/bash
# Apply labels to the issue that triggered the current workflow event.
# Usage: ./scripts/edit-issue-labels.sh --add-label LABEL [--add-label LABEL2 ...]
set -euo pipefail

ISSUE_NUMBER=$(jq -r '.issue.number' "$GITHUB_EVENT_PATH")
REPO="${GITHUB_REPOSITORY}"

labels=()
while [[ $# -gt 0 ]]; do
  case $1 in
    --add-label)
      labels+=("$2")
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

if [[ ${#labels[@]} -eq 0 ]]; then
  echo "No labels specified, skipping."
  exit 0
fi

for label in "${labels[@]}"; do
  gh issue edit "$ISSUE_NUMBER" --add-label "$label" --repo "$REPO"
  echo "Added label: $label"
done
