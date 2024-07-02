import { createHiveChain, WitnessSetPropertiesBuilder } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

const { publicKey1 } = globalThis.snippetsBeekeeperData;

// Initialize a transaction builder object
const txBuilder = await chain.getTransactionBuilder();

// Build operation
txBuilder.useBuilder(WitnessSetPropertiesBuilder, builder => {
  builder.setUrl('https://example.com')
}, 'owner', publicKey1);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
const builtTransaction = txBuilder.build();

console.log(builtTransaction.operations[0]); // Witness set properties operation