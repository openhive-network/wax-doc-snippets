# %% [markdown]
# Required for generating a secure, random master password
import secrets

# Provides a set of characters to use in the master password
import string

# Import the function to create a WAX Foundation instance from the 'wax' library
from wax import create_wax_foundation

# Create a WAX Foundation object that provides access to WAX blockchain utilities
wax = create_wax_foundation()


# %% [markdown]
# ### 🔑 Generate Private Key from Password
#
# Generate a private key using an account name, password, and role.
#
# Important notice!!!
# The master password should always be a truly random and secure value, such
# as one retrieved from the `secrets` python package.
characters = string.ascii_letters + string.digits + string.punctuation
master_password = "".join(secrets.choice(characters) for _ in range(24))

password_gen_key_data = wax.get_private_key_from_password(
    account="alice",
    password=master_password,
    role="active",  # roles can be 'active', 'owner', 'posting', or 'memo'
)

print("Example results from Password-derived key generation:")
print(f"Private key: {password_gen_key_data.wif_private_key}")
print(f"Public key: {password_gen_key_data.associated_public_key}")

# %% [markdown]
# ### 🧠 Generate Brain Key (Seed Phrase)
#
# The `suggest_brain_key()` function returns an object containing:
# - `brain_key`: mnemonic seed phrase (human-readable words)
# - `wif_private_key`: private key in Wallet Import Format (WIF)
# - `associated_public_key`: public key derived from the private key
brain_key_data = wax.suggest_brain_key()

print(f"Seed phrase: {brain_key_data.brain_key}")  # Mnemonic phrase used to recover the wallet
print(f"Private key: {brain_key_data.wif_private_key}")  # Private key (WIF), used to sign transactions
print(f"Public key: {brain_key_data.associated_public_key}")  # Public key, used to receive tokens

# %%
