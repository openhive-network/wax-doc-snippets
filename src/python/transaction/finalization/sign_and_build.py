from __future__ import annotations

import asyncio

from beekeepy import AsyncBeekeeper
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

    async with await AsyncBeekeeper.factory() as beekeeper:
        async with await beekeeper.create_session() as session:
            existing_wallets = [w.name for w in await session.wallets_created]

            if WALLET_NAME in existing_wallets:
                wallet = await session.open_wallet(name=WALLET_NAME)
                await wallet.unlock(WALLET_PASSWORD)
            else:
                wallet = await session.create_wallet(name=WALLET_NAME, password=WALLET_PASSWORD)

            async with wallet:
                await wallet.import_key(private_key=private_key)
                # Build transaction with signature provided.
                await tx.sign(wallet, public_key)
                print(tx.to_api())


asyncio.run(main())
