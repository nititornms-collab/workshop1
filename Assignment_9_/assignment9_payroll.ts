// Assignment 9: Payroll System
// Demonstrates interfaces, abstract classes, inheritance, polymorphism,
// and tax calculation in TypeScript.

interface Taxable {
    applyTax(amount: number): number;
}

abstract class Worker {
    constructor(public name: string, public id: string) {}

    abstract calculatePay(): number;

    getDetails(): string {
        return `Name: ${this.name}`;
    }
}

class HourlyWorker extends Worker {
    private hourlyRate: number;
    private hoursWorked: number;

    constructor(
        name: string,
        id: string,
        hourlyRate: number,
        hoursWorked: number
    ) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    calculatePay(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}

class SalariedWorker extends Worker implements Taxable {
    private monthlySalary: number;

    constructor(
        name: string,
        id: string,
        monthlySalary: number
    ) {
        super(name, id);
        this.monthlySalary = monthlySalary;
    }

    calculatePay(): number {
        return this.monthlySalary;
    }

    applyTax(amount: number): number {
        return amount * 0.90;
    }
}

// Test the payroll system.
const workers: Worker[] = [
    new HourlyWorker("John", "W001", 20, 160),
    new HourlyWorker("Sarah", "W002", 25, 150),
    new SalariedWorker("Mike", "W003", 5000),
    new SalariedWorker("Emma", "W004", 7000)
];

console.log("===== PAYROLL SYSTEM =====");

workers.forEach((worker) => {
    const grossPay = worker.calculatePay();

    console.log(worker.getDetails());
    console.log(`ID: ${worker.id}`);
    console.log(`Gross Pay: $${grossPay.toFixed(2)}`);

    if (worker instanceof SalariedWorker) {
        const netPay = worker.applyTax(grossPay);
        console.log(`Net Pay (after 10% tax): $${netPay.toFixed(2)}`);
    } else {
        console.log(`Net Pay: $${grossPay.toFixed(2)}`);
    }

    console.log("--------------------------");
});

console.log("===== PAYROLL COMPLETE =====");
