# %%
from __future__ import annotations

from typing import Final

from wax import create_wax_foundation
from wax.proto.operations import comment, custom_json, transfer, vote
from utils import show_transaction

TAPOS: Final[str] = "00000449f7860b82b4fbe2f317c670e9f01d6d9a"


# %% [markdown]
# Create wax instance
wax = create_wax_foundation()

# %% [markdown]
# Create empty transaction with valid TAPOS.
# The `operations` field is an empty array – the transaction doesn't contain any operations yet.
transaction = wax.create_transaction_with_tapos(TAPOS)
show_transaction(transaction)


# %% [markdown]
# ➕ Add comment operation to transaction.
comment_operation = comment(
    parent_permlink="/",
    parent_author="",
    author="alice",
    permlink="example post",
    title="My first comment",
    body="Body of example comment.",
    json_metadata="{}",
)
transaction.push_operation(comment_operation)
show_transaction(transaction)

# %% [markdown]
# ➕ Add custom_json to transaction
custom_json_operation = custom_json(
    required_auths=["alice"], required_posting_auths=["bob", "carol", "dan", "eric"], id="1234567890", json="{}"
)
transaction.push_operation(custom_json_operation)

# %% [markdown]
# ➕ Add vote to transaction
vote_operation = vote(
    author="alice",
    permlink="example post",
    voter="bob",
    weight=2200,
)
transaction.push_operation(vote_operation)

# %% [markdown]
# ➕ Add transfer to transaction
transfer_operation = transfer(
    from_account="alice",
    to_account="bob",
    amount=wax.hive.satoshis(1),
    memo="hello from wax!",
)
transaction.push_operation(transfer_operation)
show_transaction(transaction)

# %% [markdown]
# Final transaction with all operations, ready to be signed and broadcasted to blockchain.
show_transaction(transaction)
