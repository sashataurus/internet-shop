// Базовые данные для будущих товаров
const products = [
    {
        id: 1,
        name: "Эко сумка",
        price: 899,
        category: "LIFESTYLE",
        image: "https://via.placeholder.com/300x300?text=Eco+Bag"
    },
    {
        id: 2,
        name: "Бамбуковая щетка",
        price: 299,
        category: "PURE", 
        image: "https://via.placeholder.com/300x300?text=Bamboo+Brush"
    },
    {
        id: 3,
        name: "Натуральное мыло",
        price: 450,
        category: "NATURAL",
        image: "https://via.placeholder.com/300x300?text=Natural+Soap"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("ZERO WASTE store loaded!");
    
    // Здесь позже добавим рендер товаров
    // и логику корзины
});