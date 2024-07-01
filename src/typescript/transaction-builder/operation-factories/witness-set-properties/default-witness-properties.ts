import { createHiveChain, WitnessSetPropertiesBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = new chain.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

const owner = 'witness-account';
const { publicKey1 } = globalThis.snippetsBeekeeperData;

tx.useBuilder(WitnessSetPropertiesBuilder, () => {}, owner, publicKey1);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.build();
