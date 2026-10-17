# Plant Care Scheduling System (MongoDB)

เว็บแอปสำหรับจัดการต้นไม้ในห้องเรียนและสำนักงาน พัฒนาด้วย HTML5, CSS3, JavaScript/DOM, Node.js, Express.js และ **MongoDB** โดยใช้ Mongoose เป็น ODM และ MongoDB เก็บทั้งข้อมูลระบบและ session

## Features
- Dashboard: จำนวนต้นไม้ จำนวนรายการดูแล และต้นไม้ที่ถึงรอบรดน้ำ
- เพิ่ม แก้ไข ลบ และค้นหาต้นไม้
- บันทึกประวัติการรดน้ำ ใส่ปุ๋ย ตัดแต่ง และเปลี่ยนดิน
- กำหนดวันรดน้ำครั้งถัดไป
- สมัครสมาชิก เข้าสู่ระบบ ออกจากระบบ และใช้ session cookie
- REST API ด้วย GET, POST, PUT, DELETE
- Responsive UI

## Requirements
- Node.js 18+
- MongoDB Community Server ที่เปิดทำงานอยู่ หรือ MongoDB Atlas connection string

## Installation / Run
1. แตกไฟล์ ZIP และเปิด Terminal ในโฟลเดอร์โปรเจกต์
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```
3. คัดลอก `.env.example` เป็น `.env` แล้วตั้งค่า `MONGODB_URI` และ `SESSION_SECRET`
   - Windows CMD: `copy .env.example .env`
   - PowerShell: `Copy-Item .env.example .env`
   - MongoDB local ค่าเริ่มต้น: `mongodb://127.0.0.1:27017/plant_care_db`
   - MongoDB Atlas: ใส่ connection string จาก Atlas ใน `MONGODB_URI`
4. ตรวจสอบว่า MongoDB ทำงานอยู่ จากนั้นรัน:
   ```bash
   npm start
   ```
5. เปิด http://localhost:3000

## Main API
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/stats` | Dashboard counts |
| GET | `/api/plants?search=...` | List/search plants |
| POST | `/api/plants` | Create plant |
| PUT | `/api/plants/:id` | Update plant |
| DELETE | `/api/plants/:id` | Delete plant and its care logs |
| GET | `/api/logs` | Care history |
| POST | `/api/logs` | Add care record |
| POST | `/api/auth/register` | Register account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current session |
| GET | `/health` | Server/database status |

## MongoDB collections
- `plants`: plant details, room/location, water/sunlight needs, next watering date
- `carelogs`: care activity history and notes
- `users`: account profile and bcrypt password hash
- `sessions`: Express session data (managed by connect-mongo)

## Notes
- The project does not use MySQL or SQLite. Data persistence is MongoDB through Mongoose.
- Authentication is included for course demonstration. For a production deployment, add CSRF protection, rate limiting, stricter authorization and secure cookie settings behind HTTPS.
