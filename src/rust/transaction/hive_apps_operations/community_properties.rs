use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;
use wax::hive_apps_operations::HiveAppsOperation;
use wax::hive_apps_operations::community::{
    CommunityOperation, CommunityProps, SupportedLanguages,
};

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
        // Update the properties of the community
        .update_props(
            community_name,
            CommunityProps {
                title: "New Community Title".into(),
                about: Some("Community Description".into()),
                is_nsfw: Some(false),
                lang: Some(SupportedLanguages::English.as_str().into()),
                description: Some("Detailed community description".into()),
                flag_text: Some("Post flagging rules".into()),
            },
        )
        // The account that authorizes underlying custom json operation
        // is also responsible for signing the transaction using its posting authority
        .authorize(vec![your_account.into()], Vec::new())?;

    // Push operations of community operation into the created transaction
    tx.push_complex_operation(&chain, community_operation)?;

    // Sign and build the transaction
    tx.sign(&signer1, &public_key1)?;

    println!("{:#?}", tx.transaction().operations[0]); // Update community properties operation

    Ok(())
}
