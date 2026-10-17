// Assignment 6: Product Inventory
// Use private fields and setters to enforce valid product data.

class Product {
  private _name: string;
  private _price: number;
  private _stock: number;

  constructor(name: string, price: number, stock: number) {
    this._name = name;
    // Initialize through setters so constructor input is validated too.
    this._price = 0;
    this._stock = 0;
    this.price = price;
    this.stock = stock;
    this._name = name.trim();
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.trim().length === 0) {
      console.log("Warning: Product name cannot be empty. Name was not updated.");
      return;
    }
    this._name = value.trim();
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (!Number.isFinite(value) || value <= 0) {
      console.log("Warning: Price must be greater than 0. Price was not updated.");
      return;
    }
    this._price = value;
  }

  get stock(): number {
    return this._stock;
  }

  set stock(value: number) {
    if (!Number.isFinite(value) || value < 0) {
      console.log("Warning: Stock cannot be negative. Stock was not updated.");
      return;
    }
    this._stock = value;
  }

  get inventoryValue(): number {
    return this._price * this._stock;
  }
}

// Test: create a product, attempt to set a negative price, then print inventory value.
const product = new Product("Notebook", 25, 40);

console.log(`Product: ${product.name}`);
console.log(`Price: $${product.price.toFixed(2)}`);
console.log(`Stock: ${product.stock}`);

product.price = -10; // Invalid: warning is printed and the price remains unchanged.
console.log(`Price after invalid update: $${product.price.toFixed(2)}`);
console.log(`Total inventory value: $${product.inventoryValue.toFixed(2)}`);

// Extra test for the stock validation rule.
product.stock = -5;
console.log(`Stock after invalid update: ${product.stock}`);
console.log(`Total inventory value: $${product.inventoryValue.toFixed(2)}`);
