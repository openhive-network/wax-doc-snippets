import { createHiveChain, ReplyBuilder, BroadcastTransactionRequest } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create a wallet
const { wallet, publicKey1, publicKey2 } = globalThis.snippetsBeekeeperData;

// Create a transaction
const tx = await chain.getTransactionBuilder();

// Use the ReplyBuilder to create a reply operation
tx.useBuilder(ReplyBuilder, builder => {
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
const apiTx = tx.toApi();

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

// Broadcast the transaction
const broadcastRequest = new BroadcastTransactionRequest(txFromApi);

/*
 * Broadcast finalization.
 * The code is commented out because it is not possible to broadcast transactions in the playground environment.
 * It is because only presentational private keys that has been used here.
 */
// const broadcastedTx = await chain.api.network_broadcast_api.broadcast_transaction(broadcastRequest);
