import asyncio
from datetime import datetime, timedelta, timezone

from wax import create_hive_chain


async def main() -> None:
    # Initialize the Hive chain interface
    chain = create_hive_chain()

    # expiration time is optional in this case - it will be
    # calculated based on current real blockchain time
    # (fetched from dgpo) plus default delay (+1 minute)
    tx_with_default_expiration = await chain.create_transaction()

    # explicit relative expiration time can be set this way (10 minutes from now):
    tx_with_relative_expiration = await chain.create_transaction(expiration=timedelta(minutes=10))

    # absolute expiration time can also be provided:
    expiration_absolute = datetime(2025, 9, 8, 15, 30, 0, tzinfo=timezone.utc)
    tx_with_absolute_expiration = await chain.create_transaction(expiration=expiration_absolute)

    print(f"Default expiration: {tx_with_default_expiration.transaction.expiration}")
    print(f"Relative expiration: {tx_with_relative_expiration.transaction.expiration}")
    print(f"Absolute expiration: {tx_with_absolute_expiration.transaction.expiration}")


asyncio.run(main())
