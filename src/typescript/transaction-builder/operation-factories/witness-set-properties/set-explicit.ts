import { createHiveChain, WitnessSetPropertiesOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

const owner = "witness-account";
const { publicKey1 } = globalThis.snippetsBeekeeperData;
const maxBlockSize = 65536;
const hbdInterestRate = 750; // 7.5%
const accountCreationFee = chain.hive(30000); // 300.000 HIVE
const witnessUrl = "https://witness.example.com";

// Initialize a transaction object
const tx = await chain.createTransaction();

tx.pushOperation(new WitnessSetPropertiesOperation({
    owner,
    witnessSigningKey: publicKey1,
    maximumBlockSize: maxBlockSize,
    hbdInterestRate,
    accountCreationFee,
    url: witnessUrl
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
