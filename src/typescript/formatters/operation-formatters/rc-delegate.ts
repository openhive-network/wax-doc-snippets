import { createHiveChain, ResourceCreditsOperation } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.createTransaction();

tx.pushOperation(new ResourceCreditsOperation()
  .delegate("initminer", 4127361273, "gtg", "null")
  .removeDelegation("initminer", "null")
  .authorize("initminer"));

const output = chain.formatter.format(tx.transaction.operations);

console.log(output);
