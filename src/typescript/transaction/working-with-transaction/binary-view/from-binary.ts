import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Deserialize transaction from binary form
const tx = chain.convertTransactionFromBinaryForm(
  '8059b32ca6018b9fb568010003677467036774670b68656c6c6f2d776f726c6498080000'
);

// Display our transaction - note: This will create a transaction in Hive API-format
console.log(tx);
