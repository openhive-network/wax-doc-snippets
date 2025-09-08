/* Import preconfigured beekeeper data specific to snippet examples */
const { signer1, signer2, publicKey2 } = globalThis.snippetsBeekeeperData;

const content = "This is a secret message.";

// Pre-encrypt data for the second signer - sender side
const encryptedContent = await signer1.encryptData(content, publicKey2);

// Decrypt the content - receiver side
const decryptedContent = await signer2.decryptData(encryptedContent);

console.log(decryptedContent); // This is a secret message.
