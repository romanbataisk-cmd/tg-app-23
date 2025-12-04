// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;

// Инициализируем приложение
tg.expand();
tg.enableClosingConfirmation();

// Устанавливаем тему
if (tg.colorScheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Обновляем данные пользователя
const user = tg.initDataUnsafe?.user;
if (user) {
    console.log('Пользователь:', user);
}

// DOM элементы
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const productModal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');

// Фильтр по категориям
let currentCategory = 'all';

// Рендер товаров
function renderProducts(filterCategory = 'all') {
    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(product => product.category === filterCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-category">${getCategoryName(product.category)}</span>
                <p class="product-price">${product.price} ₽</p>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Добавить в корзину
                </button>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const id = parseInt(card.dataset.id);
                showProductModal(id);
            }
        });
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) cart.addItem(product);
        });
    });
}

// Показать модальное окно товара
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:10px;margin:15px 0;">
        <p>${product.description}</p>
        <p><strong>Цена:</strong> ${product.price} ₽</p>
        <p><strong>Категория:</strong> ${getCategoryName(product.category)}</p>
        
        ${product.sizes.length > 1 ? `
            <div style="margin:15px 0;">
                <strong>Размеры:</strong>
                <div style="display:flex;gap:10px;margin-top:10px;">
                    ${product.sizes.map(size => `
                        <button class="size-btn" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${product.colors.length > 1 ? `
            <div style="margin:15px 0;">
                <strong>Цвета:</strong>
                <div style="display:flex;gap:10px;margin-top:10px;">
                    ${product.colors.map(color => `
                        <button class="color-btn" style="background:${getColorHex(color)};color:white;padding:8px 15px;border:none;border-radius:5px;">
                            ${color}
                        </button>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        <button class="add-to-cart-btn" style="width:100%;margin-top:20px;" id="modalAddToCart">
            Добавить в корзину - ${product.price} ₽
        </button>
    `;
    
    productModal.style.display = 'flex';
    
    // Обработчик кнопки в модальном окне
    document.getElementById('modalAddToCart').addEventListener('click', () => {
        cart.addItem(product);
        productModal.style.display = 'none';
    });
}

// Получить название категории
function getCategoryName(category) {
    const names = {
        'men': 'Мужское',
        'women': 'Женское',
        'kids': 'Детское',
        'accessories': 'Аксессуары'
    };
    return names[category] || category;
}

// Получить HEX цвета
function getColorHex(colorName) {
    const colors = {
        'Белый': '#ffffff',
        'Черный': '#000000',
        'Серый': '#808080',
        'Синий': '#007aff',
        'Красный': '#ff3b30',
        'Зеленый': '#34c759',
        'Розовый': '#ff2d55',
        'Желтый': '#ffcc00',
        'Коричневая': '#8b4513',
        'Бежевая': '#f5f5dc',
        'Голубой': '#87ceeb'
    };
    return colors[colorName] || '#ccc';
}

// Оформление заказа
function checkout() {
    if (cart.getTotalItems() === 0) {
        cart.showNotification('Корзина пуста!');
        return;
    }
    
    const orderData = {
        items: cart.items,
        total: cart.getTotalPrice(),
        user: tg.initDataUnsafe?.user,
        shippingAddress: null // Можно добавить форму ввода адреса
    };
    
    // Отправляем данные в Telegram бота
    tg.sendData(JSON.stringify(orderData));
    
    // Показываем подтверждение
    tg.showAlert('Заказ оформлен! Мы свяжемся с вами для уточнения деталей.', () => {
        cart.items = [];
        cart.saveCart();
        cart.updateCartCount();
        cart.renderCart();
        cartOverlay.style.display = 'none';
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Рендерим товары
    renderProducts();
    
    // Обработчики категорий
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts(currentCategory);
        });
    });
    
    // Корзина
    cartIcon.addEventListener('click', () => {
        cart.isCartOpen = true;
        cartOverlay.style.display = 'block';
        cart.renderCart();
    });
    
    closeCart.addEventListener('click', () => {
        cart.isCartOpen = false;
        cartOverlay.style.display = 'none';
    });
    
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cart.isCartOpen = false;
            cartOverlay.style.display = 'none';
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    // Закрытие модального окна
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });
});