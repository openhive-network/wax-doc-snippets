import { createWaxFoundation } from '@hiveio/wax';

const waxApi = await createWaxFoundation();
const accountName = "your-account";
const role = "active"; // roles can be 'active', 'owner', 'posting', or 'memo'
const masterPassword = "your-master-password";

// Generating a new private key from a password
const privateKeyData = waxApi.getPrivateKeyFromPassword(accountName, role, masterPassword);

console.log(`Associated Public Key: ${privateKeyData.associatedPublicKey}`);
console.log(`WIF Private Key: ${privateKeyData.wifPrivateKey}`);