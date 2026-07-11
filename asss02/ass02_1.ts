type Student = [string, number];

const students: Student[] = [
    ["Nititorn", 85],
    ["Somchai", 74],
    ["Somsri", 62],
    ["Somasak", 48],
    ["Ananya", 92]
];

console.log(`==================================================`);
console.log(`          รายงานระบบจัดการเกรด (Grade Manager)     `);
console.log(`==================================================`);

for (const student of students) {
    const name: string = student[0];
    const score: number = student[1];
    let grade: string = "";

    if (score >= 80) {
        grade = "A";
    } else if (score >= 70) {
        grade = "B";
    } else if (score >= 60) {
        grade = "C";
    } else if (score >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    console.log(`${name} received ${score} and grade ${grade}`);
}

console.log(`==================================================`);