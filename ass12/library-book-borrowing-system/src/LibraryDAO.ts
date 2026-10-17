import type Database from "better-sqlite3";
import { BaseDAO } from "./BaseDAO.js";
import { Book, type BookFormat } from "./Book.js";
import type { Member } from "./Member.js";

interface BookRow {
  isbn: string;
  title: string;
  author: string;
  format: BookFormat;
}
interface MemberRow {
  member_id: string;
  name: string;
  email: string;
}
interface BorrowingRow {
  isbn: string;
  member_id: string;
  borrowed_at: string;
}

/** DAO for books, members, and active borrowing records. */
export class LibraryDAO extends BaseDAO {
  public constructor(db: Database.Database) {
    super(db);
  }

  protected initTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        isbn TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        format TEXT NOT NULL CHECK (format IN ('PrintedBook', 'EBook'))
      );
      CREATE TABLE IF NOT EXISTS members (
        member_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS borrowings (
        isbn TEXT PRIMARY KEY REFERENCES books(isbn),
        member_id TEXT NOT NULL REFERENCES members(member_id),
        borrowed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public addBook(book: Book): void {
    this.db.prepare(
      "INSERT INTO books (isbn, title, author, format) VALUES (?, ?, ?, ?)"
    ).run(book.getISBN(), book.getTitle(), book.getAuthor(), book.getFormat());
  }

  public registerMember(member: Member): void {
    if (!member.memberId.trim() || !member.name.trim() || !member.email.trim()) {
      throw new Error("Member ID, name, and email are required.");
    }
    this.db.prepare(
      "INSERT INTO members (member_id, name, email) VALUES (?, ?, ?)"
    ).run(member.memberId, member.name, member.email);
  }

  public getAllBooks(): Book[] {
    const rows = this.db.prepare(
      "SELECT isbn, title, author, format FROM books ORDER BY title"
    ).all() as BookRow[];
    return rows.map(r => new Book(r.isbn, r.title, r.author, r.format));
  }

  public getAllMembers(): Member[] {
    return (this.db.prepare(
      "SELECT member_id, name, email FROM members ORDER BY name"
    ).all() as MemberRow[]).map(r => ({
      memberId: r.member_id, name: r.name, email: r.email
    }));
  }

  public borrowBook(isbn: string, memberId: string): void {
    const book = this.db.prepare("SELECT isbn FROM books WHERE isbn = ?").get(isbn);
    if (!book) throw new Error(`Book ${isbn} was not found.`);
    const member = this.db.prepare("SELECT member_id FROM members WHERE member_id = ?").get(memberId);
    if (!member) throw new Error(`Member ${memberId} was not found.`);

    try {
      this.db.prepare(
        "INSERT INTO borrowings (isbn, member_id) VALUES (?, ?)"
      ).run(isbn, memberId);
    } catch (error) {
      if (error instanceof Error && error.message.includes("UNIQUE")) {
        throw new Error("This book is already borrowed.");
      }
      throw error;
    }
  }

  public returnBook(isbn: string, memberId: string): void {
    const result = this.db.prepare(
      "DELETE FROM borrowings WHERE isbn = ? AND member_id = ?"
    ).run(isbn, memberId);
    if (result.changes === 0) {
      throw new Error("No active borrowing found for this book and member.");
    }
  }

  public getBorrowingRecords(): BorrowingRow[] {
    return this.db.prepare(`
      SELECT isbn, member_id, borrowed_at FROM borrowings ORDER BY borrowed_at
    `).all() as BorrowingRow[];
  }
}
