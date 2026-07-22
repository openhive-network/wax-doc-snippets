use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;
use wax::complex_operations::WitnessSetPropertiesOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    let owner = "witness-account";
    let SnippetsBeekeeperData { public_key1, .. } = snippets_beekeeper_data();

    tx.push_complex_operation(
        &chain,
        WitnessSetPropertiesOperation {
            owner: owner.into(),
            witness_signing_key: public_key1,
            ..Default::default()
        },
    )?;

    /*
    Get a transaction object holding all operations and transaction
    TAPOS & expiration data, but transaction is **not signed yet**
    */
    println!("{:#?}", tx.transaction());

    Ok(())
}
