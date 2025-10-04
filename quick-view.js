/**
 * Product Quick View Modal System
 * Provides quick product preview without leaving the current page
 */

class QuickViewManager {
    constructor() {
        this.quickViewModal = null;
        this.currentProduct = null;
        this.init();
    }

    /**
     * Initialize quick view system
     */
    init() {
        this.createQuickViewModal();
        this.setupEventListeners();
    }

    /**
     * Create quick view modal
     */
    createQuickViewModal() {
        this.quickViewModal = document.createElement('div');
        this.quickViewModal.className = 'quick-view-modal';
        this.quickViewModal.innerHTML = `
            <div class="quick-view-overlay" onclick="quickView.close()"></div>
            <div class="quick-view-content">
                <button class="quick-view-close" onclick="quickView.close()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-body">
                    <div class="quick-view-loading">
                        <div class="loading-spinner loading-spinner-large"></div>
                        <p>Loading product details...</p>
                    </div>
                    <div class="quick-view-product" style="display: none;">
                        <div class="quick-view-images">
                            <div class="main-image">
                                <img id="quickViewMainImage" src="" alt="" loading="lazy">
                                <div class="image-zoom-indicator">
                                    <i class="fas fa-search-plus"></i>
                                    <span>Click to zoom</span>
                                </div>
                            </div>
                            <div class="thumbnail-images" id="quickViewThumbnails">
                                <!-- Thumbnails will be loaded here -->
                            </div>
                        </div>
                        <div class="quick-view-info">
                            <div class="product-header">
                                <h1 class="product-title" id="quickViewTitle"></h1>
                                <div class="product-rating" id="quickViewRating">
                                    <!-- Rating will be loaded here -->
                                </div>
                                <div class="product-price" id="quickViewPrice"></div>
                            </div>
                            
                            <div class="product-options">
                                <div class="option-group" id="quickViewVariants">
                                    <!-- Variants will be loaded here -->
                                </div>
                                <div class="option-group" id="quickViewQuantity">
                                    <label for="quickViewQty">Quantity:</label>
                                    <div class="quantity-selector">
                                        <button class="qty-btn qty-decrease" onclick="quickView.decreaseQuantity()">-</button>
                                        <input type="number" id="quickViewQty" value="1" min="1" max="99">
                                        <button class="qty-btn qty-increase" onclick="quickView.increaseQuantity()">+</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="product-actions">
                                <button class="btn btn-primary add-to-cart-btn" onclick="quickView.addToCart()">
                                    <i class="fas fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                                <button class="btn btn-secondary wishlist-btn" onclick="quickView.addToWishlist()">
                                    <i class="fas fa-heart"></i>
                                    Add to Wishlist
                                </button>
                                <button class="btn btn-secondary compare-btn" onclick="quickView.addToComparison()">
                                    <i class="fas fa-balance-scale"></i>
                                    Compare
                                </button>
                            </div>
                            
                            <div class="product-details">
                                <div class="detail-item">
                                    <span class="detail-label">Availability:</span>
                                    <span class="detail-value" id="quickViewAvailability"></span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">SKU:</span>
                                    <span class="detail-value" id="quickViewSKU"></span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Brand:</span>
                                    <span class="detail-value" id="quickViewBrand"></span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Category:</span>
                                    <span class="detail-value" id="quickViewCategory"></span>
                                </div>
                            </div>
                            
                            <div class="product-description" id="quickViewDescription">
                                <!-- Description will be loaded here -->
                            </div>
                            
                            <div class="quick-view-footer">
                                <a href="#" class="btn btn-outline view-full-details" onclick="quickView.viewFullDetails()">
                                    <i class="fas fa-external-link-alt"></i>
                                    View Full Details
                                </a>
                                <button class="btn btn-outline share-btn" onclick="quickView.shareProduct()">
                                    <i class="fas fa-share-alt"></i>
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.quickViewModal);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.quickViewModal.classList.contains('show')) {
                this.close();
            }
        });

        // Handle image clicks for zoom
        this.quickViewModal.addEventListener('click', (e) => {
            if (e.target.closest('.main-image img')) {
                this.zoomImage();
            }
        });
    }

    /**
     * Show quick view for product
     */
    async show(productId) {
        if (!productId) return;

        this.quickViewModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Show loading state
        this.showLoadingState();
        
        try {
            // Load product data
            const product = await this.loadProductData(productId);
            if (!product) {
                this.showError('Product not found');
                return;
            }

            this.currentProduct = product;
            this.renderProduct(product);
            this.hideLoadingState();
            
            // Track view
            if (window.recentlyViewedManager) {
                window.recentlyViewedManager.trackProductView(productId);
            }
            
            // Announce to screen readers
            if (window.accessibilityManager) {
                window.accessibilityManager.announce(
                    `Quick view opened for ${product.name}`,
                    'polite'
                );
            }
            
        } catch (error) {
            console.error('Error loading product:', error);
            this.showError('Failed to load product details');
        }
    }

    /**
     * Load product data
     */
    async loadProductData(productId) {
        // Try to get from current page data first
        let product = this.getProductFromPage(productId);
        
        if (!product) {
            // Try to get from global products data
            product = this.getProductFromGlobalData(productId);
        }
        
        if (!product) {
            // Try to get from localStorage
            product = this.getProductFromStorage(productId);
        }
        
        if (!product) {
            // Simulate API call
            product = await this.simulateApiCall(productId);
        }
        
        return product;
    }

    /**
     * Get product from current page
     */
    getProductFromPage(productId) {
        const productElement = document.querySelector(`[data-product-id="${productId}"]`);
        if (!productElement) return null;

        return {
            id: productId,
            name: productElement.querySelector('.product-title')?.textContent || 'Product',
            image: productElement.querySelector('.product-image img')?.src || '',
            price: this.extractPrice(productElement.querySelector('.product-price')?.textContent),
            rating: 4.5,
            reviewCount: 24,
            category: productElement.dataset.category || 'General',
            brand: productElement.dataset.brand || 'Unknown',
            sku: `SKU-${productId}`,
            inStock: true,
            description: 'This is a great product with excellent features and quality.',
            images: [productElement.querySelector('.product-image img')?.src || ''],
            variants: []
        };
    }

    /**
     * Get product from global data
     */
    getProductFromGlobalData(productId) {
        if (window.products && Array.isArray(window.products)) {
            return window.products.find(p => p.id === productId);
        }
        return null;
    }

    /**
     * Get product from storage
     */
    getProductFromStorage(productId) {
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
     * Simulate API call
     */
    async simulateApiCall(productId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: productId,
                    name: `Product ${productId}`,
                    image: 'https://via.placeholder.com/400x400?text=Product+Image',
                    price: Math.floor(Math.random() * 500) + 50,
                    rating: 4.0 + Math.random(),
                    reviewCount: Math.floor(Math.random() * 100) + 10,
                    category: 'Electronics',
                    brand: 'Brand Name',
                    sku: `SKU-${productId}`,
                    inStock: Math.random() > 0.2,
                    description: 'This is a high-quality product with excellent features and great value for money.',
                    images: [
                        'https://via.placeholder.com/400x400?text=Image+1',
                        'https://via.placeholder.com/400x400?text=Image+2',
                        'https://via.placeholder.com/400x400?text=Image+3'
                    ],
                    variants: [
                        { name: 'Color', options: ['Red', 'Blue', 'Green'] },
                        { name: 'Size', options: ['S', 'M', 'L', 'XL'] }
                    ]
                });
            }, 500);
        });
    }

    /**
     * Extract price from string
     */
    extractPrice(priceString) {
        if (!priceString) return 0;
        const match = priceString.match(/\$?(\d+(?:\.\d{2})?)/);
        return match ? parseFloat(match[1]) : 0;
    }

    /**
     * Render product in quick view
     */
    renderProduct(product) {
        // Update basic info
        document.getElementById('quickViewTitle').textContent = product.name;
        document.getElementById('quickViewPrice').textContent = `$${product.price}`;
        document.getElementById('quickViewAvailability').textContent = product.inStock ? 'In Stock' : 'Out of Stock';
        document.getElementById('quickViewSKU').textContent = product.sku;
        document.getElementById('quickViewBrand').textContent = product.brand;
        document.getElementById('quickViewCategory').textContent = product.category;
        document.getElementById('quickViewDescription').textContent = product.description;

        // Update main image
        const mainImage = document.getElementById('quickViewMainImage');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;

        // Update thumbnails
        this.renderThumbnails(product.images);

        // Update rating
        this.renderRating(product.rating, product.reviewCount);

        // Update variants
        this.renderVariants(product.variants);

        // Update view full details link
        const viewFullLink = document.querySelector('.view-full-details');
        viewFullLink.href = `product-detail.html?id=${product.id}`;

        // Show product content
        document.querySelector('.quick-view-product').style.display = 'block';
    }

    /**
     * Render thumbnails
     */
    renderThumbnails(images) {
        const thumbnailsContainer = document.getElementById('quickViewThumbnails');
        thumbnailsContainer.innerHTML = images.map((image, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="quickView.changeMainImage('${image}')">
                <img src="${image}" alt="Thumbnail ${index + 1}" loading="lazy">
            </div>
        `).join('');
    }

    /**
     * Render rating
     */
    renderRating(rating, reviewCount) {
        const ratingContainer = document.getElementById('quickViewRating');
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        ratingContainer.innerHTML = `
            <div class="stars">${starsHTML}</div>
            <span class="rating-text">${rating.toFixed(1)} (${reviewCount} reviews)</span>
        `;
    }

    /**
     * Render variants
     */
    renderVariants(variants) {
        const variantsContainer = document.getElementById('quickViewVariants');
        if (!variants || variants.length === 0) {
            variantsContainer.style.display = 'none';
            return;
        }

        variantsContainer.style.display = 'block';
        variantsContainer.innerHTML = variants.map(variant => `
            <div class="variant-group">
                <label>${variant.name}:</label>
                <div class="variant-options">
                    ${variant.options.map(option => `
                        <button class="variant-option" onclick="quickView.selectVariant('${variant.name}', '${option}')">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    /**
     * Change main image
     */
    changeMainImage(imageSrc) {
        const mainImage = document.getElementById('quickViewMainImage');
        mainImage.src = imageSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        event.target.closest('.thumbnail').classList.add('active');
    }

    /**
     * Select variant
     */
    selectVariant(variantName, option) {
        // Update selected variant
        document.querySelectorAll(`.variant-option`).forEach(btn => {
            btn.classList.remove('selected');
        });
        event.target.classList.add('selected');
        
        // Update product data
        if (this.currentProduct) {
            this.currentProduct.selectedVariants = this.currentProduct.selectedVariants || {};
            this.currentProduct.selectedVariants[variantName] = option;
        }
    }

    /**
     * Increase quantity
     */
    increaseQuantity() {
        const qtyInput = document.getElementById('quickViewQty');
        const currentQty = parseInt(qtyInput.value);
        if (currentQty < 99) {
            qtyInput.value = currentQty + 1;
        }
    }

    /**
     * Decrease quantity
     */
    decreaseQuantity() {
        const qtyInput = document.getElementById('quickViewQty');
        const currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;
        }
    }

    /**
     * Add to cart
     */
    addToCart() {
        if (!this.currentProduct) return;

        const quantity = parseInt(document.getElementById('quickViewQty').value);
        
        if (window.cart) {
            window.cart.addToCart(this.currentProduct.id, quantity);
            
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    `${this.currentProduct.name} added to cart`,
                    'success'
                );
            }
            
            if (window.accessibilityManager) {
                window.accessibilityManager.announceCartUpdate(
                    `${this.currentProduct.name} added to cart. Quantity: ${quantity}`
                );
            }
        }
    }

    /**
     * Add to wishlist
     */
    addToWishlist() {
        if (!this.currentProduct) return;

        if (window.wishlistSidebar) {
            window.wishlistSidebar.addToWishlist(this.currentProduct.id);
            
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    `${this.currentProduct.name} added to wishlist`,
                    'success'
                );
            }
        }
    }

    /**
     * Add to comparison
     */
    addToComparison() {
        if (!this.currentProduct) return;

        if (window.productComparison) {
            const success = window.productComparison.addProduct(this.currentProduct);
            if (success) {
                if (window.errorHandler) {
                    window.errorHandler.showNotification(
                        `${this.currentProduct.name} added to comparison`,
                        'success'
                    );
                }
            }
        }
    }

    /**
     * View full details
     */
    viewFullDetails() {
        if (this.currentProduct) {
            window.location.href = `product-detail.html?id=${this.currentProduct.id}`;
        }
    }

    /**
     * Share product
     */
    shareProduct() {
        if (!this.currentProduct) return;

        if (navigator.share) {
            navigator.share({
                title: this.currentProduct.name,
                text: `Check out this product: ${this.currentProduct.name}`,
                url: window.location.origin + `/product-detail.html?id=${this.currentProduct.id}`
            });
        } else {
            // Fallback to copying URL
            const url = `${window.location.origin}/product-detail.html?id=${this.currentProduct.id}`;
            navigator.clipboard.writeText(url).then(() => {
                if (window.errorHandler) {
                    window.errorHandler.showNotification(
                        'Product link copied to clipboard',
                        'success'
                    );
                }
            });
        }
    }

    /**
     * Zoom image
     */
    zoomImage() {
        // This would typically open an image zoom modal
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Image zoom feature coming soon!',
                'info'
            );
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        document.querySelector('.quick-view-loading').style.display = 'block';
        document.querySelector('.quick-view-product').style.display = 'none';
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        document.querySelector('.quick-view-loading').style.display = 'none';
    }

    /**
     * Show error state
     */
    showError(message) {
        document.querySelector('.quick-view-loading').innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="quickView.close()">Close</button>
            </div>
        `;
    }

    /**
     * Close quick view
     */
    close() {
        this.quickViewModal.classList.remove('show');
        document.body.style.overflow = '';
        this.currentProduct = null;
        
        // Reset form
        document.getElementById('quickViewQty').value = '1';
        document.querySelectorAll('.variant-option').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
}

// Create global instance
window.quickView = new QuickViewManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.quickView.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuickViewManager;
}
