import asyncio
from datetime import datetime

from wax import create_hive_chain


async def main():
    chain = create_hive_chain()

    gdpo = await chain.api.database_api.get_dynamic_global_properties()

    response = await chain.api.database_api.find_accounts(accounts=["gtg"])
    gtg = response.accounts[0]

    post_voting_power = gtg.post_voting_power.amount
    bps_downvote_value = gdpo.downvote_pool_percent
    downvote_pool_percent = bps_downvote_value / 100
    downvote_max_mana = int(post_voting_power) * (downvote_pool_percent / 100)

    downvote_manabar = chain.calculate_current_manabar_value(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=int(downvote_max_mana),
        current_mana=gtg.downvote_manabar.current_mana,
        last_update_time=gtg.downvote_manabar.last_update_time,
    )

    downvote_manabar_full_regeneration_time = chain.calculate_manabar_full_regeneration_time(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=int(downvote_max_mana),
        current_mana=gtg.downvote_manabar.current_mana,
        last_update_time=gtg.downvote_manabar.last_update_time,
    )

    print(
        f"Full Regeneration Time for Downvote Manabar:",
        {downvote_manabar_full_regeneration_time},
        {downvote_manabar.percent},
    )


asyncio.run(main())
