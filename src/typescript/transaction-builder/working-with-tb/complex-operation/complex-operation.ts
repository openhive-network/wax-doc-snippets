import { createHiveChain, WitnessSetPropertiesBuilder } from '@hiveio/wax';

// Initialize chain
const chain = await createHiveChain();

const { publicKey1 } = globalThis.snippetsBeekeeperData;

// Initialize transaction
const tx = await chain.getTransactionBuilder();

// Build operation
tx.useBuilder(WitnessSetPropertiesBuilder, builder => {
  builder.setUrl('https://example.com')
}, 'owner', publicKey1);

// Build up ProtoTransaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
const builtTransaction = tx.build();

console.log(builtTransaction.operations);