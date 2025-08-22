from wax import create_wax_foundation


# Create a Wax Foundation instance
wax = create_wax_foundation()


# Assume these amounts represent the vests, total_vesting_fund_hive_amount, and total_vesting_shares_amount
vests_asset = 1_000000
total_vesting_fund_hive_amount = 20_000
total_vesting_shares_amount = 5_000000

# Convert amounts to `NaiAsset`
vests_asset = wax.vests.satoshis(vests_asset)
total_vesting_fund_hive_amount = wax.hive.satoshis(total_vesting_fund_hive_amount)
total_vesting_shares_amount = wax.vests.satoshis(total_vesting_shares_amount)

# Use `vests_to_hp` to perform the conversion
hp_asset = wax.vests_to_hp(vests_asset, total_vesting_fund_hive_amount, total_vesting_shares_amount)
print(f"HP Asset: \n\n{hp_asset}")
