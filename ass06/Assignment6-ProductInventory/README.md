# Assignment 6 — Product Inventory

## Requirements implemented
- `Product` class with private fields `_name`, `_price`, and `_stock`.
- Setters validate values before updating them:
  - Price must be greater than `0`.
  - Stock must not be negative.
  - Invalid values print a warning and leave the existing value unchanged.
- Getter `inventoryValue` returns `price * stock`.
- Test creates a product, attempts to set a negative price, and prints the inventory value.
- An extra test confirms negative stock is rejected too.

## Run
Install Node.js, open a terminal in this folder, and run:

```bash
npm install
npx ts-node index.ts
```

Type-check:

```bash
npx tsc --noEmit
```

## GitHub Classroom submission
Connect the folder to the repository supplied by your instructor, then run:

```bash
git add .
git commit -m "Complete Assignment 6 Product Inventory"
git push
```

Use the repository and submission instructions supplied by your instructor.
