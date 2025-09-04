import asyncio

from wax import create_hive_chain
from reputation_api.reputation_api_client import ReputationApi


class ExtendedApi:
    def __init__(self):
        self.reputation_api = ReputationApi


async def main():
    chain = create_hive_chain()
    extended_chain = chain.extends(new_api=ExtendedApi)

    print(f"Reputation: {await extended_chain.api.reputation_api.accounts_reputation('gtg')}")
    print(f"Version: {await extended_chain.api.reputation_api.version()}")
    print(f"Last synced block: {await extended_chain.api.reputation_api.last_synced_block()}")


asyncio.run(main())
