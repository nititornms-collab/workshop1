enum CourseStatus {
    Open = "Open",
    Closed = "Closed",
    Full = "Full"
}

interface Student {
    name: string;
    id: number;
}

interface Course {
    title: string;
    code: string;
    status: CourseStatus;
    list_of_students: Student[]; 
}

const course1: Course = {
    title: "Object-Oriented Programming",
    code: "OOP01",
    status: CourseStatus.Open,
    list_of_students: [] 
};

const student1: Student = { name: "Nititorn", id: 6501001 };

function enroll(student: Student, course: Course): void {
    if (course.status === CourseStatus.Open) {
        course.list_of_students.push(student); 
    }
}

enroll(student1, course1);
console.log(course1);