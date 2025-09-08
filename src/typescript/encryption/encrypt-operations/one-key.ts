import { createHiveChain } from "@hiveio/wax";

/* Import preconfigured beekeeper data specific to snippet examples */
const { signer1, publicKey1 } = globalThis.snippetsBeekeeperData;

const hiveChain = await createHiveChain();

// Create a transaction
const tx = await hiveChain.createTransaction();

// Start the encryption chain
tx.startEncrypt(publicKey1)
  .pushOperation({ // Add encrypted operation
    transfer_operation: {
      from: "alice",
      to: "bob",
      amount: hiveChain.hiveCoins(5.100), // Send 5.100 HIVE (Note: Coins, not satoshis)
      memo: "This memo will be encrypted"
    }
  })
  .stopEncrypt(); // Stop the encryption chain

// Sign and build the transaction
await signer1.signTransaction(tx);

console.log(tx.transaction);
