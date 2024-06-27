import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

// expirationTime is optional in this case.
await chain.getTransactionBuilder();
