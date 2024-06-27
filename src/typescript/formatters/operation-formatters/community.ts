import { createHiveChain, CommunityOperationBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.getTransactionBuilder();

tx.push(new CommunityOperationBuilder()
  .flagPost("mycomm", "gtg", "first-post", "note")
  .mutePost("mycomm", "gtg", "first-post", "note")
  .pinPost("mycomm", "gtg", "first-post")
  .subscribe("mycomm")
  .unmutePost("mycomm", "gtg", "first-post", "note")
  .unpinPost("mycomm", "gtg", "first-post")
  .unsubscribe("mycomm")
  .setUserTitle("mycomm", "gtg", "first-post")
  .updateProps("mycomm", { title: "Custom title" })
  .authorize("gtg")
  .build());

const built = tx.build();

const output = chain.formatter.format(built.operations);

console.log(output);