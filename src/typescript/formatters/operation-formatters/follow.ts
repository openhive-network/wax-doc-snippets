import { createHiveChain, FollowOperation } from '@hiveio/wax';

const chain = await createHiveChain();

const tx = await chain.createTransaction();

tx.pushOperation(new FollowOperation()
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
  .authorize("initminer"));

const output = chain.formatter.format(tx.transaction.operations);

console.log(output);
