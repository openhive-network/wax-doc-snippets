import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  vote: {
    voter: "voter",
    author: "test-author",
    permlink: "test-permlink",
    weight: 2200
  }
};

// Push operation into the transction
tx.pushOperation(operation);

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
const builtTransaction = tx.transaction;

// Most transaction properties should be read from the transaction before building it.
console.log(`id: ${tx.id}`);
console.log(`sigDigest: ${tx.sigDigest}`);

// Some transaction properties should be read from the transaction after building it.
console.log(`expiration: ${builtTransaction.expiration}`);
console.log(`ref_block_num: ${builtTransaction.ref_block_num}`);
