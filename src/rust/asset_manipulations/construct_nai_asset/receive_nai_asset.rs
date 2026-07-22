use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Convert the amount into `NaiAsset` for HIVE, HBD, and VESTS
    let hive_asset = wax_api.hive_satoshis(1_000)?; // 1.000 HIVE
    let hbd_asset = wax_api.hbd_satoshis(1_000)?; // 1.000 HBD
    let vests_asset = wax_api.vests_satoshis(1_000000)?; // 1.000000 VESTS

    println!("Hive Asset: {hive_asset:?}");
    println!("HBD Asset: {hbd_asset:?}");
    println!("Vests Asset: {vests_asset:?}");

    Ok(())
}
