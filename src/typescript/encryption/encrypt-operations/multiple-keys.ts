import { createHiveChain } from "@hiveio/wax";

const { wallet, publicKey1, publicKey2 } = globalThis.snippetsBeekeeperData; /* Import preconfigured beekeeper data specific to snippet examples */

const hiveChain = await createHiveChain();

// Create a transaction
const tx = await hiveChain.createTransaction();

// Start the encryption chain with two keys
tx.startEncrypt(publicKey1, publicKey2)
  .pushOperation({ // Add encrypted operations
    transfer_operation: {
      from: "alice",
      to: "bob",
      amount: hiveChain.hiveCoins(5), // Send 5.000 HIVE (Note: Coins, not satoshis)
      memo: "This memo will be encrypted with two keys"
    }
  })
  .stopEncrypt(); // Stop the encryption chain

// Sign and build the transaction
tx.sign(wallet, publicKey1);

console.log(tx.transaction);
