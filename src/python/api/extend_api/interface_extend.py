import asyncio

from msgspec import Struct

from beekeepy.handle.remote import AbstractAsyncApi
from wax import create_hive_chain


class BlockHeader(Struct):
    previous: str
    timestamp: str
    witness: str
    transaction_merkle_root: str
    extensions: list


class BlockHeaderResponse(Struct):
    header: BlockHeader


class BlockApi(AbstractAsyncApi):
    @AbstractAsyncApi.endpoint_jsonrpc
    async def get_block_header(self, *, block_num: int) -> BlockHeaderResponse: ...


class NewApiCall:
    def __init__(self):
        self.block_api = BlockApi


async def main():
    chain = create_hive_chain()
    extended = chain.extends(NewApiCall)
    print(await extended.api.block_api.get_block_header(block_num=123))


asyncio.run(main())
