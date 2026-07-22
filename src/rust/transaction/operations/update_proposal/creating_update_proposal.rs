use wax::prelude::*;
use wax::complex_operations::UpdateProposalOperation;
use wax::models::NaiAssetConvertible;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object
    let mut tx = chain.create_transaction(None).await?;

    let proposal_id = 1;
    let creator = "your-account";
    let daily_pay = chain.hbd_coins(100)?; // 100.000 HBD
    let subject = "Proposal Update";
    let permlink = "proposal-update";

    tx.push_complex_operation(
        &chain,
        UpdateProposalOperation {
            proposal_id,
            creator: creator.into(),
            daily_pay: NaiAssetConvertible::Asset(daily_pay),
            subject: subject.into(),
            permlink: permlink.into(),
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
