import { createWaxFoundation } from '@hiveio/wax';

const waxApi = await createWaxFoundation();


// Convert the amount into `NaiAsset` for HIVE, HBD, and VESTS
const hiveAsset = waxApi.hive(1000); // 1.000 HIVE
const hbdAsset = waxApi.hbd(1000); // 1.000 HBD
const vestsAsset = waxApi.vests(1_000_000); //1 VEST

console.log(`Hive Asset: ${JSON.stringify(hiveAsset)}`);
console.log(`HBD Asset: ${JSON.stringify(hbdAsset)}`);
console.log(`Vests Asset: ${JSON.stringify(vestsAsset)}`);