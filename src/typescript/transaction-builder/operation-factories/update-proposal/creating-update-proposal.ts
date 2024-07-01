import { createHiveChain, UpdateProposalBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = new chain.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

const proposalId = 1;
const creator = "your-account";
const dailyPay = chain.hive(10000); // 100.000 HIVE
const subject = "Proposal Update";
const permlink = "proposal-update";

tx.useBuilder(UpdateProposalBuilder, () => {}, proposalId, creator, dailyPay, subject, permlink);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.build();
