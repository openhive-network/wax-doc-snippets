import { createHiveChain, RecurrentTransferOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

const from = "sender-account";
const to = "recipient-account";
const amount = chain.hive(10000); // 100.000 HIVE
const memo = "Monthly subscription";
const recurrence = 24; // every day
const executions = 30; // for 30 days

tx.pushOperation(new RecurrentTransferOperation({
  from,
  to,
  amount,
  memo,
  recurrence,
  executions
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
