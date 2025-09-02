import asyncio

from wax import create_hive_chain
from wax.proto.operations import vote


# Initialize hive chain interface
chain = create_hive_chain()


async def main():
    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Declare example operation
    operation = vote(voter="voter", author="test-author", permlink="test-permlink", weight=2200)

    # Push operation into the transaction
    tx.push_operation(operation)

    # Log to the console the transaction which is **not signed yet** in the api form
    print(tx.to_api())

    # broadcast the transaction
    # Uncomment the following line to broadcast the transaction to the mainnet (this will most likely fail due to transaction not being signed):
    # await chain.broadcast(transaction=tx)


asyncio.run(main())
