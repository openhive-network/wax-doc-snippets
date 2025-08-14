# %% [markdown]
# # 🔐 Update Hive Account Authorities with WAX
#
# This example demonstrates how to update a Hive account's authority using the WAX library.
# It shows how to:
# - Create an `AccountAuthorityUpdateOperation` object
# - Modify `owner`, `active`, `posting` authorities and the `memo` key
# - Prepare a transaction ready for signing and broadcasting

from __future__ import annotations
import asyncio
import nest_asyncio
from wax import create_hive_chain
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation
from src.static.snippets.src.python.utils import (
    EXAMPLE_PUBLIC_KEY,
    get_random_public_key,
    show_transaction,
    show_authority,
)

nest_asyncio.apply()

# %% [markdown]
# ## 1. Configuration
# Load necessary values from environment variables or provide them directly for testing purposes.

# %%
wax = create_hive_chain()


# %%
async def create_account_update_operation() -> AccountAuthorityUpdateOperation:
    # First, create the operation for the specified account
    operation = await AccountAuthorityUpdateOperation.create_for(wax, account_name="alice")

    # Access the active role authority
    active = operation.roles.active

    # Clear removes all existing entries from this role
    active.clear()
    show_authority(active.authority, "Active authority cleared")

    # Add an account to the active role
    active.add(account_or_key="bob", weight=1)
    show_authority(active.authority, "Bob was added to Active")

    # Add a public key to the active role
    active.add(account_or_key=EXAMPLE_PUBLIC_KEY, weight=2)
    show_authority(active.authority, "Public key added to Active")

    # Change the weight threshold for this role
    active.set_threshold(threshold=3)
    show_authority(active.authority, "Active weight threshold changed to 3")

    # Access and modify the posting role
    posting = operation.roles.posting
    posting.clear()
    show_authority(posting.authority, "Posting cleared")

    posting.add(account_or_key="carol", weight=2)
    posting.add(account_or_key="dan", weight=3)
    show_authority(posting.authority, "Carol and Dan added to Posting")

    # Replace an account/key in the current role
    posting.replace(account_or_key="carol", weight=1, new_account_or_key="eric")
    show_authority(posting.authority, "Carol replaced with Eric in Posting")

    # Remove a specific account/key from the authority
    posting.remove(account_or_key="dan")
    show_authority(posting.authority, "Dan removed from Posting")

    # Replace a key in the posting authority
    posting.replace(
        account_or_key="eric", weight=2, new_account_or_key="STM57pVtywZGeywtcxtozLjxRUZFSt9kcFv2LDP8YsTQzW1e4b8NT"
    )
    show_authority(posting.authority, "Eric replaced with STM key in Posting")

    # Access the owner authority
    owner = operation.roles.owner
    show_authority(owner.authority, "Owner authority initial state")

    # Add 5 random public keys to the owner authority
    for key in [get_random_public_key() for _ in range(5)]:
        owner.add(account_or_key=key, weight=1)
    show_authority(owner.authority, "5 random keys added to owner")

    # Reset restores the authority to its original state
    owner.reset()
    show_authority(owner.authority, "Owner authority reset to original")

    # Set the memo key
    operation.roles.memo.set(public_key=EXAMPLE_PUBLIC_KEY)

    return operation


# %%
async def main() -> None:
    account_update = await create_account_update_operation()

    transaction = await wax.create_transaction()
    transaction.push_operation(account_update)
    print("Transaction ready to sign and broadcast:")
    show_transaction(transaction)


asyncio.run(main())
# %%
