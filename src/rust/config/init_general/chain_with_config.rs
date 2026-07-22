use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Define custom options
    let custom_options = HiveChainOptions {
        // Example custom chain ID:
        chain_id: "f875a0b000000000000000000000000000000000000000000000000000000000"
            .into(),
        // Example custom API endpoint:
        api_endpoint: "https://hive.custom.endpoint".into(),
        // Example custom REST API endpoint:
        rest_api_endpoint: "https://rest.api.custom.endpoint".into(),
        // Disable API timeout:
        api_timeout: 0,
        // Keep the defaults for everything else:
        ..Default::default()
    };

    // Initialize Hive Chain with custom options
    let _chain = create_hive_chain(custom_options)?;

    Ok(())
}
