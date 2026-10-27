# Automated contributions

This directory configures the automated development platform that contributes to this
repository. This note says which branches it uses here and how its work reaches the
project's main line.

## Branches

- `aidev/integration` — the integration branch. Automated work lands here and nowhere else.
- `main` — the project's main line; reached from `aidev/integration` only by merge request (`aidev handoff`, a linear one-commit-per-change copy on `aidev/handoff`, since `main` is fast-forward only). Merge it **keeping the source branch**: `aidev/integration` is protected for that reason.
- `ai/*` — one branch per task, created and deleted by the platform. Do not commit to them.
- `session/*` — a session's accumulated work, landed on the integration branch as a batch.

## How work reaches the main line

Task and session branches never reach `aidev/integration` through merge requests; the platform
lands them after its own verification. `aidev/integration` reaches `main` by this project's
usual process, merge requests included — the platform never merges into any other branch.

This repository has no CI pipeline of its own.

## Suites run before work lands

These are the snippets hive/wax-doc includes (as its `src/static/snippets` submodule). Declared
in `.aidev/project.yaml` under `verification`, all through `.aidev/run-checks.sh`, which writes
`test-results/<slot>/junit.xml`:

- `quick` — `command` .aidev/run-checks.sh quick typecheck snippets pycompile
- `full` — `command` .aidev/run-checks.sh full typecheck snippets pycompile
- `baseline` — `command` .aidev/run-checks.sh baseline typecheck snippets
- `canary` — `command` .aidev/run-checks.sh canary typecheck snippets pycompile
- `static` — `command` .aidev/run-checks.sh static typecheck pycompile
- `coverage` — `command` .aidev/run-checks.sh coverage snippets
- `system` — `command` .aidev/run-checks.sh system snippets

Steps: `typecheck` is `pnpm run build` (`tsc` over the project); `snippets` runs every `test-*`
script of `package.json` (`npm test <file>`: `scripts/build-and-test.sh` compiles the snippet and
runs it under `scripts/runner.js` with a beekeeper wallet), one junit case per script;
`pycompile` byte-compiles `src/python` (syntax only — the wax Python package is not in the
image, so the Python snippets are not run). Every run first installs `node_modules` offline
(`.aidev/pnpm-deps.sh`). There is no coverage tooling: `coverage` runs the snippets.

The suites run with no network. Of the 70 `test-*` scripts, 50 call a Hive API node and fail
offline with `WaxUnknownRequestError`; they are left out of the `snippets` step
(`SNIPPETS_NEED_NETWORK` in `run-checks.sh`). One more is left out because it fails on its own
(below). The other 19 run.

## Test runtime

`.aidev/runtime/Dockerfile` builds on common-ci-configuration's `node-test-tools:develop` (Node
and pnpm come from there; this repository pins no Node of its own in it) and adds a pnpm store
and pnpm metadata cache filled by an install of `package.json`. Rebuild and re-pin it with
`.aidev/runtime/build.sh --push` when the Dockerfile, `package.json` or `pnpm-lock.yaml`
changes, or to follow a new `node-test-tools:develop`, and put the printed `repo@sha256:…` into
`environment.image`.

## Known state at onboarding (2026-10-26)

- `pnpm-lock.yaml` does not match `package.json` (it names `@hiveio/wax` 1.27.11-rc0,
  `@hiveio/beekeeper` 1.27.11, where `package.json` asks for 2.0.1 / 1.28.4), so a
  `--frozen-lockfile` install refuses. `.aidev/pnpm-deps.sh` falls back to resolving
  `package.json` offline from the image's metadata cache and puts the lockfile back afterwards.
- `typecheck` fails: `src/typescript/transaction/operations/account-update/change-weight-threshold.ts`
  calls `setThreshold`, which wax 2.0.1 does not have (TS2551, *did you mean `setTreshold`*).
  Its `test-*` script is left out of `snippets` (`SNIPPETS_FAILING`).
- `snippets` (19 cases) and `pycompile` pass offline.
