# Workshop 1: Coffee Shop Design

ไฟล์สำหรับส่งงานประกอบด้วย
- `Workshop1_Coffee_Shop_Design.pdf` — สรุปคลาส คุณสมบัติ เมธอด ความสัมพันธ์ multiplicity และ inheritance
- `class_diagram.svg` — UML Class Diagram (เปิดได้ด้วยเว็บเบราว์เซอร์)
- `class_diagram.png` — ภาพแผนภาพ (ถ้าระบบสร้างไฟล์ PNG ได้)
- `CoffeeShop.java` — ตัวอย่างโค้ด Java ตามการออกแบบคลาส

## สรุปแบบจำลอง
- Customer สร้าง Order ได้หลายรายการ
- Order ประกอบด้วย OrderItem อย่างน้อยหนึ่งรายการ
- OrderItem อ้างถึง Drink หนึ่งชนิดและระบุ quantity
- Payment เป็น abstract class และ CashPayment / QRPayment สืบทอดจาก Payment

หมายเหตุ: โค้ดนี้เป็นตัวอย่างเพื่ออธิบายการออกแบบ OOP ไม่ใช่แอปพลิเคชันที่มีฐานข้อมูลหรือระบบรับเงินจริง
