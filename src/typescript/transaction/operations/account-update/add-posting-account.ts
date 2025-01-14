import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation - createFor will parse authorities for "gtg" account from the chain
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Add account named "initminer" to the posting role of my account. Weight is by default set to 1
op.role("posting").add("initminer");

// Push operation to transaction
tx.pushOperation(op);
