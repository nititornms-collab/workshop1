const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "books.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function readBooks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeBooks(books) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf8");
}

// GET /api/books - ดึงข้อมูลหนังสือทั้งหมด
app.get("/api/books", (req, res) => {
  try {
    const books = readBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "ไม่สามารถอ่านข้อมูลหนังสือได้"
    });
  }
});

// GET /api/book/:isbn - ค้นหาหนังสือจาก ISBN
app.get("/api/book/:isbn", (req, res) => {
  try {
    const books = readBooks();
    const book = books.find(item => item.isbn === req.params.isbn);

    if (!book) {
      return res.status(404).json({
        status: false,
        message: "Book not found"
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดของเซิร์ฟเวอร์"
    });
  }
});

// POST /api/book - เพิ่มหนังสือใหม่
app.post("/api/book", (req, res) => {
  try {
    const { isbn, title, author, year, publisher } = req.body;

    if (!isbn || !title || !author || !year || !publisher) {
      return res.status(400).json({
        status: false,
        message: "กรุณากรอกข้อมูลให้ครบทุกช่อง"
      });
    }

    const books = readBooks();

    if (books.some(book => book.isbn === isbn)) {
      return res.status(409).json({
        status: false,
        message: "ISBN นี้มีอยู่แล้ว"
      });
    }

    const newBook = {
      isbn,
      title,
      author,
      year: Number(year),
      publisher,
      status: "available"
    };

    books.push(newBook);
    writeBooks(books);

    res.status(201).json({
      status: true,
      message: "เพิ่มหนังสือสำเร็จ",
      book: newBook
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "ไม่สามารถบันทึกข้อมูลได้"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Library System running at http://localhost:${PORT}`);
});
