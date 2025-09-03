import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// expirationTime is optional in this case.
const tx1 = await chain.createTransaction();

// explicit expirationTime can be set this way:
const tx2 = await chain.createTransaction('+10m');
