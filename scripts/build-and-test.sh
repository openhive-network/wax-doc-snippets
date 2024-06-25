#!/bin/bash

SCRIPT_PATH=$(dirname $(realpath -s $0))
PROJECT_PATH=$(realpath -s $SCRIPT_PATH/..)

TEST_FILE=$1

if [[ -z "$TEST_FILE" || ! -f "$PROJECT_PATH/$TEST_FILE" ]]; then
  echo "Usage: npm test <test-file>"
  exit 1
fi

DIST_DIR=dist/test

tsc --outDir "$PROJECT_PATH/$DIST_DIR" --skipLibCheck -m node16 "$TEST_FILE"

TEST_FILENAME=$(basename -- "$TEST_FILE")
TEST_FILENAME_NOEXT="${TEST_FILENAME%.*}"

mv "$PROJECT_PATH/$DIST_DIR/$TEST_FILENAME_NOEXT.js" "$PROJECT_PATH/$DIST_DIR/testfile.js"

cat << EOF > "$PROJECT_PATH/$DIST_DIR/runner.js"
import beekeeperFactory from '@hiveio/beekeeper';

const beekeeper = await beekeeperFactory();

const session = await beekeeper.createSession("my.salt");

const { wallet, password } = await session.createWallet('w0');

const publicKey1 = await wallet.importKey('5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5S7ecPT');
const publicKey2 = await wallet.importKey('5KGKYWMXReJewfj5M29APNMqGEu173DzvHv5TeJAg9SkjUeQV78');

globalThis.snippetsBeekeeperData = { wallet, password, publicKey1, publicKey2 };

import './testfile.js';
EOF

BEEKEEPER_DIR="$PROJECT_PATH/storage_root-node"

if [[ -d "$BEEKEEPER_DIR" ]]; then
  rm -r "$BEEKEEPER_DIR"
fi

pushd "$PROJECT_PATH"

node "$PROJECT_PATH/$DIST_DIR/runner.js"

popd
