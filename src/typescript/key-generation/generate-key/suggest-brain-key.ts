import { createWaxFoundation } from '@hiveio/wax';

const waxApi = await createWaxFoundation();

// Suggest brain key
const privateKeyData = waxApi.suggestBrainKey();

console.log(`Associated Public Key: ${privateKeyData.associatedPublicKey}`);
console.log(`WIF Private Key: ${privateKeyData.wifPrivateKey}`);
console.log(`Brain Key: ${privateKeyData.brainKey}`);
