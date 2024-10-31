
 function showForm() {
     var form = document.getElementById("productForm");
     form.style.display = "block";
     resetForm();
  }

 function closeForm() {
     var form = document.getElementById("productForm");
     form.style.display = "none";
     resetForm(); 
}

function resetForm() {
     document.getElementById('addProductForm').reset();
     var imagePreview = document.getElementById('imagePreview');
     imagePreview.style.display = 'none';
     imagePreview.src = ''; 
}

function saveProductToLocalStorage(products) {
  localStorage.setItem('productsList', JSON.stringify(products));
}

// Hàm load sản phẩm từ localStorage khi trang được tải
function loadProductsFromLocalStorage() {
  let products = localStorage.getItem('productsList');
  if (products) {
      products = JSON.parse(products);
      products.forEach(function(product) {
          displayProduct(product);
      });
  }
}

 function displayProduct(product) {
  var productItem = document.createElement('div');
  productItem.className = 'product-item';
  productItem.dataset.name = product.name; 
  var productContent = `
      <div class="product-info">
  `;
  if (product.image && product.image !== 'http://127.0.0.1:5500/src/') {
    productContent += `
          <div class="product-image">
              <img class="thumbnail" src="${product.image}" alt="Product Image">
          </div>
    `;
  }

  productContent += `<div class="product-text">
          <h3>${product.name}</h3>
          <p><strong>Mô tả:</strong> ${product.description}</p>
          <p><strong>Giá:</strong> $${product.price}</p>
          <p><strong>Số lượng:</strong> ${product.quantity}</p>
      </div>
  `;
  productItem.innerHTML = productContent + `
      <button class="delete-btn" onclick="deleteProduct('${product.name}')">Xoá </button>
  `;
  document.getElementById('productList').appendChild(productItem);
  
   }

// Xử lý sự kiện submit form
document.getElementById('addProductForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  var productName = document.getElementById('productName').value;
  var productDescription = document.getElementById('productDescription').value;
  var productPrice = document.getElementById('productPrice').value;
  var productQuantity = document.getElementById('productQuantity').value;
  var productImage = document.getElementById('imagePreview').src;
  var product = {
      name: productName,
      description: productDescription,
      price: productPrice,
      quantity: productQuantity,
      image: productImage
  };

  let products = JSON.parse(localStorage.getItem('productsList')) || [];
  products.push(product);
  saveProductToLocalStorage(products);
  displayProduct(product);
  closeForm();
});

function deleteProduct(productName) {
  let products = JSON.parse(localStorage.getItem('productsList')) || [];
  products = products.filter(product => product.name !== productName);
  saveProductToLocalStorage(products);
  const productList = document.getElementById('productList');
  const productItems = productList.getElementsByClassName('product-item');
  for (let i = 0; i < productItems.length; i++) {
      if (productItems[i].dataset.name === productName) {
          productList.removeChild(productItems[i]);
          break;
      }
  }
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function() {
      var imagePreview = document.getElementById('imagePreview');
      imagePreview.src = reader.result;
      imagePreview.style.display = 'block';
  }
  reader.readAsDataURL(event.target.files[0]);
}

function searchProducts() {
  var input = document.getElementById('searchInput');
  var filter = input.value.toLowerCase();
  var productItems = document.querySelectorAll('.product-item');

  productItems.forEach(function(item) {
      var name = item.querySelector('h3').textContent.toLowerCase();
      if (name.indexOf(filter) > -1) {
          item.style.display = '';
      } else {
          item.style.display = 'none';
      }
  });
}


window.onload = loadProductsFromLocalStorage;