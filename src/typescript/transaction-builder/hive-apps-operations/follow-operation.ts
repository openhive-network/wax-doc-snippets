import { createHiveChain, FollowOperation } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.createTransaction();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; // It should be the public key of the account that you authorize the operation

// Your account name
const yourAccount = 'your_account';

// Blog author name to follow
const blogToFollow = 'interesting_blog';

// Blog author name to mute
const blogToMute = 'spammer';

// Author of post to reblog
const toReblog = 'reblog_me';

// Create follow operation new instance
const followOperation = new FollowOperation();

// Push operations of follow operation into the created transaction
tx.pushOperation(
  followOperation
    .followBlog(yourAccount, blogToFollow)
    .muteBlog(yourAccount, blogToMute)
    .reblog(yourAccount, toReblog, 'post_permlink')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(yourAccount)
);

// Sign and build the transaction
tx.sign(wallet, publicKey1);

console.log(tx.transaction.operations[0]); // Follow operation
console.log(tx.transaction.operations[1]); // Mute operation
console.log(tx.transaction.operations[2]); // Reblog operation
