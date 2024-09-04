import { createWaxFoundation } from '@hiveio/wax';

// Create a Wax Foundation instance
const waxApi = await createWaxFoundation();

// Assume these amounts represent the vests, totalVestingFundHive, and totalVestingShares
const vestsAmount = 10000;
const totalVestingFundHiveAmount = 20000;
const totalVestingSharesAmount = 50000;

// Convert amounts to `NaiAsset`
const vestsAsset = waxApi.vests(vestsAmount);
const totalVestingFundHiveAsset = waxApi.hive(totalVestingFundHiveAmount);
const totalVestingSharesAsset = waxApi.vests(totalVestingSharesAmount);

// Use `vestsToHp` to perform the conversion
const hpAsset = waxApi.vestsToHp(vestsAsset, totalVestingFundHiveAsset, totalVestingSharesAsset);
console.log(`HP Asset: ${JSON.stringify(hpAsset)}`);
