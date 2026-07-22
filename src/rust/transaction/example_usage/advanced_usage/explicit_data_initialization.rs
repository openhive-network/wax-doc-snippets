use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    // We use &WaxFoundation here to enforce lack of any network activity.
    let base: &WaxFoundation = &chain;

    /* `create_transaction_with_chain_reference_data` can be useful for cases
     * when you would like to perform a lot of massive operations
     * without any access to remote Hive API calls.
     * Due to long TAPOS lifespan (near to 64000 blocks,
     * so it really targets to the c.a. 3 hours), you can easily
     * once receive TAPOS data (reference block-id) from blockchain
     * and next reuse it in your code generating massive transactions,
     * to finally sign and broadcast them.
     */

    let dgp = chain
        .api()
        .database_api
        .get_dynamic_global_properties(Default::default())
        .await?;

    // here comes your massive transaction generation code:
    base.create_transaction_with_chain_reference_data(
        &dgp.head_block_id,
        None,
        Some("+10m"),
    )?;

    // Add some operations here
    // to finally sign and broadcast

    Ok(())
}
