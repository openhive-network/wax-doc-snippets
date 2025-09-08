from __future__ import annotations

import asyncio

from beekeepy import AsyncBeekeeper
from wax import create_hive_chain
from wax.proto.operations import vote


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Generate one pair of keys
    key = chain.get_private_key_from_password("account_name", role="active", password="password")
    public_key = key.associated_public_key
    private_key = key.wif_private_key

    tx = await chain.create_transaction()
    tx.push_operation(vote(voter="alice", author="bob", permlink="example-post", weight=10000))

    async with await AsyncBeekeeper.factory() as beekeeper:
        async with await beekeeper.create_session() as session:
            existing_wallets = [w.name for w in await session.wallets_created]

            if "wallet_name" in existing_wallets:
                wallet = await session.open_wallet(name="wallet_name")
                await wallet.unlock("password_to_wallet")
            else:
                wallet = await session.create_wallet(name="wallet_name", password="password_to_wallet")

            async with wallet:
                await wallet.import_key(private_key=private_key)
                # Wait for the beekeeper to sign the transaction
                await tx.sign(wallet, public_key)

                # broadcast the transaction
                await chain.broadcast(transaction=tx)


asyncio.run(main())
