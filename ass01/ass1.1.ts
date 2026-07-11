const productName: string = "Keyboard Mechanical";
const pricePerUnit: number = 1200;
const quantity: number = 1;
const isMember: boolean = false;

const totalPrice: number = pricePerUnit * quantity;

const hasDiscount: boolean = totalPrice > 1000 || isMember;

const discountAmount: number = hasDiscount ? totalPrice * 0.10 : 0;
const netPrice: number = totalPrice - discountAmount;

console.log(`========================================`);
console.log(`       รายงานสรุปการสั่งซื้อสินค้า         `);
console.log(`========================================`);
console.log(`ชื่อสินค้า: ${productName} (จำนวน ${quantity} ชิ้น)`);
console.log(`ราคารวมทั้งหมด: ${totalPrice.toFixed(2)} บาท`);
console.log(`ได้รับส่วนลดพิเศษ: ${hasDiscount}`);
console.log(`ราคาที่ต้องจ่ายจริง: ${netPrice.toFixed(2)} บาท`);
console.log(`========================================`);