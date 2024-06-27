import { createHiveChain, EManabarType } from '@hiveio/wax';

const chain = await createHiveChain();
const fullRegenTime = await chain.calculateManabarFullRegenerationTimeForAccount("gtg", EManabarType.DOWNVOTE);
const manabarValue = await chain.calculateCurrentManabarValueForAccount("gtg", EManabarType.DOWNVOTE);

console.log("Full Regeneration Time for Downvote Manabar:", fullRegenTime, manabarValue.percent);