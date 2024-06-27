import { createWaxFoundation } from '@hiveio/wax';

const wax = await createWaxFoundation();

// Constructs a new Transaction Builder object with given data.
new wax.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '+30m');
