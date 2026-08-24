วิธีรัน Assignment 6 - Library System

1. เปิดโฟลเดอร์นี้ด้วย VS Code
2. เปิด Terminal
3. พิมพ์:
   npm install
4. จากนั้นพิมพ์:
   npm start
5. เปิดเว็บ:
   http://localhost:3000

API:
GET  /api/books
GET  /api/book/:isbn
POST /api/book

ตัวอย่าง POST:
{
  "isbn": "123456789",
  "title": "หนังสือใหม่",
  "author": "ผู้แต่ง",
  "year": 2026,
  "publisher": "NPRU"
}
