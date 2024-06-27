import { createWaxFoundation } from '@hiveio/wax';

// Create a Wax Foundation instance
const waxApi = await createWaxFoundation();

// Assume these amounts represent the HBD, base, and quote
const hbdAmount = 1000;
const baseAmount = 1500;
const quoteAmount = 2000;

// Convert amounts to `NaiAsset`
const hbdAsset = waxApi.hbd(hbdAmount);
const baseAsset = waxApi.hbd(baseAmount);
const quoteAsset = waxApi.hive(quoteAmount);

// Use `hbdToHive` to perform the conversion
const hiveAsset = waxApi.hbdToHive(hbdAsset, baseAsset, quoteAsset);
console.log(`Converted Hive Asset: ${JSON.stringify(hiveAsset)}`);