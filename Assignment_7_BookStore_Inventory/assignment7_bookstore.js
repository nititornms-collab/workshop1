// Assignment 7: BookStore Inventory
// Run with: node assignment7_bookstore.js
//
// Requirements covered:
// - Book base class with title, author, price, and stock
// - sellBook(quantity) reduces stock and reports the amount due
// - EBook adds fileSize and downloadLink; selling does not reduce stock
// - PrintedBook adds weight and shippingCost; selling includes shipping

class Book {
    constructor(title, author, price, stock) {
        if (price < 0 || stock < 0) {
            throw new Error("Price and stock cannot be negative.");
        }

        this.title = title;
        this.author = author;
        this.price = price;
        this.stock = stock;
    }

    sellBook(quantity) {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return "Error: quantity must be a positive whole number.";
        }

        if (quantity > this.stock) {
            return `Not enough stock for "${this.title}". Available: ${this.stock}.`;
        }

        this.stock -= quantity;
        const total = this.price * quantity;

        return [
            `Sold ${quantity} copy/copies of "${this.title}".`,
            `Amount due: ${total.toFixed(2)} THB`,
            `Remaining stock: ${this.stock}`
        ].join("\n");
    }
}

class EBook extends Book {
    constructor(title, author, price, fileSize, downloadLink) {
        super(title, author, price, 0);
        this.fileSize = fileSize;
        this.downloadLink = downloadLink;
    }

    // E-books are digital, so there is no physical stock to reduce.
    sellBook(quantity) {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return "Error: quantity must be a positive whole number.";
        }

        const total = this.price * quantity;
        return [
            `Sold ${quantity} digital copy/copies of "${this.title}".`,
            `Amount due: ${total.toFixed(2)} THB`,
            `File size: ${this.fileSize} MB`,
            `Download link: ${this.downloadLink}`
        ].join("\n");
    }
}

class PrintedBook extends Book {
    constructor(title, author, price, stock, weight, shippingCost) {
        super(title, author, price, stock);
        if (weight < 0 || shippingCost < 0) {
            throw new Error("Weight and shipping cost cannot be negative.");
        }

        this.weight = weight;
        this.shippingCost = shippingCost;
    }

    // Shipping is added once per order.
    sellBook(quantity) {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return "Error: quantity must be a positive whole number.";
        }

        if (quantity > this.stock) {
            return `Not enough stock for "${this.title}". Available: ${this.stock}.`;
        }

        this.stock -= quantity;
        const subtotal = this.price * quantity;
        const total = subtotal + this.shippingCost;

        return [
            `Sold ${quantity} printed copy/copies of "${this.title}".`,
            `Book subtotal: ${subtotal.toFixed(2)} THB`,
            `Shipping cost: ${this.shippingCost.toFixed(2)} THB`,
            `Total amount due: ${total.toFixed(2)} THB`,
            `Weight per book: ${this.weight} kg`,
            `Remaining stock: ${this.stock}`
        ].join("\n");
    }
}

// Demonstration
console.log("========== Assignment 7: BookStore Inventory ==========\n");

const regularBook = new Book("JavaScript Basics", "N. Developer", 250, 10);
const ebook = new EBook(
    "Learning Web Development",
    "A. Coder",
    199,
    15,
    "https://example.com/download/web-development"
);
const printedBook = new PrintedBook(
    "Object-Oriented Programming",
    "P. Student",
    320,
    8,
    0.6,
    40
);

console.log("--- Book ---");
console.log(regularBook.sellBook(2));

console.log("\n--- EBook ---");
console.log(ebook.sellBook(1));

console.log("\n--- PrintedBook ---");
console.log(printedBook.sellBook(2));
