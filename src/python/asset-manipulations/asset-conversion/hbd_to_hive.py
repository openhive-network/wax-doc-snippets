from wax import create_wax_foundation


# Create a Wax Foundation instance
wax = create_wax_foundation()

# Assume these amounts represent the HBD, base, and quote
hbd_amount = 1_000
base_amount = 1_500
quote_amount = 2_000

# Convert amounts to `NaiAsset`
hbd_asset = wax.hbd.satoshis(hbd_amount)
base_asset = wax.hbd.satoshis(base_amount)
quote_asset = wax.hive.satoshis(quote_amount)

# Use `hbd_to_hive` to perform the conversion
hive_asset = wax.hbd_to_hive(hbd_asset, base_asset, quote_asset)
print(f"Converted Hive Asset: {hive_asset}")
