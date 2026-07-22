use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    // expiration is optional in this case - it will be
    // calculated based on current real blockchain time
    // (fetched from dgpo) plus default delay (+1 minute)
    let _tx1 = chain.create_transaction(None).await?;

    // explicit relative expiration can be set this way:
    let _tx2 = chain.create_transaction("+10m").await?;

    // absolute expiration can also be provided:
    let _tx3 = chain
        .create_transaction("2025-09-08T15:30:00")
        .await?;

    Ok(())
}
