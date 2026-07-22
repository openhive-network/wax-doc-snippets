use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize chain
    let chain = create_hive_chain(None)?;

    // Create/get a wallet
    let SnippetsBeekeeperData { mut wallet, public_key1, .. } = snippets_beekeeper_data();

    // Create a transaction
    let mut tx = chain.create_transaction(None).await?;

    // Declare example operation
    let operation = chain.create_operation(Value::VoteOperation(Vote {
        voter: "voter".into(),
        author: "author".into(),
        permlink: "test-permlink".into(),
        weight: 2200,
    }));

    // Push the operation into the transaction
    tx.push_operation(operation);

    // Convert the transaction into the Hive API-legacy form JSON before signing
    let legacy_api_tx = tx.to_legacy_api()?;

    println!("{legacy_api_tx}");

    // Because we want to process transaction signing in legacy way, we need to sign the transaction externally, which is shown below.
    // We need to calculate the transaction digest first.
    let digest = tx.legacy_sig_digest()?;

    /*
    Other signers (except beekeeper) do not allow signing the digest directly,
    this is a beekeeper-specific feature.
    */

    // Generate the signature based on the transaction digest
    let signature = wallet.sign_digest(&public_key1, &digest)?;

    // Supplement the transaction by created signature
    tx.add_signature(&signature)?;

    // This is JSON form ready for broadcasting or passing to third-party service.
    let tx_api_form = tx.to_legacy_api()?;

    println!("{tx_api_form}");

    Ok(())
}
