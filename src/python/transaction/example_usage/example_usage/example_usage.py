import asyncio

from beekeepy import AsyncBeekeeper
from wax import create_hive_chain
from wax.proto.operations import vote


# Initialize hive chain interface
chain = create_hive_chain()


class WalletUser:
    def __init__(self, username: str, wallet_name: str, wallet_password: str, role: str = "active"):
        self.username = username
        self.wallet_name = wallet_name
        self.wallet_pass = wallet_password
        self.role = role

        key = chain.get_private_key_from_password(username, role=role, password=wallet_password)
        self.public_key = key.associated_public_key
        self.private_key = key.wif_private_key


async def main():
    # Retrieve the signers
    alice = WalletUser("alice", "alice_wallet_name", "alice_wallet_password")
    bob = WalletUser("bob", "bob_wallet_name", "bob_wallet_password")
    accounts = [alice, bob]

    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Declare example operation
    operation = vote(voter="voter", author="test-author", permlink="test-permlink", weight=2200)

    # Push operation into the transaction
    tx.push_operation(operation)

    async with await AsyncBeekeeper.factory() as beekeeper:
        async with await beekeeper.create_session() as session:
            existing_wallets = [w.name for w in await session.wallets_created]

            if all(acc.wallet_name in existing_wallets for acc in accounts):
                wallets = [await session.open_wallet(name=acc.wallet_name) for acc in accounts]
                alice_wallet, bob_wallet = [await w.unlock(acc.wallet_pass) for w, acc in zip(wallets, accounts)]
            else:
                wallets = [await session.create_wallet(name=a.wallet_name, password=a.wallet_pass) for a in accounts]
                alice_wallet, bob_wallet = wallets

            async with alice_wallet, bob_wallet:
                [await w.import_key(private_key=a.private_key) for w, a in zip([alice_wallet, bob_wallet], accounts)]

                # Convert transaction into the Hive API-form JSON.
                tx_in_api_form = tx.to_api()
                print(tx_in_api_form)

                # Apply the transaction in the API form into transaction interface
                tx_from_api = chain.create_transaction_from_json(tx_in_api_form)
                print(tx_from_api.to_api())

                # Sign the transaction in the API form into transaction interface, and log signed transaction
                await tx_from_api.sign(alice_wallet, alice.public_key)
                print(tx_from_api.to_api())

                # Apply the transaction in the API form into transaction interface, and log multi-signed transaction
                await tx_from_api.sign(bob_wallet, bob.public_key)
                print(tx_from_api.to_api())

                # Call actual broadcast API to send transaction to the blockchain.
                # The code is commented out because examples does not have access to Hive mainnet keys.

                # await chain.broadcast(transaction=tx_from_api)


asyncio.run(main())
