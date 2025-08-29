import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation - createFor will parse authorities for "gtg" account from the chain
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Select memo role and set its key
op.role("memo").set("STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA");

// Push operation to transaction
tx.pushOperation(op);
