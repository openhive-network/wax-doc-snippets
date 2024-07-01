import { createHiveChain, FollowOperationBuilder } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.getTransactionBuilder();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; // It should be the public key of the account that you authorize the operation

// Your account name
const yourAccount = 'your_account';

// Blog author name to follow
const blogToFollow = 'interesting_blog';

// Blog author name to mute
const blogToMute = 'spammer';

// Author of post to reblog
const toReblog = 'reblog_me';

// Create follow operation builder new instance
const followOperation = new FollowOperationBuilder();

// Push operations of follow operation builder into the created transaction
tx.push(
  followOperation
    .followBlog(yourAccount, blogToFollow)
    .muteBlog(yourAccount, blogToMute)
    .reblog(yourAccount, toReblog, 'post_permlink')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction usign its posting authority
    .authorize(yourAccount)
    .build() // Build the current set of hive apps opeartion readu to be pushed into the transaction
);

// Sign and build the transaction
const builtTx = tx.build(wallet, publicKey1);

console.log(builtTx.operations[0]); // Follow operation
console.log(builtTx.operations[1]); // Mute operation
console.log(builtTx.operations[2]); // Reblog operation
