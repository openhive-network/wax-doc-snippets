import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Example public keys data
const oldKey = "STM8QmFV8MfGK2j9b2c7vYtXf1fJb3zQ6UQJjv3zvz1fJb3zQ6UQJjv3zvz";
const newKey = "STM7QmFV8MfGK2j9b2c7vYtXf1fJb3zQ6UQJjv3zvz1fJb3zQ6UQJjv3pol";

// Replace old key in active role with new key and weight 1
op.role("active").replace(oldKey, 1, newKey);

// Push operation to transaction
tx.pushOperation(op);
