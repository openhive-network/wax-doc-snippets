import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

const output = await chain.api.block_api.get_block({ block_num: 1 });

console.log(output);