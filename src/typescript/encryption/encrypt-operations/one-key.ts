import { createHiveChain } from "@hiveio/wax";

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; /* Import preconfigured beekeeper data specific to snippet examples */

const hiveChain = await createHiveChain();

// Create a transaction builder
const txBuilder = await hiveChain.getTransactionBuilder();

// Start the encryption chain
txBuilder.startEncrypt(publicKey1)
  .push({ // Add encrypted operation
    transfer: {
      from_account: "alice",
      to_account: "bob",
      amount: hiveChain.hive(100),
      memo: "This memo will be encrypted"
    }
  })
  .stopEncrypt(); // Stop the encryption chain

// Sign and build the transaction
const signedTx = txBuilder.build(wallet, publicKey1);

console.log(signedTx);