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

// Convert transaction into the Hive API-legacy form JSON string
const legacyApiTx = tx.toLegacyApi();

console.log(legacyApiTx);

// Delete the created wax proto_protocol instance
chain.delete();
