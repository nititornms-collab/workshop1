import Database from "better-sqlite3";

/** Base class shared by the application's data-access objects. */
export abstract class BaseDAO {
  protected readonly db: Database.Database;

  protected constructor(db: Database.Database) {
    this.db = db;
    this.initTable();
  }

  protected abstract initTable(): void;
}
