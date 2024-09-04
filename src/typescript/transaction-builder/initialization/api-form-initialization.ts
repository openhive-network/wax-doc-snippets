import { createWaxFoundation } from '@hiveio/wax';

const wax = await createWaxFoundation();

// Stringify the transaction to be able to show the example.
const tx = JSON.stringify({
  ref_block_num: 34559,
  ref_block_prefix: 1271006404,
  expiration: '2021-12-13T11:31:33',
  operations: [],
  extensions: [],
  signatures: []
});

// Converts Hive API-form transaction in JSON form to our transaction.
wax.createTransactionFromJson(tx);
