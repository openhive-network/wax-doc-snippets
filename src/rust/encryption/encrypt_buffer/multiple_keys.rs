use runner::{SnippetsBeekeeperData, snippets_beekeeper_data};
use wax::prelude::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    /* Import preconfigured beekeeper data specific to snippet examples */
    let SnippetsBeekeeperData { signer1, signer2, public_key1, public_key2, .. } = snippets_beekeeper_data();

    let content = "This is a secret message.";

    // Pre-encrypt data for the second signer - sender side
    let encrypted_content = signer1.encrypt_data(
        content,
        &public_key1,
        Some(&public_key2),
        None,
    )?;

    // Decrypt the content - receiver side
    let decrypted_content =
        signer2.decrypt_data(&encrypted_content)?;

    println!("{decrypted_content}"); // This is a secret message.

    Ok(())
}
