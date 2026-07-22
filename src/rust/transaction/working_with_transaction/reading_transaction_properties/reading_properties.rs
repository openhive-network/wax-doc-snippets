use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    // Declare example operation
    let operation = chain.create_operation(Value::VoteOperation(Vote {
        voter: "voter".into(),
        author: "test-author".into(),
        permlink: "test-permlink".into(),
        weight: 2200,
    }));

    // Push operation into the transaction
    tx.push_operation(operation);

    /*
    Get a transaction object holding all operations and transaction
    TAPOS & expiration data, but transaction is **not signed yet**
    */
    let built_transaction = tx.transaction();

    println!("id: {}", tx.id()?);
    println!("sigDigest: {}", tx.sig_digest()?);
    println!("expiration: {}", built_transaction.expiration);
    println!("ref_block_num: {}", built_transaction.ref_block_num);

    Ok(())
}
