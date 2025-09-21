#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
cd site
python3 -m http.server 8080
