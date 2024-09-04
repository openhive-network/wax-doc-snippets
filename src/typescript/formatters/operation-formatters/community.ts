import { createHiveChain, CommunityOperation } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.createTransaction();

tx.pushOperation(new CommunityOperation()
  .flagPost("mycomm", "gtg", "first-post", "note")
  .mutePost("mycomm", "gtg", "first-post", "note")
  .pinPost("mycomm", "gtg", "first-post")
  .subscribe("mycomm")
  .unmutePost("mycomm", "gtg", "first-post", "note")
  .unpinPost("mycomm", "gtg", "first-post")
  .unsubscribe("mycomm")
  .setUserTitle("mycomm", "gtg", "first-post")
  .updateProps("mycomm", { title: "Custom title" })
  .authorize("gtg"));

const output = chain.formatter.format(tx.transaction.operations);

console.log(output);
