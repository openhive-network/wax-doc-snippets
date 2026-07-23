use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Use multiple explicit values
    tx.push_complex_operation(
        &chain,
        ReplyOperation {
            // Here you can pass the arguments to given operation struct fields
            // Here `parent_author` and `parent_permlink` arguments can't be skipped nor be empty.
            // Also other required operation basic attributes (like `author`) must be explicitly specified.
            parent_author: "parent-author".into(),
            parent_permlink: "parent-permlink".into(),
            author: "reply-author".into(),
            permlink: Some("reply-permlink".into()),
            body: "the-reply-body".into(),
            description: Some(
                "This is the description of the post inside ReplyOperation"
                    .into(),
            ),
            tags: vec!["hive".into()],
            ..Default::default()
        },
    )?;

    /*
    Get a transaction object holding all operations and transaction
    TAPOS & expiration data, but transaction is **not signed yet**
    */
    println!("{:#?}", tx.transaction());

    Ok(())
}
