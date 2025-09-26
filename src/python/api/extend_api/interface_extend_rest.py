import asyncio

from beekeepy.handle.remote import AbstractAsyncApi
from wax import create_hive_chain


# Define a new API client that extends AbstractAsyncApi
class ReputationApi(AbstractAsyncApi):
    def base_path(self) -> str:
        return "/reputation-api"

    # Define a REST endpoint for fetching account reputation
    @AbstractAsyncApi.endpoint_rest().get("/accounts/{account-name}/reputation")
    async def get_account_reputations(self, account_name: str) -> int: ...


# Create a class that contains all custom APIs
class NewApiCall:
    def __init__(self):
        # Add ReputationApi as part of the extended chain interface
        self.reputation_api = ReputationApi


# Example: Extending the chain interface with a custom REST API.
async def main():
    chain = create_hive_chain()
    # Extend the chain with the custom API
    extended = chain.extend_rest(NewApiCall)

    # Call the custom API endpoint through the extended interface
    print(f"Output: {await extended.api.reputation_api.get_account_reputations('gtg')}")


asyncio.run(main())
