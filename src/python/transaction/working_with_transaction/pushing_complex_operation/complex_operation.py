import asyncio

import wax
from wax import create_hive_chain
from wax.proto.operations import witness_set_properties
from wax.wax_result import python_witness_set_properties_data

# Initialize chain
chain = create_hive_chain()


async def main() -> None:
    # Initialize a transaction object
    trx = await chain.create_transaction()

    wsp_operation = witness_set_properties(
        owner="alice",
        props=wax.serialize_witness_set_properties(
            python_witness_set_properties_data(
                url=b"https://example.com", key="STM57gC3aqyDvu2fPPdfpY2iDtLU6PDb8qD8RGmfxLf1q43PhJYYQ"
            )
        ),
    )

    trx.push_operation(wsp_operation)

    # Get a transaction object holding all operations and transaction TAPOS & expiration data, but transaction is **not signed yet**
    built_transaction = trx.transaction
    print(built_transaction.operations[0])  # Witness set properties operation


asyncio.run(main())
