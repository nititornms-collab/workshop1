Assignment 9: Payroll System

File:
- assignment9_payroll.ts

Requirements implemented:
1. Taxable interface with applyTax(amount: number): number
2. Abstract Worker class with name, id, calculatePay(), and getDetails()
3. HourlyWorker with hourlyRate, hoursWorked, and hourly pay calculation
4. SalariedWorker implementing Taxable with monthly salary and 10% tax
5. Test data for hourly and salaried workers
6. Polymorphism through a Worker[] array

Run with:
npx ts-node assignment9_payroll.ts

Or compile first:
npx tsc assignment9_payroll.ts
node assignment9_payroll.js
