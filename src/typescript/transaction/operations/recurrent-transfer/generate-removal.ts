import { createHiveChain, RecurrentTransferRemovalOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

const from = "sender.account";
const to = "recip.account";
const pairId = 12345;

// Use dedicated wax complex operation to generate recurrent transfer removal
// (recurrent_transfer_operation is generated under the hood having specified amount = 0)
tx.pushOperation(new RecurrentTransferRemovalOperation({
    // If the amount is NOT specified, the removal operation will be automatically generated
    from,
    to,
    pairId
}));

/*
Get a transaction object holding all operations and transaction
TAPOS & expiration data, but transaction is **not signed yet**
*/
console.log(tx.transaction);
