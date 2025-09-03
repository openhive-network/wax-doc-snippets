import { createHiveChain } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize an online transaction object
const tx = await chain.createTransaction();

// Declare example operation
const operation = {
  transfer_operation: {
    from: "gtg",
    to: "friend",
    amount: chain.hiveCoins(5),
    // Would be caught:
    memo: 'Here is my private key: '
        + '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
  }
};

// Push operation into the transction
tx.pushOperation(operation);

// Perform on-chain verification before broadcasting
try {
  // The verification would fail before broadcasting

  // Throws error: "Potential private key leak detected!":
  await tx.performOnChainVerification();

  console.log('Verification successful!');
} catch (error) {
  console.error('Verification failed:', error.message);
}
