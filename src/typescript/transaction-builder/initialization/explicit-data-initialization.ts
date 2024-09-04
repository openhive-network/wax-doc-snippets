import { createWaxFoundation } from '@hiveio/wax';

const wax = await createWaxFoundation();

// Constructs a new Transaction object with given data.
wax.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '+30m');
