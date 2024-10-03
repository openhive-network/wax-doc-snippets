import { createWaxFoundation } from '@hiveio/wax';

const waxApi = await createWaxFoundation();

// Convert the amount into `NaiAsset` for HIVE, HBD, and VESTS
const hiveAsset = waxApi.hiveSatoshis(1_000); // 1.000 HIVE
const hbdAsset = waxApi.hbdSatoshis(1_000); // 1.000 HBD
const vestsAsset = waxApi.vestsSatoshis(1_000000); // 1.000000 VESTS

console.log(`Hive Asset: ${JSON.stringify(hiveAsset)}`);
console.log(`HBD Asset: ${JSON.stringify(hbdAsset)}`);
console.log(`Vests Asset: ${JSON.stringify(vestsAsset)}`);
