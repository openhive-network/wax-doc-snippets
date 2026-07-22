use wax::prelude::*;
use wax::complex_operations::AccountAuthorityUpdateOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let _tx = chain.create_transaction(None).await?;

    // Create online operation - create_for will parse authorities for "gtg" account from the chain
    let op = AccountAuthorityUpdateOperation::create_for(&chain, "gtg").await?;

    // Iterate over all authority role levels of the hive role category
    for role in [&op.owner, &op.active, &op.posting] {
        // Print the current role value
        println!("{:#?}", role.value());

        // Warn if role is null authority
        if role.is_null_authority() {
            eprintln!("Role is null authority");
        }
    }

    // Print the current memo key
    println!("{}", op.memo.value());

    // We do not have to push operation to the transaction as we just wanted to iterate over roles

    Ok(())
}
