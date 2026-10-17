import Database from "better-sqlite3";
import { ProductDAO } from "./ProductDAO.js";
import { OrderDAO } from "./OrderDAO.js";

const db = new Database("inventory.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

try {
  const productDAO = new ProductDAO(db);
  const orderDAO = new OrderDAO(db, productDAO);

  // Make the demo repeatable: clear prior demo data, then recreate it.
  // The tables themselves remain persistent in SQLite.
  db.exec("DELETE FROM orders");
  db.exec("DELETE FROM products");
  db.exec("DELETE FROM sqlite_sequence WHERE name IN ('orders', 'products')");

  console.log("=== Adding Initial Inventory ===");
  const keyboard = productDAO.addProduct("Keyboard", 1500, 10);
  console.log(`Added Product: ${keyboard.getName()} (Price: $${keyboard.getPrice().toFixed(0)}, Stock: ${keyboard.getStock()})`);

  console.log("\n=== Processing Order ===");
  console.log(`Ordering 3 units of ${keyboard.getName()}...`);
  const order = orderDAO.createOrder(keyboard, 3);
  console.log(`${order.getQuantity()} x ${order.getProductName()} = $${order.getTotalPrice().toFixed(0)}`);

  console.log("\n=== Updated Product Status ===");
  const updated = productDAO.findProductById(keyboard.getId());
  if (updated) {
    console.log(`Product ${updated.getName()} | Remaining Stock: ${updated.getStock()}`);
  }

  console.log("\n=== Saved Orders ===");
  orderDAO.getAllOrders().forEach((savedOrder) => console.log(savedOrder.getDetails()));
} catch (error) {
  console.error("Application error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  db.close();
}
