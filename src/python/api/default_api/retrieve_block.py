import asyncio
from typing import Any

from beekeepy.handle.remote import AbstractAsyncApi
from wax import create_hive_chain


# You can define your own API classes to add new APIs.
# To do this please use `AbstractAsyncApi` as a base class.
# To define endpoints use the `@AbstractAsyncApi.endpoint_jsonrpc` decorator.
# Please remember that the class name must be the same as the name of the API you are defining.
# Please remember that all the endpoint parameters must be defined as keyword arguments.
class BlockApi(AbstractAsyncApi):
    @AbstractAsyncApi.endpoint_jsonrpc
    async def get_block(self, *, block_num: int) -> Any: ...


# As the final step you need to create a new class that will contain all your custom APIs.
class MyFirstApiCollection:
    def __init__(self) -> None:
        self.block_api = BlockApi


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()
    # Created by you api collection needs to be passed to the `extends` method.
    # This will create a new class that will contain all your custom APIs.
    # After extension all your APIs are available in the `api` property of the `ChainApi` class.
    chain_extended = chain.extends(MyFirstApiCollection)

    response = await chain_extended.api.block_api.get_block(block_num=123)
    print(f"Output: {response}")


asyncio.run(main())
