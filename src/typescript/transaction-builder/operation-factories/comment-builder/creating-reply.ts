import { createHiveChain, ReplyOperation } from '@hiveio/wax';

// Initialize the chain
const chain = await createHiveChain();

// Create a transaction
const tx = chain.createTransactionWithTaPoS('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

// Use multiple explicit values
tx.pushOperation(new ReplyOperation({
  // Here you can pass the arguments to given operation class constructor
  // Here `parentAuthor` and `parentPermlink` arguments can't be skipped nor be empty.
  // Also other required operation basic attributes (like `author`) must be explicitly specified.
  parentAuthor: 'parent_author',
  parentPermlink: 'parent_permlink',
  author: 'reply_author',
  permlink: 'reply-permlink',
  body: 'the-reply-body',
  description: 'This is the description of the post inside ReplyOperation',
  tags: ['hive']
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
