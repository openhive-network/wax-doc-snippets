import { createHiveChain, RecurrentTransferOperation } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = chain.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

const from = "sender-account";
const to = "recipient-account";
const pairId = 12345;
const amount = chain.hive(10000); // 100.000 HIVE
const memo = "Monthly subscription";

// Use this time just for example default values for recurrence and executions which is 24 for recurrence and 2 for executions.
tx.pushOperation(new RecurrentTransferOperation({
  from,
  to,
  // Add pairId to the operation constructor
  pairId,
  amount,
  memo
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
