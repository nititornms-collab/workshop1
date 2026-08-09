const prices = {
  'Latte': 55,
  'Espresso': 50,
  'Americano': 45,
  'Cappuccino': 60
};

const buttons = document.querySelectorAll('.coffee-button');
const tbody = document.querySelector('#itemTable tbody');
const totalSpan = document.getElementById('total');

function updateTotal() {
  let total = 0;
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    total += parseFloat(row.children[3].textContent);
  });
  totalSpan.textContent = total;
}

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const name = this.textContent;
    const price = prices[name] || 50;

    let existingRow = null;
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      if (row.children[0].textContent === name) {
        existingRow = row;
      }
    });

    if (existingRow) {
      let qty = parseInt(existingRow.children[2].textContent) + 1;
      existingRow.children[2].textContent = qty;
      existingRow.children[3].textContent = qty * price;
    } else {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.textContent = name;

      const tdPrice = document.createElement('td');
      tdPrice.textContent = price;

      const tdQty = document.createElement('td');
      tdQty.textContent = 1;

      const tdSubtotal = document.createElement('td');
      tdSubtotal.textContent = price;

      const tdAction = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'ลบ';
      deleteBtn.addEventListener('click', function () {
        tr.remove();
        updateTotal();
      });

      tdAction.appendChild(deleteBtn);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdQty);
      tr.appendChild(tdSubtotal);
      tr.appendChild(tdAction);

      tbody.appendChild(tr);
    }

    updateTotal();
  });
});