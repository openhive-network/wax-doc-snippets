import { createHiveChain, ResourceCreditsOperationBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.getTransactionBuilder();

tx.push(new ResourceCreditsOperationBuilder()
  .delegate("initminer", 4127361273, "gtg", "null")
  .removeDelegation("initminer", "null")
  .authorize("initminer")
  .build());

const built = tx.build();

const output = chain.formatter.format(built.operations);

console.log(output);