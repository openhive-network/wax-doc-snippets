import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Add "initminer" to owner role and change weight treshold to 2
op.role("owner").add("initminer", 1).setTreshold(2);

// Push operation to transaction
tx.pushOperation(op);
