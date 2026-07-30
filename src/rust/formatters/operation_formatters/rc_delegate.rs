use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create chain
    let chain = create_hive_chain(None)?;

    // Create transaction with data from remote
    let mut tx = chain.create_transaction(None).await?;

    // Create resource credits operation new instance
    let rc_operation = ResourceCreditsOperation::new()
        .delegate("initminer", 4127361273, vec!["gtg".into(), "null".into()])?
        .remove_delegation("initminer", vec!["null".into()])?
        .authorize(vec!["initminer".into()], Vec::new())?;

    // Push operations of resource credits operation into the created transaction
    tx.push_complex_operation(&chain, rc_operation)?;

    let output = chain.formatter().format(&tx.transaction().operations)?;

    println!("{}", serde_json::to_string_pretty(&output)?);

    Ok(())
}
