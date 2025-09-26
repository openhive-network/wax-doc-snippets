from __future__ import annotations

import asyncio

from wax import create_hive_chain
from wax.proto.operations import vote

# Initialize hive chain interface
chain = create_hive_chain()

WALLET_NAME = "wallet_name"
WALLET_PASSWORD = "wallet_password"
key = chain.get_private_key_from_password("account_name", role="active", password="password")
public_key = key.associated_public_key
private_key = key.wif_private_key


async def main():
    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Declare example operation
    operation = vote(voter="voter", author="test-author", permlink="test-permlink", weight=2200)

    # Push operation into the transaction
    tx.push_operation(operation)

    # Supplement a transaction with an externally generated signature.
    tx.add_signature("deadc0de")
    print(tx.to_api())


asyncio.run(main())
