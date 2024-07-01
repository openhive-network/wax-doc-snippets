import { createWaxFoundation } from '@hiveio/wax';

// Initialize wax base interface
const wax = await createWaxFoundation();

// Initialize a transaction builder object
const txBuilder = new wax.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '+30m');

// Declare example operation
const operation = {
  vote: {
    voter: "voter",
    author: "test_author",
    permlink: "test_permlink",
    weight: 2200
  }
};

// Push operation into the transction
txBuilder.push(operation);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
const builtTransaction = txBuilder.build();

// Most transaction properties should be read from the transaction before building it.
console.log(`id: ${txBuilder.id}`);
console.log(`sigDigest: ${txBuilder.sigDigest}`);

// Some transaction properties should be read from the transaction after building it.
console.log(`expiration: ${builtTransaction.expiration}`);
console.log(`ref_block_num: ${builtTransaction.ref_block_num}`);