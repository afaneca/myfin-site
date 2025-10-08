---
sidebar_position: 2
---

# Accounts
## Types of accounts
Myfin currently supports these account types:

| Code       | Type                   | Purpose                                                                  |
|------------|------------------------|--------------------------------------------------------------------------|
| ``CHEAC``  | Checking account       | Used for daily transactions, payments, and receiving income              |
| ``SAVAC``  | Savings account        | Used for storing money and earning interest over time                    |
| ``CREAC``  | Credit card or loan    | Used for managing borrowed funds or credit-based purchases               |
| ``INVAC``  | Investment account     | Used for holding and managing stocks, ETFs, or other investment assets   |
| ``MEALAC`` | Meal card or allowance | Used for paying meals or food-related expenses, often via employer perks |
| ``WALLET`` | Cash                   | Used for tracking physical money on hand                                 |


## "Exclude from budgets" attribute
One important account attribute to keep in check is the exclude from budgets toggle. If you toggle it on for an account, all transfer transactions that have that specific account marked as the recipient will be treated as an expense when it comes to budget calculations and analysis (see [here](faq.md#why-do-the-values-from-the-budget-details-differ-from-the-evolution-stats)).

As a generic rule of thumb, I recommend you toggle this attribute on for all your credit cards and loan accounts.

Here's my reasoning: everytime you make a car payment, for instance, you're actually making a transfer from your checking account to your car loan account (minus premiums). However, even though it's not technically an expense, you may still want to treat it as such, since it's still money that's going to be debited from your account and that you need to account for (like any other fixed expense).

By marking the car loan account as _"exclude from budget"_, you're telling MyFin to treat all transfers to that account as if they were expenses (for budgeting purposes only).