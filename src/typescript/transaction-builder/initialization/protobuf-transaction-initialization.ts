import { createWaxFoundation, transaction } from '@hiveio/wax';

const wax = await createWaxFoundation();

const tx: transaction = {
  ref_block_num: 34559,
  ref_block_prefix: 1271006404,
  expiration: '2021-12-13T11:31:33',
  operations: [],
  extensions: [],
  signatures: []
};

// Constructs a new Transaction Builder object with ready protobuf transaction.
new wax.TransactionBuilder(tx);
