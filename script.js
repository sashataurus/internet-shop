let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close-modal');
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.querySelector('.checkout-btn');

const orderModal = document.getElementById('order-modal');
const orderForm = document.getElementById('order-form');

cartBtn.addEventListener('click', function() {
    cartModal.style.display = 'block';
    renderCart();
});

closeModal.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

function addToCart(productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartButton();
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        totalPrice.textContent = '0';
        return;
    }
    
    checkoutBtn.disabled = false;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}$</p>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
        </div>
    `).join('');
    
    updateTotal();
}

function changeQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            saveCart();
            renderCart();
            updateCartButton();
        }
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCart();
    updateCartButton();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartButton() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
        cartBtn.textContent = `CART (${totalItems})`;
    } else {
        cartBtn.textContent = 'CART';
    }
}

function openOrderModal() {
    console.log('Opening order modal...'); 
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    cartModal.style.display = 'none';
    orderModal.style.display = 'block';
}

function closeOrderModal() {
    orderModal.style.display = 'none';
}

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted!');
    
    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    };
    
    createOrder(formData);
});

function createOrder(formData) {
    console.log('Creating order with data:', formData); 
    
    showOrderSuccess();

    cart = [];
    saveCart();
    renderCart();
    updateCartButton();
    
    orderModal.style.display = 'none';
    
    orderForm.reset();
}

function showOrderSuccess() {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4a7c59;
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        font-family: 'Fragment Mono';
        font-size: 1.2rem;
        z-index: 1002;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    `;
    successMessage.textContent = 'Order created!';
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 2000);
}

window.addEventListener('click', function(event) {
    if (event.target === orderModal) {
        closeOrderModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
    updateCartButton();
    
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card-with-hover');
            const productName = productCard.querySelector('.product-hover-name').textContent;
            const productPrice = parseInt(productCard.querySelector('.product-hover-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('.product-image').src;
            
            addToCart(productName, productPrice, productImage);
        });
    });

    checkoutBtn.addEventListener('click', openOrderModal);
    
    console.log('Event listeners attached!'); 
});