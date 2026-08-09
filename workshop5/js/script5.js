const input = document.getElementById('pname');
const button = document.querySelector('button');
const productList = document.getElementById('productList');

button.addEventListener('click', function () {
  const text = input.value.trim();

  if (text !== '') {
    const li = document.createElement('li');
    li.textContent = text;
    productList.appendChild(li);
    input.value = '';
  }
});