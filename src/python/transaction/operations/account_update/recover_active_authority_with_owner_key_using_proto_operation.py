import asyncio
from pathlib import Path
import sys

from wax import create_hive_chain
from wax.proto.authority import authority
from wax.proto.operations import account_update2


async def update_active_authority(name: str, new_active_public_key: str) -> None:
    """
    Example: Recover the 'active' authority of an account after losing the active private key.
    This script updates the 'active' authority using the existing 'owner' key.
    After Hardfork 28, such an operation must be explicitly signed with the 'owner' key,
    since higher-level keys can no longer authorize lower-level authority changes.
    """
    # Initialize Hive blockchain interface
    chain = create_hive_chain()

    # Load current authorities for the specified account
    account = await chain.api.database_api.find_accounts(accounts=[name])
    account = account.accounts[0]

    # Your current owner key (available in your wallet)
    current_owner_authority = account.owner
    current_owner_key = current_owner_authority.key_auths[0][0]
    current_owner_weight = current_owner_authority.key_auths[0][1]

    # Prepare account_update2 proto operation
    op = account_update2(
        account=name,
        # Set a new active authority using the freshly generated public key.
        # After Hardfork 28, the blockchain enforces strict authority checks:
        # to change the only 'active' authority, this operation must be signed
        # with the existing 'active' key etc. – higher authorities can no longer
        # implicitly authorize lower-level updates.
        active=authority(weight_threshold=1, key_auths={new_active_public_key: 1}),
        # Include the current owner authority to explicitly require the transaction to be signed with the owner's key.
        owner=authority(weight_threshold=1, key_auths={current_owner_key: current_owner_weight}),
        json_metadata="",
        posting_json_metadata="",
    )

    # Create chain transaction
    tx = await chain.create_transaction()
    tx.push_operation(op)
    print(f"Prepared transaction:\n {tx.to_string()}")

    # Optional: sign and broadcast
    # Sign the transaction using the owner key from the wallet
    # await tx.sign(wallet=wallet, public_key=current_owner_key)
    # Broadcast to the chain
    # await tx.broadcast()


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Usage: python3 {Path(__file__).name} <account_name> <new_public_active>")
    else:
        account_name = sys.argv[1]
        new_public_active = sys.argv[2]

        asyncio.run(update_active_authority(account_name, new_public_active))
