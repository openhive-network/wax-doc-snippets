import { createHiveChain, FollowOperationBuilder } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.getTransactionBuilder();

tx.push(new FollowOperationBuilder()
  .followBlacklistBlog("initminer", "gtg", "null")
  .followMutedBlog("initminer", "gtg")
  .resetAllBlog("initminer", "gtg", "null")
  .resetBlacklistBlog("initminer", "gtg")
  .resetFollowBlacklistBlog("initminer", "gtg", "null")
  .resetFollowMutedBlog("initminer", "gtg")
  .unblacklistBlog("initminer", "gtg", "null")
  .unfollowBlacklistBlog("initminer", "gtg")
  .unfollowBlog("initminer", "gtg", "null")
  .unfollowMutedBlog("initminer", "gtg")
  .reblog("initminer", "gtg", "first-post")
  .authorize("initminer")
  .build());

const built = tx.build();

const output = chain.formatter.format(built.operations);

console.log(output);