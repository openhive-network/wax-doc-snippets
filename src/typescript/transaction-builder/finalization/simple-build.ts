import { createWaxFoundation } from '@hiveio/wax';

// Initialize wax base interface
const wax = await createWaxFoundation();

// Initialize a transaction object
const tx = wax.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

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

// Log to the console the transaction which is **not signed yet** in the api form
console.log(tx.toApi());
