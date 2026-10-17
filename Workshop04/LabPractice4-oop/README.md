# Lab Practice 4.1–4.4 — TypeScript

## Included exercises

1. **Animal Kingdom:** `Animal` class with `species`, `sound`, and `makeSound()`. Tests Dog and Cat.
2. **Geometry:** `Rectangle` class with `getArea()` and `getPerimeter()`. Tests a 5 × 10 rectangle.
3. **Bank Account:** `BankAccount` class with `displayBalance()`, `deposit()`, and `withdraw()`. Rejects invalid amounts and prints `Insufficient funds` when the withdrawal exceeds the balance.
4. **Hero:** `Hero` class with `name`, `hp`, `attackPower`, and `attack(target)`. Reduces target HP and prints a fainted message when HP reaches zero or below.

## Run

Install Node.js, then run these commands from this folder:

```bash
npm install
npx ts-node index.ts
```

Check for TypeScript errors:

```bash
npx tsc --noEmit
```

## GitHub Classroom submission

After connecting this folder to the repository created for your assignment, run:

```bash
git add .
git commit -m "Complete Lab Practice 4"
git push
```

Use the repository URL and instructions supplied by your instructor / GitHub Classroom.
