from beekeepy import Beekeeper

with Beekeeper.factory() as bk:
    # Create a new session to work with wallets
    session = bk.create_session()

    # Create a wallet with a given name and password
    wallet = session.create_wallet(name="my-wallet-name", password="my-wallet-password")

    # Import a private key into the wallet
    wallet.import_key(private_key="5KgfcV9bgEen3v9mxkoGw6Rhuf2giDRZTHZjzwisjkrpF4FUh3N")
    # Check if the wallet contains the matching private key
    assert wallet.has_matching_private_key(key="STM5gQPYm5bs9dRPHpqBy6dU32M8FcoKYFdF4YWEChUarc9FdYHzn")

    # Unlock the wallet so it can be used for signing and other operations
    wallet.unlock(password="my-wallet-password")
    # Ensure the wallet is unlocked
    assert wallet.is_unlocked()

    # At this point, the wallet is ready
