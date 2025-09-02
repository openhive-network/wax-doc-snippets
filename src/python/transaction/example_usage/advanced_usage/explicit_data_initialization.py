from __future__ import annotations

import asyncio
from datetime import timedelta

from wax import create_hive_chain


async def main():
    # Initialize hive chain interface
    chain = create_hive_chain()

    # get information about chain
    gdpo = await chain.api.database_api.get_dynamic_global_properties()
    head_block_id = gdpo.head_block_id

    # `create_transaction_with_tapos` can be useful for cases
    # when you would like to perform a lot of massive operations
    # without any access to remote Hive API calls.
    # Due to long TAPOS lifespan (near to 64000 blocks,
    # so it really targets to the c.a. 3 hours), you can easily
    # once receive TAPOS data (reference block-id) from blockchain
    # and next reuse it in your code generating massive transactions,
    # to finally sign and broadcast them.

    # here comes your massive transaction generation code:
    tx = chain.create_transaction_with_tapos(tapos_block_id=head_block_id, expiration=timedelta(minutes=10))

    # Add some operations here, to finally sign and broadcast


asyncio.run(main())
