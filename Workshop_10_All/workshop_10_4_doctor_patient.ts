// Workshop 10.4: Doctor-Patient Association
// Doctor and Patient coexist independently.

class Patient {
    constructor(
        public patientId: number,
        public name: string,
        public age: number
    ) {}

    showInfo(): void {
        console.log(
            `Patient ID: ${this.patientId}, Name: ${this.name}, Age: ${this.age}`
        );
    }
}

class Doctor {
    constructor(
        public doctorId: number,
        public name: string,
        public specialty: string
    ) {}

    showInfo(): void {
        console.log(`Doctor: ${this.name} | Specialty: ${this.specialty}`);
    }

    examine(patient: Patient): void {
        this.showInfo();
        console.log("is examining");
        patient.showInfo();
    }
}

const doctor1 = new Doctor(1, "Dr. John", "Cardiology");
const doctor2 = new Doctor(2, "Dr. Smith", "Neurology");

const patient1 = new Patient(101, "Alice", 30);
const patient2 = new Patient(102, "Bob", 25);

doctor1.examine(patient1);
doctor1.examine(patient2);
doctor2.examine(patient1);
