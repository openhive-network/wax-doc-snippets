#!/bin/bash
set -e

FIRST_INDEX="https://gitlab.syncad.com/api/v4/projects/362/packages/pypi/simple"
SECOND_INDEX="https://gitlab.syncad.com/api/v4/projects/434/packages/pypi/simple"
THIRD_INDEX="https://gitlab.syncad.com/api/v4/projects/198/packages/pypi/simple"

echo "🔧 [1/4] Creating virtual environment..."

python --version
python3 --version

python3 -m venv .venv
echo "⚙️  [2/4] Activating venv..."
source .venv/bin/activate
echo "📦 [3/4] Installing wheel package..."
pip install --index-url $FIRST_INDEX --extra-index-url $SECOND_INDEX --extra-index-url $THIRD_INDEX ./*.whl
echo "✅ [4/4] Setup complete!"

echo "🚀 Starting main.py..."
python3 "$(dirname "$0")/../src/python/main.py"
