/**
 * Advanced Cart Manager
 * Handles advanced cart functionality including save for later, move to wishlist, cart recommendations, and enhanced features
 */

class AdvancedCartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('advancedCart')) || {
            items: [],
            savedForLater: [],
            recommendations: [],
            crossSellItems: [],
            lastUpdated: new Date().toISOString()
        };
        
        this.cartSettings = {
            maxItems: 50,
            autoSave: true,
            showRecommendations: true,
            showCrossSell: true,
            enableSaveForLater: true,
            enableMoveToWishlist: true
        };

        this.recommendationData = [
            {
                id: 'rec1',
                name: 'Wireless Charging Pad',
                price: 29.99,
                image: 'https://via.placeholder.com/150x150?text=Wireless+Charger',
                reason: 'Frequently bought together',
                discount: 10
            },
            {
                id: 'rec2',
                name: 'Phone Case - Clear',
                price: 19.99,
                image: 'https://via.placeholder.com/150x150?text=Phone+Case',
                reason: 'Customers also bought',
                discount: 15
            },
            {
                id: 'rec3',
                name: 'Screen Protector',
                price: 12.99,
                image: 'https://via.placeholder.com/150x150?text=Screen+Protector',
                reason: 'Complete your purchase',
                discount: 20
            }
        ];

        this.crossSellData = [
            {
                id: 'cross1',
                name: 'Premium Headphones',
                price: 199.99,
                originalPrice: 249.99,
                image: 'https://via.placeholder.com/150x150?text=Headphones',
                category: 'Audio',
                savings: 50.00
            },
            {
                id: 'cross2',
                name: 'Smart Watch',
                price: 299.99,
                originalPrice: 399.99,
                image: 'https://via.placeholder.com/150x150?text=Smart+Watch',
                category: 'Wearables',
                savings: 100.00
            }
        ];

        this.init();
    }

    /**
     * Initialize the advanced cart
     */
    init() {
        this.updateCartDisplay();
        this.loadRecommendations();
        this.loadCrossSellItems();
        this.setupEventListeners();
    }

    /**
     * Add item to cart
     */
    addToCart(product, quantity = 1, options = {}) {
        const existingItem = this.cart.items.find(item => 
            item.id === product.id && 
            JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || product.price,
                image: product.image,
                quantity: quantity,
                options: options,
                addedAt: new Date().toISOString(),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock !== false
            });
        }

        this.updateCartDisplay();
        this.saveCart();
        this.showAddToCartNotification(product);
    }

    /**
     * Remove item from cart
     */
    removeFromCart(itemId, options = {}) {
        this.cart.items = this.cart.items.filter(item => 
            !(item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options))
        );
        
        this.updateCartDisplay();
        this.saveCart();
    }

    /**
     * Update item quantity
     */
    updateQuantity(itemId, quantity, options = {}) {
        const item = this.cart.items.find(item => 
            item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(itemId, options);
            } else {
                item.quantity = quantity;
                this.updateCartDisplay();
                this.saveCart();
            }
        }
    }

    /**
     * Save item for later
     */
    saveForLater(itemId, options = {}) {
        const itemIndex = this.cart.items.findIndex(item => 
            item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (itemIndex !== -1) {
            const item = this.cart.items[itemIndex];
            item.savedAt = new Date().toISOString();
            this.cart.savedForLater.push(item);
            this.cart.items.splice(itemIndex, 1);
            
            this.updateCartDisplay();
            this.saveCart();
            this.showNotification('Item saved for later', 'success');
        }
    }

    /**
     * Move item back to cart from saved for later
     */
    moveToCart(itemId, options = {}) {
        const itemIndex = this.cart.savedForLater.findIndex(item => 
            item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (itemIndex !== -1) {
            const item = this.cart.savedForLater[itemIndex];
            delete item.savedAt;
            this.cart.items.push(item);
            this.cart.savedForLater.splice(itemIndex, 1);
            
            this.updateCartDisplay();
            this.saveCart();
            this.showNotification('Item moved back to cart', 'success');
        }
    }

    /**
     * Move item to wishlist
     */
    moveToWishlist(itemId, options = {}) {
        const itemIndex = this.cart.items.findIndex(item => 
            item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
        );

        if (itemIndex !== -1) {
            const item = this.cart.items[itemIndex];
            
            // Add to wishlist (assuming wishlist manager exists)
            if (window.wishlistManager) {
                window.wishlistManager.addToWishlist(item);
            }
            
            this.cart.items.splice(itemIndex, 1);
            
            this.updateCartDisplay();
            this.saveCart();
            this.showNotification('Item moved to wishlist', 'success');
        }
    }

    /**
     * Remove from saved for later
     */
    removeFromSavedForLater(itemId, options = {}) {
        this.cart.savedForLater = this.cart.savedForLater.filter(item => 
            !(item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options))
        );
        
        this.updateCartDisplay();
        this.saveCart();
    }

    /**
     * Clear entire cart
     */
    clearCart() {
        this.cart.items = [];
        this.updateCartDisplay();
        this.saveCart();
        this.showNotification('Cart cleared', 'info');
    }

    /**
     * Get cart summary
     */
    getCartSummary() {
        const subtotal = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        const savings = this.cart.items.reduce((sum, item) => {
            const originalTotal = (item.originalPrice || item.price) * item.quantity;
            const currentTotal = item.price * item.quantity;
            return sum + (originalTotal - currentTotal);
        }, 0);

        return {
            itemCount,
            subtotal,
            savings,
            tax: subtotal * 0.08, // 8% tax
            shipping: subtotal > 50 ? 0 : 9.99,
            total: subtotal + (subtotal * 0.08) + (subtotal > 50 ? 0 : 9.99)
        };
    }

    /**
     * Update cart display
     */
    updateCartDisplay() {
        this.updateCartSidebar();
        this.updateCartCounter();
        this.updateCartSummary();
    }

    /**
     * Update cart sidebar
     */
    updateCartSidebar() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.cart.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some items to get started</p>
                    <button class="btn btn-primary" onclick="window.location.href='products.html'">
                        Continue Shopping
                    </button>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = `
            <div class="cart-items-list">
                ${this.cart.items.map(item => this.renderCartItem(item)).join('')}
            </div>
            ${this.cart.savedForLater.length > 0 ? this.renderSavedForLater() : ''}
        `;
    }

    /**
     * Render cart item
     */
    renderCartItem(item) {
        const optionsText = Object.keys(item.options).length > 0 
            ? `<div class="item-options">${Object.entries(item.options).map(([key, value]) => 
                `<span class="option">${key}: ${value}</span>`
            ).join(', ')}</div>` 
            : '';

        return `
            <div class="cart-item" data-item-id="${item.id}" data-options='${JSON.stringify(item.options)}'>
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    ${optionsText}
                    <div class="item-price">
                        <span class="current-price">$${item.price.toFixed(2)}</span>
                        ${item.originalPrice && item.originalPrice > item.price 
                            ? `<span class="original-price">$${item.originalPrice.toFixed(2)}</span>` 
                            : ''
                        }
                    </div>
                    <div class="item-actions">
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="advancedCartManager.updateQuantity('${item.id}', ${item.quantity - 1}, ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="advancedCartManager.updateQuantity('${item.id}', ${item.quantity + 1}, ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="item-menu">
                            <button class="menu-btn" onclick="advancedCartManager.toggleItemMenu('${item.id}', '${JSON.stringify(item.options).replace(/"/g, '&quot;')}')">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="item-menu-dropdown" id="menu-${item.id}">
                                <button onclick="advancedCartManager.saveForLater('${item.id}', ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                    <i class="fas fa-bookmark"></i> Save for Later
                                </button>
                                <button onclick="advancedCartManager.moveToWishlist('${item.id}', ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                    <i class="fas fa-heart"></i> Move to Wishlist
                                </button>
                                <button onclick="advancedCartManager.removeFromCart('${item.id}', ${JSON.stringify(item.options).replace(/"/g, '&quot;')})" class="remove-btn">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render saved for later section
     */
    renderSavedForLater() {
        return `
            <div class="saved-for-later">
                <h4>Saved for Later (${this.cart.savedForLater.length})</h4>
                <div class="saved-items">
                    ${this.cart.savedForLater.map(item => `
                        <div class="saved-item">
                            <div class="saved-item-image">
                                <img src="${item.image}" alt="${item.name}" />
                            </div>
                            <div class="saved-item-details">
                                <h5>${item.name}</h5>
                                <div class="saved-item-price">$${item.price.toFixed(2)}</div>
                                <div class="saved-item-actions">
                                    <button class="btn btn-sm btn-primary" onclick="advancedCartManager.moveToCart('${item.id}', ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                        Move to Cart
                                    </button>
                                    <button class="btn btn-sm btn-secondary" onclick="advancedCartManager.removeFromSavedForLater('${item.id}', ${JSON.stringify(item.options).replace(/"/g, '&quot;')})">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Update cart counter
     */
    updateCartCounter() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = itemCount;
            cartCount.style.display = itemCount > 0 ? 'block' : 'none';
        }
    }

    /**
     * Update cart summary
     */
    updateCartSummary() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            const summary = this.getCartSummary();
            cartTotal.textContent = summary.total.toFixed(2);
        }
    }

    /**
     * Load recommendations
     */
    loadRecommendations() {
        if (!this.cartSettings.showRecommendations) return;

        const recommendationsContainer = document.getElementById('cartRecommendations');
        if (!recommendationsContainer) return;

        recommendationsContainer.innerHTML = `
            <div class="cart-recommendations">
                <h4>You might also like</h4>
                <div class="recommendations-grid">
                    ${this.recommendationData.map(item => `
                        <div class="recommendation-item">
                            <div class="rec-image">
                                <img src="${item.image}" alt="${item.name}" />
                                ${item.discount ? `<div class="rec-discount">${item.discount}% OFF</div>` : ''}
                            </div>
                            <div class="rec-details">
                                <h5>${item.name}</h5>
                                <div class="rec-price">$${item.price.toFixed(2)}</div>
                                <div class="rec-reason">${item.reason}</div>
                                <button class="btn btn-sm btn-primary" onclick="advancedCartManager.addToCart(${JSON.stringify(item)})">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Load cross-sell items
     */
    loadCrossSellItems() {
        if (!this.cartSettings.showCrossSell) return;

        const crossSellContainer = document.getElementById('cartCrossSell');
        if (!crossSellContainer) return;

        crossSellContainer.innerHTML = `
            <div class="cart-cross-sell">
                <h4>Complete your purchase</h4>
                <div class="cross-sell-grid">
                    ${this.crossSellData.map(item => `
                        <div class="cross-sell-item">
                            <div class="cross-sell-image">
                                <img src="${item.image}" alt="${item.name}" />
                                <div class="cross-sell-savings">Save $${item.savings.toFixed(2)}</div>
                            </div>
                            <div class="cross-sell-details">
                                <h5>${item.name}</h5>
                                <div class="cross-sell-category">${item.category}</div>
                                <div class="cross-sell-price">
                                    <span class="current-price">$${item.price.toFixed(2)}</span>
                                    <span class="original-price">$${item.originalPrice.toFixed(2)}</span>
                                </div>
                                <button class="btn btn-sm btn-primary" onclick="advancedCartManager.addToCart(${JSON.stringify(item)})">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Toggle item menu
     */
    toggleItemMenu(itemId, options) {
        const menu = document.getElementById(`menu-${itemId}`);
        if (menu) {
            // Close all other menus
            document.querySelectorAll('.item-menu-dropdown').forEach(m => {
                if (m.id !== `menu-${itemId}`) {
                    m.style.display = 'none';
                }
            });
            
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    }

    /**
     * Show add to cart notification
     */
    showAddToCartNotification(product) {
        this.showNotification(`${product.name} added to cart`, 'success');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close item menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.item-menu')) {
                document.querySelectorAll('.item-menu-dropdown').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });

        // Auto-save cart
        if (this.cartSettings.autoSave) {
            setInterval(() => {
                this.saveCart();
            }, 30000); // Save every 30 seconds
        }
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        this.cart.lastUpdated = new Date().toISOString();
        localStorage.setItem('advancedCart', JSON.stringify(this.cart));
    }

    /**
     * Proceed to checkout
     */
    proceedToCheckout() {
        if (this.cart.items.length === 0) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }

        // In a real application, this would redirect to checkout
        window.location.href = 'checkout.html';
    }

    /**
     * Get cart data for external use
     */
    getCartData() {
        return {
            items: this.cart.items,
            savedForLater: this.cart.savedForLater,
            summary: this.getCartSummary()
        };
    }
}

// Initialize the advanced cart manager
const advancedCartManager = new AdvancedCartManager();

// Global functions for cart interactions
window.addToCart = (product, quantity = 1, options = {}) => advancedCartManager.addToCart(product, quantity, options);
window.removeFromCart = (itemId, options = {}) => advancedCartManager.removeFromCart(itemId, options);
window.updateQuantity = (itemId, quantity, options = {}) => advancedCartManager.updateQuantity(itemId, quantity, options);
window.saveForLater = (itemId, options = {}) => advancedCartManager.saveForLater(itemId, options);
window.moveToCart = (itemId, options = {}) => advancedCartManager.moveToCart(itemId, options);
window.moveToWishlist = (itemId, options = {}) => advancedCartManager.moveToWishlist(itemId, options);
window.clearCart = () => advancedCartManager.clearCart();
window.proceedToCheckout = () => advancedCartManager.proceedToCheckout();

