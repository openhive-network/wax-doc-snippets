use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Create online operation - create_for will parse authorities for "gtg" account from the chain
    let mut op = AccountAuthorityUpdateOperation::create_for(&chain, "gtg").await?;

    // Add "initminer" to owner role and change weight threshold to 2
    op.owner.add("initminer", 1)?.set_threshold(2)?;

    // Push operation to transaction
    tx.push_complex_operation(&chain, op)?;

    Ok(())
}
