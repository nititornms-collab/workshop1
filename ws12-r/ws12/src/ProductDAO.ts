import type Database from "better-sqlite3";
import { BaseDAO } from "./BaseDAO.js";
import { Product } from "./Product.js";

interface ProductRow {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export class ProductDAO extends BaseDAO {
  public constructor(db: Database.Database) {
    super(db);
  }

  protected initTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL CHECK (price >= 0),
        stock INTEGER NOT NULL CHECK (stock >= 0)
      )
    `);
  }

  public addProduct(name: string, price: number, stock: number): Product {
    if (!name.trim()) throw new Error("Product name must not be empty.");
    if (!Number.isFinite(price) || price < 0) throw new Error("Price must be non-negative.");
    if (!Number.isInteger(stock) || stock < 0) throw new Error("Stock must be a non-negative integer.");

    const result = this.db.prepare(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)"
    ).run(name, price, stock);

    return this.findProductById(Number(result.lastInsertRowid))!;
  }

  public findProductById(id: number): Product | undefined {
    const row = this.db.prepare(
      "SELECT id, name, price, stock FROM products WHERE id = ?"
    ).get(id) as ProductRow | undefined;
    return row ? new Product(row.id, row.name, row.price, row.stock) : undefined;
  }

  public getAllProducts(): Product[] {
    const rows = this.db.prepare(
      "SELECT id, name, price, stock FROM products ORDER BY id"
    ).all() as ProductRow[];
    return rows.map((row) => new Product(row.id, row.name, row.price, row.stock));
  }

  public updateStock(id: number, newStock: number): void {
    if (!Number.isInteger(newStock) || newStock < 0) {
      throw new Error("Stock must be a non-negative integer.");
    }
    const result = this.db.prepare(
      "UPDATE products SET stock = ? WHERE id = ?"
    ).run(newStock, id);
    if (result.changes === 0) throw new Error(`Product ID ${id} was not found.`);
  }
}
