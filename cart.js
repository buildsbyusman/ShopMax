// Shopping Cart functionality for ShopMax E-commerce Platform

let cart = [];

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCartUI();
});

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('shopmax_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('shopmax_cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = window.ShopMax?.products?.find(p => p.id === productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    
    // Animate cart icon
    animateCartIcon();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

// Update product quantity in cart
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    // Update cart count in header
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = getCartItemCount();
        cartCount.textContent = count;
        
        // Show/hide count based on whether there are items
        if (count > 0) {
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }
    
    // Update cart sidebar
    updateCartSidebar();
}

// Update cart sidebar
function updateCartSidebar() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.image}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #dc3545; margin-left: 10px;">×</button>
                </div>
            </div>
        </div>
    `).join('');
    
    cartTotal.textContent = getCartTotal().toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('active');
        
        // Prevent body scroll when cart is open
        if (cartSidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Animate cart icon when item is added
function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        cartIcon.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        return;
    }
    
    // Check if user is logged in
    const currentUser = window.ShopMax?.currentUser;
    if (!currentUser) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Clear cart
function clearCart() {
    cart = [];
    saveCartToStorage();
    updateCartUI();
}

// Get cart data for checkout
function getCartData() {
    return {
        items: cart,
        total: getCartTotal(),
        itemCount: getCartItemCount()
    };
}

// Apply discount code
function applyDiscountCode(code) {
    const discountCodes = {
        'WELCOME10': 0.1,
        'SAVE20': 0.2,
        'NEWUSER': 0.15
    };
    
    const discount = discountCodes[code.toUpperCase()];
    
    if (discount) {
        const originalTotal = getCartTotal();
        const discountAmount = originalTotal * discount;
        const newTotal = originalTotal - discountAmount;
        
        return {
            success: true,
            discount: discount,
            discountAmount: discountAmount,
            newTotal: newTotal,
            message: `Discount applied! You saved $${discountAmount.toFixed(2)}`
        };
    } else {
        return {
            success: false,
            message: 'Invalid discount code'
        };
    }
}

// Export cart functions
window.Cart = {
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    getCartData,
    clearCart,
    applyDiscountCode,
    toggleCart,
    proceedToCheckout
};

