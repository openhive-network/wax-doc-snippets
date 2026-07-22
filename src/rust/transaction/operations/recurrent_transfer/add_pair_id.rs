use wax::prelude::*;
use wax::complex_operations::DefineRecurrentTransferOperation;
use wax::models::NaiAssetConvertible;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    let from = "sender.account";
    let to = "recip.account";
    let pair_id = 12345;
    let amount = chain.hive_coins(100)?; // 100.000 HIVE
    let memo = "Monthly subscription";

    // Use this time just for example default values for recurrence and executions
    // which is 24 for recurrence and 2 for executions.
    tx.push_complex_operation(
        &chain,
        DefineRecurrentTransferOperation {
            from_account: from.into(),
            to_account: to.into(),
            // Add pair_id to the operation struct
            pair_id: Some(pair_id),
            amount: NaiAssetConvertible::Asset(amount),
            memo: Some(memo.into()),
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
