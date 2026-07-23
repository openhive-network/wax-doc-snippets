use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    let from = "sender.account";
    let to = "recip.account";
    let pair_id = 12345;

    // Use dedicated wax complex operation to generate recurrent transfer removal
    // (recurrent_transfer_operation is generated under the hood having specified amount = 0)
    tx.push_complex_operation(
        &chain,
        RecurrentTransferRemovalOperation {
            // The removal operation is generated with a zero amount automatically
            from_account: from.into(),
            to_account: to.into(),
            pair_id: Some(pair_id),
        },
    )?;

    /*
    Get a transaction object holding all operations and transaction
    TAPOS & expiration data, but transaction is **not signed yet**
    */
    println!("{:#?}", tx.transaction());

    Ok(())
}
