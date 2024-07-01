import { createHiveChain, ReplyBuilder, BroadcastTransactionRequest } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create a wallet
const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData;

// Create a transaction
const tx = await chain.getTransactionBuilder();

// Declare example operation
const operation = {
  vote: {
    voter: "voter",
    author: "test_author",
    permlink: "test_permlink",
    weight: 2200
  }
};

// Use the ReplyBuilder to create a reply operation
tx.push(operation);

// Latch the transaction state (pushed operations, expiration time and TAPoS)
tx.build();

// Convert the transaction into the Hive API-legacy form JSON before signing
const legacyApiTx = tx.toLegacyApi();

console.log(legacyApiTx);

// Because we want to process transction signing externally, we need to calculate its digest first.
const digest = tx.legacy_sigDigest;

/* Here you can make any external signing process specific to HIVE transaction, by using another signign tool than beekeeper */

// Generate the signature based on the transction digest
const signature = wallet.signDigest(publicKey1, digest);

// Suplement the transaction by created signature
tx.build(signature);

// This is JSON form ready for broadcasting or passing to third-party service.
const txApiForm = tx.toLegacyApi();

console.log(txApiForm);
