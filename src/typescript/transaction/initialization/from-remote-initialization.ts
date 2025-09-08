import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// expirationTime is optional in this case - it will be
// calculated based on current real blockchain time
// (fetched from dgpo) plus default delay (+1 minute)
const tx1 = await chain.createTransaction();

// explicit relative expirationTime can be set this way:
const tx2 = await chain.createTransaction('+10m');

// absolute expirationTime can also be provided:
const tx3 = await chain.createTransaction(
  new Date('2025-09-08T15:30:00Z')
);
