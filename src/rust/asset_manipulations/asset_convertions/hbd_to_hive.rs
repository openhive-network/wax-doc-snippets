use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a Wax Foundation instance
    let wax_api = create_wax_foundation(None);

    // Assume these amounts represent the HBD, base, and quote
    let hbd_amount = 1_000;
    let base_amount = 1_500;
    let quote_amount = 2_000;

    // Convert amounts to `NaiAsset`
    let hbd_asset = wax_api.hbd_satoshis(hbd_amount)?;
    let base_asset = wax_api.hbd_satoshis(base_amount)?;
    let quote_asset = wax_api.hive_satoshis(quote_amount)?;

    // Use `hbd_to_hive` to perform the conversion
    let hive_asset = wax_api.hbd_to_hive(&hbd_asset, &base_asset, &quote_asset)?;
    println!("Converted Hive Asset: {hive_asset:?}");

    Ok(())
}
