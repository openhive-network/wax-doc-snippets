import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// expirationTime is optional in this case.
await chain.createTransaction();

// explicit expirationTime can be set this way:
await chain.createTransaction('+10m');
