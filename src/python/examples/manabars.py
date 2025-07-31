from datetime import timezone, datetime
from decimal import Decimal

from wax import IWaxBaseInterface

# sprawdza aktualny stan RC many `calculate_current_manabar_value``
# ile czasy jest potrzebne do całkowitego naładowania RC mana `calculate_manabar_full_regeneration_time`
from wax.

def current_manabar_calculation(wax: IWaxBaseInterface) -> None:
    manabar = wax.calculate_current_manabar_value(
        head_block_time=datetime.fromtimestamp(1702548351, tz=timezone.utc),
        max_mana=2196088774870643,
        current_mana=1952744111294225,
        last_update_time=1702548249,
    )

    assert manabar.current_mana == 1953262632254958
    assert manabar.max_mana == 2196088774870643
    assert manabar.percent == Decimal("88.94")
