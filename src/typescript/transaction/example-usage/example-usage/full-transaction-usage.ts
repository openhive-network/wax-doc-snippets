import beekeeperFactory from '@hiveio/beekeeper';
import {
  createHiveChain,
  createWaxFoundation,
  ReplyOperation,
  BlogPostOperation,
  ECommentFormat,
  DefineRecurrentTransferOperation,
  UpdateProposalOperation,
  WitnessSetPropertiesOperation,
  FollowOperation,
  ResourceCreditsOperation,
  CommunityOperation
} from '@hiveio/wax';

// Initialize wax api
const waxApi = await createWaxFoundation();

// Initialize chain
const chain = await createHiveChain();

// Initialize beekeeper
const beekeeper = await beekeeperFactory();

// Create session
const session = beekeeper.createSession('salt');

// Create wallet
const { wallet } = await session.createWallet('w1');

// Declare example account name
const accountName = "your-account";
// Declare example password for generating private key
const masterPassword = "your-master-password";

// Generating a new posting private key from a password
const privatePostingKeyData = waxApi.getPrivateKeyFromPassword(accountName, 'posting', masterPassword);
// Import the posting key into the wallet
const publicPostingSigningKey = await wallet.importKey(privatePostingKeyData.wifPrivateKey);

// Generating a new active private key from a password
const privateActiveKeyData = waxApi.getPrivateKeyFromPassword(accountName, 'active', masterPassword);
// Import the active key into the wallet
const publicActiveSigningKey = await wallet.importKey(privateActiveKeyData.wifPrivateKey);

// Generating a new encryption private key from a password
const privateEncryptionKeyData = waxApi.getPrivateKeyFromPassword(accountName, 'memo', masterPassword);
// Import the encryption key into the wallet
const publicEncryptionSigningKey = await wallet.importKey(privateEncryptionKeyData.wifPrivateKey);

'--------------------------------------------------------------------------------------------------------------------------------'
///////////////////////////////////////////////////////////////////////////////
//                           Simple operation scenario                      //
/////////////////////////////////////////////////////////////////////////////

// Create a transaction
const simpleOperationTx = await chain.createTransaction();

const voteOp = {
  vote: {
    voter: "voter",
    author: "author",
    permlink: "test-permlink",
    weight: 2200
  }
};

// Push simple vote operation into previously initialized transaction
simpleOperationTx.pushOperation(voteOp);

// Sign and build the transaction
simpleOperationTx.sign(wallet, publicPostingSigningKey);

