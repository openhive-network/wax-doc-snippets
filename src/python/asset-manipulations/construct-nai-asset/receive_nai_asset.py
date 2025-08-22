from wax import create_wax_foundation

wax = create_wax_foundation()

# Convert the amount into `NaiAsset` for HIVE, HBD, and VESTS
hive_asset = wax.hive.satoshis(amount=1_000)  # 1.000 HIVE
hbd_asset = wax.hbd.satoshis(amount=1_000)  # 1.000 HBD
vests_asset = wax.vests.satoshis(amount=1_000_000)  # 1.000000 VESTS

print(f"Hive Asset: {hive_asset}")
print(f"HBD Asset: {hbd_asset}")
print(f"Vests Asset: {vests_asset}")
