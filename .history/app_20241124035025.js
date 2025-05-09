// const menu = document.querySelector('#mobile-menu');
// const menuLinks = document.querySelector('.navbar__menu');

// menu.addEventListener('click', function() {
//     menu.classList.toggle('is-active');
//     menuLinks.classList.toggle('active');
// });

// Wait until the entire HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Select the mobile menu toggle element (hamburger icon)
  const menuToggle = document.getElementById('mobile-menu');
  console.log('DOM fully loaded and parsed');
  loadFood();
  // Select the menu container element
  const menu = document.querySelector('.navbar__menu');
  
  // Select all the menu links
  const menuLinks = document.querySelectorAll('.navbar__links');


  // Add a click event listener to the menu toggle (hamburger icon)
  menuToggle.addEventListener('click', () => {
      // Toggle the 'active' class on the menu to show/hide it
      menu.classList.toggle('active');
      // Toggle the 'is-active' class on the menu toggle to change its appearance
      menuToggle.classList.toggle('is-active');
  });

  // order.addEventListener('click', () => {
  //     menu.classList.remove('active');
  //     order.classList.remove('is-active');
  // });

  // Loop through each menu link
  menuLinks.forEach(link => {
      // Add a click event listener to each menu link
      link.addEventListener('click', () => {
          // When a menu link is clicked, remove the 'active' class from the menu
          menu.classList.remove('active');
          // Also remove the 'is-active' class from the menu toggle
          menuToggle.classList.remove('is-active');
      });
  });
});

// Cart form start
emailjs.init("oDauPnMolACE55mNB"); // Replace with your actual public key
console.log("EmailJS initialized.");

// Get references to form elements
const cartForm = document.querySelector(".cart-form");
const cartFormName = document.getElementById("cart-form_name");
const cartPhone = document.getElementById("cart-form_Phone");

// Retrieve cart items from localStorage or initialize an empty cart
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to generate a string representation of the cart items with prices and total
function generateCartDetails(items) {
let cartDetails = '';
let totalAmount = 0;

// Log cart items before processing
console.log("Loaded cart items for email:", items);

items.forEach(item => {
  const itemName = item.title || "Unknown Item";  // Ensure fallback to "Unknown Item" if title is missing
  const price = parseFloat(item.price.replace("₱", "").trim());  // Convert price to float
  const quantity = item.quantity || 1;  // Default quantity to 1 if missing

  if (isNaN(price) || isNaN(quantity)) {
      console.error(`Invalid data for item: ${itemName}, price: ${item.price}, quantity: ${item.quantity}`);
      return;  // Skip if invalid data
  }

  const itemTotal = price * quantity;
  totalAmount += itemTotal;

  cartDetails += `${itemName} (x${quantity}) - ₱${price.toFixed(2)} each = ₱${itemTotal.toFixed(2)}\n`;
});

cartDetails += `\nTotal Amount: ₱${totalAmount.toFixed(2)}`;
console.log("Generated Cart Details for email:", cartDetails);
return cartDetails;
}

// Listen for form submission
cartForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting the default way

  const nameValue = cartFormName.value.trim();
  const phoneValue = cartPhone.value.trim();

  if (nameValue && phoneValue) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log("Loaded cart items for email:", cartItems);

      const cartDetails = generateCartDetails(cartItems);

      const orderDetails = {
          customer_name: nameValue,
          customer_phone: phoneValue,
          cart_items: cartDetails,
      };

      emailjs
          .send("service_ceb9ind", "template_ngn2h5g", orderDetails)
          .then(function (response) {
              console.log("SUCCESS!", response.status, response.text);
              alert("Order placed successfully!");

              // Reset the cart
              itemList = []; // Clear the in-memory list
              localStorage.removeItem("cartItems"); // Clear localStorage

              // Clear only cart items, leaving other elements intact
              const cartContent = document.querySelector(".cart-content");
              if (cartContent) {
                  const cartItems = cartContent.querySelectorAll(".cart-box"); // Target only the cart items
                  cartItems.forEach((item) => item.remove()); // Remove each cart item
              }

              // Update totals and cart count
              const totalValue = document.querySelector(".total-price");
              if (totalValue) totalValue.innerHTML = "₱0";

              const cartCount = document.querySelector(".cart-count");
              if (cartCount) {
                  cartCount.innerHTML = "0";
                  cartCount.style.display = "none"; // Hide the cart count if no items
              }

              updateTotal(); // Recalculate totals
          })
          .catch(function (err) {
              console.log("FAILED...", err);
              alert("There was an error placing your order. Please try again.");
          });
  } else {
      console.log("Please fill in all required fields.");
      alert("Please fill in all fields.");
  }
});
// Cart form end

// CART SECTION

const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

let itemList = JSON.parse(localStorage.getItem("cartItems")) || [];

// Show the cart when the cart icon is clicked
btnCart.addEventListener('click', () => {
cart.classList.add('cart-active');
});

// Hide the cart when the close icon is clicked
btnClose.addEventListener('click', () => {
cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', () => {
loadFood();
loadCartFromStorage(); // Load cart items from localStorage
});

function loadFood() {
loadContent();
}

function loadContent() {
// Remove Food Items From Cart
let btnRemove = document.querySelectorAll('.cart-remove');
btnRemove.forEach((btn) => {
  btn.addEventListener('click', removeItem);
});

// Product Item Change Event
let qtyElements = document.querySelectorAll('.cart-quantity');
qtyElements.forEach((input) => {
  input.addEventListener('change', changeQty);
});

// Product Cart
let cartBtns = document.querySelectorAll('.bread-btn');
cartBtns.forEach((btn) => {
  btn.addEventListener('click', addCart);
});

updateTotal();
}

