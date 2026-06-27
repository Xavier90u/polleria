// ===================================
// Cart JavaScript - Shopping Cart
// ===================================

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        // Cart Elements
        this.cartBtn = document.getElementById('cartBtn');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.closeCart = document.getElementById('closeCart');
        this.cartItems = document.getElementById('cartItems');
        this.cartCount = document.getElementById('cartCount');
        this.cartTotal = document.getElementById('cartTotal');
        this.checkoutBtn = document.getElementById('checkoutBtn');

        // Event Listeners
        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.toggleCart());
        }
        if (this.closeCart) {
            this.closeCart.addEventListener('click', () => this.toggleCart());
        }
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => this.toggleCart());
        }
        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Add to Cart Buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                const price = parseFloat(e.target.dataset.price);
                this.addItem(name, price);
            });
        });

        // Initial Render
        this.render();
    }

    toggleCart() {
        this.cartSidebar.classList.toggle('active');
        this.cartOverlay.classList.toggle('active');
        document.body.style.overflow = this.cartSidebar.classList.contains('active') ? 'hidden' : '';
    }

    addItem(name, price) {
        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ name, price, quantity: 1 });
        }

        this.save();
        this.render();
        this.showNotification(`${name} agregado al carrito`);
    }

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
        this.save();
        this.render();
    }

    updateQuantity(name, change) {
        const item = this.items.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(name);
            } else {
                this.save();
                this.render();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    render() {
        // Update Count
        if (this.cartCount) {
            this.cartCount.textContent = this.getCount();
        }

        // Update Total
        if (this.cartTotal) {
            this.cartTotal.textContent = `S/ ${this.getTotal().toFixed(2)}`;
        }

        // Update Items
        if (this.cartItems) {
            if (this.items.length === 0) {
                this.cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                    </div>
                `;
            } else {
                this.cartItems.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>S/ ${item.price.toFixed(2)} c/u</p>
                            <div class="cart-item-actions">
                                <button onclick="cart.updateQuantity('${item.name}', -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="cart.updateQuantity('${item.name}', 1)">+</button>
                                <button onclick="cart.removeItem('${item.name}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="cart-item-price">
                            S/ ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de pedir.');
            return;
        }

        // Build WhatsApp message
        let message = '¡Hola! Quiero hacer un pedido:\n\n';
        this.items.forEach(item => {
            message += `${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\nTotal: S/ ${this.getTotal().toFixed(2)}`;
        message += '\n\n¡Gracias!';

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/51999999999?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear cart
        this.items = [];
        this.save();
        this.render();
        this.toggleCart();
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background-color: #25d366;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Initialize Cart
const cart = new Cart();

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
