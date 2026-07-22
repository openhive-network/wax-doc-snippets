use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize an online transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Declare example operation
    let operation = chain.create_operation(Value::VoteOperation(Vote {
        voter: "gtg".into(),
        author: "gtg".into(),
        permlink: "hello-world".into(),
        weight: 2200,
    }));

    // Push operation into the transaction
    tx.push_operation(operation);

    // Perform on-chain verification before broadcasting
    match tx.perform_on_chain_verification().await {
        Ok(()) => {
            println!("Transaction passed on-chain verification!");

            // Now safe to broadcast
            // chain.broadcast(&tx).await?;
        }
        Err(error) => eprintln!("Verification failed: {error}"),
    }

    Ok(())
}
