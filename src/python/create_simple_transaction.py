# %% [markdown]
# ## 📦 Imports and Constants

# %%
from __future__ import annotations

from typing import Final
import json

from wax import create_wax_foundation
from wax.proto.operations import comment

# %%
TAPOS: Final[str] = "00000449f7860b82b4fbe2f317c670e9f01d6d9a"

# %% [markdown]
# ## 🔧 `simple_transaction` Function

# %% [markdown]
# ### 🏗️ Creating the `wax` object

# %%
wax = create_wax_foundation()

# %% [markdown]
# ### 🧱 Creating a transaction with TAPOS

# %%
transaction = wax.create_transaction_with_tapos(TAPOS)

# %% [markdown]
# ### ➕ Adding a `comment` operation

# %%
comment_operation = comment(
    parent_permlink="/",
    parent_author="",
    author="alice",
    permlink="/",
    title="Example comment",
    body="Body of example comment.",
    json_metadata="{}",
)

transaction.push_operation(comment_operation)

# %% [markdown]
# ### 📤 Serialize and display the transaction

# %%
print(json.dumps(transaction.to_dict(), indent=4, sort_keys=True))

# %% [markdown]
# ## 🚀 Execution
