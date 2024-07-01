import { createHiveChain, ReplyBuilder, BroadcastTransactionRequest } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create/get a wallet
const { wallet, publicKey1, publicKey2 } = globalThis.snippetsBeekeeperData;

// Create a transaction builder
const txBuilder = await chain.getTransactionBuilder();

// Use the ReplyBuilder to create a reply operation
txBuilder.useBuilder(ReplyBuilder, builder => {
    builder
      .addBeneficiaries({ account: 'test', weight: 40 })
      .pushTags('tag')
      .setDescription('description');
  },
  'parent_author',
  'parent_permlink',
  'author',
  'body'
);

// Convert the transaction into the Hive API-form JSON
const apiTx = txBuilder.toApi();

// log apiTransaction
console.log(apiTx);

// Apply the transaction in the API form into transaction builder interface
const txFromApi = chain.TransactionBuilder.fromApi(apiTx);

txFromApi.build(wallet, publicKey1);

// Log txSigned
console.log(txFromApi.toApi());

// Multi sign the transaction with another public key
txFromApi.build(wallet, publicKey2);

// log multi signed transaction
console.log(txFromApi.toApi());

// Prepare transaction for broadcasting
const broadcastRequest = new BroadcastTransactionRequest(txFromApi);

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(broadcastRequest);
