# %%
from __future__ import annotations

from datetime import timezone
from typing import Final


from beekeepy import AsyncUnlockedWallet
from beekeepy.service.synchronous import create_beekeepy_service
from requests import session
from schemas.fields.hive_datetime import HiveDateTime
from wax import create_wax_foundation, IOnlineTransaction
from wax.proto.operations import comment

from utils import show_transaction, EXAMPLE_PRIVATE_KEY

TAPOS: Final[str] = "04c1c7a566fc0da66aee465714acee7346b48ac2"

wax = create_wax_foundation()


transaction = wax.create_transaction_with_tapos(TAPOS)
transaction.push_operation(
    comment(
        parent_permlink="/",
        parent_author="",
        author="alice",
        permlink="example post",
        title="My first comment",
        body="Body of example comment.",
        json_metadata="{}",
    )
)
show_transaction(transaction)

with create_beekeepy_service(wallet_name="my_wallet", password="password") as beekeepy:
    beekeepy.wallet.unlock(password="password")
    beekeepy.wallet.import_key(private_key=EXAMPLE_PRIVATE_KEY)

    aa = transaction.sign(wallet=beekeepy.wallet, public_key=beekeepy.wallet.public_keys[0])
    print()

show_transaction(transaction)

# sign_tx(beekeepy.wallet, transaction)
# wax.broadcast(transaction)
print()
# %%
# transaction.sign(wallet: AsyncUnlockedWallet, public_key: PublicKey)

#
# async def sign_tx(unlocked_wallet: AsyncUnlockedWallet, tx: IOnlineTransaction) -> IOnlineTransaction:
#     if PUBLIC_KEY not in await unlocked_wallet.public_keys:
#         await unlocked_wallet.import_key(private_key=PRIVATE_KEY)
#
#     await tx.sign(wallet=unlocked_wallet, public_key=PUBLIC_KEY)
#     return tx
