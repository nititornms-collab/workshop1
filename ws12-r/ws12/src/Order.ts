export class Order {
  constructor(
    private readonly id: number,
    private readonly productName: string,
    private readonly quantity: number,
    private readonly totalPrice: number
  ) {}

  public getId(): number { return this.id; }
  public getProductName(): string { return this.productName; }
  public getQuantity(): number { return this.quantity; }
  public getTotalPrice(): number { return this.totalPrice; }

  public getDetails(): string {
    return `Order #${this.id}: ${this.quantity} x ${this.productName} = $${this.totalPrice.toFixed(2)}`;
  }
}
