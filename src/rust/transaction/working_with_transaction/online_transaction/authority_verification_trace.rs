use wax::prelude::*;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize hive chain interface
    let chain = create_hive_chain(None)?;

    // Initialize a transaction object with already existing data
    // (txid: 88e992c6094a6c6813f970b77abc4a6fee4a8a27)
    let parsed_transaction = chain.create_transaction_from_json(
        r#"{
        "expiration": "2025-09-03T15:43:06",
        "extensions": [],
        "operations": [
            {
                "type": "custom_json_operation",
                "value": {
                    "id": "notify",
                    "json": "[\"setLastRead\",{\"date\":\"2025-09-03T15:31:07\"}]",
                    "required_auths": [],
                    "required_posting_auths": [
                        "sandormb"
                    ]
                }
            }
        ],
        "signatures": [
            "202cf9ea0754d1927a7875fdaf3aa6d743d7ffe4ccdc64059b9d6cb8e75ea1e5421e5d28d7205e6c820f8307c36e97b45da2bed6fa5795b3cf675020b77facdaee"
        ],
        "ref_block_num": 17420,
        "ref_block_prefix": 1854844897
    }"#,
    )?;

    let use_legacy_serialization = false;

    // Create an online transaction to perform online authority verification
    let tx = chain.create_transaction(None).await?;
    // Provide an external transaction for analysis
    let trace = tx
        .generate_authority_verification_trace(
            use_legacy_serialization,
            Some(&parsed_transaction),
        )
        .await?;

    // Display the final trace
    println!("{trace:#?}");

    Ok(())
}
