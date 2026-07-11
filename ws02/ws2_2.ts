const score: number = 85; 
let grade: string = "";

console.log(`--- Grading Result ---`);

if (score < 0 || score > 100) {
    console.log(`Error Case: Error: The score must be between 0 and 100.`);
} else {
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

    console.log(`Success Case: Score: ${score} | Grade: ${grade}`);
}

console.log(`----------------------`);