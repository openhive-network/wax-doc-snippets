use wax::prelude::*;
use wax::api::GetBlockRequest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    // We use &WaxFoundation here to enforce lack of any network activity.
    let base: &WaxFoundation = &chain;

    /*
     * This creation method is useful for cases,
     * when already confirmed blockchain transaction is about to
     * analyzed using Transaction functions
     * such as providing signature_keys or transaction ID.
     */

    // Fetch block data from Hive API.
    let block = chain
        .api()
        .block_api
        .get_block(GetBlockRequest {
            block_num: 5_000_000,
        })
        .await?
        .block
        .expect("block 5000000 exists on the mainnet");

    // Converts Hive API-form transaction in JSON form to our transaction.
    base.create_transaction_from_json(&serde_json::to_string(
        &block.transactions[0],
    )?)?;

    Ok(())
}
