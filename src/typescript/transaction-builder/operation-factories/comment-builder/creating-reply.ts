import { createHiveChain, ReplyBuilder } from '@hiveio/wax';

// Initialize the chain
const chain = await createHiveChain();

// Create a transaction
const tx = new chain.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

// Use multiple explicit values
tx.useBuilder(ReplyBuilder, builder => {
    builder
      .setDescription('This is the description of the post inside ReplyBuilder')
      .pushTags('hive');
  },
  // Here `parentAuthor` and `parentPermlink` arguments can't be skipped nor be empty.
  // Also other required operation basic attributes (like `author`) must be explicitly specified.
  'parent_author', 'parent_permlink', 'reply_author', 'reply-body'
);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.build();
