import { createHiveChain, ReplyOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Use multiple explicit values
tx.pushOperation(new ReplyOperation({
  // Here you can pass the arguments to given operation class constructor
  // Here `parentAuthor` and `parentPermlink` arguments can't be skipped nor be empty.
  // Also other required operation basic attributes (like `author`) must be explicitly specified.
  parentAuthor: 'parent-author',
  parentPermlink: 'parent-permlink',
  author: 'reply-author',
  permlink: 'reply-permlink',
  body: 'the-reply-body',
  description: 'This is the description of the post inside ReplyOperation',
  tags: ['hive']
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
console.log(tx.transaction);
