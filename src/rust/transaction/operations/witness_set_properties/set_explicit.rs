use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;
use wax::complex_operations::WitnessSetPropertiesOperation;
use wax::models::NaiAssetConvertible;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    let owner = "witness-account";
    let SnippetsBeekeeperData { public_key1, .. } = snippets_beekeeper_data();
    let max_block_size = 65536;
    let hbd_interest_rate = 750; // 7.5%
    let account_creation_fee = chain.hive_coins(5)?; // 5.000 HIVE
    let witness_url = "https://witness.example.com";

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    tx.push_complex_operation(
        &chain,
        WitnessSetPropertiesOperation {
            owner: owner.into(),
            witness_signing_key: public_key1,
            maximum_block_size: Some(max_block_size),
            hbd_interest_rate: Some(hbd_interest_rate),
            account_creation_fee: Some(NaiAssetConvertible::Asset(
                account_creation_fee,
            )),
            url: Some(witness_url.into()),
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
