import asyncio
from datetime import timedelta

from wax import create_hive_chain


chain = create_hive_chain()


async def main() -> None:
    # expirationTime is optional in this case.
    await chain.create_transaction()

    # explicit expirationTime can be set this way:
    await chain.create_transaction(expiration=timedelta(minutes=10))


asyncio.run(main())
