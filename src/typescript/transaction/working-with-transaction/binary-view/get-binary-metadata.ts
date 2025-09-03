import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize an online transaction object
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  vote_operation: {
    voter: "gtg",
    author: "gtg",
    permlink: "hello-world",
    weight: 2200
  }
};

// Push operation into the transction
tx.pushOperation(operation);

// Display transaction binary view metadata
console.log(tx.binaryViewMetadata);
