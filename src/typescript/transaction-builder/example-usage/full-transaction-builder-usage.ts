import beekeeperFactory from '@hiveio/beekeeper';
import {
  createHiveChain,
  createWaxFoundation,
  ReplyOperation,
  BroadcastTransactionRequest,
  BlogPostOperation,
  ECommentFormat,
  RecurrentTransferOperation,
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
    permlink: "test_permlink",
    weight: 2200
  }
};

// Push simple vote operation into previously initialized transaction
simpleOperationTx.pushOperation(voteOp);

// Sign and build the transaction
simpleOperationTx.sign(wallet, publicPostingSigningKey);

// Log the simple transaction into console in API form
console.log(simpleOperationTx.toApi());

// Prepare transaction for broadcasting
const simpleOperationTxBroadcastRequest = new BroadcastTransactionRequest(simpleOperationTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(simpleOperationTxBroadcastRequest);

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
    amount: chain.hive(100),
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

// Prepare transaction for broadcasting
const legacyTxBroadcastRequest = new BroadcastTransactionRequest(legacyTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(legacyTxBroadcastRequest);

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
    amount: chain.hive(100),
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

// Prepare transaction for broadcasting
const encryptionTxBroadcastRequest = new BroadcastTransactionRequest(encryptionTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(encryptionTxBroadcastRequest);

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
  permlink: 'My_article_permlink',
  title: 'My article title',
  body: 'My article body',
  category: 'my-category',
  tags: ['my-article'],
  description: 'This is my article!',
  images: ['article.jpg'],
  links: ['https://example.com'],
  format: ECommentFormat.MARKDOWN,
  beneficiaries: [{ account: 'friend', weight: 40 }],
  maxAcceptedPayout: chain.hbd(100),
  allowCurationRewards: true,
  allowVotes: true
}));

/*
 * Use ReplyOperation to create a reply operation and set all fields.
 * Note that the category is not set because it is only available in the BlogPostOperation.
*/
commentOperationTx.pushOperation(new ReplyOperation({
  author: accountName,
  permlink: 'My_reply_permlink',
  parentAuthor: accountName,
  parentPermlink: 'My_article_permlink',
  body: 'My reply body',
  tags: ['my-reply'],
  description: 'This is my reply!',
  images: ['reply.jpg'],
  links: ['https://example.com'],
  format: ECommentFormat.MARKDOWN,
  beneficiaries: [{ account: 'friend', weight: 40 }],
  maxAcceptedPayout: chain.hbd(100),
  allowCurationRewards: true,
  allowVotes: true
}));

/* Note that all the logic is hidden under the specific operation constructor that you are currently using */

// Sign and build the transaction
commentOperationTx.sign(wallet, publicPostingSigningKey);

// Log the article transaction into console in API form
console.log(commentOperationTx.toApi());

// Prepare transaction for broadcasting
const commentOperationTxBroadcastRequest = new BroadcastTransactionRequest(commentOperationTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(commentOperationTxBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                    Other operation factories scenario                     //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction
const operationFactoriesTx = await chain.createTransaction();

// Create a recurrent transfer operation that will be executed every day for 30 days with the ammount of 100 HIVE
operationFactoriesTx.pushOperation(new RecurrentTransferOperation({
  from: accountName,
  to: 'friend',
  amount: chain.hive(100),
  memo: 'Daily pay',
  recurrence: 24,
  executions: 30
}));

// Create a proposal update operation of id equals 1 with the ammount of 100 HIVE
operationFactoriesTx.pushOperation(new UpdateProposalOperation({
  proposalId: 1,
  creator: accountName,
  dailyPay: chain.hbd(100),
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
  accountCreationFee: chain.hive(30000),
  url: "https://example.com"
}));

// Sign and build the transaction
operationFactoriesTx.sign(wallet, publicActiveSigningKey);

// Log the operation factories transaction into console in API form
console.log(operationFactoriesTx.toApi());

// Prepare transaction for broadcasting
const operationFactoriesTxBroadcastRequest = new BroadcastTransactionRequest(operationFactoriesTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(operationFactoriesTxBroadcastRequest);

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
    .followBlog(accountName, 'blog_to_follow')
    .muteBlog(accountName, 'blog_to_mute')
    .reblog(accountName, 'to_reblog', 'post_permlink')
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
const communityName = 'community_name';

// Push operations of community operation into the created transaction
otherOperationsTx.pushOperation(
  communityOperation
    // Subscribe the community
    .subscribe('communityName')
    // Flag the post of the author in the community with the permlink
    // Add notes regarding the violation (violation notes).
    .flagPost(communityName, 'author_account', 'post_permlink', 'violation notes')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(accountName)
);

// Sign and build the transaction
otherOperationsTx.sign(wallet, publicPostingSigningKey);

// Log the other operations transaction into console in API form
console.log(otherOperationsTx.toApi());

// Prepare transaction for broadcasting
const otherOperationsTxBroadcastRequest = new BroadcastTransactionRequest(otherOperationsTx);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(otherOperationsTxBroadcastRequest);

// Beekeeper cleanup
session.close();
await beekeeper.delete();
