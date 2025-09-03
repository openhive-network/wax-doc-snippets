import asyncio

from wax import create_hive_chain
from wax.proto.operations import recurrent_transfer
from wax._private.proto.recurrent_transfer_extension_pb2 import recurrent_transfer_extension, recurrent_transfer_pair_id


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Declare example operation
    recurrent_transfer_operation = recurrent_transfer(
        from_account="sender.account",
        to_account="recip.account",
        amount=chain.hive.coins(0),
        extensions=[recurrent_transfer_extension(recurrent_transfer_pair_id=recurrent_transfer_pair_id(pair_id=1234))],
    )

    # Initialize a transaction object
    tx = await chain.create_transaction()
    # Push operation into the transaction
    tx.push_operation(recurrent_transfer_operation)

    # Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
    print(tx.transaction)


asyncio.run(main())
