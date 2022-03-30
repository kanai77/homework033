




const baseURL = 'https://geektech-project.herokuapp.com';

const endpoints = {
 products: `${baseURL}/products/`,
}

// GET request ( Products - all )

const state = {
 products: null
};

function deleteProduct(id){
 fetch(`${endpoints.products}${id}`, {
  method: 'DELETE'
 }).then(() => {
  getAllProducts();
 })
}

function getAllProducts(){
 const products = document.querySelector('.products');
 products.innerHTML = "";

 fetch(endpoints.products, {
  method: 'GET'
 }).then((res) => {
  return res.json();
 }).then((data) => {
  state.products = data;

  for(let i = 0; i < data.length; i++){
   products.innerHTML += `
   <div class="product_block">
    <img src="${baseURL}${data[i].image}" alt=""/>
    <h3>${data[i].title}</h3>
    <p class="description">${data[i].description}</p>
    <p class="price">${data[i].price}</p>
    <button onclick="deleteProduct(${data[i].id})">Delete</button>
   </div>`;
  }

  return data;
 })
}

getAllProducts();

  const submit = document.getElementById('submit');

function addProduct(){
 const obj = {
  title: document.getElementById('name').value,
  description: document.getElementById('description').value,
  price: document.getElementById('price').value,
  stock_price: document.getElementById('stock_price').value,
  category_id: document.getElementById('category_id').value,
  image: null
 }

 fetch(endpoints.products, {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(obj)
 }).then((res) => {
  console.log(res.status, res.statusText);
 })
}

submit.addEventListener('click', addProduct);


