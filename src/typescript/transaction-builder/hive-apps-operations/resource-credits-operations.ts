import { createHiveChain, ResourceCreditsOperationBuilder } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.getTransactionBuilder();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; // It should be the public key of the account that you authorize the operation

// Your account name
const yourAccount = 'your_account';

// Friend's account
const friend = 'your_friend_account';

// Other friend's account
const otherFriend = 'other_friend_account'

// Create resource credits operation builder new instance
const rcOperation = new ResourceCreditsOperationBuilder();

// Push operations of resource credits operation builder into the created transaction
tx.push(
  rcOperation
  // Delegate 1000 RC from your account to a friend's account.
  .delegate(yourAccount, 1000, friend)
  // The account that authorizes underlying custom json operation is also reponsible for signing the transaction usign its posting authority
  .authorize(yourAccount)
  .build() // Build the current set of hive apps opeartion readu to be pushed into the transaction
);

// Sign and build the transaction
tx.build(wallet, publicKey1);

const otherTx = await chain.getTransactionBuilder();

otherTx.push(
  rcOperation
    // Remove delegation of RC from your account to a friend's account.
    .removeDelegation(yourAccount, otherFriend)
    .authorize(yourAccount) // The account that authorizes the operation must also sign the transaction
    .build() // Build the current set of hive apps opeartion readu to be pushed into the transaction
);

// Sign and build the other transaction
const otherBuiltTx = otherTx.build(wallet, publicKey1);

console.log(otherBuiltTx.operations[0]); // Delegate operation
console.log(otherBuiltTx.operations[1]); // Remove delegation operation
