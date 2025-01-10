import { createHiveChain, AccountAuthorityUpdateOperation } from '@hiveio/wax';

// Initialize hive chain interface
const chain = await createHiveChain();

// Initialize a transaction object
const tx = await chain.createTransaction();

// Create online operation - createFor will parse authorities for "gtg" account from the chain
const op = await AccountAuthorityUpdateOperation.createFor(chain, "gtg");

// Iterate over all role levels of hive role category
for(const role of op.roles("hive")) {
  // Print the current role value
  console.log(role.value);

  // Warn if role is null authority
  if (role.level !== "memo" && role.isNullAuthority)
    console.warn("Role is null authority");
}

// We do not have to push operation to the transaction as we just wanted to iterate over roles
