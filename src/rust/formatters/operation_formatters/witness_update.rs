use serde_json::json;
use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Data from blockchain
    let witness_props = json!({
        "type": "witness_set_properties_operation",
        "value": {
            "owner": "null",
            "props": [
                ["new_signing_key", "3553544d365471534a61533161526a367036795a456f35786963583762764c6872666456716935546f4e724b78485533465242456457"],
                ["key", "029072da2e84ebd6eb520f944db3d1af718500b0f1ddf60e11e986f990acddd524"]
            ],
            "extensions": []
        }
    });

    let output = wax_api.formatter().format(&witness_props)?;

    println!("{}", serde_json::to_string_pretty(&output["value"]["props"])?);

    Ok(())
}
