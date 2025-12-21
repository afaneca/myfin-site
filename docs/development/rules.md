---
sidebar_position: 1
---

# Rules engine

## Match Type Weights

```typescript
const MATCH_TYPE_WEIGHTS = {
  'equals': 1000,
  'contains': 100,
  'not_equals': 10,
  'not_contains': 1,
  'ignore': 0
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
   c. If all match, calculate total score

2. Among matching rules:
   a. Compare number of matching conditions
   b. If tied, compare total scores
   c. Return rule with highest values

3. If no rules match, return null
```