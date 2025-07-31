from __future__ import annotations

import wax


def get_private_key() -> None:
    private_key = wax.generate_private_key()
    print(f"Private Key: {private_key.result.decode()}")

    public_key = wax.calculate_public_key(wif=private_key.result)
    print(f"Public Key: {public_key.result.decode()}")

    data = wax.suggest_brain_key()
    print(f"brain_keys: {data.brain_key, data.wif_private_key, data.associated_public_key}")

if __name__ == '__main__':
    get_private_key()
