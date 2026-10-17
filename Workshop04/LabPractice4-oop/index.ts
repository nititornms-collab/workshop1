// Lab Practice 4.1-4.4: Animal Kingdom, Geometry, Bank Account, and Hero

// Lab Practice 4.1: Animal Kingdom
class Animal {
  species: string;
  sound: string;

  constructor(species: string, sound: string) {
    this.species = species;
    this.sound = sound;
  }

  makeSound(): void {
    console.log(`The ${this.species} says ${this.sound}`);
  }
}

const dog = new Animal("Dog", "Woof");
const cat = new Animal("Cat", "Meow");
dog.makeSound();
cat.makeSound();

// Lab Practice 4.2: Geometry
class Rectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rectangle = new Rectangle(5, 10);
console.log(`Rectangle area: ${rectangle.getArea()}`);
console.log(`Rectangle perimeter: ${rectangle.getPerimeter()}`);

// Lab Practice 4.3: Bank Account
class BankAccount {
  ownerName: string;
  balance: number;

  constructor(ownerName: string, initialBalance: number) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
  }

  displayBalance(): void {
    console.log(`Account: ${this.ownerName}, Balance: $${this.balance.toFixed(2)}`);
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0");
      return;
    }

    this.balance += amount;
    console.log(`Deposited $${amount.toFixed(2)}`);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdrawal amount must be greater than 0");
      return;
    }

    if (amount > this.balance) {
      console.log("Insufficient funds");
      return;
    }

    this.balance -= amount;
    console.log(`Withdrew $${amount.toFixed(2)}`);
  }
}

const account = new BankAccount("John", 500);
account.displayBalance();
account.deposit(200);
account.withdraw(1000); // Should print "Insufficient funds".
account.displayBalance();

// Lab Practice 4.4: Hero
class Hero {
  name: string;
  hp: number;
  attackPower: number;

  constructor(name: string, hp: number, attackPower: number) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
  }

  attack(target: Hero): void {
    if (this.hp <= 0) {
      console.log(`${this.name} cannot attack because they have fainted.`);
      return;
    }

    if (target.hp <= 0) {
      console.log(`${target.name} has already fainted.`);
      return;
    }

    target.hp -= this.attackPower;
    console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);

    if (target.hp <= 0) {
      target.hp = 0;
      console.log(`${target.name} has fainted!`);
    } else {
      console.log(`${target.name}'s remaining HP: ${target.hp}`);
    }
  }
}

const warrior = new Hero("Warrior", 100, 35);
const monster = new Hero("Monster", 60, 30);

warrior.attack(monster);
monster.attack(warrior);
warrior.attack(monster);
warrior.attack(monster);
