import asyncio

from wax import create_hive_chain
from wax.complex_operations.witness_set_properties import WitnessSetProperties, WitnessSetPropertiesData


async def main():
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Add a witness set properties operation to the transaction
    tx.push_operation(
        WitnessSetProperties(
            data=WitnessSetPropertiesData(
                owner="witness-account",
                witness_signing_key="STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA",
                maximum_block_size=65536,  # Maximum block size in bytes
                hbd_interest_rate=750,  # HBD interest rate as a percentage (7.5%)
                account_creation_fee=chain.hive.coins(1),  # Fee for account creation in Hive coins
                url="https://witness.example.com",
            )
        )
    )

    # Get a transaction object holding all operations and transaction
    # TAPOS & expiration data, but transaction is **not signed yet**
    print(tx.to_string())


asyncio.run(main())
