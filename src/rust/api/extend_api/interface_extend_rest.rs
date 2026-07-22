use serde::{Deserialize, Serialize};
use serde_json::Value;
use wax::prelude::*;

/// Represents the parameters of the hafah block-header endpoint.
#[derive(Serialize)]
pub struct BlockHeaderRequest {
    #[serde(rename = "blockNum")]
    pub block_num: u32,
}

/// Represents the result of the hafah block-header endpoint.
#[derive(Debug, Deserialize)]
pub struct BlockHeaderResponse {
    pub witness: String,
    pub previous: String,
    pub timestamp: HiveDateTime,
    pub extensions: Vec<Value>,
    pub transaction_merkle_root: String,
}

// Note: We have to provide the API structure and the implementation details
// (URL template with {} placeholders and HTTP methods) up front — in Rust
// both live in one `#[hive_api(rest)]` trait declaration.
#[hive_api(rest)]
pub trait HafahApi {
    /// Fetches the header of the given block.
    #[get("/hafah-api/blocks/{blockNum}/header")]
    async fn header(params: BlockHeaderRequest) -> BlockHeaderResponse;
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    let extended = chain.extend_rest::<HafahApi>();

    // Call the hafah API using our extended interface
    let result = extended
        .header(BlockHeaderRequest {
            block_num: 12345678,
        })
        .await?;

    println!("{result:#?}");

    Ok(())
}
