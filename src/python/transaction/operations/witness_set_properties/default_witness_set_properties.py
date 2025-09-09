import asyncio

from wax import create_hive_chain
from wax.complex_operations.witness_set_properties import WitnessSetProperties, WitnessSetPropertiesData


async def main():
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Initialize a transaction object
    tx = await chain.create_transaction()

    tx.push_operation(
        WitnessSetProperties(
            data=WitnessSetPropertiesData(
                owner="witness-account", witness_signing_key="STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA"
            )
        )
    )

    # Get a transaction object holding all operations and transaction
    # TAPOS & expiration data, but transaction is **not signed yet**
    print(tx.to_string())


asyncio.run(main())
