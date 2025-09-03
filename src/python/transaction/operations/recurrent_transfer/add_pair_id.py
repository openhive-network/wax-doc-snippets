import asyncio

from wax import create_hive_chain
from wax.proto.operations import recurrent_transfer
from wax._private.proto.recurrent_transfer_extension_pb2 import recurrent_transfer_extension, recurrent_transfer_pair_id


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Use this time just for example default values for recurrence and executions which is 24 for recurrence and 2 for executions.
    recurrent_transfer_operation = recurrent_transfer(
        from_account="sender.account",
        to_account="recip.account",
        amount=chain.hive.coins(100),  # 100.000 HIVE
        memo="Monthly subscription",
        # Add pair_id to the operation constructor
        extensions=[recurrent_transfer_extension(recurrent_transfer_pair_id=recurrent_transfer_pair_id(pair_id=12345))],
    )

    # Initialize a transaction object
    tx = await chain.create_transaction()
    # Push operation into the transaction
    tx.push_operation(recurrent_transfer_operation)

    # Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
    print(tx.transaction)


asyncio.run(main())
