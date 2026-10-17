// Workshop 10.2: Computer Composition
// Computer has a CPU, RAM, and Storage.

class CPU {
    constructor(
        public brand: string,
        public cores: number
    ) {}

    process(): void {
        console.log(`CPU ${this.brand} with ${this.cores} cores is processing.`);
    }

    showInfo(): void {
        console.log(`CPU Info: Brand - ${this.brand}, Cores - ${this.cores}`);
    }
}

class RAM {
    constructor(public capacity: number) {}

    load(): void {
        console.log(`RAM ${this.capacity} GB is loading data.`);
    }

    showInfo(): void {
        console.log(`RAM Info: Capacity - ${this.capacity} GB`);
    }
}

class Storage {
    constructor(
        public capacity: number,
        public type: string
    ) {}

    readData(): void {
        console.log(`Storage ${this.type} with ${this.capacity} GB is reading data.`);
    }

    showInfo(): void {
        console.log(`Storage Info: Type - ${this.type}, Capacity - ${this.capacity} GB`);
    }
}

class Computer {
    private cpu: CPU;
    private ram: RAM;
    private storage: Storage;

    constructor(
        cpu: CPU,
        ram: RAM,
        storage: Storage
    ) {
        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
    }

    boot(): void {
        this.cpu.process();
        this.ram.load();
        this.storage.readData();
        console.log("Computer is ready!");
    }

    showComputerInfo(): void {
        console.log("Computer information:");
        this.cpu.showInfo();
        this.ram.showInfo();
        this.storage.showInfo();
    }
}

const computer = new Computer(
    new CPU("Intel", 8),
    new RAM(16),
    new Storage(512, "SSD")
);

computer.boot();
computer.showComputerInfo();
