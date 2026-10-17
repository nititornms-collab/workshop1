// Workshop 9.1, 9.2, 9.3
// Abstract Classes, Interfaces, and Polymorphism
// TypeScript

// ============================================================
// Workshop 9.1: Appliance Factory
// ============================================================

abstract class Appliance {
    constructor(public brand: string) {}

    abstract turnOn(): void;
}

class WashingMachine extends Appliance {
    override turnOn(): void {
        console.log(`[WashingMachine] ${this.brand} washing machine is now ON.`);
    }
}

class Refrigerator extends Appliance {
    override turnOn(): void {
        console.log(`[Refrigerator] ${this.brand} refrigerator is now ON and cooling.`);
    }
}

// Uncommenting the following line causes a TypeScript error because
// abstract classes cannot be instantiated directly.
// const appliance = new Appliance("Generic");

const washingMachine = new WashingMachine("LG");
const refrigerator = new Refrigerator("Samsung");

washingMachine.turnOn();
refrigerator.turnOn();


// ============================================================
// Workshop 9.2: Data Storage
// ============================================================

interface StorageService {
    save(data: string): void;
    load(): string;
}

class CloudStorage implements StorageService {
    private data: string = "";

    save(data: string): void {
        this.data = data;
        console.log(`[CloudStorage] Saved: ${data}`);
    }

    load(): string {
        console.log(`[CloudStorage] Loaded: ${this.data}`);
        return this.data;
    }
}

class LocalStorage implements StorageService {
    private data: string = "";

    save(data: string): void {
        this.data = data;
        console.log(`[LocalStorage] Saved: ${data}`);
    }

    load(): string {
        console.log(`[LocalStorage] Loaded: ${this.data}`);
        return this.data;
    }
}

function runStorageExample(): void {
    // The calling code uses the interface, so the implementation
    // can be switched without changing save/load calls.
    let storage: StorageService = new CloudStorage();

    storage.save("Hello from Cloud");
    storage.load();

    storage = new LocalStorage();

    storage.save("Hello from Local");
    storage.load();
}

runStorageExample();


// ============================================================
// Workshop 9.3: Electronic Payment Gateway System
// ============================================================

abstract class PaymentGateway {
    protected amount: number;
    protected tid: string;

    constructor(amount: number) {
        this.amount = amount;
        this.tid = "TXN-" + Math.floor(1000 + Math.random() * 9000);
    }

    abstract processPayment(): boolean;

    printReceipt(success: boolean): void {
        if (success) {
            console.log(
                `[Receipt] TXN: ${this.tid} | Amount: $${this.amount} | Status: SUCCESS`
            );
        } else {
            console.log(
                `[Receipt] TXN: ${this.tid} | Status: FAILED`
            );
        }
    }
}

class CreditCardPayment extends PaymentGateway {
    private cardNumber: string;

    constructor(amount: number, cardNumber: string) {
        super(amount);
        this.cardNumber = cardNumber;
    }

    override processPayment(): boolean {
        if (this.cardNumber.length === 16) {
            const last4 = this.cardNumber.slice(-4);
            console.log(
                `[CreditCard] Charging $${this.amount} to card ending in ${last4}...`
            );
            return true;
        }

        console.log("[CreditCard] Invalid Card Number!");
        return false;
    }
}

class PromptPayPayment extends PaymentGateway {
    private phoneNumber: string;

    constructor(amount: number, phoneNumber: string) {
        super(amount);
        this.phoneNumber = phoneNumber;
    }

    override processPayment(): boolean {
        if (this.phoneNumber.length === 10) {
            console.log(
                `[PromptPay] Generating QR Code for $${this.amount} (Phone: ${this.phoneNumber})...`
            );
            return true;
        }

        console.log("[PromptPay] Invalid Phone Number!");
        return false;
    }
}

// Testing
const payments: PaymentGateway[] = [
    new CreditCardPayment(1500, "1234567890123456"),
    new CreditCardPayment(500, "1234"),
    new PromptPayPayment(350, "0812345678"),
    new PromptPayPayment(10000, "034109300")
];

payments.forEach((payment) => {
    const success = payment.processPayment();
    payment.printReceipt(success);
});
