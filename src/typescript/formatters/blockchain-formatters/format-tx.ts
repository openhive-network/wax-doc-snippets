import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// Data from blockchain
const tx = {
  ref_block_num: 1959,
  ref_block_prefix: 3625727107,
  expiration: "2023-11-09T22:01:24",
  operations: [
    {
      type: "transfer_operation",
      value: {
        from: "oneplus7",
        to: "kryptogames",
        amount: {
          amount: "300000",
          precision: 3,
          nai: "@@000000021"
        },
        memo: "Roll under 50 4d434bd943616"
      }
    }
  ],
  extensions: []
};

const output = chain.waxify`Tx: #${tx}`;

console.log(output);