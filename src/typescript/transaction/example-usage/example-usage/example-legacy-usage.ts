import { createHiveChain } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

// Create/get a wallet
const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData;

// Create a transaction
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  vote_operation: {
    voter: "voter",
    author: "author",
    permlink: "test-permlink",
    weight: 2200
  }
};

// Push the operation into the transaction
tx.pushOperation(operation);

// Convert the transaction into the Hive API-legacy form JSON before signing
const legacyApiTx = tx.toLegacyApi();

console.log(legacyApiTx);

// Because we want to process transction signing in legacy way, we need to sign the transaction externally, which is shown below.
// We need to calculate the transaction digest first.
const digest = tx.legacy_sigDigest;

/*
Other signers (except beekeeper) do not allow signing the digest directly,
this is a beekeeper-specific feature.
*/

// Generate the signature based on the transction digest
const signature = wallet.signDigest(publicKey1, digest);

// Suplement the transaction by created signature
tx.addSignature(signature);

// This is JSON form ready for broadcasting or passing to third-party service.
const txApiForm = tx.toLegacyApi();

console.log(txApiForm);
