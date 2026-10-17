// Homework Assignment 4: Student Tracker, Smart Shop, and Hero System
import { Student } from "./student_class";

// Part 1: Inventory Logic (Function & Array)
function findLowStockItems(quantities: number[], threshold: number): number[] {
  return quantities.filter((quantity) => quantity < threshold);
}

// Part 2: Object-Oriented Blueprint (Class & Object)
class Product {
  readonly id: number;
  name: string;
  price: number;
  quantity: number;

  constructor(id: number, name: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  sell(amount: number): void {
    if (amount <= 0) {
      console.log("Error: Sale amount must be greater than 0.");
      return;
    }

    if (amount > this.quantity) {
      console.log(`Error: Not enough stock for ${this.name}`);
      return;
    }

    this.quantity -= amount;
  }

  restock(amount: number): void {
    if (amount <= 0) {
      console.log("Error: Restock amount must be greater than 0.");
      return;
    }

    this.quantity += amount;
  }
}

// Part 3 and Part 4: Interaction & Advanced Logic (RPG System)
class Hero {
  name: string;
  hp: number;
  inventory: Product[];

  constructor(name: string, hp: number, inventory: Product[] = []) {
    this.name = name;
    this.hp = hp;
    this.inventory = [...inventory];
  }

  addItem(item: Product): void {
    this.inventory.push(item);
  }

  useItem(itemName: string): void {
    const item = this.inventory.find(
      (product) => product.name.toLowerCase() === itemName.toLowerCase()
    );

    if (!item) {
      console.log(`${this.name} does not have ${itemName}.`);
      return;
    }

    if (item.quantity <= 0) {
      this.inventory = this.inventory.filter((product) => product !== item);
      console.log(`${item.name} is out of stock and was removed.`);
      return;
    }

    item.quantity -= 1;
    const remaining = item.quantity;

    if (remaining === 0) {
      this.inventory = this.inventory.filter((product) => product !== item);
    }

    console.log(`${this.name} used ${itemName}. Remaining: ${remaining}`);
  }

  takeDamage(damage: number): void {
    if (damage <= 0) {
      console.log("Damage must be greater than 0.");
      return;
    }

    this.hp = Math.max(0, this.hp - damage);

    if (this.hp === 0) {
      console.log(`Game Over: ${this.name} has fallen!`);
    } else {
      console.log(`${this.name} took ${damage} damage. HP: ${this.hp}`);
    }
  }
}

// Test Assignment 4.1: create John, add 3 scores, and print average.
const student = new Student("John", 1001);
student.addScore(85);
student.addScore(90);
student.addScore(95);
console.log(`Student: ${student.name}, ID: ${student.id}`);
console.log(`Average score: ${student.getAverage().toFixed(2)}`);

// Test Part 1: low-stock inventory function.
console.log("Low stock items:", findLowStockItems([20, 5, 12, 8, 30], 10));

// Test Part 2: Product class.
const potion = new Product(1, "Health Potion", 50, 3);
potion.sell(1);
console.log(`Product: ${potion.name}, Price: ${potion.price}, Quantity: ${potion.quantity}`);
potion.restock(2);
console.log(`Quantity after restock: ${potion.quantity}`);

// Test Part 3 and Part 4: Hero inventory and damage.
const hero = new Hero("Aria", 100, [new Product(2, "Health Potion", 50, 2)]);
hero.addItem(new Product(3, "Magic Herb", 20, 1));
hero.useItem("Health Potion");
hero.useItem("Magic Herb");
console.log("Inventory after use:", hero.inventory.map((item) => `${item.name} x${item.quantity}`));
hero.takeDamage(35);
hero.takeDamage(65);
