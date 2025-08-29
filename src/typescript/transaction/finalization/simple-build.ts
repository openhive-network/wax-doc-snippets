import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  vote_operation: {
    voter: "voter",
    author: "test-author",
    permlink: "test-permlink",
    weight: 2200
  }
};

// Push operation into the transction
tx.pushOperation(operation);

// Log to the console the transaction which is **not signed yet** in the api form
console.log(tx.toApi());

// broadcast the transaction
// Uncomment the following line to broadcast the transaction to the mainnet (this will most likely fail due to transaction not being signed):
// await chain.broadcast(tx);
