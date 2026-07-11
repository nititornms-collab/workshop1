type Book = [string, boolean];

const library: Book[] = [
    ["The Great Gatsby", true],
    ["To Kill a Mockingbird", false],
    ["1984", true],
    ["Pride and Prejudice", false],
    ["The Catcher in the Rye", false]
];

let totalAvailable: number = 0;
let totalBorrowed: number = 0;

console.log(`========================================`);
console.log(`       ระบบจัดการห้องสมุด (Library)       `);
console.log(`========================================`);

for (const book of library) {
    const title: string = book[0];
    const isBorrowed: boolean = book[1];

    if (isBorrowed) {
        console.log(`${title} - Status: Borrowed`);
        totalBorrowed++;
    } else {
        console.log(`${title} - Status: Available`);
        totalAvailable++; 
    }
}

console.log(`----------------------------------------`);
console.log(`Total Available Books: ${totalAvailable}`);
console.log(`Total Borrowed Books: ${totalBorrowed}`);
console.log(`========================================`);