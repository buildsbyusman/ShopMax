/**
 * Recently Viewed Products System
 * Tracks and displays recently viewed products
 */

class RecentlyViewedManager {
    constructor() {
        this.maxItems = 20;
        this.storageKey = 'recentlyViewed';
        this.recentlyViewed = [];
        this.init();
    }

    /**
     * Initialize recently viewed system
     */
    init() {
        this.loadRecentlyViewed();
        this.setupEventListeners();
        this.setupPageTracking();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Track product page views
        document.addEventListener('click', (e) => {
            const productLink = e.target.closest('a[href*="product-detail.html"]');
            if (productLink) {
                const productId = this.extractProductId(productLink.href);
                if (productId) {
                    this.trackProductView(productId);
                }
            }
        });

        // Track product card clicks
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.productId;
                if (productId) {
                    this.trackProductView(productId);
                }
            }
        });
    }

    /**
     * Setup page tracking
     */
    setupPageTracking() {
        // Track current page if it's a product detail page
        if (window.location.pathname.includes('product-detail.html')) {
            const productId = this.getProductIdFromURL();
            if (productId) {
                this.trackProductView(productId);
            }
        }
    }

    /**
     * Extract product ID from URL
     */
    extractProductId(url) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        return urlParams.get('id');
    }

    /**
     * Get product ID from current URL
     */
    getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    /**
     * Track product view
     */
    trackProductView(productId) {
        if (!productId) return;

        // Get product data
        const product = this.getProductData(productId);
        if (!product) return;

        // Remove existing entry if it exists
        this.recentlyViewed = this.recentlyViewed.filter(item => item.id !== productId);

        // Add to beginning of array
        this.recentlyViewed.unshift({
            id: productId,
            name: product.name,
            image: product.image,
            price: product.price,
            category: product.category,
            brand: product.brand,
            viewedAt: new Date().toISOString()
        });

        // Limit to max items
        if (this.recentlyViewed.length > this.maxItems) {
            this.recentlyViewed = this.recentlyViewed.slice(0, this.maxItems);
        }

        // Save to storage
        this.saveRecentlyViewed();

        // Update UI if on homepage
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            this.updateRecentlyViewedSection();
        }
    }

    /**
     * Get product data
     */
    getProductData(productId) {
        // Try to get from current page data
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (productElement) {
            return {
                id: productId,
                name: productElement.querySelector('.product-title')?.textContent || 'Product',
                image: productElement.querySelector('.product-image img')?.src || '',
                price: productElement.querySelector('.product-price')?.textContent || '$0',
                category: productElement.dataset.category || '',
                brand: productElement.dataset.brand || ''
            };
        }

        // Try to get from global products data
        if (window.products && Array.isArray(window.products)) {
            return window.products.find(p => p.id === productId);
        }

        // Try to get from localStorage
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            try {
                const products = JSON.parse(savedProducts);
                return products.find(p => p.id === productId);
            } catch (e) {
                console.error('Error parsing saved products:', e);
            }
        }

        return null;
    }

    /**
     * Load recently viewed from storage
     */
    loadRecentlyViewed() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                this.recentlyViewed = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading recently viewed:', e);
                this.recentlyViewed = [];
            }
        }
    }

    /**
     * Save recently viewed to storage
     */
    saveRecentlyViewed() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.recentlyViewed));
    }

    /**
     * Get recently viewed products
     */
    getRecentlyViewed(limit = 10) {
        return this.recentlyViewed.slice(0, limit);
    }

    /**
     * Clear recently viewed
     */
    clearRecentlyViewed() {
        this.recentlyViewed = [];
        this.saveRecentlyViewed();
        this.updateRecentlyViewedSection();
        
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Recently viewed products cleared',
                'info'
            );
        }
    }

    /**
     * Remove specific product from recently viewed
     */
    removeFromRecentlyViewed(productId) {
        this.recentlyViewed = this.recentlyViewed.filter(item => item.id !== productId);
        this.saveRecentlyViewed();
        this.updateRecentlyViewedSection();
    }

    /**
     * Update recently viewed section on homepage
     */
    updateRecentlyViewedSection() {
        const section = document.getElementById('recentlyViewedSection');
        if (!section) return;

        const recentlyViewed = this.getRecentlyViewed(8);
        
        if (recentlyViewed.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        const container = section.querySelector('.products-grid');
        if (container) {
            container.innerHTML = this.generateRecentlyViewedHTML(recentlyViewed);
        }
    }

    /**
     * Generate recently viewed HTML
     */
    generateRecentlyViewedHTML(products) {
        return products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-badges">
                        <span class="badge recently-viewed-badge">Recently Viewed</span>
                    </div>
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn" onclick="wishlistSidebar.addToWishlist('${product.id}')" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn compare-btn" onclick="productComparison.addProduct(${JSON.stringify(product).replace(/"/g, '&quot;')})" title="Add to Comparison">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                        <button class="action-btn quick-view-btn" onclick="quickView.show('${product.id}')" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">
                        <a href="product-detail.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-rating">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <span class="rating-count">(24)</span>
                    </div>
                    <div class="product-actions-bottom">
                        <button class="btn btn-primary add-to-cart-btn" onclick="cart.addToCart('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary remove-recent-btn" onclick="recentlyViewedManager.removeFromRecentlyViewed('${product.id}')" title="Remove from Recently Viewed">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Create recently viewed section for homepage
     */
    createRecentlyViewedSection() {
        const recentlyViewed = this.getRecentlyViewed(8);
        
        if (recentlyViewed.length === 0) {
            return '';
        }

        return `
            <section class="recently-viewed-section" id="recentlyViewedSection">
                <div class="container">
                    <div class="section-header">
                        <h2>Recently Viewed</h2>
                        <button class="btn btn-secondary clear-recent-btn" onclick="recentlyViewedManager.clearRecentlyViewed()">
                            <i class="fas fa-trash"></i>
                            Clear All
                        </button>
                    </div>
                    <div class="products-grid">
                        ${this.generateRecentlyViewedHTML(recentlyViewed)}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Add recently viewed section to homepage
     */
    addToHomepage() {
        const mainContent = document.querySelector('main');
        if (!mainContent) return;

        const recentlyViewedSection = this.createRecentlyViewedSection();
        if (recentlyViewedSection) {
            // Insert after bundles section
            const bundlesSection = document.querySelector('.bundles-section');
            if (bundlesSection) {
                bundlesSection.insertAdjacentHTML('afterend', recentlyViewedSection);
            } else {
                // Insert at the end of main content
                mainContent.insertAdjacentHTML('beforeend', recentlyViewedSection);
            }
        }
    }

    /**
     * Get recently viewed sidebar content
     */
    getRecentlyViewedSidebarContent() {
        const recentlyViewed = this.getRecentlyViewed(5);
        
        if (recentlyViewed.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">👀</div>
                    <h3>No Recently Viewed</h3>
                    <p>Products you view will appear here</p>
                </div>
            `;
        }

        return `
            <div class="recently-viewed-list">
                ${recentlyViewed.map(product => `
                    <div class="recent-item">
                        <div class="recent-item-image">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                        </div>
                        <div class="recent-item-info">
                            <h4 class="recent-item-title">
                                <a href="product-detail.html?id=${product.id}">${product.name}</a>
                            </h4>
                            <div class="recent-item-price">$${product.price}</div>
                            <div class="recent-item-time">${this.getTimeAgo(product.viewedAt)}</div>
                        </div>
                        <button class="remove-recent-item" onclick="recentlyViewedManager.removeFromRecentlyViewed('${product.id}')" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="recently-viewed-footer">
                <button class="btn btn-secondary" onclick="recentlyViewedManager.clearRecentlyViewed()">
                    <i class="fas fa-trash"></i>
                    Clear All
                </button>
                <a href="#" class="btn btn-primary" onclick="recentlyViewedManager.showAllRecentlyViewed()">
                    View All
                </a>
            </div>
        `;
    }

    /**
     * Get time ago string
     */
    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    }

    /**
     * Show all recently viewed products
     */
    showAllRecentlyViewed() {
        // This would typically navigate to a dedicated recently viewed page
        // For now, we'll show a notification
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Recently viewed page coming soon!',
                'info'
            );
        }
    }

    /**
     * Get recently viewed count
     */
    getRecentlyViewedCount() {
        return this.recentlyViewed.length;
    }

    /**
     * Check if product was recently viewed
     */
    wasRecentlyViewed(productId) {
        return this.recentlyViewed.some(item => item.id === productId);
    }

    /**
     * Get recently viewed by category
     */
    getRecentlyViewedByCategory(category, limit = 5) {
        return this.recentlyViewed
            .filter(item => item.category === category)
            .slice(0, limit);
    }

    /**
     * Get recently viewed by brand
     */
    getRecentlyViewedByBrand(brand, limit = 5) {
        return this.recentlyViewed
            .filter(item => item.brand === brand)
            .slice(0, limit);
    }
}

// Create global instance
window.recentlyViewedManager = new RecentlyViewedManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.recentlyViewedManager.init();
    
    // Add recently viewed section to homepage
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        window.recentlyViewedManager.addToHomepage();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecentlyViewedManager;
}
