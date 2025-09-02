from __future__ import annotations

import asyncio

from wax import create_wax_foundation
from wax.proto.transaction import transaction


async def main():
    # create a Wax Foundation instance
    wax = create_wax_foundation()

    # This creation method is dedicated to usecases, when
    # protobuf transaction object is available for further use.
    # All other actions provided by ITransaction interface are
    # very common to the case specifc to API-JSON interaction.

    tx = transaction(
        ref_block_num=34559,
        ref_block_prefix=1271006404,
        expiration="2021-12-13T11:31:33",
        operations=[],
        extensions=[],
        signatures=[],
    )

    # Constructs a new Transaction object with ready protobuf transaction.
    tx = wax.create_transaction_from_proto(tx)


asyncio.run(main())
