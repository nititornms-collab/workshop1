// Workshop 8: Polymorphism
// Run with: node workshop8.js

console.log("========== Workshop 8.1: Payment System ==========");

class PaymentGateway {
    process(amount) {
        if (new.target === PaymentGateway) {
            throw new Error("PaymentGateway is a base class.");
        }
        throw new Error("Subclass must implement process(amount).");
    }
}

class CreditCardPayment extends PaymentGateway {
    process(amount) {
        if (amount <= 0) {
            console.log("Payment amount must be greater than zero.");
            return;
        }
        console.log(`Processing Credit Card payment: ${amount.toFixed(2)} THB`);
    }
}

class PayPalPayment extends PaymentGateway {
    process(amount) {
        if (amount <= 0) {
            console.log("Payment amount must be greater than zero.");
            return;
        }
        console.log(`Redirecting to PayPal to pay ${amount.toFixed(2)} THB`);
    }
}

function executePayment(p, amt) {
    p.process(amt);
}

const creditCard = new CreditCardPayment();
const payPal = new PayPalPayment();

executePayment(creditCard, 1500);
executePayment(payPal, 750);


console.log("\\n========== Workshop 8.2: Notification Center ==========");

class Notification {
    send(message) {
        throw new Error("Subclass must implement send(message).");
    }
}

class EmailNotification extends Notification {
    send(message) {
        console.log(`Email Notification: ${message}`);
    }
}

class SMSNotification extends Notification {
    send(message) {
        console.log(`SMS Notification: ${message}`);
    }
}

class PushNotification extends Notification {
    send(message) {
        console.log(`Push Notification: ${message}`);
    }
}

const notifications = [
    new EmailNotification(),
    new SMSNotification(),
    new PushNotification()
];

for (const notification of notifications) {
    notification.send("Hello Everyone");
}
