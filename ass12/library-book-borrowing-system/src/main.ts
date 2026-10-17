import Database from "better-sqlite3";
import { Book } from "./Book.js";
import { LibraryDAO } from "./LibraryDAO.js";

const db = new Database("library.db");
db.pragma("foreign_keys = ON");

try {
  const library = new LibraryDAO(db);

  // Seed demo records only when the database is empty.
  if (library.getAllBooks().length === 0) {
    library.addBook(new Book("978-0135957059", "The Pragmatic Programmer", "David Thomas and Andrew Hunt", "PrintedBook"));
    library.addBook(new Book("978-1492056355", "Programming TypeScript", "Boris Cherny", "EBook"));
  }
  if (library.getAllMembers().length === 0) {
    library.registerMember({ memberId: "M001", name: "Alice", email: "alice@example.com" });
    library.registerMember({ memberId: "M002", name: "Bob", email: "bob@example.com" });
  }

  const books = library.getAllBooks();
  const members = library.getAllMembers();

  console.log("=== Library Book Borrowing System ===");
  console.log("\nBooks:");
  books.forEach(book => console.log(`- ${book.getDetails()}`));
  console.log("\nMembers:");
  members.forEach(member => console.log(`- ${member.memberId}: ${member.name} (${member.email})`));

  const targetBook = books[0];
  const targetMember = members[0];
  if (targetBook && targetMember && library.getBorrowingRecords().length === 0) {
    console.log("\nBorrowing:");
    library.borrowBook(targetBook.getISBN(), targetMember.memberId);
    console.log(`${targetMember.name} borrowed "${targetBook.getTitle()}".`);
    console.log("\nActive borrowing records:");
    library.getBorrowingRecords().forEach(record =>
      console.log(`- ISBN ${record.isbn} borrowed by ${record.member_id} at ${record.borrowed_at}`)
    );
    console.log("\nReturning:");
    library.returnBook(targetBook.getISBN(), targetMember.memberId);
    console.log(`"${targetBook.getTitle()}" returned successfully.`);
  } else {
    console.log("\nNo demo borrowing action performed (an active borrowing already exists).");
  }
} catch (error) {
  console.error("Error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  db.close();
}
