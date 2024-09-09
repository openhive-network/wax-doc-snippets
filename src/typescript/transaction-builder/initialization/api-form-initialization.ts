import { createHiveChain, IWaxBaseInterface } from '@hiveio/wax';

const chain = await createHiveChain();

// We use IWaxBaseInterface here to enforce lack of any network activity.
const base: IWaxBaseInterface = chain;

// Fetch block data from Hive API.
const { block } = await chain.api.block_api.get_block({ block_num: 5000000 });

// Converts Hive API-form transaction in JSON form to our transaction.
base.createTransactionFromJson(block!.transactions[0]);
