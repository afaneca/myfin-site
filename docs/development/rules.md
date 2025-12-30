---
sidebar_position: 1
---

# Rules engine

## Overview

The rules engine categorizes transactions using:

1. **Exact rules matching** (AND logic across matchers)
2. **Smart selection** when multiple rules match (most conditions first, then best score)
3. **Fuzzy fallback** when no rules match (entity first, then category)
4. **Performance optimizations** for single vs bulk operations (lazy vs cached fetching)

## Match Type Weights

```typescript
const MATCH_TYPE_WEIGHTS = {
  equals: 1000,
  contains: 100,
  not_equals: 10,
  not_contains: 1,
  ignore: 0,
};
```

## Score Calculation

```typescript
// For text conditions
score = MATCH_TYPE_WEIGHT × text_length

// For numeric conditions
score = MATCH_TYPE_WEIGHT × 100

// For negative conditions
score = MATCH_TYPE_WEIGHT × 1
```

## Rule Evaluation Algorithm

```
1. For each rule in user's rules:
   a. Check if ALL conditions match (AND logic)
   b. If any condition fails, skip this rule
   c. If at least one condition matches, accumulate a per-condition score

2. Among matching rules:
   a. Compare number of matched conditions (primary key)
   b. If tied, compare total score (secondary key)
   c. Return the rule with highest (matchedCount, totalScore)

3. If no rules match:
   a. Try fuzzy entity inference
   b. If no entity inferred, try fuzzy category inference
   c. If still nothing, return undefined
```

## Fuzzy fallback

### Behavior

When no rule matches, the engine attempts to infer values from the transaction description:

1. **Entity inference** (first)
2. **Category inference** (second)

If a fuzzy inference is made, the returned object behaves like a partial rule and:

- sets `rule_id = -1` (sent to the client as `matching_rule = -1`)
- sets either `assign_entity_id` or `assign_category_id`

If no inference is possible, the engine returns `undefined`.

### Threshold

A single threshold constant is used by this engine:

```typescript
const FUZZY_THRESHOLD = 80; // 0..100
```

### String normalization & scoring

Fuzzy matching uses:

- normalization: uppercase, remove diacritics, remove punctuation
- scoring: `fuzzball.token_set_ratio(description, candidateName)`

That scoring method is robust against noisy descriptions such as:

- `"BUY LIDL VAGOS"` matching `"LIDL"`

## Performance: lazy vs cached fetching

### Problem

A naive approach would fetch all entities and categories from the database every time fuzzy matching is evaluated.

This becomes a bottleneck when processing many transactions (e.g., imports), because fuzzy fallback would trigger repeated data loads.

### Current strategy

The implementation supports both:

- **Lazy fetch** for a single transaction
- **Cached reuse** for bulk operations

#### Lazy fetch (single transaction)

`autoCategorizeTransaction` typically calls the rules engine without caches.

In that case:

- entities/categories are only fetched if fuzzy fallback is reached (no matching rule)

This keeps the fast path (rules match) lean.

#### Cached reuse (bulk)

`autoCategorizeTransactionList` loads entities and categories once per batch and passes them through.

This provides:

- 2 queries per batch (1 for entities, 1 for categories)
- no repeated fetches per transaction

### Cache-aware method signatures

The relevant methods follow a consistent convention:

- business parameters first
- optional caches next
- `dbClient` always last

Example:

```typescript
getRuleForTransaction(
  userId,
  description,
  amount,
  type,
  accountsFromId,
  accountsToId,
  selectedCategoryId,
  selectedEntityId,
  entitiesCache?,
  categoriesCache?,
  dbClient = prisma
)
```

And inside fuzzy helpers:

```typescript
guessEntityIdForDescription(userId, description, entitiesCache?, dbClient = prisma)
guessCategoryIdForDescription(userId, description, categoriesCache?, dbClient = prisma)
```

### Query count implications

- Single transaction where a rule matches: fetch rules only
- Single transaction where fuzzy is needed: fetch rules + entities and/or categories
- Bulk import: entities/categories fetched once, reused across all transactions

