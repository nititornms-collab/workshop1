/**
 * Library Management System
 * Implementation intentionally uses exactly two classes: Book and Library.
 * Member and Loan are interfaces.
 */

export type BookFormat = "PrintedBook" | "EBook";

export interface Member {
  memberId: string;
  name: string;
  email: string;
}

export interface Loan {
  isbn: string;
  memberId: string;
  borrowedAt: Date;
}

export class Book {
  public readonly isbn: string;
  public title: string;
  public author: string;
  public readonly format: BookFormat;

  constructor(isbn: string, title: string, author: string, format: BookFormat) {
    if (!isbn.trim()) throw new Error("ISBN must not be empty.");
    if (!title.trim()) throw new Error("Title must not be empty.");
    if (!author.trim()) throw new Error("Author must not be empty.");

    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.format = format;
  }

  public getDetails(): string {
    return `${this.title} by ${this.author} (ISBN: ${this.isbn}, Format: ${this.format})`;
  }
}

export class Library {
  private readonly books: Map<string, Book> = new Map();
  private readonly members: Map<string, Member> = new Map();
  private readonly loans: Map<string, Loan> = new Map();

  public constructor(public name: string) {
    if (!name.trim()) throw new Error("Library name must not be empty.");
  }

  public addBook(book: Book): void {
    if (this.books.has(book.isbn)) {
      throw new Error(`A book with ISBN ${book.isbn} already exists.`);
    }
    this.books.set(book.isbn, book);
  }

  public registerMember(member: Member): void {
    if (!member.memberId.trim()) throw new Error("Member ID must not be empty.");
    if (!member.name.trim()) throw new Error("Member name must not be empty.");
    if (this.members.has(member.memberId)) {
      throw new Error(`Member ${member.memberId} is already registered.`);
    }
    this.members.set(member.memberId, member);
  }

  public borrowBook(isbn: string, memberId: string): string {
    const book = this.books.get(isbn);
    if (!book) throw new Error(`Book with ISBN ${isbn} was not found.`);
    if (!this.members.has(memberId)) {
      throw new Error(`Member ${memberId} is not registered.`);
    }
    if (this.loans.has(isbn)) {
      throw new Error(`"${book.title}" is already borrowed.`);
    }

    this.loans.set(isbn, { isbn, memberId, borrowedAt: new Date() });
    return `${book.title} was borrowed successfully by ${this.members.get(memberId)!.name}.`;
  }

  public returnBook(isbn: string, memberId: string): string {
    const loan = this.loans.get(isbn);
    if (!loan) throw new Error(`Book with ISBN ${isbn} is not currently borrowed.`);
    if (loan.memberId !== memberId) {
      throw new Error("Only the member who borrowed this book can return it.");
    }

    this.loans.delete(isbn);
    return `${this.books.get(isbn)!.title} was returned successfully.`;
  }

  public listBooks(): string[] {
    return Array.from(this.books.values()).map((book) => {
      const status = this.loans.has(book.isbn) ? "Borrowed" : "Available";
      return `${book.getDetails()} — ${status}`;
    });
  }

  public listMembers(): Member[] {
    return Array.from(this.members.values());
  }
}

// Demo / console output
if (require.main === module) {
  const library = new Library("Sunset Library");

  const book1 = new Book("978-0135957059", "The Pragmatic Programmer", "David Thomas and Andrew Hunt", "PrintedBook");
  const book2 = new Book("978-1492056355", "Programming TypeScript", "Boris Cherny", "EBook");

  library.addBook(book1);
  library.addBook(book2);

  library.registerMember({
    memberId: "M001",
    name: "Alice",
    email: "alice@example.com"
  });

  console.log(`=== ${library.name} ===`);
  console.log("\nBooks:");
  library.listBooks().forEach((line, index) => console.log(`${index + 1}. ${line}`));

  console.log("\nBorrow / Return:");
  console.log(library.borrowBook(book1.isbn, "M001"));
  console.log(library.returnBook(book1.isbn, "M001"));

  console.log("\nFinal book status:");
  library.listBooks().forEach((line, index) => console.log(`${index + 1}. ${line}`));
}
