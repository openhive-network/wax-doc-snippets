import asyncio

from wax import create_hive_chain
from wax.proto.operations import vote


# Initialize hive chain interface
chain = create_hive_chain()


async def main() -> None:
    # Declare example operation
    vote_operation = vote(
        voter="voter",
        author="test-author",
        permlink="test-permlink",
        weight=2200,
    )

    # Initialize a transaction object
    tx = await chain.create_transaction()
    # Push operation into the transction
    tx.push_operation(vote_operation)

    # Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
    build_tx = tx.transaction
    print(build_tx.operations)


asyncio.run(main())
