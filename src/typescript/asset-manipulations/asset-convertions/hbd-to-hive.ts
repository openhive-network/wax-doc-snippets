import { createWaxFoundation } from '@hiveio/wax';

// Create a Wax Foundation instance
const waxApi = await createWaxFoundation();

// Assume these amounts represent the HBD, base, and quote
const hbdAmount = 1_000;
const baseAmount = 1_500;
const quoteAmount = 2_000;

// Convert amounts to `NaiAsset`
const hbdAsset = waxApi.hbdSatoshis(hbdAmount);
const baseAsset = waxApi.hbdSatoshis(baseAmount);
const quoteAsset = waxApi.hiveSatoshis(quoteAmount);

// Use `hbdToHive` to perform the conversion
const hiveAsset = waxApi.hbdToHive(hbdAsset, baseAsset, quoteAsset);
console.log(`Converted Hive Asset: ${JSON.stringify(hiveAsset)}`);
