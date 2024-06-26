import { createHiveChain, RecurrentTransferBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = new chain.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

const from = "sender-account";
const to = "recipient-account";
const amount = chain.hive(10000); // 100.000 HIVE
const memo = "Monthly subscription";
const recurrence = 24; // every day
const executions = 30; // for 30 days

tx.useBuilder(RecurrentTransferBuilder, () => {}, from, to, amount, memo, recurrence, executions);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.build();
