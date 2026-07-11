const bookTitle: string = "TypeScript Ultimate Guide";
const isbn: string = "978-3-16-148410-0";
const price: number = 550;

const bookSummary: [string, number] = [bookTitle, price];

const isAvailable: boolean = true;

const discountPrice: number = bookSummary[1] * (1 - 0.15);

const isPremium: boolean = bookSummary[1] > 500;

const canDisplay: boolean = isPremium && isAvailable;

console.log(`========================================`);
console.log(`         ระบบจัดการข้อมูลหนังสือ          `);
console.log(`========================================`);
console.log(`ชื่อหนังสือ: ${bookSummary[0]}`);
console.log(`รหัส ISBN: ${isbn}`);
console.log(`ราคาปกติ: ${bookSummary[1].toFixed(2)} บาท`);
console.log(`ราคาโปรโมชัน (ลด 15%): ${discountPrice.toFixed(2)} บาท`);
console.log(`ประเภทหนังสือ Premium: ${isPremium}`);
console.log(`สถานะการยืม (พร้อมจำหน่าย/ยืม): ${isAvailable}`);
console.log(`สามารถจัดแสดงที่หน้าตู้โชว์ได้: ${canDisplay ? "ใช่" : "ไม่ใช่"}`);
console.log(`========================================`);