// Workshop 10.4+: Doctor-Patient Extension
// Diagnose, prescribe medicine, and calculate treatment cost.

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
        console.log(`Doctor: ${this.name}`);
        console.log(`Specialty: ${this.specialty}`);
    }

    examine(patient: Patient): void {
        this.showInfo();
        console.log(`Patient: ${patient.name}`);
        console.log(`${this.name} is examining ${patient.name}.`);
    }

    diagnose(patient: Patient, dis: string): void {
        console.log(
            `Doctor: ${this.name} has diagnosed ${patient.showInfo ? "" : ""}Patient ID: ${patient.patientId}, Name: ${patient.name}, Age: ${patient.age} with ${dis}.`
        );
    }

    prescribeMedicine(patient: Patient, med: string): void {
        console.log(
            `Doctor: ${this.name} has prescribed ${med} to Patient ID: ${patient.patientId}, Name: ${patient.name}, Age: ${patient.age}.`
        );
    }

    calculateTreatmentCost(
        patient: Patient,
        fee: number,
        medFee: number
    ): void {
        const total = fee + medFee;

        console.log(
            `Doctor: ${this.name} has calculated the treatment cost for Patient ID: ${patient.patientId}, Name: ${patient.name}, Age: ${patient.age}.`
        );
        console.log(`Treatment fee: ${fee}`);
        console.log(`Medicine fee: ${medFee}`);
        console.log(`Total cost: ${total}`);
    }
}

const doctor1 = new Doctor(1, "Dr. John", "Cardiology");
const doctor2 = new Doctor(2, "Dr. Smith", "Neurology");

const patient1 = new Patient(101, "Alice", 30);
const patient2 = new Patient(102, "Bob", 25);

doctor1.diagnose(patient1, "heart disease");
doctor2.diagnose(patient2, "migraine");

console.log("-------------------------");

doctor1.prescribeMedicine(patient1, "blood pressure medicine");
doctor2.prescribeMedicine(patient2, "pain reliever");

console.log("-------------------------");

doctor1.calculateTreatmentCost(patient1, 1000, 500);
doctor2.calculateTreatmentCost(patient2, 300, 150);
