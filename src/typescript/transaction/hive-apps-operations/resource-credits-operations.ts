import { createHiveChain, ResourceCreditsOperation } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.createTransaction();

const { signer1 } = globalThis.snippetsBeekeeperData;

// Your account name
const yourAccount = 'your-account';

// Friend's account
const friend = 'your-friend-account';

// Other friend's account
const otherFriend = 'other-friend-account'

// Create resource credits operation new instance
const rcOperation = new ResourceCreditsOperation();

// Push operations of resource credits operation into the created transaction
tx.pushOperation(
  rcOperation
  // Delegate 1000 RC from your account to a friend's account.
  .delegate(yourAccount, 1000, friend)
  // The account that authorizes underlying custom json operation is
  // also reponsible for signing the transaction using its posting authority
  .authorize(yourAccount)
);

// Sign and build the transaction
await signer1.signTransaction(tx);

const otherTx = await chain.createTransaction();

otherTx.pushOperation(
  rcOperation
    // Remove delegation of RC from your account to a friend's account.
    .removeDelegation(yourAccount, otherFriend)
    .authorize(yourAccount) // The account that authorizes the operation must also
    // sign the transaction// Build the current set of hive apps operation
    // ready to be pushed into the transaction
);

// Sign and build the other transaction
await signer1.signTransaction(otherTx);

console.log(otherTx.transaction.operations[0]); // Delegate operation
console.log(otherTx.transaction.operations[1]); // Remove delegation operation
