---
sidebar_position: 4
---

# Balance Snapshots
As the months go by, MyFin keeps track of your accounts balances so that it can help you visualize and analyse how your patrimony grows over time.

A technical method for making this work would be to setup cron jobs so that we could fetch all account balances at regular intervals and store that info on the database.

However, as to avoid having to depend on job schedulers, I decided to implement a more passive, on-demand approach: every time a new transaction is added, removed or updated, the API will fetch the current balances for the accounts involved in that transaction and will then create or update the snapshot for those accounts in that specific month in the DB.

If the transaction month is not the current month, then it'll also recalculate the snapshots for all months between then and now.