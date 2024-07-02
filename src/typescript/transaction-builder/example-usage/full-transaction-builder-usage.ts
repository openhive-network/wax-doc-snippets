import beekeeperFactory from '@hiveio/beekeeper';
import {
  createHiveChain,
  createWaxFoundation,
  ReplyBuilder,
  BroadcastTransactionRequest,
  ArticleBuilder,
  ECommentFormat,
  RecurrentTransferBuilder,
  UpdateProposalBuilder,
  WitnessSetPropertiesBuilder,
  FollowOperationBuilder,
  ResourceCreditsOperationBuilder,
  CommunityOperationBuilder
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

// Create a transaction builder
const simpleOperationTxBuilder = await chain.getTransactionBuilder();

const voteOp = {
  vote: {
    voter: "voter",
    author: "test_author",
    permlink: "test_permlink",
    weight: 2200
  }
};

// Push simple vote operation into previously initialized transaction
simpleOperationTxBuilder.push(voteOp);

// Sign and build the transaction
simpleOperationTxBuilder.build(wallet, publicPostingSigningKey);

// Log the simple transaction into console in API form
console.log(simpleOperationTxBuilder.toApi());

// Prepare transaction for broadcasting
const simpleOperationTxBuilderBroadcastRequest = new BroadcastTransactionRequest(simpleOperationTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(simpleOperationTxBuilderBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                      Simple operation legacy scenario                     //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction builder
const legacyTxBuilder = await chain.getTransactionBuilder();

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
legacyTxBuilder.push(transferOp)

// Because we want to process transction signing externally, we need to calculate its digest first.
const digest = legacyTxBuilder.legacy_sigDigest;

/* Here you can make any external signing process specific to HIVE transaction, by using another signing tool than beekeeper */

// Generate the signature based on the transction digest
const signature = wallet.signDigest(publicPostingSigningKey, digest);

// Suplement the transaction by created signature
legacyTxBuilder.build(signature);

// This is JSON form ready for broadcasting or passing to third-party service.
const txApiForm = legacyTxBuilder.toLegacyApi();

// Log the simple legacy transaction into console in API form
console.log(txApiForm);

// Prepare transaction for broadcasting
const legacyTxBuilderBroadcastRequest = new BroadcastTransactionRequest(legacyTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(legacyTxBuilderBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                             Encryption example                            //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction builder
const encryptionTxBuilder = await chain.getTransactionBuilder();

// Declare other example transfer operation
const transferEncryptionOp = {
  transfer: {
    from_account: accountName,
    to_account: "friend",
    amount: chain.hive(100),
    memo: "This will be encrypted"
  }
};

encryptionTxBuilder
  // Start encryption process
  .startEncrypt(publicEncryptionSigningKey)
  // Push transfer operation into previously initialized transaction
  .push(transferEncryptionOp)
  // Stop encryption process
  .stopEncrypt()
  // Push another transfer operation into previously initialized transaction
  .push(transferOp);

// Sign and build the transaction
encryptionTxBuilder.build(wallet, publicPostingSigningKey);

// Log the encryption transaction into console in API form
console.log(encryptionTxBuilder.toApi());

// Prepare transaction for broadcasting
const encryptionTxBuilderBroadcastRequest = new BroadcastTransactionRequest(encryptionTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(encryptionTxBuilderBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                       Comment builder scenario                                          //
// This example will create multiple operations including comment_operation and comment_options_operation //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a transaction builder
const commentOperationTxBuilder = await chain.getTransactionBuilder();

/*
 * Use ArticleBuilder to create an article operation and set all fields.
 * Note that all the builder methods are available only inside the builder arrow function.
*/
commentOperationTxBuilder.useBuilder(ArticleBuilder, builder => {
  builder
    .setCategory('my-category')
    .pushTags('my-article')
    .setDescription('This is my article!')
    .pushImages('article.jpg')
    .pushLinks('https://example.com')
    .setFormat(ECommentFormat.MARKDOWN)
    .addBeneficiaries({ account: 'friend', weight: 40 })
    .setMaxAcceptedPayout(chain.hive(100))
    .setAllowCurationRewards(true)
    .setAllowVotes(true)
}, accountName, 'My article title', 'My article body', {}, 'My_article_permlink');

/*
 * Use ReplyBuilder to create a reply operation and set all fields.
 * Note that the category is not set because it is only available in the ArticleBuilder.
*/
commentOperationTxBuilder.useBuilder(ReplyBuilder, builder => {
  builder
    .pushTags('my-reply')
    .setDescription('This is my reply!')
    .pushImages('reply.jpg')
    .pushLinks('https://example.com')
    .setFormat(ECommentFormat.MARKDOWN)
    .addBeneficiaries({ account: 'friend', weight: 40 })
    .setMaxAcceptedPayout(chain.hive(100))
    .setAllowCurationRewards(true)
    .setAllowVotes(true)
}, accountName, 'My_article_permlink', accountName, 'My reply body');

/* Note that all the logic is hidden under the specific builder constructor that you are currently using. Thank to this, the usage of useBuilder is so simple */

// Sign and build the transaction
commentOperationTxBuilder.build(wallet, publicPostingSigningKey);

// Log the article transaction into console in API form
console.log(commentOperationTxBuilder.toApi());

// Prepare transaction for broadcasting
const commentOperationTxBuilderBroadcastRequest = new BroadcastTransactionRequest(commentOperationTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(commentOperationTxBuilderBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
////////////////////////////////////////////////////////////////////////////////
//                    Other operation factories scenario                     //
//////////////////////////////////////////////////////////////////////////////

// Create a transaction builder
const operationFactoriesTxBuilder = await chain.getTransactionBuilder();

// Create a recurrent transfer operation that will be executed every day for 30 days with the ammount of 100 HIVE
operationFactoriesTxBuilder.useBuilder(RecurrentTransferBuilder, () => {}, accountName, 'friend', chain.hive(100), 'Daily pay', 24, 30);

// Create a proposal update operation of id equals 1 with the ammount of 100 HIVE
operationFactoriesTxBuilder.useBuilder(UpdateProposalBuilder, () => {}, 1, accountName, chain.hive(100), 'Proposal Update', 'proposal-update', '2023-03-14');

// Create a witness set properties operation with hbd interest rate of 7.5%, maximum block size of 65536, account creation fee of 300.000 HIVE and url of "https://example.com"
operationFactoriesTxBuilder.useBuilder(WitnessSetPropertiesBuilder, builder => {
  builder
    .setMaximumBlockSize(65536)
    .setHBDInterestRate(750) // 7.5%
    .setAccountCreationFee(chain.hive(30000)) // 300.000 HIVE
    .setUrl("https://example.com");
}, accountName, publicActiveSigningKey);

// Sign and build the transaction
operationFactoriesTxBuilder.build(wallet, publicActiveSigningKey);

// Log the operation factories transaction into console in API form
console.log(operationFactoriesTxBuilder.toApi());

// Prepare transaction for broadcasting
const operationFactoriesTxBuilderBroadcastRequest = new BroadcastTransactionRequest(operationFactoriesTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(operationFactoriesTxBuilderBroadcastRequest);

'--------------------------------------------------------------------------------------------------------------------------------'
//////////////////////////////////////////////////////////////////////////////////
//     Scenario taht includes all HiveAppsOperations (custom_json based)       //
////////////////////////////////////////////////////////////////////////////////

// Create a transaction builder
const otherOperationsTxBuilder = await chain.getTransactionBuilder();

// Create follow operation builder new instance
const followOperationBuilder = new FollowOperationBuilder();

// Push operations of follow operation builder into the created transaction
otherOperationsTxBuilder.push(
  followOperationBuilder
    .followBlog(accountName, 'blog_to_follow')
    .muteBlog(accountName, 'blog_to_mute')
    .reblog(accountName, 'to_reblog', 'post_permlink')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(accountName)
    .build() // Build the current set of hive apps operation ready to be pushed into the transaction
);

// Create resource credits operation builder new instance
const rcOperationBuilder = new ResourceCreditsOperationBuilder();

// Push operations of resource credits operation builder into the created transaction
otherOperationsTxBuilder.push(
  rcOperationBuilder
  // Delegate 1000 RC from your account to a friend's account.
  .delegate(accountName, 1000, 'friend')
  // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
  .authorize(accountName)
  .build() // Build the current set of hive apps operation ready to be pushed into the transaction
);

// Create community operation builder new instance
const communityOperationBuilder = new CommunityOperationBuilder();

// Declare example community name
const communityName = 'community_name';

// Push operations of community operation builder into the created transaction
otherOperationsTxBuilder.push(
  communityOperationBuilder
    // Subscribe the community
    .subscribe('communityName')
    // Flag the post of the author in the community with the permlink
    // Add notes regarding the violation (violation notes).
    .flagPost(communityName, 'author_account', 'post_permlink', 'violation notes')
    // The account that authorizes underlying custom json operation is also reponsible for signing the transaction using its posting authority
    .authorize(accountName)
    .build() // Build the current set of hive apps operation ready to be pushed into the transaction
);

// Sign and build the transaction
otherOperationsTxBuilder.build(wallet, publicPostingSigningKey);

// Log the other operations transaction into console in API form
console.log(otherOperationsTxBuilder.toApi());

// Prepare transaction for broadcasting
const otherOperationsTxBuilderBroadcastRequest = new BroadcastTransactionRequest(otherOperationsTxBuilder);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(otherOperationsTxBuilderBroadcastRequest);

// Beekeeper cleanup
session.close();
await beekeeper.delete();
