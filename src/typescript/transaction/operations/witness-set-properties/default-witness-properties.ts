import { createHiveChain, WitnessSetPropertiesOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

const owner = 'witness-account';
const { publicKey1 } = globalThis.snippetsBeekeeperData;

tx.pushOperation(new WitnessSetPropertiesOperation({
  owner,
  witnessSigningKey: publicKey1,
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
console.log(tx.transaction);
