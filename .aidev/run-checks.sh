#!/usr/bin/env bash
# Run the checks named after the suite and write test-results/<suite>/junit.xml.
#
#   .aidev/run-checks.sh <suite> <step>...
#
# This repository holds the code snippets hive/wax-doc includes; it has no CI.
# Every run first installs node_modules offline (.aidev/pnpm-deps.sh). Steps:
#
#   typecheck  `pnpm run build` (tsc over src/typescript with tsconfig.json),
#              one junit case
#   snippets   every `test-*` script of package.json (`npm test <file>`:
#              scripts/build-and-test.sh compiles the snippet and runs it under
#              scripts/runner.js with a beekeeper wallet), one junit case each,
#              without the scripts in SNIPPETS_SKIPPED below
#   pycompile  `python3 -m py_compile` over src/python (syntax only: the wax
#              Python package is not in the image, so they are not run), one case
#
# Runs offline in the image of .aidev/runtime/Dockerfile.
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
root="$PWD"
suite="${1:?usage: $0 <suite> <step>...}"; shift
out="$root/test-results/$suite"
rm -rf "$out"; mkdir -p "$out"
cases="$out/cases.tsv"; : > "$cases"
source .aidev/junit-helpers.sh

# Snippets left out of the `snippets` step (see .aidev/README.md):
# - they call a Hive API node, unreachable under --network none (they fail
#   with WaxUnknownRequestError):
SNIPPETS_NEED_NETWORK=(
    test-api-default-api-retrieve-block
    test-api-extend-api-interface-extend
    test-api-extend-api-interface-extend-rest
    test-encryption-encrypt-operations-multiple-keys
    test-encryption-encrypt-operations-multiple-start-encrypt
    test-encryption-encrypt-operations-one-key
    test-formatters-custom-formatters-by-instance
    test-formatters-operation-formatters-community
    test-formatters-operation-formatters-follow
    test-formatters-operation-formatters-rc-delegate
    test-manabars-manabars-calculations-manabar-downvote-account
    test-manabars-manabars-calculations-manabar-rc-account
    test-manabars-manabars-calculations-manabar-upvote-account
    test-transaction-initialization-from-remote-initialization
    test-transaction-working-with-transaction-simple-operation
    test-transaction-working-with-transaction-complex-operation
    test-transaction-working-with-transaction-reading-properties
    test-transaction-working-with-transaction-binary-metadata
    test-transaction-working-with-transaction-binary-to
    test-transaction-working-with-transaction-online-trace
    test-transaction-working-with-transaction-online-operation-validation
    test-transaction-working-with-transaction-online-verification
    test-transaction-finalization-simple-build
    test-transaction-finalization-proto-form-signature-build
    test-transaction-finalization-sign-and-build
    test-transaction-finalization-convert-to-api
    test-transaction-finalization-convert-to-legacy-api
    test-transaction-finalization-sign
    test-transaction-operations-account-update-set-memo
    test-transaction-operations-account-update-add-posting-account
    test-transaction-operations-account-update-change-active-key
    test-transaction-operations-account-update-change-weight-threshold
    test-transaction-operations-account-update-iterate-roles
    test-transaction-operations-creating-article
    test-transaction-operations-creating-reply
    test-transaction-operations-creating-recurrent-transfer
    test-transaction-operations-add-pair-id
    test-transaction-operations-generate-removal
    test-transaction-operations-creating-update-proposal
    test-transaction-operations-update-proposal-end-date
    test-transaction-operations-default-witness-properties
    test-transaction-operations-set-explicit
    test-transaction-example-usage
    test-transaction-full-example-usage
    test-transaction-example-legacy-usage
    test-transaction-full-advanced-usage-api-form
    test-transaction-full-advanced-usage-explicit-data
    test-transaction-hive-apps-resource-credits
    test-transaction-hive-apps-follow-operation
    test-transaction-hive-apps-community-operation
    test-transaction-hive-apps-community-properties
)
# - they fail for a reason of their own (none at present):
SNIPPETS_FAILING=(
)
SNIPPET_TIMEOUT="${SNIPPET_TIMEOUT:-120}"

status=0
record() { # name rc seconds log
    if [ "$2" -eq 0 ]; then
        printf 'case\t%s\tpass\t%s\t\n' "$1" "$3" >> "$cases"
    else
        status=1
        printf 'case\t%s\tfail\t%s\texit %s\t%s\n' "$1" "$3" "$2" "$4" >> "$cases"
    fi
}
step() {
    local name="$1"; shift
    local log="$out/$name.log" t0=$SECONDS rc=0
    echo "== $name" >&2
    ( cd "$root" && "$@" ) > "$log" 2>&1 < /dev/null || rc=$?
    [ "$rc" -eq 0 ] || tail -40 "$log" >&2
    record "$name" "$rc" "$((SECONDS - t0))" "$log"
    return "$rc"
}

if ! source "$root/.aidev/pnpm-deps.sh"; then
    printf 'case\tinstall\tfail\t0\tpnpm install --offline failed\n' >> "$cases"
    junit_write_cases "$out/junit.xml" "$suite" "$cases"
    exit 1
fi

snippets() {
    local skipped=" ${SNIPPETS_NEED_NETWORK[*]} ${SNIPPETS_FAILING[*]} " name log t0 rc
    mkdir -p "$out/snippets"
    while read -r name; do
        case "$skipped" in *" $name "*) continue ;; esac
        log="$out/snippets/$name.log" t0=$SECONDS rc=0
        echo "== snippets: $name" >&2
        timeout "$SNIPPET_TIMEOUT" pnpm run "$name" > "$log" 2>&1 < /dev/null || rc=$?
        [ "$rc" -eq 0 ] || tail -20 "$log" >&2
        record "snippets: $name" "$rc" "$((SECONDS - t0))" "$log"
    done < <(node -e 'for (const k of Object.keys(require("./package.json").scripts)) if (k.startsWith("test-")) console.log(k)')
    # build-and-test.sh compiles into the repository root (*.js, gitignored).
    rm -f ./*.js; rm -rf storage_root-node
}

for s in "$@"; do
    case "$s" in
        typecheck) step typecheck pnpm run build ;;
        snippets) snippets ;;
        pycompile) step pycompile env PYTHONPYCACHEPREFIX="$out/pycache" bash -c 'find src/python -name "*.py" -print0 | xargs -0 python3 -m py_compile' ;;
        *) printf 'case\t%s\tfail\t0\tunknown step\n' "$s" >> "$cases"; status=1 ;;
    esac
done
junit_write_cases "$out/junit.xml" "$suite" "$cases"
exit "$status"
