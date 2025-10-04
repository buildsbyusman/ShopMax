// Main JavaScript functionality for ShopMax E-commerce Platform

// Global variables
let products = [];
let currentUser = null;
let isAdmin = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProducts();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isAdmin = currentUser.role === 'admin';
        updateAuthUI();
    }
    
    // Load cart from localStorage
    loadCartFromStorage();
    updateCartUI();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubscription);
    }
    
    // Product filtering
    window.filterByCategory = filterByCategory;
    window.toggleCart = toggleCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.proceedToCheckout = proceedToCheckout;
}

// Product data management
function loadProducts() {
    // Sample product data - in real app, this would come from an API
    products = [
        {
            id: 1,
            title: "Wireless Bluetooth Headphones",
            price: 79.99,
            category: "electronics",
            image: "🎧",
            rating: 4.5,
            reviews: 128,
            description: "High-quality wireless headphones with noise cancellation",
            inStock: true,
            stock: 50
        },
        {
            id: 2,
            title: "Smart Fitness Watch",
            price: 199.99,
            category: "electronics",
            image: "⌚",
            rating: 4.8,
            reviews: 89,
            description: "Advanced fitness tracking with heart rate monitor",
            inStock: true,
            stock: 25
        },
        {
            id: 3,
            title: "Premium Cotton T-Shirt",
            price: 29.99,
            category: "fashion",
            image: "👕",
            rating: 4.3,
            reviews: 156,
            description: "Comfortable cotton t-shirt in various colors",
            inStock: true,
            stock: 100
        },
        {
            id: 4,
            title: "Home Garden Tool Set",
            price: 49.99,
            category: "home",
            image: "🛠️",
            rating: 4.6,
            reviews: 67,
            description: "Complete gardening tool set for home use",
            inStock: true,
            stock: 30
        },
        {
            id: 5,
            title: "Yoga Mat Premium",
            price: 39.99,
            category: "sports",
            image: "🧘",
            rating: 4.7,
            reviews: 203,
            description: "Non-slip yoga mat for all fitness activities",
            inStock: true,
            stock: 75
        },
        {
            id: 6,
            title: "LED Desk Lamp",
            price: 59.99,
            category: "home",
            image: "💡",
            rating: 4.4,
            reviews: 92,
            description: "Adjustable LED desk lamp with USB charging",
            inStock: true,
            stock: 40
        }
    ];
    
    displayFeaturedProducts();
}

// Display featured products on homepage
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (!featuredProductsContainer) return;
    
    const featuredProducts = products.slice(0, 6); // Show first 6 products as featured
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        // Real-time search suggestions could be implemented here
        console.log('Searching for:', query);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // Redirect to products page with search query
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Category filtering
function filterByCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

// Product viewing
function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Newsletter subscription
function handleNewsletterSubscription(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        // Newsletter subscription handled silently to reduce popups
        e.target.reset();
    }, 1000);
}

// Authentication UI updates
function updateAuthUI() {
    const authLinks = document.querySelector('.header-actions');
    if (authLinks && currentUser) {
        authLinks.innerHTML = `
            <span>Welcome, ${currentUser.name}</span>
            ${isAdmin ? '<a href="admin.html" class="auth-link">Admin Panel</a>' : ''}
            <a href="profile.html" class="auth-link">Profile</a>
            <a href="#" onclick="logout()" class="auth-link">Logout</a>
            <div class="cart-icon" onclick="toggleCart()">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count" id="cartCount">0</span>
            </div>
        `;
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    isAdmin = false;
    location.reload();
}

// Message display system - Disabled to remove popups
function showMessage(message, type = 'success') {
    // Popup messages disabled
    return;
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Export functions for use in other files
window.ShopMax = {
    products,
    currentUser,
    isAdmin,
    showMessage,
    formatPrice,
    generateId,
    loadProducts,
    displayFeaturedProducts
};

