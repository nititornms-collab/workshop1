interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const myInventory: Product[] = [
    { id: 1, name: "Laptop", price: 29999, quantity: 10 },
    { id: 2, name: "Mouse", price: 590, quantity: 5 },
    { id: 3, name: "Keyboard", price: 1290, quantity: 2 }
];

function updateStock(productId: number, amountSold: number): void {
    const product = myInventory.find(p => p.id === productId);

    if (product) {
        if (amountSold > product.quantity) {
            console.log("Not enough stock");
        } else {
            product.quantity -= amountSold;
        }
    }
}

updateStock(2, 3);
updateStock(3, 5);
console.log(myInventory);