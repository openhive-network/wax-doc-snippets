use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize Hive Chain using default options
    create_hive_chain(None)?;

    Ok(())
}
