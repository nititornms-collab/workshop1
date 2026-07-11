function calculatePrice(price: number, discountPercent: number): number {
    const netPrice: number = price * (1 - discountPercent / 100);
    return netPrice < 0 ? 0 : netPrice;
}

const finalPrice: number = calculatePrice(100, 15);
console.log(finalPrice);