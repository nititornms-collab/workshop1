# Library Book Borrowing System

ตัวอย่างโปรเจกต์ Workshop Chapter 14 ตามสไลด์ Library Book Borrowing System

## ความสามารถ
- เก็บหนังสือหลายเล่ม โดยแต่ละเล่มมี Title, Author, ISBN และรูปแบบ PrintedBook/EBook
- เก็บสมาชิกหลายคน
- ยืมหนังสือและคืนหนังสือ
- ใช้ SQLite ผ่าน `better-sqlite3`
- ใช้ DAO แยกการเข้าถึงฐานข้อมูล และใช้ parameterized SQL

## ติดตั้งและรัน
ต้องมี Node.js LTS ติดตั้งไว้ก่อน

```bash
npm install
npm run build
npm start
```

โหมดพัฒนา:
```bash
npm run dev
```

ฐานข้อมูล `library.db` จะถูกสร้างอัตโนมัติเมื่อรันครั้งแรก

## UML
ไฟล์ `docs/library-uml.puml` เป็น UML class diagram เปิดได้ด้วย PlantUML extension หรือ PlantUML viewer.
