use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let wax_api = create_wax_foundation(None);
    let account_name = "your-account";
    let role = "active"; // roles can be 'active', 'owner', 'posting', or 'memo'
    // Important notice!!!
    // The master password should always be a truly random and secure value.
    let master_password = wax_api.generate_private_key()?;

    // Generating a new private key from a password
    let private_key_data = wax_api.get_private_key_from_password(
        account_name,
        role,
        &master_password,
    )?;

    println!(
        "Associated Public Key: {}",
        private_key_data.associated_public_key
    );
    println!("WIF Private Key: {}", private_key_data.wif_private_key);

    Ok(())
}
