import type Database from "better-sqlite3";
import { BaseDAO } from "./BaseDAO.js";
import { Product } from "./Product.js";
import { ProductDAO } from "./ProductDAO.js";
import { Order } from "./Order.js";

interface OrderRow {
  id: number;
  product_name: string;
  quantity: number;
  total_price: number;
}

export class OrderDAO extends BaseDAO {
  public constructor(db: Database.Database, private readonly productDAO: ProductDAO) {
    super(db);
  }

  protected initTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        total_price REAL NOT NULL CHECK (total_price >= 0),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  /**
   * Creates the order and decreases stock in one transaction.
   * If either database operation fails, SQLite rolls both back.
   */
  public createOrder(product: Product, quantity: number): Order {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Order quantity must be a positive integer.");
    }

    const create = this.db.transaction(() => {
      const current = this.productDAO.findProductById(product.getId());
      if (!current) throw new Error(`Product ID ${product.getId()} was not found.`);
      if (current.getStock() < quantity) {
        throw new Error(
          `Insufficient stock for ${current.getName()}. Available: ${current.getStock()}, requested: ${quantity}.`
        );
      }

      const totalPrice = current.getPrice() * quantity;
      const insertResult = this.db.prepare(
        "INSERT INTO orders (product_name, quantity, total_price) VALUES (?, ?, ?)"
      ).run(current.getName(), quantity, totalPrice);

      this.productDAO.updateStock(current.getId(), current.getStock() - quantity);
      return new Order(Number(insertResult.lastInsertRowid), current.getName(), quantity, totalPrice);
    });

    return create();
  }

  public getAllOrders(): Order[] {
    const rows = this.db.prepare(
      "SELECT id, product_name, quantity, total_price FROM orders ORDER BY id"
    ).all() as OrderRow[];
    return rows.map((row) => new Order(row.id, row.product_name, row.quantity, row.total_price));
  }
}
