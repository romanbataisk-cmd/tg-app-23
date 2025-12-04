class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    // Добавить товар в корзину
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity,
                selectedSize: product.sizes[0],
                selectedColor: product.colors[0]
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Товар добавлен в корзину!');
    }

    // Удалить товар из корзины
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        if (this.isCartOpen) this.renderCart();
    }

    // Изменить количество
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            if (this.isCartOpen) this.renderCart();
        }
    }

    // Общая стоимость
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Количество товаров
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Сохранить в localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Обновить счетчик корзины
    updateCartCount() {
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            countElement.textContent = this.getTotalItems();
        }
    }

    // Показать уведомление
    showNotification(message) {
        // Используем Telegram Web App для уведомлений
        if (window.Telegram?.WebApp?.showPopup) {
            window.Telegram.WebApp.showPopup({
                title: 'Успешно',
                message: message,
                buttons: [{ type: 'ok' }]
            });
        } else {
            alert(message);
        }
    }

    // Рендер корзины
    renderCart() {
        const cartItemsElement = document.getElementById('cartItems');
        const totalPriceElement = document.getElementById('totalPrice');
        
        if (!cartItemsElement) return;
        
        if (this.items.length === 0) {
            cartItemsElement.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
            totalPriceElement.textContent = '0';
            return;
        }
        
        cartItemsElement.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.selectedColor}, ${item.selectedSize}</p>
                    <p class="product-price">${item.price} ₽ × ${item.quantity} = ${item.price * item.quantity} ₽</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        totalPriceElement.textContent = this.getTotalPrice();
        
        // Добавляем обработчики
        cartItemsElement.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) this.updateQuantity(id, item.quantity - 1);
            });
        });
        
        cartItemsElement.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) this.updateQuantity(id, item.quantity + 1);
            });
        });
        
        cartItemsElement.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.removeItem(id);
            });
        });
    }
}

// Создаем глобальный экземпляр корзины
const cart = new Cart();