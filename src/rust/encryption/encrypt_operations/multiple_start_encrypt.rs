use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    /* Import preconfigured beekeeper data specific to snippet examples */
    let SnippetsBeekeeperData { signer1, public_key1, public_key2, .. } = snippets_beekeeper_data();

    let hive_chain = create_hive_chain(None)?;

    // Create a transaction
    let mut tx = hive_chain.create_transaction(None).await?;

    // Start the encryption chain with two keys
    tx.start_encrypt(&public_key1, Some(&public_key2))
        // Add encrypted operations
        .push_operation(hive_chain.create_operation(Value::TransferOperation(
            Transfer {
                from_account: "alice".into(),
                to_account: "bob".into(),
                // Send 5.100 HIVE (Note: Coins, not satoshis)
                amount: hive_chain.hive_coins(5.100)?,
                memo: "This memo will be encrypted with two keys".into(),
            },
        )))
        .stop_encrypt()? // Stop the current encryption chain
        // Start the encryption chain again, but with one key only
        .start_encrypt(&public_key1, None)
        // Add other encrypted operations
        .push_operation(hive_chain.create_operation(Value::TransferOperation(
            Transfer {
                from_account: "alice".into(),
                to_account: "bob".into(),
                // Send 10.050 HIVE (Note: Coins, not satoshis)
                amount: hive_chain.hive_coins(10.050)?,
                memo: "This memo will be encrypted with one key only".into(),
            },
        )))
        .stop_encrypt()?; // Stop the encryption chain again (optionally)

    // Sign and build the transaction
    tx.perform_operation_encryption(&signer1)?;
    tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", tx.transaction());

    Ok(())
}
