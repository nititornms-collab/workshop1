import Database from "better-sqlite3";

/**
 * Shared DAO foundation. All DAOs in this application receive the same
 * SQLite connection so order creation and stock updates can be transactional.
 */
export abstract class BaseDAO {
  protected readonly db: Database.Database;

  protected constructor(db: Database.Database) {
    this.db = db;
    this.initTable();
  }

  protected abstract initTable(): void;
}
