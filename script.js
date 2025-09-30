const product = {
    id: 1,
    name: "Тестовый товар", 
    price: 1000
};

let cart = [];

function addToCart(product) {
    console.log("Товар добавлен в корзину!", product);
    
    cart.push(product);
    console.log("Корзина:", cart);
    
    alert(`Товар "${product.name}" добавлен в корзину!`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Корзина сохранена!");
}


document.addEventListener('DOMContentLoaded', function() {
    const buyButton = document.querySelector('.buy-button');
    
    if (buyButton) {
        buyButton.addEventListener('click', function() {
            addToCart(product);
            saveCart();
        });
    } else {
        console.error("Кнопка не найдена!");
    }
});