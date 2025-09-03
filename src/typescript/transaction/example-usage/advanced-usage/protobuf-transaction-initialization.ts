import { createWaxFoundation, transaction } from '@hiveio/wax';

const wax = await createWaxFoundation();

/**
 * This creation method is dedicated to usecases, when
 * protobuf transaction object is available for further use.
 * All other actions provided by ITransaction interface are
 * very common to the case specifc to API-JSON interaction.
 */

const tx: transaction = {
  ref_block_num: 34559,
  ref_block_prefix: 1271006404,
  expiration: '2021-12-13T11:31:33',
  operations: [],
  extensions: [],
  signatures: []
};

// Constructs a new Transaction object with ready protobuf transaction.
wax.createTransactionFromProto(tx);
