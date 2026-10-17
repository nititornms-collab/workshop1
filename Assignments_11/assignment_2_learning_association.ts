// Assignment 2: Learning System with Association
// Teacher, Student, and Course are independent objects.
// Teacher teaches Course and evaluates Student in a Course.

class Course {
    constructor(
        public code: string,
        public name: string,
        public credit: number
    ) {}
}

class Student {
    constructor(
        public studentId: string,
        public name: string
    ) {}
}

class Teacher {
    constructor(
        public teacherId: string,
        public name: string
    ) {}

    teach(course: Course): void {
        console.log(`Teacher: ${this.name}`);
        console.log(`Teaching Course: ${course.code} - ${course.name}`);
    }

    evaluate(student: Student, course: Course, score: number): void {
        const grade = this.calculateGrade(score);

        console.log(`Teacher: ${this.name}`);
        console.log(`Student: ${student.studentId} ${student.name}`);
        console.log(`Course: ${course.code} - ${course.name}`);
        console.log(`Score: ${score}`);
        console.log(`Grade: ${grade}`);
    }

    private calculateGrade(score: number): string {
        if (score >= 80 && score <= 100) {
            return "A";
        } else if (score >= 70) {
            return "B";
        } else if (score >= 60) {
            return "C";
        } else if (score >= 50) {
            return "D";
        } else {
            return "F";
        }
    }
}

// Create independent objects.
const teacher = new Teacher("T001", "Dr. Smith");
const student = new Student("651001", "Alice");
const course = new Course(
    "CS101",
    "Introduction to Computer Science",
    3
);

// Association: the objects interact, but none owns the others.
teacher.teach(course);
teacher.evaluate(student, course, 85);
