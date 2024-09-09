import { createHiveChain, BlogPostOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

/**
 * Uses the push operation on the transaction and specifies an argument:
 * The operation class new instance, which takes an object as the argument with the operation configuration.
 */
tx.pushOperation(new BlogPostOperation({
  // Here you can pass the arguments to given class constructor
  author: 'post-author',
  permlink: 'post-title',
  body: 'the-post-body',
  title: 'The Post Title',
  category: 'literature',
  description: 'This is the description of the post inside BlogPostOperation',
  alternativeAuthor: 'Ernest Hemingway',
  beneficiaries: [{ account: 'conan-librarian', weight: 40 }]
}));

// Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.transaction;
