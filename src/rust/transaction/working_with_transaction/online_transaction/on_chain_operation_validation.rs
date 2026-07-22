use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize an online transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Declare example operation
    let operation = chain.create_operation(Value::TransferOperation(Transfer {
        from_account: "gtg".into(),
        to_account: "friend".into(),
        amount: chain.hive_coins(5)?,
        // Would be caught:
        memo: format!(
            "Here is my private key: {}",
            "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
        ),
    }));

    // Push operation into the transaction
    tx.push_operation(operation);

    // Perform on-chain verification before broadcasting
    // The verification would fail before broadcasting

    // Errors with "Potential private key leak detected!":
    match tx.perform_on_chain_verification().await {
        Ok(()) => println!("Verification successful!"),
        Err(error) => eprintln!("Verification failed: {error}"),
    }

    Ok(())
}
