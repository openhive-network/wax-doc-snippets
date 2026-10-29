# Hive Docs Snippets

Snippets for the Hive Documentation

## TypeScript

### Prepare

Dependency versions come from the pnpm catalogs of
[common-ci-configuration](https://gitlab.syncad.com/hive/common-ci-configuration), checked out
as the `npm-common-config` submodule (`pnpm-workspace.yaml` and `.npmrc` link into it):

```bash
git submodule update --init --remote
pnpm install
```

### Run tests

```bash
npm test "file_path"
```

## License

See [LICENSE.md](LICENSE.md)
