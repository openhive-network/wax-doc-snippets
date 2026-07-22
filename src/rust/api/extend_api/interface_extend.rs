use serde::{Deserialize, Serialize};
use wax::prelude::*;

/// Represents the parameters of `database_api.is_known_transaction`.
#[derive(Serialize)]
pub struct IsKnownTransactionRequest {
    pub id: String,
}

/// Represents the result of `database_api.is_known_transaction`.
#[derive(Debug, Deserialize)]
pub struct IsKnownTransactionResponse {
    pub is_known: bool,
}

// Create the proper API structure.
#[hive_api]
pub trait DatabaseApi {
    /// Checks whether the node knows a transaction by its id.
    async fn is_known_transaction(
        params: IsKnownTransactionRequest,
    ) -> IsKnownTransactionResponse;
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let chain = create_hive_chain(None)?;

    let extended = chain.extend::<DatabaseApi>();

    // Call the database_api API using our extended interface
    let result = extended
        .is_known_transaction(IsKnownTransactionRequest {
            id: "0000000000000000000000000000000000000000".into(),
        })
        .await?;

    println!("{result:?}");

    Ok(())
}
