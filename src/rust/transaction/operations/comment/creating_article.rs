use wax::prelude::*;
use wax::complex_operations::{BeneficiaryRoute, BlogPostOperation};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    /*
     * Uses the push complex operation on the transaction and specifies an
     * argument: the operation struct instance, which carries the operation
     * configuration.
     */
    tx.push_complex_operation(
        &chain,
        BlogPostOperation {
            // Here you can pass the arguments to given struct fields
            author: "post-author".into(),
            permlink: Some("post-title".into()),
            body: "the-post-body".into(),
            title: "The Post Title".into(),
            category: "literature".into(),
            description: Some(
                "This is the description of the post inside BlogPostOperation"
                    .into(),
            ),
            alternative_author: Some("Ernest Hemingway".into()),
            beneficiaries: vec![BeneficiaryRoute {
                account: "conan-librarian".into(),
                weight: 40,
            }],
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
