import { createWaxFoundation } from '@hiveio/wax';

// Initialize wax base interface
const wax = await createWaxFoundation();

// Initialize a transaction object
const tx = wax.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '+30m');

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
