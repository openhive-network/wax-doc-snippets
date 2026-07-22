use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    // Custom endpoint URL for database_api
    chain
        .api()
        .database_api
        .set_endpoint_url(Some("https://best.honey.provider".into()));

    chain.set_endpoint_url("https://api.hive.blog")?; // This is default for all APIs

    println!("{}", chain.endpoint_url());

    Ok(())
}
