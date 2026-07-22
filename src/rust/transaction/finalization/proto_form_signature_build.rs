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
        author: "author".into(),
        permlink: "test-permlink".into(),
        weight: 2200,
    }));

    // Push operation into the transaction
    tx.push_operation(operation);

    // Supplement a transaction with an externally generated signature.
    tx.add_signature("deadc0de")?;

    println!("{}", tx.to_api()?);

    Ok(())
}
