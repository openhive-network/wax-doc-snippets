import { createHiveChain } from "@hiveio/wax";

const { wallet, publicKey1, publicKey2 } = globalThis.snippetsBeekeeperData; /* Import preconfigured beekeeper data specific to snippet examples */

const hiveChain = await createHiveChain();
const content = "This is a secret message.";

// Encrypt the content using two keys - sender side
const encryptedContent = hiveChain.encrypt(wallet, content, publicKey1, publicKey2);

// Decrypt the content - receiver side
const decryptedContent = hiveChain.decrypt(wallet, encryptedContent);

console.log(decryptedContent); // This is a secret message.