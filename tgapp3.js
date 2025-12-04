// Данные товаров
const products = [
    {
        id: 1,
        name: "Футболка хлопковая",
        price: 1499,
        category: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Мягкая хлопковая футболка, 100% хлопок",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Белый", "Черный", "Серый"]
    },
    {
        id: 2,
        name: "Джинсы скинни",
        price: 3999,
        category: "women",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        description: "Узкие джинсы, 98% хлопок, 2% эластан",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Синий", "Черный"]
    },
    {
        id: 3,
        name: "Куртка ветровка",
        price: 5999,
        category: "men",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w-400&h=400&fit=crop",
        description: "Ветрозащитная куртка с капюшоном",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Черный", "Зеленый", "Синий"]
    },
    {
        id: 4,
        name: "Платье летнее",
        price: 2999,
        category: "women",
        image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=400&fit=crop",
        description: "Легкое летнее платье из хлопка",
        sizes: ["S", "M", "L"],
        colors: ["Красный", "Белый", "Голубой"]
    },
    {
        id: 5,
        name: "Детская толстовка",
        price: 1999,
        category: "kids",
        image: "https://images.unsplash.com/photo-1558769132-cb1a40ed0ada?w=400&h=400&fit=crop",
        description: "Теплая толстовка для детей",
        sizes: ["104", "110", "116", "122"],
        colors: ["Розовый", "Синий", "Желтый"]
    },
    {
        id: 6,
        name: "Кепка бейсболка",
        price: 899,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
        description: "Бейсболка с регулируемой застежкой",
        sizes: ["Универсальная"],
        colors: ["Черная", "Белая", "Синяя"]
    },
    {
        id: 7,
        name: "Рубашка офисная",
        price: 3499,
        category: "men",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        description: "Классическая рубашка для офиса",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Белая", "Голубая", "Серая"]
    },
    {
        id: 8,
        name: "Сумка кросс-боди",
        price: 2499,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        description: "Стильная сумка через плечо",
        sizes: ["Один размер"],
        colors: ["Черная", "Коричневая", "Бежевая"]
    }
];