function loadCartFromStorage() {
itemList.forEach(item => {
  let newProductElement = createCartProduct(item.title, item.price, item.imgSrc, item.quantity);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-content');
  cartBasket.append(element);
});
loadContent();
}

function saveCartToStorage() {
localStorage.setItem("cartItems", JSON.stringify(itemList));
}

// Remove Item
function removeItem() {
if (confirm('Are you sure about this action?')) {
  let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
  itemList = itemList.filter(el => el.title != title);
  this.parentElement.remove();
  saveCartToStorage(); // Save updated cart to localStorage
  loadContent();
}
}

// Change Quantity
function changeQty() {
if (isNaN(this.value) || this.value < 1) {
  this.value = 1;
}

// Update quantity in itemList based on the title
let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
let item = itemList.find(el => el.title === title);
if (item) {
  item.quantity = parseInt(this.value);
}

saveCartToStorage(); // Save updated quantity to localStorage
updateTotal();
}

// Add Cart
function addCart() {
let food = this.closest('.bread');
let title = food.querySelector('.bread-title')?.innerHTML;
let price = food.querySelector('.food-price')?.innerHTML;
let imgSrc = food.querySelector('.bread-img')?.src;

console.log("Adding to cart:", title);  // Debugging

if (!title || !price || !imgSrc) {
  console.error("One or more elements missing in 'addCart'. Please check that each '.bread' element has '.bread-title', '.food-price', and '.bread-img'.");
  return;
}

let newProduct = { title, price, imgSrc, quantity: 1 };

if (itemList.find((el) => el.title === newProduct.title)) {
  alert("Product already added to the cart");
  return;
} else {
  itemList.push(newProduct);
}

let newProductElement = createCartProduct(title, price, imgSrc, 1);
let element = document.createElement('div');
element.innerHTML = newProductElement;
let cartBasket = document.querySelector('.cart-content');
cartBasket.append(element);

saveCartToStorage(); // Save new cart item to localStorage
loadContent();
}


// Create Cart Product HTML Structure
function createCartProduct(title, price, imgSrc, quantity) {
return `
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="${quantity}" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div>
`;
}

// Update Total Price
function updateTotal() {
const cartItems = document.querySelectorAll('.cart-box');
const totalValue = document.querySelector('.total-price');
let total = 0;

cartItems.forEach(product => {
  let priceElement = product.querySelector('.cart-price');
  let price = parseFloat(priceElement.innerHTML.replace("₱", ""));
  let qty = product.querySelector('.cart-quantity').value;
  total += (price * qty);
  product.querySelector('.cart-amt').innerText = "₱" + (price * qty);
});

totalValue.innerHTML = '₱' + total;

// Add Product Count in Cart Icon
const cartCount = document.querySelector('.cart-count');
let count = itemList.length;
cartCount.innerHTML = count;

if (count == 0) {
  cartCount.style.display = 'none';
} else {
  cartCount.style.display = 'block';
}
}

//Contact Form

// Initialize EmailJS with your public key
emailjs.init("oDauPnMolACE55mNB"); // Replace with your actual public key

// Get references to the form and its elements
const form = document.getElementById("form");
const nameInput = document.getElementById("login-name");
const phoneInput = document.getElementById("login-phone");
const messageInput = document.getElementById("login-message");

// Listen for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect form values
    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Validate inputs (optional, can be expanded)
    if (!nameValue || !phoneValue || !messageValue) {
        alert("Please fill in all fields.");
        return;
    }

    // Create an object to hold the form data
    const contactDetails = {
        customer_name: nameValue,
        customer_phone: phoneValue,
        customer_message: messageValue,
    };

    // Send the email using EmailJS
    emailjs
        .send("service_ceb9ind", "template_i2dtafd", contactDetails)
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("Your message has been sent successfully!");

                // Reset the form fields
                form.reset();
            },
            function (error) {
                console.log("FAILED...", error);
                alert("Failed to send your message. Please try again later.");
            }
        );
});

function checkInputs() {
    const fullNameValue = fullName.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = myMessage.value.trim();
    let isValid = true;
    

    if(fullNameValue === "") {
        setErrorFor(fullName, "This field cannot be blank.");
        isValid= false;
    } else if (!isValidFullName(fullNameValue)) {
        setErrorFor(fullName, "Please provide your First and Last name.");
        isValid = false;
    } else {
        setSuccessFor(fullName);
    }
    
    if(phoneValue === "") {
        setErrorFor(phone, "This field cannot be blank.");
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        setErrorFor(phone, "Phone number is invalid.");
        isValid = false;
    } else {
        setSuccessFor(phone);
    }

    if(messageValue === "") {
        setErrorFor(myMessage, "This field cannot be blank.");
        isValid = false;
    } else if (messageValue.length < 20 || messageValue.length > 100) {
        setErrorFor(myMessage, "Message must between 20 to 100 characters.");
        isValid = false;
    } else{
        setSuccessFor(myMessage);
    }
    if (fullNameValue !== "" && isValidPhone(phoneValue) && messageValue !== "" && messageValue.length >= 10) {
        isValid = true;
    }
    return isValid; // Return the validation result
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("p.error-message");
  errorMessage.innerText = message;
  formControl.className = "form-control error";
  errorMessage.style.visibility = "visible";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success2";
  const errorMessage = formControl.querySelector("p.error-message");
  errorMessage.style.visibility = "hidden";
}

function isValidPhone(phone) {
  return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(phone);
}

const fullNameRegex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

function isValidFullName(fullName) {
  return fullNameRegex.test(fullName);
}
