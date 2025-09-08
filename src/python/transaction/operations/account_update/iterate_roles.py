import asyncio

from wax import create_hive_chain
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation


async def main() -> None:
    # Initialize hive chain interface
    wax = create_hive_chain()

    # Initialize a transaction object
    tx = await wax.create_transaction()

    # Create online operation - createFor will parse authorities for "gtg" account from the chain
    op = await AccountAuthorityUpdateOperation.create_for(wax, account_name="gtg")

    # Iterate over all role levels of hive role category
    for role in op.categories.hive:
        # Print the current role value
        print(str(role.value))

        # Warn if role is null authority
        if role.level != "memo" and role.is_null_authority:
            print("Role is null authority")

    # We do not have to push operation to the transaction as we just wanted to iterate over roles


asyncio.run(main())
