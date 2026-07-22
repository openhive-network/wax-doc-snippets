use wax::prelude::*;
use wax::complex_operations::AccountAuthorityUpdateOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Create online operation - create_for will parse authorities for "gtg" account from the chain
    let mut op = AccountAuthorityUpdateOperation::create_for(&chain, "gtg").await?;

    // Add account named "initminer" to the posting role of my account. Weight `None` defaults to 1
    op.posting.add("initminer", None)?;

    // Push operation to transaction
    tx.push_complex_operation(&chain, op)?;

    Ok(())
}
