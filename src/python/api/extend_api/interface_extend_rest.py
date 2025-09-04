import asyncio

from beekeepy.handle.remote import AbstractAsyncApi
from wax import create_hive_chain


class ReputationApi(AbstractAsyncApi):

    def base_path(self) -> str:
        return "/reputation-api"

    @AbstractAsyncApi.endpoint_rest().get("/accounts/{account-name}/reputation")
    async def get_account_reputations(self, account_name: str) -> int: ...


class NewApiCall:
    def __init__(self):
        self.reputation_api = ReputationApi


async def main():
    chain = create_hive_chain()
    extended = chain.extends(NewApiCall)

    print(f"Output: {await extended.api.reputation_api.get_account_reputations('gtg')}")


asyncio.run(main())
