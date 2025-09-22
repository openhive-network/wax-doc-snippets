import json

from google.protobuf.json_format import MessageToJson


def show_authority(authority, step_name="") -> None:
    border = (67 - len(step_name)) // 2 * "="
    print(f"\n{border}{step_name}{border}")
    print(MessageToJson(authority))


def show_transaction(transaction) -> None:
    """
    Display the transaction in a formatted JSON structure.
    """
    print(json.dumps(transaction.to_dict(), indent=4, sort_keys=True))
