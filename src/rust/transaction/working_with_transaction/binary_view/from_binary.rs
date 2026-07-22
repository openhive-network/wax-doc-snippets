use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Deserialize transaction from binary form
    let tx = chain.convert_transaction_from_binary_form(
        "8059b32ca6018b9fb568010003677467036774670b68656c6c6f2d776f726c6498080000",
    )?;

    // Display our transaction - note: This will create a transaction in Hive API-format
    println!("{tx:#}");

    Ok(())
}
