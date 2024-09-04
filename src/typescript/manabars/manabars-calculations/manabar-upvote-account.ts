import { createHiveChain, EManabarType } from '@hiveio/wax';

const chain = await createHiveChain();
const fullRegenTime = await chain.calculateManabarFullRegenerationTimeForAccount("gtg", EManabarType.UPVOTE);
const manabarValue = await chain.calculateCurrentManabarValueForAccount("gtg", EManabarType.UPVOTE);

console.log("Full Regeneration Time for Upvote Manabar:", fullRegenTime, manabarValue.percent);
