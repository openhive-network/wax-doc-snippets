import { createWaxFoundation } from '@hiveio/wax';

// Create a Wax Foundation instance
const waxApi = await createWaxFoundation();

// Assume these amounts represent the vests, totalVestingFundHive, and totalVestingShares
const vestsAmount = 1_000000;
const totalVestingFundHiveAmount = 20_000;
const totalVestingSharesAmount = 5_000000;

// Convert amounts to `NaiAsset`
const vestsAsset = waxApi.vestsSatoshis(vestsAmount);
const totalVestingFundHiveAsset = waxApi.hiveSatoshis(totalVestingFundHiveAmount);
const totalVestingSharesAsset = waxApi.vestsSatoshis(totalVestingSharesAmount);

// Use `vestsToHp` to perform the conversion
const hpAsset = waxApi.vestsToHp(
  vestsAsset,
  totalVestingFundHiveAsset,
  totalVestingSharesAsset
);

console.log(`HP Asset: ${JSON.stringify(hpAsset)}`);
