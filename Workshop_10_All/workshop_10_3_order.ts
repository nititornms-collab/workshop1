// Workshop 10.3: Order Calculation
// Delegation: Order delegates subtotal calculation to Product.

class Product {
    constructor(
        public name: string,
        public price: number,
        public quantity: number
    ) {}

    getSubtotal(): number {
        return this.price * this.quantity;
    }
}

class Order {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    calculateTotal(): number {
        return this.products.reduce(
            (total, product) => total + product.getSubtotal(),
            0
        );
    }

    calculateDiscount(percent: number): number {
        return this.calculateTotal() * percent / 100;
    }

    calculateNetTotal(percent: number): number {
        const total = this.calculateTotal();
        const discount = total * percent / 100;
        return total - discount;
    }
}

const order = new Order();

order.addProduct(new Product("Notebook", 50, 3));
order.addProduct(new Product("Keyboard", 800, 1));
order.addProduct(new Product("Mouse", 300, 2));

const total = order.calculateTotal();
const discountPercent = 10;
const discount = order.calculateDiscount(discountPercent);
const netTotal = order.calculateNetTotal(discountPercent);

console.log("===== ORDER SUMMARY =====");
console.log(`Total: ${total} Baht`);
console.log(`Discount (${discountPercent}%): ${discount} Baht`);
console.log(`Net Total: ${netTotal} Baht`);
