import asyncio

from wax import create_hive_chain
from wax.proto.operations import vote


# Initialize hive chain interface
chain = create_hive_chain()


async def main() -> None:
    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Declare example operation

    vote_operation = vote(voter="voter", author="test-author", permlink="test-permlink", weight=2200)

    # Push operation into the transaction
    tx.push_operation(vote_operation)

    # Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
    built_transaction = tx.transaction

    # Most transaction properties should be read from the transaction before building it.
    print(f"id: {tx.id}")
    print(f"sig_digest: {tx.sig_digest}")

    # Some transaction properties should be read from the transaction after building it.
    print(f"expiration: {built_transaction.expiration}")
    print(f"ref_block_num: {built_transaction.ref_block_num}")


asyncio.run(main())
