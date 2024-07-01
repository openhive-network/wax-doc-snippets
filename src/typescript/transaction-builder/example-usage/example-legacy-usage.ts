import { createHiveChain, ReplyBuilder, BroadcastTransactionRequest } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create/get a wallet
const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData;

// Create a transaction builder
const txBuilder = await chain.getTransactionBuilder();

// Declare example operation
const operation = {
  vote: {
    voter: "voter",
    author: "test_author",
    permlink: "test_permlink",
    weight: 2200
  }
};

// Push the operation into the transaction
txBuilder.push(operation);

// Latch the transaction state (pushed operations, expiration time and TAPoS)
txBuilder.build();

// Convert the transaction into the Hive API-legacy form JSON before signing
const legacyApiTx = txBuilder.toLegacyApi();

console.log(legacyApiTx);

// Because we want to process transction signing externally, we need to calculate its digest first.
const digest = txBuilder.legacy_sigDigest;

/* Here you can make any external signing process specific to HIVE transaction, by using another signing tool than beekeeper */

// Generate the signature based on the transction digest
const signature = wallet.signDigest(publicKey1, digest);

// Suplement the transaction by created signature
txBuilder.build(signature);

// This is JSON form ready for broadcasting or passing to third-party service.
const txApiForm = txBuilder.toLegacyApi();

console.log(txApiForm);
