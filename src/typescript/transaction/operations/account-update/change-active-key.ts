import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation - createFor will parse authorities for "gtg" account from the chain
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Example public keys data
const oldKey = "STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA";
const newKey = "STM6NPx2HsYEBTyCpsA792NMbHFJYSB8GL79wFDovAjiEvGEiXbF2";

// Replace old key in active role with new key and weight 1
op.role("active").replace(oldKey, 1, newKey);

// Push operation to transaction
tx.pushOperation(op);
