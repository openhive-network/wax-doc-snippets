from __future__ import annotations


def get_private_key_from_password(wax) -> None:
    private_key = wax.get_private_key_from_password(
        account="gtg",
        role="active",
        password="verysecurepassword",  # noqa: S106
    )

    assert private_key.associated_public_key == "STM6JswFatSixhR9AMUP38rtpMVAagTvxGYu7d8i2JUK1QZDkPbH3"
    assert private_key.wif_private_key == "5J89tdX8b1wQJHcqDMDVn1UwvtiYFK53PQEgG5gL5oCEk83Us12"
