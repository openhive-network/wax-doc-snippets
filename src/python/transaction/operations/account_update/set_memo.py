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

    # Select memo role and set its key
    op.roles.memo.set(public_key="STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA")

    # Push operation to transaction
    tx.push_operation(op)
    print(f"Transaction ready to sign and broadcast: {tx.to_string()}")


asyncio.run(main())
