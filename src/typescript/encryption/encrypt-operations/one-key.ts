import { createHiveChain } from "@hiveio/wax";

const { wallet, publicKey1 } = globalThis.snippetsBeekeeperData; /* Import preconfigured beekeeper data specific to snippet examples */

const hiveChain = await createHiveChain();

// Create a transaction
const tx = await hiveChain.createTransaction();

// Start the encryption chain
tx.startEncrypt(publicKey1)
  .pushOperation({ // Add encrypted operation
    transfer: {
      from_account: "alice",
      to_account: "bob",
      amount: hiveChain.hiveCoins(5.100), // Send 5.100 HIVE (Note: Coins, not satoshis)
      memo: "This memo will be encrypted"
    }
  })
  .stopEncrypt(); // Stop the encryption chain

// Sign and build the transaction
tx.sign(wallet, publicKey1);

console.log(tx.transaction);
