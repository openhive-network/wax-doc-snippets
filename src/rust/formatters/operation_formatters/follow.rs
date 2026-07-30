use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    // Create follow operation new instance
    let follow_operation = FollowOperation::new()
        .follow_blacklist_blog("initminer", vec!["gtg".into(), "null".into()])?
        .follow_muted_blog("initminer", vec!["gtg".into()])?
        .reset_all_blog("initminer", vec!["gtg".into(), "null".into()])?
        .reset_blacklist_blog("initminer", vec!["gtg".into()])?
        .reset_follow_blacklist_blog("initminer", vec!["gtg".into(), "null".into()])?
        .reset_follow_muted_blog("initminer", vec!["gtg".into()])?
        .unblacklist_blog("initminer", vec!["gtg".into(), "null".into()])?
        .unfollow_blacklist_blog("initminer", vec!["gtg".into()])?
        .unfollow_blog("initminer", vec!["gtg".into(), "null".into()])?
        .unfollow_muted_blog("initminer", vec!["gtg".into()])?
        .reblog("initminer", "gtg", "first-post")
        .authorize(vec!["initminer".into()], Vec::new())?;

    // Push operations of follow operation into the created transaction
    tx.push_complex_operation(&chain, follow_operation)?;

    let output = chain.formatter().format(&tx.transaction().operations)?;

    println!("{}", serde_json::to_string_pretty(&output)?);

    Ok(())
}
