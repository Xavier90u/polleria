// ===================================
// Menu JavaScript - Menu Page
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.dataset.filter;

                menuCategories.forEach(category => {
                    if (filter === 'all' || category.dataset.category === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Menu Data
const menuData = {
    entradas: [
        { id: 1, name: 'Papas Fritas', price: 8, description: 'Papas fritas crocantes con salsa especial', image: 'images/menu/papas.jpg' },
        { id: 2, name: 'Ensalada Fresca', price: 10, description: 'Ensalada mixta con aderezo de la casa', image: 'images/menu/ensalada.jpg' },
        { id: 3, name: 'Yuca Frita', price: 9, description: 'Yuca frita dorada con salsa de ajo', image: 'images/menu/yuca.jpg' },
        { id: 4, name: 'Choclo con Queso', price: 12, description: 'Choclo fresco con queso derretido', image: 'images/menu/choclo.jpg' }
    ],
    pollos: [
        { id: 5, name: 'Pollo Entero', price: 35, description: 'Pollo completo a la brasa con papas y ensalada', image: 'images/menu/pollo-entero.jpg' },
        { id: 6, name: 'Medio Pollo', price: 22, description: 'Media porción de pollo con guarniciones', image: 'images/menu/pollo-mitad.jpg' },
        { id: 7, name: 'Cuarto de Pollo', price: 14, description: 'Una cuarta parte con papas y ensalada', image: 'images/menu/cuarto-pollo.jpg' },
        { id: 8, name: 'Pechuga a la Plancha', price: 18, description: 'Pechuga jugosa sin piel', image: 'images/menu/pechuga.jpg' }
    ],
    acompañamientos: [
        { id: 9, name: 'Arroz', price: 5, description: 'Arroz blanco preparado', image: 'images/menu/arroz.jpg' },
        { id: 10, name: 'Frijoles', price: 5, description: 'Frijoles negros refritos', image: 'images/menu/frijoles.jpg' },
        { id: 11, name: 'Ensalada de Tomate', price: 6, description: 'Tomate, cebolla y cilantro', image: 'images/menu/tomate.jpg' },
        { id: 12, name: 'Papa a la Huancaína', price: 8, description: 'Papa con salsa huancaína', image: 'images/menu/huancaína.jpg' }
    ],
    bebidas: [
        { id: 13, name: 'Gaseosa 1.5L', price: 8, description: 'Coca-Cola, Sprite o Fanta', image: 'images/menu/gaseosa.jpg' },
        { id: 14, name: 'Jugo Natural', price: 6, description: 'Naranja, Limón o Maracuyá', image: 'images/menu/jugo.jpg' },
        { id: 15, name: 'Agua Mineral', price: 3, description: 'Con o sin gas', image: 'images/menu/agua.jpg' },
        { id: 16, name: 'Chicha Morada', price: 5, description: 'Tradicional chicha morada', image: 'images/menu/chicha.jpg' }
    ],
    combos: [
        { id: 17, name: 'Combo Personal', price: 28, description: '1/4 pollo + papas + gaseosa', image: 'images/menu/combo-personal.jpg' },
        { id: 18, name: 'Combo Pareja', price: 52, description: '1/2 pollo + papas + ensalada + 2 gaseosas', image: 'images/menu/combo-pareja.jpg' },
        { id: 19, name: 'Combo Familiar', price: 89, description: '2 pollos enteros + papas + ensalada + 4 gaseosas', image: 'images/menu/combo-familiar.jpg' },
        { id: 20, name: 'Combo Fiesta', price: 120, description: '3 pollos enteros + todas las guarniciones + 6 gaseosas', image: 'images/menu/combo-fiesta.jpg' }
    ]
};

// Function to generate menu items HTML
function generateMenuItem(item) {
    return `
        <div class="menu-card" data-id="${item.id}">
            <div class="menu-card-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                <span class="price">S/ ${item.price.toFixed(2)}</span>
            </div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button class="btn btn-add-cart" data-name="${item.name}" data-price="${item.price}">Agregar al Carrito</button>
            </div>
        </div>
    `;
}

// Export for use in menu.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { menuData, generateMenuItem };
}
