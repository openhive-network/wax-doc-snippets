use wax::prelude::*;
use wax::AccountAuthorityUpdateOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Create online operation - create_for will parse authorities for "gtg" account from the chain
    let mut op = AccountAuthorityUpdateOperation::create_for(&chain, "gtg").await?;

    // Select memo role and set its key
    op.memo.set("STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA")?;

    // Push operation to transaction
    tx.push_complex_operation(&chain, op)?;

    Ok(())
}
