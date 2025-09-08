/* Import preconfigured beekeeper data specific to snippet examples */
const { signer1, publicKey1 } = globalThis.snippetsBeekeeperData;

const content = "This is a secret message.";

// Encrypt the content - sender side
// Note that signer1 holds the private key for publicKey1
const encryptedContent = await signer1.encryptData(content, publicKey1);

// Decrypt the content - receiver side
const decryptedContent = await signer1.decryptData(encryptedContent);

console.log(decryptedContent); // This is a secret message.
