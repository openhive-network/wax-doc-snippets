import { createHiveChain, WitnessSetPropertiesOperation } from '@hiveio/wax';

const chain = await createHiveChain();

const owner = "witness-account";
const { publicKey1 } = globalThis.snippetsBeekeeperData;
const maxBlockSize = 65536;
const hbdInterestRate = 750; // 7.5%
const accountCreationFee = chain.hive(30000); // 300.000 HIVE
const witnessUrl = "https://witness.example.com";

const tx = chain.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

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
