use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;
use wax::hive_apps_operations::HiveAppsOperation;
use wax::hive_apps_operations::FollowOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    let SnippetsBeekeeperData { signer1, public_key1, .. } = snippets_beekeeper_data();

    // Your account name
    let your_account = "your-account";

    // Blog author name to follow
    let blog_to_follow = "interesting-blog";

    // Blog author name to mute
    let blog_to_mute = "spammer";

    // Author of post to reblog
    let to_reblog = "reblog-me";

    // Create follow operation new instance
    let follow_operation = FollowOperation::new()
        .follow_blog(your_account, vec![blog_to_follow.into()])?
        .mute_blog(your_account, vec![blog_to_mute.into()])?
        .reblog(your_account, to_reblog, "post-permlink")
        // The account that authorizes underlying custom json operation is
        // also responsible for signing the transaction using its posting authority
        .authorize(vec![your_account.into()], Vec::new())?;

    // Push operations of follow operation into the created transaction
    tx.push_complex_operation(&chain, follow_operation)?;

    // Sign and build the transaction
    tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", tx.transaction().operations[0]); // Follow operation
    println!("{:#?}", tx.transaction().operations[1]); // Mute operation
    println!("{:#?}", tx.transaction().operations[2]); // Reblog operation

    Ok(())
}
