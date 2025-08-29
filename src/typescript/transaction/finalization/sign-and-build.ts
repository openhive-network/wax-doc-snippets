import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData;

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

// Build transaction with signature provided.
tx.sign(wallet, publicKey1);

console.log(tx.toApi());
