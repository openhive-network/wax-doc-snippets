import asyncio
from datetime import datetime

from wax import create_hive_chain
from rc_api.rc_api_client import RcApi


class ExtendedApis:
    def __init__(self):
        self.rc_api = RcApi


async def main():
    chain = create_hive_chain()
    chain = chain.extends(ExtendedApis)

    gdpo = await chain.api.database_api.get_dynamic_global_properties()

    response = await chain.api.rc_api.find_rc_accounts(accounts=["gtg"])
    rc_gtg = response.rc_accounts[0]

    rc_manabar = chain.calculate_current_manabar_value(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=rc_gtg.max_rc,
        current_mana=rc_gtg.rc_manabar.current_mana,
        last_update_time=rc_gtg.rc_manabar.last_update_time,
    )

    rc_manabar_full_regeneration_time = chain.calculate_manabar_full_regeneration_time(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=rc_gtg.max_rc,
        current_mana=rc_gtg.rc_manabar.current_mana,
        last_update_time=rc_gtg.rc_manabar.last_update_time,
    )

    print(
        f"Full Regeneration Time for Resource Credits Manabar:",
        {rc_manabar_full_regeneration_time},
        {rc_manabar.percent},
    )


asyncio.run(main())
