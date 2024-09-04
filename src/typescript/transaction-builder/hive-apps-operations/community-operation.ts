import { createHiveChain, CommunityOperation } from '@hiveio/wax';

// Create chain
const chain = await createHiveChain();

// Create transaction with data from remote
const tx = await chain.createTransaction();

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; // It should be the public key of the account that you authorize the operation

// Your account name
const yourAccount = 'your_account';

// Community name you want to join
const communityName = 'community_name'

// Create community operation new instance
const communityOperation = new CommunityOperation();

// Push operations of community operation into the created transaction
tx.pushOperation(
  communityOperation
    // Subscribe the community
    .subscribe(communityName)
    // Flag the post of the author (authoraccount) in the community (communityname) with the permlink (postpermlink)
    // Add notes regarding the violation (violation notes).
    .flagPost(communityName, 'author_account', 'post_permlink', 'violation notes')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(yourAccount)
);

// Sign and build the transaction
tx.sign(wallet, publicKey1);

console.log(tx.transaction.operations[0]); // Subscribe operation
console.log(tx.transaction.operations[1]); // Flag post operation
