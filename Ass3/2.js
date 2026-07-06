let sales = [120, 85, 150, 95, 200, 60, 175];

let total = 0;
let highest = sales[0];
let lowest = sales[0];

for (let i = 0; i < sales.length; i++) {

    let status = "";

    if (sales[i] >= 170) {
        status = "Excellent";
    } else if (sales[i] >= 100) {
        status = "Good";
    } else {
        status = "Need Improvement";
    }

    console.log("Day " + (i + 1) + " : " + sales[i] + " cups - " + status);

    total += sales[i];

    if (sales[i] > highest) {
        highest = sales[i];
    }

    if (sales[i] < lowest) {
        lowest = sales[i];
    }
}

let average = total / sales.length;

console.log("-------------------");
console.log("Total Sales : " + total + " cups");
console.log("Average Sales : " + average.toFixed(2) + " cups");
console.log("Highest Sales : " + highest + " cups");
console.log("Lowest Sales : " + lowest + " cups");