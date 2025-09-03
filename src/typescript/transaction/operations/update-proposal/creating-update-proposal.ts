import { createHiveChain, UpdateProposalOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

const proposalId = 1;
const creator = "your-account";
const dailyPay = chain.hbdCoins(100); // 100.000 HBD
const subject = "Proposal Update";
const permlink = "proposal-update";

tx.pushOperation(new UpdateProposalOperation({
    proposalId,
    creator,
    dailyPay,
    subject,
    permlink
}));

/*
Get a transaction object holding all operations and transaction
TAPOS & expiration data, but transaction is **not signed yet**
*/
console.log(tx.transaction);
