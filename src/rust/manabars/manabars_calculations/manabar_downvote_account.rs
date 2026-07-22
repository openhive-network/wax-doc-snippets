use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;
    let full_regen_time = chain
        .calculate_manabar_full_regeneration_time_for_account(
            "gtg",
            EManabarType::Downvote,
        )
        .await?;
    let manabar_value = chain
        .calculate_current_manabar_value_for_account(
            "gtg",
            EManabarType::Downvote,
        )
        .await?;

    println!(
        "Full Regeneration Time for Downvote Manabar: {} {}",
        full_regen_time,
        manabar_value.percent()
    );

    Ok(())
}
