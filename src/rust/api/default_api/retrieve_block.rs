use wax::prelude::*;
use wax::api::GetBlockRequest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Equivalent of chain.api.block_api.get_block({ block_num: 1 })
    let output = chain
        .api()
        .block_api
        .get_block(GetBlockRequest { block_num: 1 })
        .await?;

    println!("{output:#?}");

    Ok(())
}
