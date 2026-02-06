import asyncio

from wax import create_hive_chain
from hiveio_api.rc_api.rc_api_client import RcApi


# Class containing additional APIs
class ExtendedApi:
    def __init__(self):
        # Extend the chain interface with the predefined RcApi
        self.rc_api = RcApi


async def main():
    chain = create_hive_chain()
    # Create an extended chain with the new API
    extended_chain = chain.extends(new_api=ExtendedApi)

    # Calling methods from RcApi through the extended interface
    print(f"RC Accounts: {await extended_chain.api.rc_api.find_rc_accounts(accounts=['gtg'])}")
    print(f"Resource Pool: {await extended_chain.api.rc_api.get_resource_pool()}")


asyncio.run(main())
