// Products page functionality

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let productsPerPage = 12;
let currentView = 'grid';

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

function initializeProductsPage() {
    // Get products from main.js
    allProducts = window.ShopMax?.products || [];
    filteredProducts = [...allProducts];
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const category = urlParams.get('category');
    
    if (searchQuery) {
        performSearch(searchQuery);
    }
    
    if (category) {
        document.getElementById('categoryFilter').value = category;
        filterProducts();
    }
    
    displayProducts();
    setupProductsEventListeners();
}

function setupProductsEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(e.target.value);
            }
        });
    }
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    if (query.length > 2) {
        // Real-time search suggestions
        const suggestions = allProducts.filter(product => 
            product.title.toLowerCase().includes(query)
        ).slice(0, 5);
        
        // Could implement search suggestions dropdown here
    }
}

function performSearch(query) {
    if (!query.trim()) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    currentPage = 1;
    displayProducts();
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    
    if (!category) {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.category === category
        );
    }
    
    currentPage = 1;
    displayProducts();
}

function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts();
}

function toggleView(view) {
    currentView = view;
    
    // Update button states
    document.getElementById('gridView').classList.toggle('active', view === 'grid');
    document.getElementById('listView').classList.toggle('active', view === 'list');
    
    // Update products container class
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.className = view === 'grid' ? 'products-grid' : 'products-list';
    
    displayProducts();
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    if (currentView === 'grid') {
        productsGrid.innerHTML = productsToShow.map(product => `
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
                    <div class="product-description">${product.description}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    } else {
        productsGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card list-view" onclick="viewProduct(${product.id})">
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
                    <div class="product-description">${product.description}</div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                            <i class="fas fa-heart"></i> Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    displayPagination();
}

function displayPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i> Previous
        </button>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
            onclick="goToPage(${i})">${i}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${currentPage + 1})">
            Next <i class="fas fa-chevron-right"></i>
        </button>`;
    }
    
    pagination.innerHTML = paginationHTML;
}

function goToPage(page) {
    currentPage = page;
    displayProducts();
    
    // Scroll to top of products
    document.querySelector('.products-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function addToWishlist(productId) {
    // Wishlist functionality
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showMessage('Removed from wishlist', 'success');
    } else {
        wishlist.push(productId);
        showMessage('Added to wishlist', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Generate star rating display (same as main.js)
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

// Export functions
window.ProductsPage = {
    filterProducts,
    sortProducts,
    toggleView,
    performSearch,
    goToPage
};

