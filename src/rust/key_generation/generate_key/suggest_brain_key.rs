use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);

    // Suggest brain key
    let private_key_data = wax_api.suggest_brain_key()?;

    println!(
        "Associated Public Key: {}",
        private_key_data.associated_public_key
    );
    println!("WIF Private Key: {}", private_key_data.wif_private_key);
    println!("Brain Key: {}", private_key_data.brain_key);

    Ok(())
}
