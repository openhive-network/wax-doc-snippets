import asyncio

from wax import create_hive_chain


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Use predefined database API and call get_dynamic_global_properties method
    gdpo = await chain.api.database_api.get_dynamic_global_properties()

    print(f"Output: {gdpo}")


asyncio.run(main())
