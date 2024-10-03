import { createHiveChain, RecurrentTransferRemovalOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

const from = "sender-account";
const to = "recipient-account";
const pairId = 12345;

// Use this time just for example default values for recurrence and executions which is 24 for recurrence and 2 for executions.
tx.pushOperation(new RecurrentTransferRemovalOperation({
    // If the amount is NOT specified, the removal operation will be automatically generated
    from,
    to,
    pairId
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
