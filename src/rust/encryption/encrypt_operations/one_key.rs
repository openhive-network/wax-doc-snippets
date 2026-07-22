use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    /* Import preconfigured beekeeper data specific to snippet examples */
    let SnippetsBeekeeperData { signer1, public_key1, .. } = snippets_beekeeper_data();

    let hive_chain = create_hive_chain(None)?;

    // Create a transaction
    let mut tx = hive_chain.create_transaction(None).await?;

    // Start the encryption chain
    tx.start_encrypt(&public_key1, None)
        // Add encrypted operation
        .push_operation(hive_chain.create_operation(Value::TransferOperation(
            Transfer {
                from_account: "alice".into(),
                to_account: "bob".into(),
                // Send 5.100 HIVE (Note: Coins, not satoshis)
                amount: hive_chain.hive_coins(5.100)?,
                memo: "This memo will be encrypted".into(),
            },
        )))
        .stop_encrypt()?; // Stop the encryption chain

    // Sign and build the transaction
    tx.perform_operation_encryption(&signer1)?;
    tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", tx.transaction());

    Ok(())
}
