
# TESTS.md

## Automated Test Coverage

This project has automated tests for the AI Spend Optimization Engine. These tests make sure the calculations, waste detection, risk scoring and savings projections are correct.

The tests check the audit logic. They do not just check how the user interface works.

---

# Test Files

## 1. `WasteCalculation.test.js`

### Covers

* Correct waste calculation

* Finding seat waste

* Making waste percentage

* Checking tool inputs

### Main Functions Tested

* `calculateWaste()`

### Example Scenario

We test if tools that are not used much give us waste values.

---

## 2. `RiskScore.test.js`

### Covers

* Calculating risk score

* Comparing risk and low-risk tools

* Risk score boundaries

* How enterprise plans affect risk

### Main Functions Tested

* `calculateRiskScore()`

### Example Scenario

Tools that are not used well by companies should have higher risk scores.

---

## 3. `Utilization.test.js`

### Covers

* Calculating seat utilization

* Active and inactive users

* Checking utilization percentage

* How big companies use the system

### Main Functions Tested

* `calculateUtilization()`

* `calculateSeatUtilization()`

### Example Scenario

Big companies should use the system efficiently than small teams.

---

## 4. `Recommendations.test.js`

### Covers

* Making recommendations

* Suggesting seat reduction

* Suggesting plan downgrade

* Finding consolidation opportunities

* Ordering savings recommendations

### Main Functions Tested

* `generateRecommendations()`

### Example Scenario

Underutilized Team or Enterprise plans should suggest downgrading.

---

## 5. `SavingsProjection.test.js`

### Covers

* monthly waste

* Yearly savings projections

* Consolidation savings

* Audit calculations

### Main Functions Tested

* `processAuditTools()`

### Example Scenario

Having overlapping tools should give us realistic yearly savings.

---

# Running Tests

## Run All Tests

```bash

npm test

```

---

## Run Vitest

```bash

npx vitest

```

---

## Run Tests in Watch Mode

```bash

npx vitest --watch

```

---

## Run a Single Test File

```bash

npx vitest src/tests/wasteCalculation.test.js

```

---

# Testing Stack

* Vitest

* React Testing Environment

* JavaScript ES Modules

---

# CI/CD

GitHub Actions runs tests and checks code on every push to the `main` branch.

Workflow file:

```bash

.github/workflows/

```

---

# Notes

The AI Spend Optimization Engine tests focus on:

* financial accuracy

* realistic optimization logic

* how well it works for big companies

* giving good recommendations

* handling unusual situations

This helps ensure the audit results are stable and trustworthy, as the AI Spend Optimization Engine changes.
