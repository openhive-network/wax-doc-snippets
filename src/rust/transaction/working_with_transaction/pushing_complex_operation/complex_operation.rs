use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize chain
    let chain = create_hive_chain(None)?;

    let SnippetsBeekeeperData { public_key1, .. } = snippets_beekeeper_data();

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Build operation
    tx.push_complex_operation(
        &chain,
        WitnessSetPropertiesOperation {
            owner: "owner".into(),
            witness_signing_key: public_key1,
            url: Some("https://example.com".into()),
            ..Default::default()
        },
    )?;

    /*
    Get a transaction object holding all operations and transaction
    TAPOS & expiration data, but transaction is **not signed yet**
    */
    let built_transaction = tx.transaction();

    // Witness set properties operation
    println!("{:#?}", built_transaction.operations[0]);

    Ok(())
}
