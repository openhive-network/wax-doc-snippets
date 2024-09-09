import { createHiveChain, createWaxFoundation, IWaxBaseInterface } from '@hiveio/wax';

const chain = await createHiveChain();

// We use IWaxBaseInterface here to enforce lack of any network activity.
const base: IWaxBaseInterface = chain;

/** `createTransactionWithTaPoS` can be useful for cases when you would like to perform a lot of massive operations
 * without any access to remote Hive API calls.
 * Due to long TAPOS lifespan (near to 64000 blocks, so it really targets to the c.a. 3 hours),
 * you can easily once receive TAPOS data (reference block-id) from blockchain
 * and next reuse it in your code generating massive transactions, to finally sign and broadcast them.
*/

const { head_block_id } = await chain.api.database_api.get_dynamic_global_properties({});

/// here comes your massive transaction generation code:
base.createTransactionWithTaPoS(head_block_id, '+10m');

/// Add some operations here
/// to finally sign and broadcast
