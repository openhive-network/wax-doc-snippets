use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    let SnippetsBeekeeperData { signer1, public_key1, .. } = snippets_beekeeper_data();

    // Your account name
    let your_account = "your-account";

    // Friend's account
    let friend = "your-friend-account";

    // Other friend's account
    let other_friend = "other-friend-account";

    // Create resource credits operation new instance
    let rc_operation = ResourceCreditsOperation::new()
        // Delegate 1000 RC from your account to a friend's account.
        .delegate(your_account, 1000, vec![friend.into()])?
        // The account that authorizes underlying custom json operation is
        // also responsible for signing the transaction using its posting authority
        .authorize(vec![your_account.into()], Vec::new())?;

    // Push operations of resource credits operation into the created transaction
    tx.push_complex_operation(&chain, rc_operation.clone())?;

    // Sign and build the transaction
    tx.sign(&signer1, &public_key1)?;

    let mut other_tx = chain.create_transaction(None).await?;

    let rc_operation = rc_operation
        // Remove delegation of RC from your account to a friend's account.
        .remove_delegation(your_account, vec![other_friend.into()])?
        // The account that authorizes the operation must also sign the
        // transaction
        .authorize(vec![your_account.into()], Vec::new())?;

    other_tx.push_complex_operation(&chain, rc_operation)?;

    // Sign and build the other transaction
    other_tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", other_tx.transaction().operations[0]); // Delegate operation
    println!("{:#?}", other_tx.transaction().operations[1]); // Remove delegation operation

    Ok(())
}
