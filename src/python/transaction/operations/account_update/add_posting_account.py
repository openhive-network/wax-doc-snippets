import asyncio

from wax import create_hive_chain
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Create online operation - createFor will parse authorities for "gtg" account from the chain
    op = await AccountAuthorityUpdateOperation.create_for(chain, account_name="gtg")

    # Add account named "initminer" to the posting role of my account. Weight is by default set to 1
    op.roles.posting.add(account_or_key="initminer")

    # Push operation to transaction
    tx.push_operation(op)
    print(f"Transaction ready to sign and broadcast: {tx.to_string()}")


asyncio.run(main())
