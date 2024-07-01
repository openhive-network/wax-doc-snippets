import { createHiveChain, ArticleBuilder } from '@hiveio/wax';

// Initialize the chain
const chain = await createHiveChain();

// Create a transaction
const tx = new chain.TransactionBuilder('04c507a8c7fe5be96be64ce7c86855e1806cbde3', '2023-11-09T21:51:27');

/**
 * Uses the operation builder on the transaction and specifies two arguments:
 * 1. The builder you would like to use,
 * 2. Arrow function to use specific methods that are available inside the builder you have chosen.
 */
tx.useBuilder(ArticleBuilder, builder => {
    // Here you can set standard set of JSON-metadata properties, supported by Hive-Apps stack
    builder
      .setCategory('literature')
      .setDescription('This is the description of the post inside ArticleBuilder')
      .setAlternativeAuthor('Ernest Hemingway')
      .addBeneficiaries({ account: 'conan-librarian', weight: 40 });
  },
  // Here you can pass the arguments to given builder class constructor: author, title and body.
  // Permlink specification can be skipped - the library will generate the one for you basing on author and current time to enforce uniqueness.
  'post_author', 'post-title', 'the-post-body'
);

// Build up a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
tx.build();
