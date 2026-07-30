use serde_json::json;
use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Data from blockchain
    let nai_asset = json!({
        "amount": "300000",
        "precision": 3,
        "nai": "@@000000021"
    });

    // `display` is the Rust counterpart of the TS `waxify` literal — compose
    // it with the `format!` family
    let output = format!("Amount: {}", wax_api.formatter().display(&nai_asset)?);

    println!("{output}");

    Ok(())
}
