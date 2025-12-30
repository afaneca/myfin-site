---
sidebar_position: 5
---

# Rules

:::info
The information in this document applies to MyFin API version 3.4.0 and later, which introduced a revamped rules engine with smart rule selection based on specificity scoring.
The fuzzy matching mechanism was added in version 3.5.0.
:::

## Overview

The MyFin Budget Rules Engine automatically categorizes transactions based on user-defined rules. When you add a new transaction, the system intelligently matches it against your rules and applies the most appropriate attributes.

## How it works

### Rule matching process

When you request auto-categorization for a transactions, the rules engine:

1. **Evaluates all rules** - Checks which rules match the transaction based on their conditions
2. **Calculates match scores** - Each matching rule receives a specificity score
3. **Selects the best match** - The rule with the highest score is applied to the transaction
4. **Applies assignments** - The selected rule's category and entity are assigned to the transaction

### Rule components

Each rule consists of:

- **Matchers (Conditions)** - Define when a rule should match a transaction
- **Assignments** - Define what category and entity to apply when the rule matches

#### Available matchers

You can create conditions based on the following transaction attributes:

| Matcher Attribute | Description                                      |
|-------------------|--------------------------------------------------|
| **Description**   | The transaction description text                 |
| **Amount**        | The transaction amount (numeric)                 |
| **Type**          | The transaction type (Income, Expense, Transfer) |
| **Account From**  | The source account                               |
| **Account To**    | The destination account                          |

#### Match operators

For each matcher, you can choose an operator:

| Operator             | Description                | Example                             |
|----------------------|----------------------------|-------------------------------------|
| **Equals**           | Exact match                | Description equals "Target"         |
| **Not Equals**       | Does not match exactly     | Description not equals "Restaurant" |
| **Contains**         | Partial match (substring)  | Description contains "Supermarket"  |
| **Does Not Contain** | Does not contain substring | Description does not contain "Cash" |
| **Ignore**           | Skip this attribute        | Amount ignore                       |

## Smart rule selection

### The problem this solves

Previously, when multiple rules matched a transaction, the system would simply apply the first matching rule it found. This caused issues when you had overlapping rules. For example:

- **Rule 1**: Description contains "Target" → Entity: "Target"
- **Rule 2**: Description contains "IRS (Target)" → Entity: "Government"

A transaction with description "Payment IRS (Target)" would match both rules, but you'd want Rule 2 to be applied since it's more specific.

### How specificity scoring works

The rules engine now calculates a **specificity score** for each matching rule based on three factors:

#### 1. Number of matching conditions (primary factor)

Rules that match more conditions are considered more specific and win over rules with fewer conditions.

**Example:**
- **Rule A**: Matches description only → 1 condition
- **Rule B**: Matches description AND amount → 2 conditions
- **Winner**: Rule B (even if Rule A has a longer description match)

#### 2. Match type quality (secondary factor)

Different operators have different weights based on how specific they are:

| Operator             | Weight | Reasoning                             |
|----------------------|--------|---------------------------------------|
| **Equals**           | 1000×  | Most specific - exact match           |
| **Contains**         | 100×   | Moderately specific - substring match |
| **Not Equals**       | 10×    | Less specific - negative condition    |
| **Does Not Contain** | 1×     | Least specific - negative condition   |
| **Ignore**           | 0×     | No contribution to specificity        |

**Example:**
- **Rule A**: Description contains "Store" → Weight: 100
- **Rule B**: Description equals "Store" → Weight: 1000
- **Winner**: Rule B (exact matches are prioritized)

#### 3. Match length/precision (tertiary factor)

Within the same match type, longer or more precise matches win.

**For text matches**, the length of the matched string matters:
- "Target" (10 characters) < "IRS (Target)" (16 characters)

**For numeric matches**, exact amount matches get a fixed bonus of 100 points.

### Score calculation formula

```
Final Score = Match Type Weight × Specificity Length
```

**For text conditions:**
```
Score = Match Type Weight × String Length
```

**For numeric conditions:**
```
Score = Match Type Weight × 100 (fixed bonus)
```

**Total rule score:**
```
Total Score = Sum of all matching condition scores
```

### Priority order

When comparing rules, the engine follows this priority:

1. **Number of conditions** (more conditions = more specific)
2. **Total score** (combination of match types and specificity)

## Fuzzy fallback (when no rule matches)

If no rule matches the transaction, the engine attempts a best-effort guess using **fuzzy string matching**.

### How it works

1. **Entity inference (first)**
  - The engine compares the transaction description with **your entities' names**.
  - If a match reaches the fuzzy threshold, the entity is suggested.

2. **Category inference (second)**
  - If no entity is inferred, the engine compares the description with **your categories' names**.
  - If a match reaches the fuzzy threshold, the category is suggested.

3. **No guess**
  - If neither entity nor category match above the threshold, no attributes are auto-assigned.

### Example

- Transaction description: `"BUY LIDL VAGOS etc"`
- User has entity: `"LIDL"`

Even if no rule exists, the engine can still infer the entity **LIDL** and pre-fill it.

## Troubleshooting

### "Wrong rule is being applied to my transaction"

**Check:**
1. Do multiple rules match? The more specific rule should win.
2. Count the conditions - rules with more matching conditions always win.
3. Check your match operators - EQUALS beats CONTAINS.

**Solution:** Add more conditions to the rule you want to be preferred, or change CONTAINS to EQUALS if appropriate.

---

### "My specific rule isn't being applied"

**Check:**
1. Does your specific rule actually match the transaction? All conditions must match (AND logic).
2. Is one of the conditions using the wrong operator?
3. Check for typos in your match values.

**Solution:** Test each condition individually. If one condition fails, the entire rule fails.

---

### "Two rules seem to have the same priority"

When rules have identical scores (same number of conditions, same operators, same lengths), the system will select one consistently, but the choice may seem arbitrary.

**Solution:** Add an additional condition to one of the rules to differentiate them, or adjust the match types.

## Technical Details
You can check them out [here](../development/rules.md).

## FAQ

**Q: Can I have rules with OR logic (match this OR that)?**

A: Currently, all conditions within a rule use AND logic. To achieve OR behavior, create multiple separate rules.

**Q: What happens if no rules match my transaction?**

A: The engine will attempt a fuzzy match fallback (entity first, then category). If that also fails, the transaction is added without automatic categorization. You can manually assign a category and entity, or create a new rule for future similar transactions.