// Log the simple transaction into console in API form
console.log(simpleOperationTx.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(simpleOperationTx);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                      Simple operation legacy scenario                     //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction
const legacyTx = await chain.createTransaction();

// Declare example transfer operation
const transferOp = {
  transfer: {
    from_account: accountName,
    to_account: "friend",
    amount: chain.hiveCoins(100),
    memo: "My transfer operation"
  }
};

// Push simple vote operation into previously initialized transaction
legacyTx.pushOperation(transferOp)

// Because we want to process transction signing externally, we need to calculate its digest first.
const digest = legacyTx.legacy_sigDigest;

/* Here you can make any external signing process specific to HIVE transaction, by using another signing tool than beekeeper */

// Generate the signature based on the transction digest
const signature = wallet.signDigest(publicPostingSigningKey, digest);

// Suplement the transaction by created signature
legacyTx.sign(signature);

// This is JSON form ready for broadcasting or passing to third-party service.
const txApiForm = legacyTx.toLegacyApi();

// Log the simple legacy transaction into console in API form
console.log(txApiForm);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(otherOperationsTx);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                             Encryption example                            //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction
const encryptionTx = await chain.createTransaction();

// Declare other example transfer operation
const transferEncryptionOp = {
  transfer: {
    from_account: accountName,
    to_account: "friend",
    amount: chain.hiveCoins(100),
    memo: "This will be encrypted"
  }
};

encryptionTx
  // Start encryption process
  .startEncrypt(publicEncryptionSigningKey)
  // Push transfer operation into previously initialized transaction
  .pushOperation(transferEncryptionOp)
  // Stop encryption process
  .stopEncrypt()
  // Push another transfer operation into previously initialized transaction
  .pushOperation(transferOp);

// Sign and build the transaction
encryptionTx.sign(wallet, publicPostingSigningKey);

// Log the encryption transaction into console in API form
console.log(encryptionTx.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(otherOperationsTx);

'--------------------------------------------------------------------------------------------------------------------------------'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       Comment operation scenario                                          //
// This example will create multiple operations including comment_operation and comment_options_operation //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a transaction
const commentOperationTx = await chain.createTransaction();

/*
 * Use BlogPostOperation to create an article operation and set all fields.
*/
commentOperationTx.pushOperation(new BlogPostOperation({
  author: accountName,
  permlink: 'my-article-permlink',
  title: 'My article title',
  body: 'My article body',
  category: 'my-category',
  tags: ['my-article'],
  description: 'This is my article!',
  images: ['article.jpg'],
  links: ['https://example.com'],
  format: ECommentFormat.MARKDOWN,
  beneficiaries: [{ account: 'friend', weight: 40 }],
  maxAcceptedPayout: chain.hbdCoins(100),
  allowCurationRewards: true,
  allowVotes: true
}));

/*
 * Use ReplyOperation to create a reply operation and set all fields.
 * Note that the category is not set because it is only available in the BlogPostOperation.
*/
commentOperationTx.pushOperation(new ReplyOperation({
  author: accountName,
  permlink: 'My-reply-permlink',
  parentAuthor: accountName,
  parentPermlink: 'my-article-permlink',
  body: 'My reply body',
  tags: ['my-reply'],
  description: 'This is my reply!',
  images: ['reply.jpg'],
  links: ['https://example.com'],
  format: ECommentFormat.MARKDOWN,
  beneficiaries: [{ account: 'friend', weight: 40 }],
  maxAcceptedPayout: chain.hbdCoins(100),
  allowCurationRewards: true,
  allowVotes: true
}));

/* Note that all the logic is hidden under the specific operation constructor that you are currently using */

// Sign and build the transaction
commentOperationTx.sign(wallet, publicPostingSigningKey);

// Log the article transaction into console in API form
console.log(commentOperationTx.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(otherOperationsTx);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                    Other operation factories scenario                     //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction
const operationFactoriesTx = await chain.createTransaction();

// Create a recurrent transfer operation that will be executed every day for 30 days with the ammount of 100.000 HIVE
operationFactoriesTx.pushOperation(new DefineRecurrentTransferOperation({
  from: accountName,
  to: 'friend',
  amount: chain.hiveCoins(100),
  memo: 'Daily pay',
  recurrence: 24,
  executions: 30
}));

// Create a proposal update operation of id equals 1 with the ammount of 100.000 HBD
operationFactoriesTx.pushOperation(new UpdateProposalOperation({
  proposalId: 1,
  creator: accountName,
  dailyPay: chain.hbdCoins(100),
  subject: 'Proposal Update',
  permlink: 'proposal-update',
  endDate:  '2023-03-14',
}));

// Create a witness set properties operation with hbd interest rate of 7.5%, maximum block size of 65536, account creation fee of 300.000 HIVE and url of "https://example.com"
operationFactoriesTx.pushOperation(new WitnessSetPropertiesOperation({
  owner: accountName,
  witnessSigningKey: publicActiveSigningKey,
  maximumBlockSize: 65536,
  hbdInterestRate: 750,
  accountCreationFee: chain.hiveCoins(300),
  url: "https://example.com"
}));

// Sign and build the transaction
operationFactoriesTx.sign(wallet, publicActiveSigningKey);

// Log the operation factories transaction into console in API form
console.log(operationFactoriesTx.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(otherOperationsTx);

'--------------------------------------------------------------------------------------------------------------------------------'
//////////////////////////////////////////////////////////////////////////////////
//     Scenario taht includes all HiveAppsOperations (custom_json based)       //
////////////////////////////////////////////////////////////////////////////////

// Create a transaction
const otherOperationsTx = await chain.createTransaction();

// Create follow operation new instance
const followOperation = new FollowOperation();

// Push operations of follow operation into the created transaction
otherOperationsTx.pushOperation(
  followOperation
    .followBlog(accountName, 'blog-to-follow')
    .muteBlog(accountName, 'blog-to-mute')
    .reblog(accountName, 'to-reblog', 'post-permlink')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(accountName)
);

// Create resource credits operation new instance
const rcOperation = new ResourceCreditsOperation();

// Push operations of resource credits operation into the created transaction
otherOperationsTx.pushOperation(
  rcOperation
  // Delegate 1000 RC from your account to a friend's account.
  .delegate(accountName, 1000, 'friend')
  // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
  .authorize(accountName)
);

// Create community operation new instance
const communityOperation = new CommunityOperation();

// Declare example community name
const communityName = 'community-name';

// Push operations of community operation into the created transaction
otherOperationsTx.pushOperation(
  communityOperation
    // Subscribe the community
    .subscribe('communityName')
    // Flag the post of the author in the community with the permlink
    // Add notes regarding the violation (violation notes).
    .flagPost(communityName, 'author-account', 'post-permlink', 'violation notes')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(accountName)
);

// Sign and build the transaction
otherOperationsTx.sign(wallet, publicPostingSigningKey);

// Log the other operations transaction into console in API form
console.log(otherOperationsTx.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(otherOperationsTx);

// Beekeeper cleanup
session.close();
await beekeeper.delete();

// Delete the created wax proto_protocol instance
chain.delete();
