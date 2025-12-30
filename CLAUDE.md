# CLAUDE.md - wax-doc-snippets

## Project Overview

Code snippets for Hive blockchain documentation in TypeScript and Python. These snippets demonstrate usage of the WAX library (`@hiveio/wax`) and Beekeeper wallet (`@hiveio/beekeeper`) for building Hive blockchain applications.

## Tech Stack

- **Runtime:** Node.js ^20.11 || >= 21.2
- **Package Manager:** pnpm 10.0.0
- **Languages:** TypeScript 5.7.3, Python
- **Core Libraries:**
  - `@hiveio/wax` - WAX library for Hive blockchain
  - `@hiveio/beekeeper` - Key/wallet management
  - `@hiveio/wax-signers-beekeeper` - Beekeeper integration for WAX
- **Target:** ES2022 with Node16 module resolution

## Directory Structure

```
src/
├── typescript/                 # TypeScript snippets (71 files)
│   ├── api/                    # API initialization and extension patterns
│   ├── asset-manipulations/    # Asset conversion utilities
│   ├── config/                 # Chain initialization configurations
│   ├── encryption/             # Buffer/operation encryption examples
│   ├── formatters/             # Blockchain, custom, operation formatters
│   ├── key-generation/         # Key and brain key generation
│   ├── manabars/               # Manabar calculation examples
│   ├── transaction/            # Transaction lifecycle examples
│   │   ├── initialization/     # Creating transactions
│   │   ├── operations/         # Building operations (account-update, comment, etc.)
│   │   ├── finalization/       # Signing and building transactions
│   │   ├── working-with-transaction/  # Reading properties, binary views
│   │   ├── example-usage/      # Full usage examples
│   │   └── hive-apps-operations/      # Community, follow, RC operations
│   └── shims.d.ts              # Global type definitions for test runner
└── python/                     # Python snippets (47 files)
    └── (mirrors TypeScript structure)

scripts/
├── build-and-test.sh           # Build and test script
└── runner.js                   # Test runner (sets up beekeeper/WAX globals)
```

## Development Commands

```bash
# Install dependencies
pnpm install

# Build TypeScript
npm run build

# Test a single file
npm test "src/typescript/path/to/file.ts"

# Run all tests
npm run testall

# Run specific named test (from package.json scripts)
npm run test-api-default-api-retrieve-block
```

## Key Files

- `package.json` - Dependencies and test scripts
- `tsconfig.json` - TypeScript configuration (ES2022, Node16)
- `scripts/runner.js` - Test harness that sets up Beekeeper with test keys
- `src/typescript/shims.d.ts` - Global type declarations for test data
- `.devcontainer/devcontainer.json` - VS Code devcontainer with Python/Jupyter

## Coding Conventions

### TypeScript Snippets
- Use ESM imports: `import { createHiveChain } from '@hiveio/wax'`
- Use top-level await (ES2022)
- Add clear inline comments explaining each step
- Access test data via `globalThis.snippetsBeekeeperData`

### Python Snippets
- Use `async def main()` with `asyncio.run(main())` pattern
- Use snake_case for functions/variables
- Import WAX: `from wax import create_hive_chain`
- Import operations: `from wax.proto.operations import vote`
- Markdown comments (`# %%`) for Jupyter compatibility

### General Rules
- Keep TypeScript and Python versions synchronized
- Maintain consistent comments across language versions
- No hardcoded private keys in snippets (use test runner globals)
- No broadcast calls (snippets are for documentation only)

## Test Runner Globals

The `scripts/runner.js` sets up these globals for tests:

```typescript
globalThis.snippetsBeekeeperData = {
  signer1,      // BeekeeperSigner instance
  signer2,      // BeekeeperSigner instance
  wallet,       // Wallet instance
  publicKey1,   // Public key for signer1
  publicKey2    // Public key for signer2
}
```

## CI/CD Notes

No GitLab CI configuration in this repository. Development uses VS Code devcontainer with pre-configured Python/TypeScript environment.
