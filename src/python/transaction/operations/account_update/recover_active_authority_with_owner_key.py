import asyncio
import sys
from pathlib import Path

from wax import create_hive_chain
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation


async def update_active_authority_via_meta_operation(name: str, new_active_public_key: str) -> None:
    """
    Example: Recover the 'active' authority of an account after losing the active private key.
    This script updates the 'active' authority using the existing 'owner' key.
    After Hardfork 28, such an operation must be explicitly signed with the 'owner' key,
    since higher-level keys can no longer authorize lower-level authority changes.
    """
    # Initialize Hive blockchain interface
    chain = create_hive_chain()

    # Load current authorities for the account provided in parameters
    # create_for() fetches the account’s current roles from the chain
    op = await AccountAuthorityUpdateOperation.create_for(chain, account_name=name)

    account = await chain.api.database_api.find_accounts(accounts=[name])
    account = account.accounts[0]

    # The old (lost) public active key — its private key is no longer available
    old_active_key = account.active.key_auths[0][0]

    # Replace the lost active key with the new one
    op.roles.active.replace(account_or_key=old_active_key, weight=1, new_account_or_key=new_active_public_key)

    # After HF28, operations must be signed with a key matching their authority level.
    # Normally, updating the 'active' authority would require the existing 'active' key.
    # However, since that key is lost, we explicitly enforce signing with the 'owner' key
    # to allow recovery of the account.
    #
    # To achieve this, the operation includes the current (unchanged) owner authority.
    # This addition forces the blockchain to require owner-level authorization
    # without actually modifying the owner key.
    op.enforce_owner_role_authorisation()

    # Create an empty transaction
    tx = await chain.create_transaction()

    # Add the created operation to the transaction
    tx.push_operation(op)

    # This transaction is now ready to be signed and broadcasted
    print(f"Prepared transaction:\n {tx.to_string()}")

    # Optional: sign and broadcast
    # Sign the transaction using the owner key from the wallet
    # await tx.sign(wallet=wallet, public_key=current_owner_key)
    # Broadcast the transaction to the Hive network
    # await tx.broadcast()


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Usage: python3 {Path(__file__).name} <account_name> <new_public_active>")
    else:
        account_name = sys.argv[1]
        new_public_active = sys.argv[2]

        asyncio.run(update_active_authority_via_meta_operation(account_name, new_public_active))
