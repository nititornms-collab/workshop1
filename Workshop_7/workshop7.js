// Workshop 7: Object-Oriented Programming
// Topics: Inheritance, Encapsulation, and Method Overriding
// Run with: node workshop7.js

console.log("========== Workshop 7.1: Employee Roles ==========");

class Staff {
    #name;
    #salary;

    constructor(name, salary) {
        this.#name = name;
        this.#salary = salary;
    }

    getDetails() {
        return `Name: ${this.#name}, Salary: ${this.#salary.toLocaleString()} THB`;
    }
}

class Manager extends Staff {
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }

    // Override the parent method to include the department.
    getDetails() {
        return `${super.getDetails()}, Department: ${this.department}`;
    }
}

const manager = new Manager("Anan", 45000, "IT");
console.log(manager.getDetails());


console.log("\n========== Workshop 7.2: Shape Hierarchy ==========");

class Shape {
    constructor(color) {
        this.color = color;
    }

    calculateArea() {
        throw new Error("Subclass must implement calculateArea().");
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Square extends Shape {
    constructor(color, side) {
        super(color);
        this.side = side;
    }

    calculateArea() {
        return this.side ** 2;
    }
}

const circle = new Circle("Blue", 5);
const square = new Square("Red", 4);

console.log(`Circle color: ${circle.color}`);
console.log(`Circle area: ${circle.calculateArea().toFixed(2)}`);
console.log(`Square color: ${square.color}`);
console.log(`Square area: ${square.calculateArea().toFixed(2)}`);


console.log("\n========== Workshop 7.3: RPG Character System ==========");

class Character {
    constructor(name, health, level) {
        this.name = name;
        this.health = health;
        this.level = level;
    }

    takeDamage(amount) {
        if (amount < 0) {
            throw new Error("Damage cannot be negative.");
        }
        this.health = Math.max(0, this.health - amount);
        console.log(`${this.name} takes ${amount} damage. Health: ${this.health}`);
    }

    attack() {
        return `${this.name} attacks.`;
    }
}

class Mage extends Character {
    constructor(name, health, level, mana) {
        super(name, health, level);
        this.mana = mana;
    }

    attack() {
        if (this.mana < 10) {
            return `${this.name} does not have enough mana to cast a spell.`;
        }
        this.mana -= 10;
        return `${this.name} attacks with a Spell! Mana remaining: ${this.mana}`;
    }
}

class Warrior extends Character {
    constructor(name, health, level, stamina) {
        super(name, health, level);
        this.stamina = stamina;
    }

    attack() {
        if (this.stamina < 10) {
            return `${this.name} does not have enough stamina to swing a sword.`;
        }
        this.stamina -= 10;
        return `${this.name} attacks with a Sword! Stamina remaining: ${this.stamina}`;
    }
}

const mage = new Mage("Luna", 100, 5, 40);
const warrior = new Warrior("Thor", 150, 5, 50);

console.log(mage.attack());
mage.takeDamage(20);
console.log(warrior.attack());
warrior.takeDamage(25);
