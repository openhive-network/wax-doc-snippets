import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object with already existing data
// (txid: 88e992c6094a6c6813f970b77abc4a6fee4a8a27)
const parsedTransaction = chain.createTransactionFromJson({
  "expiration": "2025-09-03T15:43:06",
  "extensions": [],
  "operations": [
    {
      "type": "custom_json_operation",
      "value": {
        "id": "notify",
        "json": "[\"setLastRead\",{\"date\":\"2025-09-03T15:31:07\"}]",
        "required_auths": [],
        "required_posting_auths": [
          "sandormb"
        ]
      }
    }
  ],
  "signatures": [
    "202cf9ea0754d1927a7875fdaf3aa6d743d7ffe4ccdc64059b9d6cb8e7"
    + "5ea1e5421e5d28d7205e6c820f8307c36e97b45da2bed6fa5795b3cf675020b77facdaee"
  ],
  "ref_block_num": 17420,
  "ref_block_prefix": 1854844897
});

const useLegacySerialization = false;

// Create an online transaction to perform online authority verification
const tx = await chain.createTransaction();
// Provide an external transaction for analysis
const trace = await tx.generateAuthorityVerificationTrace(
  useLegacySerialization,
  parsedTransaction
);

// Display the final trace
console.log(trace);
