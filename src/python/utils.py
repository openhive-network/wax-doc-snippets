import json
from typing import Final

from google.protobuf.json_format import MessageToJson
import wax


def get_random_private_key() -> str:
    return wax.suggest_brain_key().wif_private_key.decode()


def get_random_public_key() -> str:
    return wax.suggest_brain_key().associated_public_key.decode()


def show_authority(authority, step_name="") -> None:
    border = (67 - len(step_name)) // 2 * "="
    print(f"\n{border}{step_name}{border}")
    print(MessageToJson(authority))


def show_transaction(transaction) -> None:
    """
    Display the transaction in a formatted JSON structure.
    """
    print(json.dumps(transaction.to_dict(), indent=4, sort_keys=True))


EXAMPLE_PRIVATE_KEY: Final[str] = get_random_private_key()
EXAMPLE_PUBLIC_KEY: Final[str] = get_random_public_key()
