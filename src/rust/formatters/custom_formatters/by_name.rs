use serde_json::{Value, json};
use wax::prelude::*;

#[derive(Default)]
struct MyFormatters;

#[hive_formatter]
impl MyFormatters {
    // Methods without the `#[format]` attribute are ignored when formatting
    fn my_function(&self, value: i64) -> String {
        value.to_string()
    }

    // The matched property defaults to the method name; `rename` spells the
    // camelCase property a snake_case method name cannot
    #[format(rename = "myCustomProp")]
    fn my_custom_prop(
        &self,
        _ctx: &FormatContext<'_>,
        source: Value,
    ) -> Option<String> {
        Some(self.my_function(source.get("myCustomProp")?.as_i64()?))
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    let formatter = wax_api.formatter().extend::<MyFormatters>();

    let data = json!({
        "myCustomProp": 12542
    });

    println!("MyData: {}", formatter.display(&data)?);

    Ok(())
}
