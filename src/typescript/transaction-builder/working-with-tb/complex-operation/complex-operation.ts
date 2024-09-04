import { createHiveChain, WitnessSetPropertiesOperation } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

const { publicKey1 } = globalThis.snippetsBeekeeperData;

// Initialize a transaction object
const tx = await chain.createTransaction();

// Build operation
tx.pushOperation(new WitnessSetPropertiesOperation({
  owner: 'owner',
  witnessSigningKey: publicKey1,
  url: 'https://example.com'

}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
const builtTransaction = tx.transaction;

console.log(builtTransaction.operations[0]); // Witness set properties operation
