# Sourced by run-checks.sh from the repository root: bring node_modules up to
# date with package.json from the image's pnpm store and metadata cache, offline.
# A frozen install is tried first; when pnpm-lock.yaml does not match
# package.json the install resolves package.json offline instead and the lockfile
# is put back afterwards, so a run leaves the tree as it found it. A marker records package.json, the
# lockfile and Node it was installed for; it is written only after an install
# that succeeded, and an install whose tools don't resolve is redone.
lock_id="$(cat package.json pnpm-lock.yaml | sha256sum | cut -d' ' -f1) $(node --version)"
marker=node_modules/.aidev-pnpm-lock
tools_present() {
    [ -x node_modules/.bin/tsc ] && [ -d node_modules/@hiveio/wax ] && [ -d node_modules/@hiveio/beekeeper ]
}
if [ "$(cat "$marker" 2>/dev/null)" != "$lock_id" ] || ! tools_present; then
    echo "node_modules is not current for package.json: pnpm install --offline" >&2
    lock_backup="$(mktemp)"; cp pnpm-lock.yaml "$lock_backup"
    pnpm install --offline --frozen-lockfile --ignore-scripts < /dev/null \
        || pnpm install --offline --no-frozen-lockfile --ignore-scripts < /dev/null
    rc=$?
    cp "$lock_backup" pnpm-lock.yaml; rm -f "$lock_backup"
    [ "$rc" -eq 0 ] || return 1
    tools_present || { echo "pnpm install left no tsc/@hiveio/wax/@hiveio/beekeeper" >&2; return 1; }
    printf '%s\n' "$lock_id" > "$marker.tmp" && mv "$marker.tmp" "$marker"
fi
