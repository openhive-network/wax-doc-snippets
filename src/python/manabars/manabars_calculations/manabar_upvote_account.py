import asyncio
from datetime import datetime

from wax import create_hive_chain


async def main():
    chain = create_hive_chain()

    gdpo = await chain.api.database_api.get_dynamic_global_properties()

    response = await chain.api.database_api.find_accounts(accounts=["gtg"])
    gtg = response.accounts[0]
    post_voting_power = gtg.post_voting_power.amount

    upvoting_manabar = chain.calculate_current_manabar_value(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=int(post_voting_power),
        current_mana=gtg.voting_manabar.current_mana,
        last_update_time=gtg.voting_manabar.last_update_time,
    )

    upvoting_manabar_full_regeneration_time = chain.calculate_manabar_full_regeneration_time(
        head_block_time=datetime.fromisoformat(gdpo.time),
        max_mana=int(post_voting_power),
        current_mana=gtg.voting_manabar.current_mana,
        last_update_time=gtg.voting_manabar.last_update_time,
    )

    print(
        f"Full Regeneration Time for Upvote Manabar:",
        {upvoting_manabar_full_regeneration_time},
        {upvoting_manabar.percent},
    )


asyncio.run(main())
