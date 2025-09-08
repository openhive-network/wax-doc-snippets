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

    # Add "initminer" to owner role and change weight threshold to 2
    op.roles.owner.add("initminer", 1).set_threshold(threshold=2)

    # Push operation to transaction
    tx.push_operation(op)
    print(f"Transaction ready to sign and broadcast: {tx.to_string()}")


asyncio.run(main())
