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

const txSigned = txFromApi.build(wallet, publicKey1);

// log txSigned
console.log(txSigned);

// Multi sign the transaction with another public key
const txMultiSigned = txFromApi.build(wallet, publicKey2);

// log multi signed transaction
console.log(txMultiSigned);

// Broadcast the transaction
const txBroadcasted = new BroadcastTransactionRequest(txFromApi);

// log broadcasted transaction
console.log(txBroadcasted);
