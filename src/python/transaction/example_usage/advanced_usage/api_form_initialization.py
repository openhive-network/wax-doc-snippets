from __future__ import annotations

import asyncio
from typing import Any

from beekeepy.handle.remote import AbstractAsyncApi
from wax import create_hive_chain


class BlockApi(AbstractAsyncApi):
    @AbstractAsyncApi.endpoint_jsonrpc
    async def get_block(self, *, block_num: int) -> Any: ...


class ApiCollection:
    def __init__(self) -> None:
        self.block_api = BlockApi


async def main():
    # Initialize hive chain interface
    chain = create_hive_chain().extends(ApiCollection)

    # This creation method is useful for cases,
    # when already confirmed blockchain transaction is about to
    # analyzed using ITransaction functions
    # such as providing signatureKeys or transaction ID.

    # Fetch block data from Hive API.
    block = await chain.api.block_api.get_block(block_num=5000000)

    # Converts Hive API-form transaction in JSON form to our transaction.
    tx = chain.create_transaction_from_json(block["block"]["transactions"][0])


asyncio.run(main())
