# Library Management System

ตัวอย่างงาน Final Challenge: Library Management System  
ประกอบด้วย UML Class Diagram และ TypeScript implementation ตามโจทย์ โดยในส่วน implementation มี **2 classes เท่านั้น** คือ `Book` และ `Library` ส่วน `Member` และ `Loan` ใช้เป็น TypeScript interfaces

## Requirements
- Node.js 18+ และ npm
- TypeScript

## Run
```bash
npm install
npm run build
npm start
```

## Design summary
- `Library` aggregates multiple `Book` objects and tracks members/loans.
- `Book` stores title, author, ISBN, and format (`PrintedBook` or `EBook`).
- `Member` and `Loan` are interfaces, not classes, so the implementation contains exactly two classes.
- A member can borrow an available book and return a borrowed book.
- ISBN is used as the book identifier; a book cannot be borrowed by multiple members at once.

## UML
เปิดไฟล์ `docs/library-uml.puml` ด้วย PlantUML หรือ extension ที่รองรับ เพื่อดู class diagram
