// Assignment 8: Monster Battle
// Demonstrates inheritance and polymorphism in TypeScript.

class Monster {
    constructor(
        public name: string,
        public health: number,
        public damage: number
    ) {}

    attack(): void {
        console.log(`${this.name} attacks for ${this.damage} damage.`);
    }
}

class FireMonster extends Monster {
    override attack(): void {
        console.log(
            `${this.name} uses Fire Attack! 🔥 It deals ${this.damage} damage and burns the enemy.`
        );
    }
}

class WaterMonster extends Monster {
    override attack(): void {
        console.log(
            `${this.name} uses Water Attack! 💧 It deals ${this.damage} damage and washes over the enemy.`
        );
    }
}

class GrassMonster extends Monster {
    override attack(): void {
        console.log(
            `${this.name} uses Grass Attack! 🌿 It deals ${this.damage} damage and entangles the enemy.`
        );
    }
}

// Battle Arena accepts an array of Monster.
// Polymorphism allows each monster's overridden attack()
// method to run automatically.
function battleArena(monsters: Monster[]): void {
    console.log("===== BATTLE ARENA =====");

    monsters.forEach((monster, index) => {
        console.log(`\nTurn ${index + 1}:`);
        console.log(
            `${monster.name} | Health: ${monster.health} | Damage: ${monster.damage}`
        );
        monster.attack();
    });

    console.log("\n===== BATTLE COMPLETE =====");
}

// Create different monster types.
const monsters: Monster[] = [
    new FireMonster("Blaze", 100, 25),
    new WaterMonster("Aqua", 120, 20),
    new GrassMonster("Leafy", 110, 22)
];

// Start the battle.
battleArena(monsters);
