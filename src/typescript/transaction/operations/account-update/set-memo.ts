import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Select memo role and set its key
op.role("memo").set("STM8QmFV8MfGK2j9b2c7vYtXf1fJb3zQ6UQJjv3zvz1fJb3zQ6UQJjv3zvz");

// Push operation to transaction
tx.pushOperation(op);
