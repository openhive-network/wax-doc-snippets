import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

const { signer1 } = globalThis.snippetsBeekeeperData;

// Initialize a transaction object
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  vote_operation: {
    voter: "voter",
    author: "author",
    permlink: "test-permlink",
    weight: 2200
  }
};

// Push operation into the transction
tx.pushOperation(operation);

// Sign transaction.
await signer1.signTransaction(tx);

console.log(tx.transaction.signatures[0]);
