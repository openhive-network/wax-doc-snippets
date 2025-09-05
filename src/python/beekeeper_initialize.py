from beekeepy import Beekeeper

with Beekeeper.factory() as bk:
    # Create a new session to work with wallets
    session = bk.create_session()

    # Create a wallet with a given name and password
    wallet = session.create_wallet(name="my-wallet-name", password="my-wallet-password")

    # Unlock the wallet so it can be used for signing and other operations
    wallet.unlock(password="my-wallet-password")

    # At this point, the wallet is ready
