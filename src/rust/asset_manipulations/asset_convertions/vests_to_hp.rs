use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a Wax Foundation instance
    let wax_api = create_wax_foundation(None);

    // Assume these amounts represent the vests, totalVestingFundHive, and totalVestingShares
    let vests_amount = 1_000000;
    let total_vesting_fund_hive_amount = 20_000;
    let total_vesting_shares_amount = 5_000000;

    // Convert amounts to `NaiAsset`
    let vests_asset = wax_api.vests_satoshis(vests_amount)?;
    let total_vesting_fund_hive_asset =
        wax_api.hive_satoshis(total_vesting_fund_hive_amount)?;
    let total_vesting_shares_asset =
        wax_api.vests_satoshis(total_vesting_shares_amount)?;

    // Use `vests_to_hp` to perform the conversion
    let hp_asset = wax_api.vests_to_hp(
        &vests_asset,
        &total_vesting_fund_hive_asset,
        &total_vesting_shares_asset,
    )?;

    println!("HP Asset: {hp_asset:?}");

    Ok(())
}
