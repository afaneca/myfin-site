---
sidebar_position: 999
---

# FAQ

## Common

<details>
<summary>Why do the values from the budget details differ from the evolution stats?</summary>

The month's balance value is **calculated differently** in the evolution stats compared to the budget details.

In the budget details:

* Only transactions associated with a category are accounted for
* Transfers for accounts marked as _"exclude from budget"_ are treated as expenses (e.g. loan repayment)
* It gives a **more practical** view of how your expenses compare to your income (for instance, loan repayments, apart
  from premiums, are actually contributing and adding to your patrimony. However, in practical terms, they still
  represent an immediate expense that needs to be covered by your income, like any other)

In the evolution stats:

* Doesn't look through the transactions
* Instead, it looks at balance snapshots for all accounts at the beggining of the month and compares them with snapshots
  from the end of the month. The difference in terms of totals represents the month's balance
* It provides a **more realistic** view of how your patrimony grew (or not) in that specific month

If you see discrepancies between both values, it might be because:

* You have uncategorized transactions
* You have transfers to accounts marked as _"exclude from budget"_ (e.g. loan repayment)

</details>

## Rules

<details>
  <summary>Why isn't the correct rule being applied to my transaction?</summary>
  
  Are you sure you set up your rules correctly? Check the [rules page](rules.md) to learn more about how rules work and
  some common pitfalls when setting them up.
</details>

<details>
  <summary>Can I have rules with OR logic (match this OR that)?</summary>

  Currently, all conditions within a rule use AND logic. To achieve OR behavior, create multiple separate rules.
</details>

<details>
  <summary>What happens if no rules match my transaction?</summary>

  The engine will attempt a fuzzy match fallback (entity first, then category). If that also fails, the transaction is
  added without automatic categorization. You can manually assign a category and entity, or create a new rule for future
  similar transactions.
</details>

### Investments

<details>
<summary>Why do I have to set the current value manually?</summary>

The system is asset-agnostic - it doesn't know whether you're tracking a bank account, a stock, a cryptocurrency, or a
real estate investment. Pulling live prices would require integrating with every possible data source. Setting it
manually keeps things flexible and puts you in control of what "current value" means for each asset.
</details>

<details>
<summary>Why doesn't reinvested income count as income in the ROI calculation?</summary>

Because it's already in the asset. When income is reinvested as units, those units are part of your holdings. When you
set the current value, you're reporting the value of *all* units you hold - including the ones from income. Counting
them again separately would be double-counting.
</details>

<details>
<summary>What's the difference between a COST with units and an INCOME with internal fees?</summary>

They serve different purposes. A **COST with units** is a standalone loss - units that disappeared from your holdings
for any reason (burned, slashed, sold to cover a fee). An **INCOME with internal fees** is a gain that was partially
clawed back - you received units, but some were taken right back as fees. The income still happened; the net effect is
just smaller than the gross.
</details>

<details>
<summary>Why do internal and external fees give different ROI percentages for the same profit?</summary>

ROI % = profit ÷ Money Out. External fees increase Money Out (you paid cash). Internal fees don't (units were taken, not
cash). Same profit, smaller denominator → slightly higher percentage. Both are correct - they reflect a different cost
basis.
</details>

<details>
<summary>Can I record a transaction without fees?</summary>

Yes. The Fees & Taxes field is optional on BUY, SELL, and INCOME. Leave it empty and no fees are factored in.
</details>

<details>
<summary>What happens if I partially sell an asset?</summary>

Nothing special. The SELL is recorded normally, Money In increases by the sale amount, and your remaining holdings are
whatever units you still hold. Set the current value to reflect only those remaining units - the ROI calculation handles
the rest.
</details>

<details>
<summary>What if I have an asset I didn't buy - an inherited position, a gift, a bonus?</summary>

Record a BUY with amount = 0 to establish a holdings baseline without a cost basis. Money Out stays at 0, ROI percentage
will be undefined (no denominator), and the absolute ROI will simply equal the current value.
</details>