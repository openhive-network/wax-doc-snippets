from __future__ import annotations

from typing import Final

from wax.complex_operations.account_update import AccountAuthorityUpdateOperation
from wax import ITransaction, create_hive_chain, create_wax_foundation
from wax.proto.operations import comment, operation, transfer, vote

TAPOS: Final[str] = "00000449f7860b82b4fbe2f317c670e9f01d6d9a"

def simple_transaction():
    wax = create_wax_foundation()

    transaction = wax.create_transaction_with_tapos(TAPOS)
    transaction.push_operation(
        comment(
            parent_permlink="/",
            parent_author="",
            author="alice",
            permlink="/",
            title="Best comment",
            body="<span>comment</span>",
            json_metadata="{}",
        )
    )

    a = transaction


if __name__ == '__main__':
    simple_transaction()
