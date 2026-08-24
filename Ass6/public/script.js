async function loadBooks() {
  const table = document.getElementById("bookTable");
  const count = document.getElementById("bookCount");

  table.innerHTML = "<tr><td colspan='6'>กำลังโหลดข้อมูล...</td></tr>";

  try {
    const response = await fetch("/api/books");
    const books = await response.json();

    count.textContent = `${books.length} เล่ม`;

    table.innerHTML = books.map(book => `
      <tr>
        <td>${escapeHtml(book.isbn)}</td>
        <td>${escapeHtml(book.title)}</td>
        <td>${escapeHtml(book.author)}</td>
        <td>${escapeHtml(book.year)}</td>
        <td>${escapeHtml(book.publisher)}</td>
        <td>
          <span class="status ${book.status}">
            ${book.status === "available" ? "ว่าง" : "ถูกยืม"}
          </span>
        </td>
      </tr>
    `).join("");
  } catch (error) {
    table.innerHTML = "<tr><td colspan='6'>ไม่สามารถเชื่อมต่อ API ได้</td></tr>";
  }
}

async function searchBook() {
  const isbn = document.getElementById("searchIsbn").value.trim();
  const result = document.getElementById("searchResult");

  if (!isbn) {
    result.innerHTML = "<p class='error'>กรุณากรอก ISBN</p>";
    return;
  }

  try {
    const response = await fetch(`/api/book/${encodeURIComponent(isbn)}`);
    const data = await response.json();

    if (!response.ok) {
      result.innerHTML = `<p class="error">${data.message}</p>`;
      return;
    }

    result.innerHTML = `
      <div class="result">
        <strong>${escapeHtml(data.title)}</strong><br>
        ISBN: ${escapeHtml(data.isbn)}<br>
        ผู้แต่ง: ${escapeHtml(data.author)}<br>
        ปี: ${escapeHtml(data.year)}<br>
        สำนักพิมพ์: ${escapeHtml(data.publisher)}<br>
        สถานะ: ${data.status === "available" ? "ว่าง" : "ถูกยืม"}
      </div>
    `;
  } catch (error) {
    result.innerHTML = "<p class='error'>เกิดข้อผิดพลาดในการค้นหา</p>";
  }
}

document.getElementById("bookForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const message = document.getElementById("formMessage");

  try {
    const response = await fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      message.className = "error";
      message.textContent = result.message;
      return;
    }

    message.className = "success";
    message.textContent = "เพิ่มหนังสือสำเร็จ";
    form.reset();
    loadBooks();
  } catch (error) {
    message.className = "error";
    message.textContent = "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadBooks();
