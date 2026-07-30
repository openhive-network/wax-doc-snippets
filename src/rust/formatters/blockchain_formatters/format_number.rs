use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Group separators default to the en-US style (`,` and `.`); use
    // `WaxFormatterOptions::default().with_separators(...)` to change them
    let output = wax_api.formatter().format_number(76543212345678i64, 3);

    println!("{output}");

    Ok(())
}
