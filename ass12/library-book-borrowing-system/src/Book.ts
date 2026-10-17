export type BookFormat = "PrintedBook" | "EBook";

export class Book {
  constructor(
    private readonly isbn: string,
    private title: string,
    private author: string,
    private readonly format: BookFormat
  ) {
    if (!isbn.trim()) throw new Error("ISBN must not be empty.");
    if (!title.trim()) throw new Error("Book title must not be empty.");
    if (!author.trim()) throw new Error("Book author must not be empty.");
  }

  public getISBN(): string { return this.isbn; }
  public getTitle(): string { return this.title; }
  public getAuthor(): string { return this.author; }
  public getFormat(): BookFormat { return this.format; }

  public getDetails(): string {
    return `${this.title} by ${this.author} [${this.format}, ISBN: ${this.isbn}]`;
  }
}
