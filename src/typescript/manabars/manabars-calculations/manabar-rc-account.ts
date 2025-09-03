import { createHiveChain, EManabarType } from '@hiveio/wax';

const chain = await createHiveChain();
const fullRegenTime = await chain.calculateManabarFullRegenerationTimeForAccount(
  "gtg",
  EManabarType.RC
);
const manabarValue = await chain.calculateCurrentManabarValueForAccount(
  "gtg",
  EManabarType.RC
);

console.log("Full Regeneration Time for Resource Credits Manabar:", fullRegenTime, manabarValue.percent);
