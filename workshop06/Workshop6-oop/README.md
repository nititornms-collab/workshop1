# Workshop 6.1–6.2 — TypeScript

## Workshop 6.1: Smart Employee
- `Employee` has private `_firstName` and `_lastName` properties.
- The `fullName` getter combines the two names.
- The `fullName` setter splits a full-name string and updates the private fields.
- Includes a small test that changes `John Doe` to `Jane Smith`.

## Workshop 6.2: Temperature
- `WeatherStation` stores Celsius in private `_celsius`.
- The `fahrenheit` getter converts Celsius to Fahrenheit.
- The `fahrenheit` setter converts Fahrenheit to Celsius.
- Validation prevents temperatures below Absolute Zero.
- Includes tests for conversion and validation.

## Run the project
Install Node.js, then open a terminal in this folder:

```bash
npm install
npx ts-node index.ts
```

Type-check the project:

```bash
npx tsc --noEmit
```

## Submit through GitHub Classroom
Connect this folder to the repository provided by your instructor, then run:

```bash
git add .
git commit -m "Complete Workshop 6"
git push
```

Use the GitHub Classroom repository URL/instructions provided by your instructor.
