import { createHiveChain } from '@hiveio/wax';

const chain = await createHiveChain();

const output = chain.formatter.formatNumber(76543212345678, 3, "en-US");

console.log(output);
