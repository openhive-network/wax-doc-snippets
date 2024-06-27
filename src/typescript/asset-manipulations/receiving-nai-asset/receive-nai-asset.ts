import { createWaxFoundation } from '@hiveio/wax';

// Create a Wax Foundation instance
const waxApi = await createWaxFoundation();

// Assume the existence of some amount
const amount = 1000;

// Convert the amount into `NaiAsset` for HIVE, HBD, and VESTS
const hiveAsset = waxApi.hive(amount);
const hbdAsset = waxApi.hbd(amount);
const vestsAsset = waxApi.vests(amount);

console.log(`Hive Asset: ${JSON.stringify(hiveAsset)}`);
console.log(`HBD Asset: ${JSON.stringify(hbdAsset)}`);
console.log(`Vests Asset: ${JSON.stringify(vestsAsset)}`);