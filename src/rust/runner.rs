//! Rust counterpart of the TS test runner (`scripts/runner.js`).
//!
//! TS NOTE: the TS runner publishes the fixture as
//! `globalThis.snippetsBeekeeperData` before importing a snippet. Rust has no
//! global object, so each snippet calls [`snippets_beekeeper_data`] itself
//! and owns the returned fixture.

use beekeeper::prelude::*;
use wax_signers_beekeeper::prelude::*;

// Test keys imported into the snippets wallet (same as scripts/runner.js).
const PRIVATE_KEY_1: &str =
    "5JkFnXrLM2ap9t3AmAxBJvQHF7xSKtnTrCTginQCkhzU5S7ecPT";
const PRIVATE_KEY_2: &str =
    "5KGKYWMXReJewfj5M29APNMqGEu173DzvHv5TeJAg9SkjUeQV78";

const WALLET_NAME: &str = "w0";
// TS NOTE: TS lets beekeeper generate a random wallet password; Rust needs a
// known one to unlock the extra per-signer wallet handles below.
const WALLET_PASSWORD: &str = "w0-password";

/// Represents the TS `globalThis.snippetsBeekeeperData` object.
///
/// All fields are public so snippets can destructure exactly the parts they
/// use, mirroring the TS `const { wallet, publicKey1 } = globalThis...`:
///
/// ```ignore
/// let SnippetsBeekeeperData { mut wallet, public_key1, .. } =
///     snippets_beekeeper_data();
/// ```
pub struct SnippetsBeekeeperData {
    pub signer1: BeekeeperSignatureProvider,
    pub signer2: BeekeeperSignatureProvider,
    pub wallet: UnlockedWallet,
    pub public_key1: String,
    pub public_key2: String,
}

/// Creates the beekeeper fixture the TS runner hands to every snippet: an
/// in-memory wallet with the two test keys imported and one signer per key.
pub fn snippets_beekeeper_data() -> SnippetsBeekeeperData {
    let api =
        BeekeeperApi::new(BeekeeperOptions::new("ignored").in_memory(true));
    let session = api.create_session().expect("create_session");

    let mut wallet = session
        .create_wallet(WALLET_NAME, WALLET_PASSWORD)
        .expect("create_wallet")
        .wallet;

    let public_key1 = wallet.import_key(PRIVATE_KEY_1).expect("import_key");
    let public_key2 = wallet.import_key(PRIVATE_KEY_2).expect("import_key");

    // TS NOTE: TS shares the single wallet object between both signers; a
    // Rust signer owns its wallet handle, so two more handles are opened
    // onto the same wallet.
    let signer1 = BeekeeperSignatureProvider::new(extra_wallet_handle(&session));
    let signer2 = BeekeeperSignatureProvider::new(extra_wallet_handle(&session));

    // TS NOTE: the TS runner keeps the beekeeper session alive in module
    // scope for the whole process. Dropping the Rust `Session` would lock the
    // wallets behind the handles above, so the fixture leaks it on purpose —
    // it lives until process exit, exactly like its TS counterpart.
    std::mem::forget(session);

    SnippetsBeekeeperData {
        signer1,
        signer2,
        wallet,
        public_key1,
        public_key2,
    }
}

/// Mints one more [`UnlockedWallet`] handle onto the snippets wallet.
///
/// NOTE: beekeeper refuses to unlock a wallet that is already unlocked, and
/// the lock state lives on the C++ side (per wallet name, not per handle).
/// Locking everything first makes the subsequent `unlock` legal; it leaves
/// the wallet unlocked, so handles minted earlier keep working.
fn extra_wallet_handle(session: &Session) -> UnlockedWallet {
    session.lock_all().expect("lock_all");

    session
        .open_wallet(WALLET_NAME)
        .expect("open_wallet")
        .unlock(WALLET_PASSWORD)
        .expect("unlock")
}
