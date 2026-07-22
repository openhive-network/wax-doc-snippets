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
    let amount = chain.hive_coins(100)?; // 100.000 HIVE
    let memo = "Monthly subscription";
    let recurrence = 24; // every day
    let executions = 30; // for 30 days

    tx.push_complex_operation(
        &chain,
        DefineRecurrentTransferOperation {
            from_account: from.into(),
            to_account: to.into(),
            amount: NaiAssetConvertible::Asset(amount),
            memo: Some(memo.into()),
            recurrence: Some(recurrence),
            executions: Some(executions),
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
