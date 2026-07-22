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

    // Example public keys data
    let old_key = "STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA";
    let new_key = "STM6NPx2HsYEBTyCpsA792NMbHFJYSB8GL79wFDovAjiEvGEiXbF2";

    // Replace old key in active role with new key and weight 1
    op.active.replace(old_key, 1, Some(new_key))?;

    // Push operation to transaction
    tx.push_complex_operation(&chain, op)?;

    Ok(())
}
