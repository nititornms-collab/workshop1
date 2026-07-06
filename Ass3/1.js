let scores = [78, 92, 45, 67, 88, 54, 39, 81, 95, 72];

let total = 0;
let pass = 0;
let fail = 0;

console.log("คะแนนทั้งหมด");

for (let i = 0; i < scores.length; i++) {
    console.log("นักศึกษาคนที่ " + (i + 1) + " : " + scores[i]);

    total += scores[i];

    if (scores[i] >= 50) {
        pass++;
    } else {
        fail++;
    }
}

let average = total / scores.length;

console.log("--------------------");
console.log("คะแนนรวม : " + total);
console.log("คะแนนเฉลี่ย : " + average.toFixed(2));
console.log("สอบผ่าน : " + pass + " คน");
console.log("สอบไม่ผ่าน : " + fail + " คน");