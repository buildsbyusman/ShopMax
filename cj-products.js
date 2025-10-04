// CJ Dropshipping Products Page JavaScript

class CJProductsManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentView = 'grid';
        this.currentSort = 'default';
        this.currentFilters = {
            category: '',
            price: '',
            search: ''
        };
        
        this.initializeProducts();
        this.setupEventListeners();
        this.loadCJProducts();
    }
    
    // Initialize with mock CJ products data
    initializeProducts() {
        this.products = [
            // Electronics
            {
                id: 'CJ-001',
                title: 'Wireless Bluetooth Earbuds Pro',
                price: 29.99,
                originalPrice: 49.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
                rating: 4.6,
                reviews: 1247,
                description: 'Premium wireless earbuds with active noise cancellation and 30-hour battery life',
                inStock: true,
                stock: 200,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Best Seller'],
                shipping: '7-15 days',
                profitMargin: 65
            },
            {
                id: 'CJ-002',
                title: 'Smart Fitness Band with Heart Rate',
                price: 19.99,
                originalPrice: 35.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Fitness+Band',
                rating: 4.4,
                reviews: 892,
                description: 'Advanced fitness tracking with heart rate monitor and sleep tracking',
                inStock: true,
                stock: 150,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'New'],
                shipping: '7-15 days',
                profitMargin: 70
            },
            {
                id: 'CJ-003',
                title: 'LED Strip Lights RGB Smart',
                price: 12.99,
                originalPrice: 24.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=LED+Strip',
                rating: 4.7,
                reviews: 2156,
                description: 'Smart LED strip lights with app control and voice assistant compatibility',
                inStock: true,
                stock: 300,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Sale'],
                shipping: '7-15 days',
                profitMargin: 80
            },
            {
                id: 'CJ-004',
                title: 'Phone Stand Adjustable Desktop',
                price: 8.99,
                originalPrice: 15.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Phone+Stand',
                rating: 4.5,
                reviews: 678,
                description: 'Adjustable phone stand for desk and bed with 360° rotation',
                inStock: true,
                stock: 250,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Prime'],
                shipping: '7-15 days',
                profitMargin: 75
            },
            {
                id: 'CJ-005',
                title: 'Wireless Charging Pad Fast',
                price: 15.99,
                originalPrice: 29.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Wireless+Charger',
                rating: 4.3,
                reviews: 445,
                description: 'Fast wireless charging pad with LED indicator and safety protection',
                inStock: true,
                stock: 180,
                source: 'cj_dropshipping',
                badges: ['Sale'],
                shipping: '7-15 days',
                profitMargin: 68
            },
            {
                id: 'CJ-006',
                title: 'Bluetooth Speaker Portable',
                price: 24.99,
                originalPrice: 39.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Bluetooth+Speaker',
                rating: 4.2,
                reviews: 567,
                description: 'Portable Bluetooth speaker with 360° sound and waterproof design',
                inStock: true,
                stock: 120,
                source: 'cj_dropshipping',
                badges: ['Best Seller'],
                shipping: '7-15 days',
                profitMargin: 72
            },
            
            // Fashion
            {
                id: 'CJ-007',
                title: 'Designer Sunglasses UV Protection',
                price: 18.99,
                originalPrice: 34.99,
                category: 'fashion',
                image: 'https://via.placeholder.com/300x300?text=Sunglasses',
                rating: 4.5,
                reviews: 789,
                description: 'Stylish sunglasses with UV400 protection and polarized lenses',
                inStock: true,
                stock: 200,
                source: 'cj_dropshipping',
                badges: ['New'],
                shipping: '7-15 days',
                profitMargin: 78
            },
            {
                id: 'CJ-008',
                title: 'Leather Wallet RFID Blocking',
                price: 22.99,
                originalPrice: 42.99,
                category: 'fashion',
                image: 'https://via.placeholder.com/300x300?text=Leather+Wallet',
                rating: 4.4,
                reviews: 234,
                description: 'Premium leather wallet with RFID blocking technology',
                inStock: true,
                stock: 150,
                source: 'cj_dropshipping',
                badges: ['Trending'],
                shipping: '7-15 days',
                profitMargin: 82
            },
            {
                id: 'CJ-009',
                title: 'Smart Watch Fitness Tracker',
                price: 35.99,
                originalPrice: 59.99,
                category: 'fashion',
                image: 'https://via.placeholder.com/300x300?text=Smart+Watch',
                rating: 4.3,
                reviews: 456,
                description: 'Smart watch with fitness tracking, notifications, and water resistance',
                inStock: true,
                stock: 100,
                source: 'cj_dropshipping',
                badges: ['Best Seller'],
                shipping: '7-15 days',
                profitMargin: 65
            },
            
            // Home & Garden
            {
                id: 'CJ-010',
                title: 'Essential Oil Diffuser Ultrasonic',
                price: 16.99,
                originalPrice: 28.99,
                category: 'home',
                image: 'https://via.placeholder.com/300x300?text=Oil+Diffuser',
                rating: 4.6,
                reviews: 1234,
                description: 'Ultrasonic essential oil diffuser with LED lights and timer',
                inStock: true,
                stock: 180,
                source: 'cj_dropshipping',
                badges: ['Trending'],
                shipping: '7-15 days',
                profitMargin: 76
            },
            {
                id: 'CJ-011',
                title: 'Indoor Plant Grow Light',
                price: 28.99,
                originalPrice: 49.99,
                category: 'home',
                image: 'https://via.placeholder.com/300x300?text=Grow+Light',
                rating: 4.4,
                reviews: 345,
                description: 'Full spectrum LED grow light for indoor plants with timer',
                inStock: true,
                stock: 90,
                source: 'cj_dropshipping',
                badges: ['New'],
                shipping: '7-15 days',
                profitMargin: 70
            },
            {
                id: 'CJ-012',
                title: 'Kitchen Scale Digital Precision',
                price: 12.99,
                originalPrice: 22.99,
                category: 'home',
                image: 'https://via.placeholder.com/300x300?text=Kitchen+Scale',
                rating: 4.5,
                reviews: 678,
                description: 'Digital kitchen scale with precision measurement and tare function',
                inStock: true,
                stock: 220,
                source: 'cj_dropshipping',
                badges: ['Best Seller'],
                shipping: '7-15 days',
                profitMargin: 85
            },
            
            // Sports
            {
                id: 'CJ-013',
                title: 'Resistance Bands Set Workout',
                price: 14.99,
                originalPrice: 24.99,
                category: 'sports',
                image: 'https://via.placeholder.com/300x300?text=Resistance+Bands',
                rating: 4.7,
                reviews: 1890,
                description: 'Complete resistance bands set with door anchor and handles',
                inStock: true,
                stock: 300,
                source: 'cj_dropshipping',
                badges: ['Trending', 'Best Seller'],
                shipping: '7-15 days',
                profitMargin: 80
            },
            {
                id: 'CJ-014',
                title: 'Yoga Mat Non-Slip Premium',
                price: 19.99,
                originalPrice: 34.99,
                category: 'sports',
                image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
                rating: 4.6,
                reviews: 567,
                description: 'Premium non-slip yoga mat with carrying strap',
                inStock: true,
                stock: 150,
                source: 'cj_dropshipping',
                badges: ['Sale'],
                shipping: '7-15 days',
                profitMargin: 75
            },
            {
                id: 'CJ-015',
                title: 'Water Bottle Insulated Stainless',
                price: 16.99,
                originalPrice: 29.99,
                category: 'sports',
                image: 'https://via.placeholder.com/300x300?text=Water+Bottle',
                rating: 4.4,
                reviews: 445,
                description: 'Insulated stainless steel water bottle with leak-proof lid',
                inStock: true,
                stock: 200,
                source: 'cj_dropshipping',
                badges: ['New'],
                shipping: '7-15 days',
                profitMargin: 78
            },
            
            // Beauty
            {
                id: 'CJ-016',
                title: 'Facial Cleansing Brush Sonic',
                price: 25.99,
                originalPrice: 44.99,
                category: 'beauty',
                image: 'https://via.placeholder.com/300x300?text=Cleansing+Brush',
                rating: 4.5,
                reviews: 789,
                description: 'Sonic facial cleansing brush with multiple speed settings',
                inStock: true,
                stock: 120,
                source: 'cj_dropshipping',
                badges: ['Trending'],
                shipping: '7-15 days',
                profitMargin: 72
            },
            {
                id: 'CJ-017',
                title: 'LED Makeup Mirror Touch',
                price: 32.99,
                originalPrice: 54.99,
                category: 'beauty',
                image: 'https://via.placeholder.com/300x300?text=Makeup+Mirror',
                rating: 4.6,
                reviews: 234,
                description: 'LED makeup mirror with touch control and magnification',
                inStock: true,
                stock: 80,
                source: 'cj_dropshipping',
                badges: ['Best Seller'],
                shipping: '7-15 days',
                profitMargin: 68
            },
            {
                id: 'CJ-018',
                title: 'Hair Dryer Ionic Professional',
                price: 28.99,
                originalPrice: 49.99,
                category: 'beauty',
                image: 'https://via.placeholder.com/300x300?text=Hair+Dryer',
                rating: 4.3,
                reviews: 345,
                description: 'Professional ionic hair dryer with multiple heat settings',
                inStock: true,
                stock: 100,
                source: 'cj_dropshipping',
                badges: ['Sale'],
                shipping: '7-15 days',
                profitMargin: 74
            },
            
            // Automotive
            {
                id: 'CJ-019',
                title: 'Car Phone Mount Magnetic',
                price: 11.99,
                originalPrice: 19.99,
                category: 'automotive',
                image: 'https://via.placeholder.com/300x300?text=Car+Mount',
                rating: 4.4,
                reviews: 1234,
                description: 'Magnetic car phone mount with 360° rotation and strong grip',
                inStock: true,
                stock: 250,
                source: 'cj_dropshipping',
                badges: ['Trending', 'Best Seller'],
                shipping: '7-15 days',
                profitMargin: 82
            },
            {
                id: 'CJ-020',
                title: 'Car Vacuum Cordless Portable',
                price: 34.99,
                originalPrice: 59.99,
                category: 'automotive',
                image: 'https://via.placeholder.com/300x300?text=Car+Vacuum',
                rating: 4.5,
                reviews: 456,
                description: 'Cordless car vacuum with powerful suction and LED light',
                inStock: true,
                stock: 90,
                source: 'cj_dropshipping',
                badges: ['New'],
                shipping: '7-15 days',
                profitMargin: 70
            },
            {
                id: 'CJ-021',
                title: 'Car Air Freshener Vent Clip',
                price: 6.99,
                originalPrice: 12.99,
                category: 'automotive',
                image: 'https://via.placeholder.com/300x300?text=Air+Freshener',
                rating: 4.2,
                reviews: 678,
                description: 'Car air freshener vent clip with long-lasting fragrance',
                inStock: true,
                stock: 300,
                source: 'cj_dropshipping',
                badges: ['Sale'],
                shipping: '7-15 days',
                profitMargin: 88
            }
        ];
        
        this.filteredProducts = [...this.products];
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.filterCJProducts();
            });
        }
        
        // Track user behavior for recommendations
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cj-product-card')) {
                const productId = e.target.closest('.cj-product-card').dataset.productId;
                if (productId && window.recommendationsSystem) {
                    window.recommendationsSystem.trackUserBehavior('view', productId);
                }
            }
        });
    }
    
    // Load and display CJ products
    loadCJProducts() {
        this.renderCJProducts();
        this.renderPagination();
    }
    
    // Render CJ products
    renderCJProducts() {
        const container = document.getElementById('cjProductsGrid');
        if (!container) return;
        
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = productsToShow.map(product => this.renderCJProductCard(product)).join('');
        
        // Add animation classes
        const cards = container.querySelectorAll('.cj-product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Render individual CJ product card
    renderCJProductCard(product) {
        const isOnSale = product.originalPrice && product.price < product.originalPrice;
        const discountPercent = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        const viewClass = this.currentView === 'list' ? 'list-view' : '';
        
        return `
            <div class="cj-product-card ${viewClass}" data-product-id="${product.id}">
                <div class="cj-product-image">
                    <img src="${product.image}" alt="${product.title}" 
                         onclick="window.location.href='product-detail.html?id=${product.id}'">
                    <div class="cj-product-badges">
                        ${product.badges ? product.badges.map(badge => 
                            `<span class="cj-product-badge ${badge.toLowerCase().replace(' ', '-')}">${badge}</span>`
                        ).join('') : ''}
                        ${isOnSale ? `<span class="cj-product-badge sale">${discountPercent}% OFF</span>` : ''}
                        <span class="cj-product-badge cj-exclusive">CJ Exclusive</span>
                    </div>
                    <div class="cj-product-actions">
                        <button class="cj-action-btn cj-wishlist-btn" onclick="wishlistSystem.toggleWishlist('${product.id}')" 
                                title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="cj-action-btn cj-compare-btn" onclick="compareSystem.toggleCompare('${product.id}')" 
                                title="Add to Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                        <button class="cj-action-btn cj-quick-view-btn" onclick="cjProductsManager.quickView('${product.id}')" 
                                title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="cj-product-info">
                    <h3 class="cj-product-title" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        ${product.title}
                    </h3>
                    <div class="cj-product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="cj-rating-text">(${product.reviews})</span>
                    </div>
                    <div class="cj-product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="cj-product-availability">
                        ${product.inStock ? 
                            '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                            '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                        }
                    </div>
                    <div class="cj-product-shipping">
                        <i class="fas fa-shipping-fast"></i> ${product.shipping} shipping
                    </div>
                    <button class="cj-add-to-cart-btn" onclick="window.Cart.addToCart('${product.id}')" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    // Filter CJ products
    filterCJProducts() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.currentFilters.category && product.category !== this.currentFilters.category) {
                return false;
            }
            
            // Price filter
            if (this.currentFilters.price) {
                const [min, max] = this.currentFilters.price.split('-').map(Number);
                if (max && (product.price < min || product.price > max)) {
                    return false;
                }
                if (!max && product.price < min) {
                    return false;
                }
            }
            
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                if (!product.title.toLowerCase().includes(searchTerm) && 
                    !product.description.toLowerCase().includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.currentPage = 1;
        this.renderCJProducts();
        this.renderPagination();
    }
    
    // Sort CJ products
    sortCJProducts() {
        const sortValue = document.getElementById('sortFilter').value;
        this.currentSort = sortValue;
        
        switch (sortValue) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
                break;
            case 'trending':
                this.filteredProducts.sort((a, b) => {
                    const aTrending = a.trending ? 1 : 0;
                    const bTrending = b.trending ? 1 : 0;
                    return bTrending - aTrending;
                });
                break;
            default:
                // Keep original order
                break;
        }
        
        this.currentPage = 1;
        this.renderCJProducts();
        this.renderPagination();
    }
    
    // Toggle view between grid and list
    toggleCJView(view) {
        this.currentView = view;
        
        // Update button states
        document.getElementById('gridView').classList.toggle('active', view === 'grid');
        document.getElementById('listView').classList.toggle('active', view === 'list');
        
        // Update grid class
        const grid = document.getElementById('cjProductsGrid');
        if (grid) {
            grid.classList.toggle('list-view', view === 'list');
        }
        
        this.renderCJProducts();
    }
    
    // Filter by category
    filterCJByCategory(category) {
        document.getElementById('categoryFilter').value = category;
        this.currentFilters.category = category;
        this.filterCJProducts();
    }
    
    // Quick view functionality
    quickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal quick-view-modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content quick-view-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="quick-view-container">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="quick-view-info">
                        <h2>${product.title}</h2>
                        <div class="quick-view-rating">
                            <div class="stars">${this.generateStars(product.rating)}</div>
                            <span class="rating-text">(${product.reviews} reviews)</span>
                        </div>
                        <div class="quick-view-price">
                            <span class="current-price">$${product.price}</span>
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                        </div>
                        <p class="quick-view-description">${product.description}</p>
                        <div class="quick-view-shipping">
                            <i class="fas fa-shipping-fast"></i> ${product.shipping} shipping
                        </div>
                        <div class="quick-view-actions">
                            <button class="btn btn-primary" onclick="window.Cart.addToCart('${product.id}')">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Render pagination
    renderPagination() {
        const container = document.getElementById('cjPagination');
        if (!container) return;
        
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="cjProductsManager.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `
                    <button class="${i === this.currentPage ? 'active' : ''}" 
                            onclick="cjProductsManager.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="cjProductsManager.goToPage(${this.currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        container.innerHTML = paginationHTML;
    }
    
    // Go to specific page
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderCJProducts();
            this.renderPagination();
            
            // Scroll to top of products
            document.getElementById('cjProductsGrid').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    // Utility functions
    generateStars(rating) {
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
}

// Global functions for HTML onclick handlers
function filterCJProducts() {
    cjProductsManager.currentFilters.category = document.getElementById('categoryFilter').value;
    cjProductsManager.currentFilters.price = document.getElementById('priceFilter').value;
    cjProductsManager.filterCJProducts();
}

function sortCJProducts() {
    cjProductsManager.sortCJProducts();
}

function toggleCJView(view) {
    cjProductsManager.toggleCJView(view);
}

function filterCJByCategory(category) {
    cjProductsManager.filterCJByCategory(category);
}

// Initialize CJ Products Manager
let cjProductsManager;

document.addEventListener('DOMContentLoaded', function() {
    cjProductsManager = new CJProductsManager();
    
    // Make it globally accessible
    window.cjProductsManager = cjProductsManager;
});

