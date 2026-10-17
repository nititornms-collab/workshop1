export class Product {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly price: number,
    private readonly stock: number
  ) {
    if (!name.trim()) throw new Error("Product name must not be empty.");
    if (!Number.isFinite(price) || price < 0) throw new Error("Price must be a non-negative number.");
    if (!Number.isInteger(stock) || stock < 0) throw new Error("Stock must be a non-negative integer.");
  }

  public getId(): number { return this.id; }
  public getName(): string { return this.name; }
  public getPrice(): number { return this.price; }
  public getStock(): number { return this.stock; }

  public getDetails(): string {
    return `Product ${this.getName()} | Price: $${this.getPrice().toFixed(2)} | Stock: ${this.getStock()}`;
  }
}
