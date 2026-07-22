use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;
use wax::hive_apps_operations::HiveAppsOperation;
use wax::hive_apps_operations::community::CommunityOperation;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    let SnippetsBeekeeperData { signer1, public_key1, .. } = snippets_beekeeper_data();

    // Your account name
    let your_account = "your-account";

    // Community name you want to join
    let community_name = "community-name";

    // Create community operation new instance
    let community_operation = CommunityOperation::new()
        // Subscribe the community
        .subscribe(community_name)
        // Flag the post of the author (authoraccount) in
        // the community (communityname) with the permlink (postpermlink)
        // Add notes regarding the violation (violation notes).
        .flag_post(
            community_name,
            "author-account",
            "post-permlink",
            "violation notes",
        )
        // The account that authorizes underlying custom json operation is also
        // responsible for signing the transaction using its posting authority
        .authorize(vec![your_account.into()], Vec::new())?;

    // Push operations of community operation into the created transaction
    tx.push_complex_operation(&chain, community_operation)?;

    // Sign and build the transaction
    tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", tx.transaction().operations[0]); // Subscribe operation
    println!("{:#?}", tx.transaction().operations[1]); // Flag post operation

    Ok(())
}
