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

    // Log to the console the transaction which is **not signed yet** in the api form
    println!("{}", tx.to_api()?);

    // broadcast the transaction
    // Uncomment the following line to broadcast the transaction to the mainnet
    // (this will most likely fail due to transaction not being signed):
    // chain.broadcast(&tx).await?;

    Ok(())
}
