import { createHiveChain, ReplyOperation } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create/get a wallet
const { wallet, publicKey1, publicKey2 } = globalThis.snippetsBeekeeperData;

// Create a transaction
const tx = await chain.createTransaction();

// Use the ReplyOperation to create a reply operation
tx.pushOperation(new ReplyOperation({
  parentAuthor: 'parent-author',
  parentPermlink: 'parent-permlink',
  author: 'author',
  body: 'body',
  beneficiaries: [{ account: 'test', weight: 40 }],
  tags: ['tag'],
  description: 'description',
}));

// Convert the transaction into the Hive API-form JSON
const apiTx = tx.toApi();

// log apiTransaction
console.log(apiTx);

// Apply the transaction in the API form into transaction interface
const txFromApi = chain.createTransactionFromJson(apiTx);

txFromApi.sign(wallet, publicKey1);

// Log txSigned
console.log(txFromApi.toApi());

// Multi sign the transaction with another public key
txFromApi.sign(wallet, publicKey2);

// log multi signed transaction
console.log(txFromApi.toApi());

/*
 * Call actual broadcast API to send transaction to the blockchain.
 * The code is commented out because examples does not have access to Hive mainnet keys.
 */
// await chain.broadcast(txFromApi);
