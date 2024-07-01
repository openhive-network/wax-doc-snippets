import { createWaxFoundation } from '@hiveio/wax';

// Initialize wax base interface
const wax = await createWaxFoundation();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData;

// Initialize a transaction builder object
const txBuilder = new wax.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

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

// Build transaction with signature provided.
txBuilder.build(wallet, publicKey1);

console.log(txBuilder.toApi());
