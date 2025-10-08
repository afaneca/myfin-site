---
sidebar_position: 3
---

# Transactions
Transactions can be of type:
* Income/Credit
* Expense/Debit
* Transfer (between own accounts)

In logical terms, a transfer from `A -> B` is treated by the API as two different transactions:
1. `X` amount is debited from `A`
2. `X` amount is credited in `B`

However, for accessibility and data integrity, they're still stored as a single entry.


Here's a typical DB representation of 3 different transactions: 1 debit, 1 credit and 1 transfer (simplified and truncated):
| transaction_id | type | accounts_account_from_id | accounts_account_to_id | description|
|--|--|--|--|--|
|1|E|101|NULL|debit from `#101`|
|2|I|NULL|101|credit to `#101`|
|3|T|101|102|transfer from `#101` to `#102`|