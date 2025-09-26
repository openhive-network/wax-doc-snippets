import asyncio
import secrets
import string

from beekeepy import AsyncBeekeeper
from wax import create_hive_chain, create_wax_foundation
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation
from wax.complex_operations.witness_set_properties import WitnessSetProperties, WitnessSetPropertiesData
from wax.proto.operations import vote


async def main():
    # Create a Wax Foundation instance
    my_wax = create_wax_foundation()

    # Initialize hive chain interface
    chain = create_hive_chain()

    # Initialize beekeeper instance
    bk = await AsyncBeekeeper.factory()

    # Initialize beekeeper session
    session = await bk.create_session(salt="salt")

    # Create personal wallet
    wallet = await session.create_wallet(name="my_wallet", password="my_wallet_password")
    await wallet.unlock(password="my_wallet_password")

    async with bk:
        async with wallet:
            # Declare example account name
            account_name = "your-account"

            # Declare example password for generating private key
            characters = string.ascii_letters + string.digits + string.punctuation
            master_password = "".join(secrets.choice(characters) for _ in range(24))

            # Generating a new posting private key from a password
            private_posting_key_data = my_wax.get_private_key_from_password(
                account=account_name, role="posting", password=master_password
            )

            # Import the posting private key into the wallet
            public_posting_signing_key = await wallet.import_key(private_key=private_posting_key_data.wif_private_key)

            # Generating a new active private key from a password
            private_active_key_data = my_wax.get_private_key_from_password(
                account=account_name, role="active", password=master_password
            )

            # Import the active private key into the wallet
            public_active_signing_key = await wallet.import_key(private_key=private_active_key_data.wif_private_key)

            # Generating a new encryption private key from a password
            private_memo_key_data = my_wax.get_private_key_from_password(
                account=account_name, role="memo", password=master_password
            )

            # Import the memo private key into the wallet
            public_memo_signing_key = await wallet.import_key(private_key=private_memo_key_data.wif_private_key)

            # ==============================================================
            #                    Simple operation scenario
            # ==============================================================

            # Initialize a transaction object
            simple_operation_tx = await chain.create_transaction()

            vote_op = vote(voter="voter", author="test-author", permlink="test-permlink", weight=2200)

            # Push simple vote operation into previously initialized transaction
            simple_operation_tx.push_operation(vote_op)

            # Sign and build the transaction
            await simple_operation_tx.sign(wallet=wallet, public_key=public_active_signing_key)
            # Log the simple transaction into console in API form
            print(simple_operation_tx.to_api())

            # Call actual broadcast API to send transaction to the blockchain.
            # The code is commented out because examples does not have access to
            # Hive mainnet keys.
            # await chain.broadcast(transaction=simple_operation_tx)

            # =============================================================
            #                 Account authority update scenario
            # =============================================================

            # This example will create account_update2_operation

            # Create a transaction
            account_update_tx = await chain.create_transaction()

            # Use AccountAuthorityUpdateOperation to create
            # new account_update2_operation with all the fields initialized

            # Create online operation - createFor will parse authorities for "gtg" account from the chain
            account_authority_update_op = await AccountAuthorityUpdateOperation.create_for(chain, account_name="gtg")

            # role method squashes all authority categories and allows you to select
            # specific ones to modify in a user-friendly interface
            has_gandalf_auth = account_authority_update_op.roles.active.has("gandalf")
            print(f"Has Gandalf Auth:", {has_gandalf_auth})

            # Add frodo authority with weight 2
            account_authority_update_op.roles.active.add(account_or_key="frodo", weight=2)

            # Update the memo key
            account_authority_update_op.roles.memo.set("STM8GC13uCZbP44HzMLV6zPZGwVQ8Nt4Kji8PapsPiNq1BK153XTX")

            # You can also iterate over different authority levels from given category, to perform batch operations
            print("Current account authority:")

            for role in account_authority_update_op.categories.hive:
                print(f"{role.level}", ":", {str(role.value)})

            # Push operation to the transaction
            account_update_tx.push_operation(account_authority_update_op)

            # Sign and build the transaction
            await account_update_tx.sign(wallet=wallet, public_key=public_posting_signing_key)

            # Log the article transaction into console in API form
            print(account_update_tx.to_api())

            # Call actual broadcast API to send transaction to the blockchain.
            # The code is commented out because examples does not have access
            # to Hive mainnet keys.
            # await chain.broadcast(transaction=account_update_tx)

            # =============================================================
            #                 WitnessSetProperties scenario
            # =============================================================

            # This example will create witness_set_properties_operation

            # Create a transaction
            witness_set_properties_tx = await chain.create_transaction()

            # Use WitnessSetProperties and WitnessSetPropertiesData to create
            # new witness_set_properties_operation with all the fields initialized
            witness_set_properties_op = WitnessSetProperties(
                data=WitnessSetPropertiesData(
                    owner=account_name,
                    witness_signing_key=public_posting_signing_key,
                    maximum_block_size=65536,
                    hbd_interest_rate=750,
                    account_creation_fee=chain.hive.coins(300),
                    url="https://example.com",
                )
            )

            # Push operation to the transaction
            witness_set_properties_tx.push_operation(witness_set_properties_op)

            # Sign and build the transaction
            await witness_set_properties_tx.sign(wallet=wallet, public_key=public_active_signing_key)

            # Log the article transaction into console in API form
            print(witness_set_properties_tx.to_api())

            # Call actual broadcast API to send transaction to the blockchain.
            # The code is commented out because examples does not have access
            # to Hive mainnet keys.
            # await chain.broadcast(transaction=witness_set_properties_tx)


asyncio.run(main())
