# WS12 — Inventory & Order System

โปรเจกต์ Workshop Chapter 14: Database Integration with OOP, TypeScript, `better-sqlite3` และ DAO Pattern

## โครงสร้างไฟล์
- `src/BaseDAO.ts` — abstract base สำหรับ DAO ทุกตัว
- `src/Product.ts` — model สินค้า
- `src/ProductDAO.ts` — สร้างตารางและจัดการข้อมูลสินค้า
- `src/Order.ts` — model คำสั่งซื้อ
- `src/OrderDAO.ts` — สร้างคำสั่งซื้อและตัดสต็อกแบบ transaction
- `src/main.ts` — สคริปต์ทดลองการทำงาน
- `inventory.db` — สร้างอัตโนมัติเมื่อรันโปรแกรม

## วิธีติดตั้งและรัน
ต้องติดตั้ง Node.js รุ่น LTS ก่อน แล้วรันคำสั่งในโฟลเดอร์โปรเจกต์:

```bash
npm install
npm run build
npm start
```

หรือใช้โหมดพัฒนา:
```bash
npm run dev
```

## ผลลัพธ์ที่คาดหวัง
```text
=== Adding Initial Inventory ===
Added Product: Keyboard (Price: $1500, Stock: 10)

=== Processing Order ===
Ordering 3 units of Keyboard...
3 x Keyboard = $4500

=== Updated Product Status ===
Product Keyboard | Remaining Stock: 7
```

## จุดสำคัญ
- ใช้ parameterized SQL (`?`) เพื่อหลีกเลี่ยง SQL injection
- แยก Model ออกจาก Data Access Object (DAO)
- `OrderDAO.createOrder()` ทำการบันทึกคำสั่งซื้อและลด stock ใน SQLite transaction เดียวกัน
- ตรวจสอบจำนวนที่สั่งซื้อและ stock คงเหลือก่อนบันทึก
