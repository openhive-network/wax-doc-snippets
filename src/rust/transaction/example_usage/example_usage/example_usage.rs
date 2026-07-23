use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize chain
    let chain = create_hive_chain(None)?;

    // Retrieve the signers
    let SnippetsBeekeeperData { signer1, signer2, public_key1, public_key2, .. } = snippets_beekeeper_data();

    // Create a transaction
    let mut tx = chain.create_transaction(None).await?;

    // Use the ReplyOperation to create a reply operation
    tx.push_complex_operation(
        &chain,
        ReplyOperation {
            parent_author: "parent-author".into(),
            parent_permlink: "parent-permlink".into(),
            author: "author".into(),
            body: "body".into(),
            beneficiaries: vec![BeneficiaryRoute {
                account: "test".into(),
                weight: 40,
            }],
            tags: vec!["tag".into()],
            description: Some("description".into()),
            ..Default::default()
        },
    )?;

    // Convert the transaction into the Hive API-form JSON
    let api_tx = tx.to_api()?;

    // log apiTransaction
    println!("{api_tx}");

    // Apply the transaction in the API form into transaction interface
    let mut tx_from_api = chain.create_transaction_from_json(&api_tx)?;

    tx_from_api.sign(&signer1, &public_key1)?;

    // Log txSigned
    println!("{}", tx_from_api.to_api()?);

    tx_from_api.sign(&signer2, &public_key2)?;

    // log multi signed transaction
    println!("{}", tx_from_api.to_api()?);

    /*
     * Call actual broadcast API to send transaction to the blockchain.
     * The code is commented out because examples does not have access to Hive mainnet keys.
     */
    // chain.broadcast(&tx_from_api).await?;

    Ok(())
}
