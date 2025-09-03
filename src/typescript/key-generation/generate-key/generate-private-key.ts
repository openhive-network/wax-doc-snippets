import { createWaxFoundation } from '@hiveio/wax';

const waxApi = await createWaxFoundation();
const accountName = "your-account";
const role = "active"; // roles can be 'active', 'owner', 'posting', or 'memo'
// Important notice!!!
// The master password should always be a truly random and secure value, such
// as one retrieved from the JS crypto interface.
// We used Math.random() here just for convenience.
const masterPassword = Math.random().toString();

// Generating a new private key from a password
const privateKeyData = waxApi.getPrivateKeyFromPassword(accountName, role, masterPassword);

console.log(`Associated Public Key: ${privateKeyData.associatedPublicKey}`);
console.log(`WIF Private Key: ${privateKeyData.wifPrivateKey}`);
