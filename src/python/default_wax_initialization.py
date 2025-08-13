# %% [markdown]
# ### Constructing a Wax Interface
#
# The root **Wax** interface can be instantiated using either **default settings**
# or a **custom configuration**.
#
# Using default settings is the quickest way to get started, providing a
# pre-configured connection to the Hive blockchain. However, a custom configuration
# offers greater flexibility and control over how the interface interacts with the network.
#
# With custom settings, you can:
# - Select the target **blockchain network** — e.g., *mainnet*, *testnet*, or *mirrornet*.
# - Specify a **Hive API endpoint** (e.g., `api.hive.blog`) that best matches your location or reliability requirements.
# - Adjust other **advanced options** to match specific operational or development needs.
#
# This flexibility allows developers to fine-tune Wax to different environments —
# from production-grade deployments to local development setups — ensuring a balance
# between speed, reliability, and maintainability.

# %%
from wax import WaxChainOptions, WaxOptions, create_hive_chain, create_wax_foundation

# %% [markdown]
# #### 1. Create a default Wax foundation initialization
#
# This creates a basic Wax foundation instance using default options,
# including the default chain_id and internal settings.
# It leverages the underlying C++ blockchain logic to ensure that behavior
# matches actual on-chain operations.

# %%
wax_default = create_wax_foundation()

# %% [markdown]
# #### 2. Create a Wax foundation with a custom chain_id
#
# This demonstrates how to specify a custom chain_id, for example, when connecting
# to a testnet or a private chain. Custom chain IDs allow you to target specific
# blockchain networks while still using the Wax Python interface.

# %%
wax_custom_options = create_wax_foundation(
    options=WaxOptions(chain_id="f875a0b000000000000000000000000000000000000000000000000000000000")
)

# %% [markdown]
# #### 3. Create a Wax chain initialization - connect Wax with an active Hive node
#
# `create_hive_chain` establishes a connection to a running Hive blockchain node
# and interacts with a live mainnet network depending on the chain_id and endpoint URL).
# This enables real-time data queries, signing transaction and broadcasting.

# %%
wax_chain = create_hive_chain(
    options=WaxChainOptions(
        chain_id="beeab0de00000000000000000000000000000000000000000000000000000000",  # mainnet chain ID
        endpoint_url="https://api.hive.blog",  # public mainnet API node
    )
)

# %%
