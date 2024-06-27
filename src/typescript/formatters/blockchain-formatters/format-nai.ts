import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// Data from blockchain
const naiAsset = {
  amount: "300000",
  precision: 3,
  nai: "@@000000021"
};

const output = chain.waxify`Amount: ${naiAsset}`;

console.log(output);