use serde_json::{Value, json};
use wax::prelude::*;

struct OperationsFormatter {
    wax: FoundationHandle,
}

#[hive_formatter]
impl OperationsFormatter {
    // The generated `CustomFormatter::create` calls `new` with the shared
    // foundation handle (falls back to `Default::default()` when absent)
    fn new(wax: FoundationHandle) -> Self {
        Self { wax }
    }

    #[format(match_property = "type", match_value = "transfer_operation")]
    fn transfer_operation_formatter(
        &self,
        _ctx: &FormatContext<'_>,
        source: Value,
    ) -> Option<String> {
        let value = source.get("value")?;
        let amount = self.wax.formatter().display(value.get("amount")?).ok()?;

        Some(format!(
            "{} transferred {amount} to {}",
            value.get("from")?.as_str()?,
            value.get("to")?.as_str()?,
        ))
    }

    #[format(match_property = "type", match_value = "vote_operation")]
    fn vote_operation_formatter(
        &self,
        _ctx: &FormatContext<'_>,
        source: Value,
    ) -> Option<String> {
        let value = source.get("value")?;

        Some(format!(
            "{} voted on @{}/{}",
            value.get("voter")?.as_str()?,
            value.get("author")?.as_str()?,
            value.get("permlink")?.as_str()?,
        ))
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    let formatter = wax_api.formatter().extend::<OperationsFormatter>();

    let data = json!([
        {
            "type": "vote_operation",
            "value": {
                "voter": "otom",
                "author": "c0ff33a",
                "permlink": "ewxhnjbj",
                "weight": 2200
            }
        },
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
    ]);

    let output = formatter.format(&data)?;

    println!("{}", serde_json::to_string_pretty(&output)?);

    Ok(())
}
