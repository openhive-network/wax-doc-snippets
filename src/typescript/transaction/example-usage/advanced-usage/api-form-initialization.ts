import { createHiveChain, IWaxBaseInterface } from '@hiveio/wax';

const chain = await createHiveChain();

// We use IWaxBaseInterface here to enforce lack of any network activity.
const base: IWaxBaseInterface = chain;

/**
 * This creation method is useful for cases,
 * when already confirmed blockchain transaction is about to
 * analyzed using ITransaction functions
 * such as providing signatureKeys or transactoin ID.
 */

// Fetch block data from Hive API.
const { block } = await chain.api.block_api.get_block({ block_num: 5000000 });

// Converts Hive API-form transaction in JSON form to our transaction.
base.createTransactionFromJson(block!.transactions[0]);
