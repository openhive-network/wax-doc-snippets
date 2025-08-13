# %% [markdown]
# # 💱 Asset Conversion Examples with WAX
#
# This snippet shows how to perform common asset manipulations using the WAX library:
# - Convert **HBD → HIVE**
# - Convert **HIVE → HBD**
# - Convert **VESTS → HP (Hive Power)**

# These functions are useful for financial calculations, voting power, or simulating blockchain transactions.
from wax import create_wax_foundation

# #### 1. Create a WAX foundation instance
# This object provides all utility functions for asset manipulation.
# Internally, it uses the same blockchain logic as the live Hive network.
wax = create_wax_foundation()

# %% [markdown]
# #### 2. Convert HBD to HIVE
# Using current market data (base and quote), we can calculate how many HIVE tokens correspond to a given amount of HBD.
hbd = wax.hbd.satoshis(12_345_678_000)
hive_from_hbd = wax.hbd_to_hive(hbd=hbd, base=wax.hbd.satoshis(1_000), quote=wax.hive.satoshis(10_000))
print(f"From {hbd.amount} HBD you get {hive_from_hbd.amount} HIVE according to the current base/quote rate.")


# %% [markdown]
# #### 3. Convert HIVE to HBD
# Reverse conversion using the same base and quote values.
hive = wax.hive.satoshis(amount=12_345_678_000)
hbd_from_hive = wax.hive_to_hbd(hive=hive, base=wax.hbd.satoshis(amount=1_000), quote=wax.hive.satoshis(amount=2_000))
print(f"From {hive.amount} HIVE you get {hbd_from_hive.amount} HBD according to the current base/quote rate.")

# %% [markdown]
# #### 4. Convert VESTS to Hive Power (HP)
# This conversion requires the total vesting fund and total vesting shares from the blockchain.
vests = wax.vests.satoshis(amount=12_345_678_000_000)
hp = wax.vests_to_hp(
    vests=vests,
    total_vesting_fund_hive=wax.hive.satoshis(amount=1_000),
    total_vesting_shares=wax.vests.satoshis(amount=2_000_000),
)
print(f"From {vests.amount} VESTS you get {hp.amount} HP based on the total vesting fund and total vesting shares.")
# %%
