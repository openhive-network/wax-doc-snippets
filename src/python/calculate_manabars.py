# %% [markdown]
# ## 🧮 Manabar Regeneration Example with WAX
#
# This snippet shows how to calculate:
# - the time needed for full manabar regeneration
# - the current manabar percent
# using the WAX library.
#
# In this example, **current mana is set to exactly 50% of the maximum**.
#
# ⚠️ Note: The same functions can be used to compute manabar values for:
# - upvote mana
# - downvote mana
# - RC manabar (resource credits)
# This allows developers to simulate or track voting power and resource regeneration.

from datetime import datetime, timezone
from typing import Final
import time

from wax import create_wax_foundation

# %% [markdown]
# ##### 1. Constants
ACTUAL_TIMESTAMP: Final[int] = int(time.time())
MAX_MANA: Final[int] = 1_000_000_000

# %% [markdown]
# ##### 2. Create WAX foundation instance
wax = create_wax_foundation()

# %% [markdown]
# ##### 3. Calculate full regeneration time
regeneration_time = wax.calculate_manabar_full_regeneration_time(
    head_block_time=datetime.fromtimestamp(ACTUAL_TIMESTAMP, tz=timezone.utc),
    max_mana=MAX_MANA,
    current_mana=int(MAX_MANA * 0.5),  # current mana = 50% of max
    last_update_time=ACTUAL_TIMESTAMP,
)

print(f"⏳ Time needed for full manabar regeneration: {regeneration_time.time()}")

# %% [markdown]
# ##### 4. Calculate current manabar percent
percent_of_manabar = wax.calculate_current_manabar_value(
    head_block_time=datetime.fromtimestamp(ACTUAL_TIMESTAMP, tz=timezone.utc),
    max_mana=MAX_MANA,
    current_mana=int(MAX_MANA * 0.5),  # current mana = 50% of max
    last_update_time=ACTUAL_TIMESTAMP,
)

print(f"🔋 Current manabar percent: {percent_of_manabar.percent}%")
# %%
