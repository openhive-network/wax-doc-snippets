use serde_json::json;
use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Data from blockchain
    let tx = json!({
        "ref_block_num": 1959,
        "ref_block_prefix": 3625727107u32,
        "expiration": "2023-11-09T22:01:24",
        "operations": [
            {
                "type": "transfer_operation",
                "value": {
                    "from": "oneplus7",
                    "to": "kryptogames",
                    "amount": {
                        "amount": "300000",
                        "precision": 3,
                        "nai": "@@000000021"
                    },
                    "memo": "Roll under 50 4d434bd943616"
                }
            }
        ],
        "extensions": []
    });

    // Derive a formatter that keeps the transaction object instead of
    // replacing it with the transaction id
    let formatter = wax_api.formatter().extend_options(
        WaxFormatterOptions::default().with_transaction_as_id(false),
    );

    let output = formatter.format(&tx)?;

    println!("{}", serde_json::to_string_pretty(&output)?);

    Ok(())
}
