#!/bin/bash
# Wrapper for gh CLI. Passes all arguments through to gh.
set -euo pipefail
gh "$@"
