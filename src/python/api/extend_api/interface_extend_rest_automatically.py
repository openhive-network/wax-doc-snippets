import asyncio

from wax import create_hive_chain
from reputation_api.reputation_api_client import ReputationApi


# Class containing additional APIs
class ExtendedApi:
    def __init__(self):
        # Extend the chain interface with the predefined ReputationApi
        self.reputation_api = ReputationApi


async def main():
    chain = create_hive_chain()
    # Create an extended chain with the new API
    extended_chain = chain.extends(new_api=ExtendedApi)

    # Calling methods from ReputationApi through the extended interface
    print(f"Reputation: {await extended_chain.api.reputation_api.accounts_reputation('gtg')}")
    print(f"Version: {await extended_chain.api.reputation_api.version()}")
    print(f"Last synced block: {await extended_chain.api.reputation_api.last_synced_block()}")


asyncio.run(main())
