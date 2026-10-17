// Workshop 10.1: Car Composition
// Car has an Engine and a Battery.

class Engine {
    constructor(public type: string) {}

    start(): void {
        console.log(`Engine ${this.type} started.`);
    }

    stop(): void {
        console.log(`Engine ${this.type} stopped.`);
    }
}

class Battery {
    constructor(public capacity: number) {}

    charge(amount: number): void {
        this.capacity += amount;
        console.log(`Battery ${amount} mAh charging.`);
        console.log(`Battery ${this.capacity} mAh fully charged.`);
    }

    showStatus(): void {
        console.log(`Battery status: Capacity is ${this.capacity} mAh.`);
    }
}

class Car {
    private engine: Engine;
    private battery: Battery;

    constructor(engineType: string, batteryCapacity: number) {
        this.engine = new Engine(engineType);
        this.battery = new Battery(batteryCapacity);
    }

    startCar(): void {
        this.engine.start();
    }

    stopCar(): void {
        this.engine.stop();
    }

    showCarInfo(): void {
        console.log("-------------------------");
        console.log(`Car information: Engine type: ${this.engine.type}`);
        this.battery.showStatus();
        console.log("-------------------------");
    }

    chargeBattery(amount: number): void {
        this.battery.charge(amount);
    }
}

const car1 = new Car("V6", 20);
const car2 = new Car("V8", 50);

car1.startCar();
car1.showCarInfo();
car1.chargeBattery(80);
car1.stopCar();

console.log("\nSecond car:");
car2.startCar();
car2.showCarInfo();
car2.stopCar();
