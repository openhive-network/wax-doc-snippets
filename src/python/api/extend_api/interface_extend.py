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


# Define a class-structure for the block header using msgspec's Struct
class BlockHeaderResponse(Struct):
    header: BlockHeader  # Define a structure for the block header using msgspec's Struct


# Define an API for interacting with block headers
class BlockApi(AbstractAsyncApi):
    # This method will be implemented to fetch the block header for a given block number
    @AbstractAsyncApi.endpoint_jsonrpc
    async def get_block_header(self, *, block_num: int) -> BlockHeaderResponse: ...


# As the final step you need to create a new class that will contain all your custom APIs.
class NewApiCall:
    def __init__(self):
        self.block_api = BlockApi


async def main():
    chain = create_hive_chain()
    extended = chain.extends(NewApiCall)
    print(await extended.api.block_api.get_block_header(block_num=123))


asyncio.run(main())
