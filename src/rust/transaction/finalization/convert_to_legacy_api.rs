use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Declare example operation
    let operation = chain.create_operation(Value::VoteOperation(Vote {
        voter: "voter".into(),
        author: "test-author".into(),
        permlink: "test-permlink".into(),
        weight: 2200,
    }));

    // Push operation into the transaction
    tx.push_operation(operation);

    // Convert transaction into the Hive API-legacy form JSON string
    let legacy_api_tx = tx.to_legacy_api()?;

    println!("{legacy_api_tx}");

    Ok(())
}
