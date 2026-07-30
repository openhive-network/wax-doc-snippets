use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    // Create community operation new instance
    let community_operation = CommunityOperation::new()
        .flag_post("mycomm", "gtg", "first-post", "note")
        .mute_post("mycomm", "gtg", "first-post", "note")
        .pin_post("mycomm", "gtg", "first-post")
        .subscribe("mycomm")
        .unmute_post("mycomm", "gtg", "first-post", "note")
        .unpin_post("mycomm", "gtg", "first-post")
        .unsubscribe("mycomm")
        .set_user_title("mycomm", "gtg", "first-post")
        .update_props(
            "mycomm",
            CommunityProps {
                title: "Custom title".into(),
                ..Default::default()
            },
        )
        .authorize(vec!["gtg".into()], Vec::new())?;

    // Push operations of community operation into the created transaction
    tx.push_complex_operation(&chain, community_operation)?;

    let output = chain.formatter().format(&tx.transaction().operations)?;

    println!("{}", serde_json::to_string_pretty(&output)?);

    Ok(())
}
