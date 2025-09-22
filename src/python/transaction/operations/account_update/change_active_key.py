import asyncio

from wax import create_hive_chain
from wax.complex_operations.account_update import AccountAuthorityUpdateOperation


async def main() -> None:
    # Initialize hive chain interface
    chain = create_hive_chain()

    # Initialize a transaction object
    tx = await chain.create_transaction()

    # Create online operation - createFor will parse authorities for "gtg" account from the chain
    op = await AccountAuthorityUpdateOperation.create_for(chain, account_name="gtg")

    # Example public keys data
    old_key = "STM4utwdRemiWrprD4aZantE8CVRnxRRZShz68W5SoDfZinfhCmSA"
    new_key = "STM6NPx2HsYEBTyCpsA792NMbHFJYSB8GL79wFDovAjiEvGEiXbF2"

    # Replace old key in active role with new key and weight 1
    op.roles.active.replace(account_or_key=old_key, weight=1, new_account_or_key=new_key)

    # Push operation to transaction
    tx.push_operation(op)
    print(f"Transaction ready to sign and broadcast: {tx.to_string()}")


asyncio.run(main())
