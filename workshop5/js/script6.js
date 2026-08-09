const input = document.getElementById('task');
const button = document.querySelector('button');
const tbody = document.querySelector('#alltask tbody');

button.addEventListener('click', function () {
  const text = input.value.trim();

  if (text !== '') {
    const tr = document.createElement('tr');

    const tdTask = document.createElement('td');
    tdTask.textContent = text;

    const tdAction = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'ลบ';
    deleteBtn.addEventListener('click', function () {
      tr.remove();
    });

    tdAction.appendChild(deleteBtn);
    tr.appendChild(tdTask);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
    input.value = '';
  }
});