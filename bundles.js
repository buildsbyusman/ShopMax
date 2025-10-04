// Product Bundles and Frequently Bought Together System

class ProductBundlesManager {
    constructor() {
        this.bundles = JSON.parse(localStorage.getItem('product_bundles') || '[]');
        this.frequentlyBoughtTogether = JSON.parse(localStorage.getItem('frequently_bought_together') || '[]');
        this.bundleAnalytics = JSON.parse(localStorage.getItem('bundle_analytics') || '[]');
        this.initializeBundles();
    }
    
    // Initialize with mock bundle data
    initializeBundles() {
        if (this.bundles.length === 0) {
            this.bundles = [
                {
                    id: 'bundle-001',
                    name: 'Smartphone Essentials Bundle',
                    description: 'Everything you need for your new smartphone',
                    mainProduct: 'CJ-001',
                    products: ['CJ-001', 'CJ-019', 'CJ-002', 'CJ-005'],
                    originalTotal: 89.97,
                    bundlePrice: 69.99,
                    savings: 19.98,
                    savingsPercent: 22,
                    category: 'electronics',
                    popularity: 95,
                    image: 'https://via.placeholder.com/400x300?text=Smartphone+Bundle',
                    badges: ['Best Seller', 'Popular'],
                    inStock: true,
                    stock: 50
                },
                {
                    id: 'bundle-002',
                    name: 'Home Office Setup Bundle',
                    description: 'Complete home office essentials for productivity',
                    mainProduct: 'CJ-004',
                    products: ['CJ-004', 'CJ-003', 'CJ-010', 'CJ-012'],
                    originalTotal: 65.97,
                    bundlePrice: 49.99,
                    savings: 15.98,
                    savingsPercent: 24,
                    category: 'home',
                    popularity: 87,
                    image: 'https://via.placeholder.com/400x300?text=Home+Office+Bundle',
                    badges: ['Trending', 'New'],
                    inStock: true,
                    stock: 30
                },
                {
                    id: 'bundle-003',
                    name: 'Fitness & Wellness Bundle',
                    description: 'Complete fitness and wellness package',
                    mainProduct: 'CJ-013',
                    products: ['CJ-013', 'CJ-014', 'CJ-015', 'CJ-002'],
                    originalTotal: 76.97,
                    bundlePrice: 59.99,
                    savings: 16.98,
                    savingsPercent: 22,
                    category: 'sports',
                    popularity: 92,
                    image: 'https://via.placeholder.com/400x300?text=Fitness+Bundle',
                    badges: ['Best Seller', 'Popular'],
                    inStock: true,
                    stock: 25
                },
                {
                    id: 'bundle-004',
                    name: 'Beauty & Grooming Bundle',
                    description: 'Professional beauty and grooming essentials',
                    mainProduct: 'CJ-016',
                    products: ['CJ-016', 'CJ-017', 'CJ-018', 'CJ-007'],
                    originalTotal: 104.97,
                    bundlePrice: 79.99,
                    savings: 24.98,
                    savingsPercent: 24,
                    category: 'beauty',
                    popularity: 78,
                    image: 'https://via.placeholder.com/400x300?text=Beauty+Bundle',
                    badges: ['Trending'],
                    inStock: true,
                    stock: 20
                },
                {
                    id: 'bundle-005',
                    name: 'Car Accessories Bundle',
                    description: 'Essential car accessories for comfort and safety',
                    mainProduct: 'CJ-019',
                    products: ['CJ-019', 'CJ-020', 'CJ-021', 'CJ-008'],
                    originalTotal: 76.97,
                    bundlePrice: 59.99,
                    savings: 16.98,
                    savingsPercent: 22,
                    category: 'automotive',
                    popularity: 83,
                    image: 'https://via.placeholder.com/400x300?text=Car+Bundle',
                    badges: ['Popular'],
                    inStock: true,
                    stock: 35
                }
            ];
            
            this.saveBundles();
        }
        
        if (this.frequentlyBoughtTogether.length === 0) {
            this.initializeFrequentlyBoughtTogether();
        }
    }
    
    // Initialize frequently bought together data
    initializeFrequentlyBoughtTogether() {
        this.frequentlyBoughtTogether = [
            {
                mainProduct: 'CJ-001',
                frequentlyBought: [
                    { productId: 'CJ-019', frequency: 85, confidence: 0.78 },
                    { productId: 'CJ-002', frequency: 72, confidence: 0.65 },
                    { productId: 'CJ-005', frequency: 68, confidence: 0.62 },
                    { productId: 'CJ-008', frequency: 45, confidence: 0.41 }
                ]
            },
            {
                mainProduct: 'CJ-002',
                frequentlyBought: [
                    { productId: 'CJ-001', frequency: 78, confidence: 0.72 },
                    { productId: 'CJ-013', frequency: 65, confidence: 0.58 },
                    { productId: 'CJ-014', frequency: 58, confidence: 0.52 },
                    { productId: 'CJ-015', frequency: 42, confidence: 0.38 }
                ]
            },
            {
                mainProduct: 'CJ-004',
                frequentlyBought: [
                    { productId: 'CJ-003', frequency: 82, confidence: 0.75 },
                    { productId: 'CJ-010', frequency: 69, confidence: 0.63 },
                    { productId: 'CJ-012', frequency: 55, confidence: 0.50 },
                    { productId: 'CJ-001', frequency: 38, confidence: 0.35 }
                ]
            },
            {
                mainProduct: 'CJ-013',
                frequentlyBought: [
                    { productId: 'CJ-014', frequency: 88, confidence: 0.82 },
                    { productId: 'CJ-015', frequency: 75, confidence: 0.68 },
                    { productId: 'CJ-002', frequency: 62, confidence: 0.56 },
                    { productId: 'CJ-016', frequency: 35, confidence: 0.32 }
                ]
            }
        ];
        
        this.saveFrequentlyBoughtTogether();
    }
    
    // Get bundles for a specific product
    getBundlesForProduct(productId, limit = 3) {
        return this.bundles
            .filter(bundle => bundle.products.includes(productId))
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit);
    }
    
    // Get frequently bought together for a product
    getFrequentlyBoughtTogether(productId, limit = 4) {
        const fbt = this.frequentlyBoughtTogether.find(item => item.mainProduct === productId);
        if (!fbt) return [];
        
        return fbt.frequentlyBought
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, limit)
            .map(item => {
                const product = this.getProductById(item.productId);
                return {
                    ...product,
                    frequency: item.frequency,
                    confidence: item.confidence
                };
            })
            .filter(product => product); // Remove null products
    }
    
    // Get all available bundles
    getAllBundles(category = null, limit = 6) {
        let bundles = [...this.bundles];
        
        if (category) {
            bundles = bundles.filter(bundle => bundle.category === category);
        }
        
        return bundles
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit);
    }
    
    // Render bundle section
    renderBundleSection(containerId, productId = null, type = 'frequently_bought') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let bundles = [];
        let title = '';
        let subtitle = '';
        
        switch (type) {
            case 'frequently_bought':
                bundles = this.getFrequentlyBoughtTogether(productId);
                title = 'Frequently bought together';
                subtitle = 'Customers who bought this item also bought';
                break;
            case 'bundles':
                bundles = this.getBundlesForProduct(productId);
                title = 'Complete the bundle';
                subtitle = 'Save more when you buy together';
                break;
            case 'all_bundles':
                bundles = this.getAllBundles();
                title = 'Popular Bundles';
                subtitle = 'Save more with our curated bundles';
                break;
        }
        
        if (bundles.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        if (type === 'frequently_bought') {
            container.innerHTML = this.renderFrequentlyBoughtTogether(bundles, productId);
        } else if (type === 'bundles') {
            container.innerHTML = this.renderProductBundles(bundles, productId);
        } else {
            container.innerHTML = this.renderAllBundles(bundles);
        }
        
        this.setupBundleEventListeners(container);
    }
    
    // Render frequently bought together
    renderFrequentlyBoughtTogether(products, mainProductId) {
        const mainProduct = this.getProductById(mainProductId);
        if (!mainProduct) return '';
        
        const totalPrice = products.reduce((sum, product) => sum + product.price, mainProduct.price);
        const bundlePrice = totalPrice * 0.85; // 15% discount
        const savings = totalPrice - bundlePrice;
        
        return `
            <div class="frequently-bought-section">
                <div class="container">
                    <h2>Frequently bought together</h2>
                    <div class="bundle-container">
                        <div class="bundle-items">
                            <div class="bundle-item main-product">
                                <div class="bundle-item-image">
                                    <img src="${mainProduct.image}" alt="${mainProduct.title}">
                                </div>
                                <div class="bundle-item-info">
                                    <h4>${mainProduct.title}</h4>
                                    <div class="bundle-price">$${mainProduct.price}</div>
                                </div>
                            </div>
                            
                            <div class="bundle-plus">
                                <i class="fas fa-plus"></i>
                            </div>
                            
                            ${products.map(product => `
                                <div class="bundle-item">
                                    <div class="bundle-item-image">
                                        <img src="${product.image}" alt="${product.title}">
                                    </div>
                                    <div class="bundle-item-info">
                                        <h4>${product.title}</h4>
                                        <div class="bundle-price">$${product.price}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="bundle-total">
                            <div class="bundle-price-info">
                                <span class="bundle-total-price">$${bundlePrice.toFixed(2)}</span>
                                <span class="bundle-savings">Save $${savings.toFixed(2)} (15%)</span>
                            </div>
                            <button class="bundle-add-all-btn" onclick="bundlesManager.addBundleToCart('${mainProductId}', [${products.map(p => `'${p.id}'`).join(',')}])">
                                <i class="fas fa-shopping-cart"></i> Add all to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render product bundles
    renderProductBundles(bundles, productId) {
        return `
            <div class="product-bundles-section">
                <div class="container">
                    <h2>Complete the bundle</h2>
                    <p class="section-subtitle">Save more when you buy together</p>
                    <div class="bundles-grid">
                        ${bundles.map(bundle => this.renderBundleCard(bundle, productId)).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render all bundles
    renderAllBundles(bundles) {
        return `
            <div class="all-bundles-section">
                <div class="container">
                    <h2>Popular Bundles</h2>
                    <p class="section-subtitle">Save more with our curated bundles</p>
                    <div class="bundles-grid">
                        ${bundles.map(bundle => this.renderBundleCard(bundle)).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render individual bundle card
    renderBundleCard(bundle, highlightProductId = null) {
        const isHighlighted = highlightProductId && bundle.products.includes(highlightProductId);
        
        return `
            <div class="bundle-card ${isHighlighted ? 'highlighted' : ''}" data-bundle-id="${bundle.id}">
                <div class="bundle-image">
                    <img src="${bundle.image}" alt="${bundle.name}">
                    <div class="bundle-badges">
                        ${bundle.badges.map(badge => 
                            `<span class="bundle-badge ${badge.toLowerCase().replace(' ', '-')}">${badge}</span>`
                        ).join('')}
                        <span class="bundle-badge savings">Save ${bundle.savingsPercent}%</span>
                    </div>
                    <div class="bundle-actions">
                        <button class="bundle-action-btn wishlist-btn" onclick="bundlesManager.toggleBundleWishlist('${bundle.id}')" 
                                title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="bundle-action-btn quick-view-btn" onclick="bundlesManager.quickViewBundle('${bundle.id}')" 
                                title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="bundle-info">
                    <h3 class="bundle-title">${bundle.name}</h3>
                    <p class="bundle-description">${bundle.description}</p>
                    <div class="bundle-products-count">
                        <i class="fas fa-box"></i> ${bundle.products.length} items included
                    </div>
                    <div class="bundle-pricing">
                        <div class="bundle-price-row">
                            <span class="bundle-current-price">$${bundle.bundlePrice}</span>
                            <span class="bundle-original-price">$${bundle.originalTotal}</span>
                        </div>
                        <div class="bundle-savings-info">
                            <span class="bundle-savings-amount">Save $${bundle.savings}</span>
                            <span class="bundle-savings-percent">(${bundle.savingsPercent}% off)</span>
                        </div>
                    </div>
                    <div class="bundle-availability">
                        ${bundle.inStock ? 
                            '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                            '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                        }
                    </div>
                    <button class="bundle-add-to-cart-btn" onclick="bundlesManager.addBundleToCart('${bundle.id}')" 
                            ${!bundle.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add Bundle to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    // Add bundle to cart
    addBundleToCart(bundleId, productIds = null) {
        let bundle;
        
        if (productIds) {
            // Custom bundle from frequently bought together
            bundle = {
                id: `custom-${Date.now()}`,
                name: 'Custom Bundle',
                products: productIds,
                bundlePrice: 0 // Will be calculated
            };
        } else {
            bundle = this.bundles.find(b => b.id === bundleId);
        }
        
        if (!bundle) return;
        
        // Add each product in the bundle to cart
        bundle.products.forEach(productId => {
            if (window.Cart) {
                window.Cart.addToCart(productId);
            }
        });
        
        // Track bundle purchase
        this.trackBundlePurchase(bundleId);
        
        // Show success message
        this.showBundleAddedMessage(bundle.name);
    }
    
    // Toggle bundle wishlist
    toggleBundleWishlist(bundleId) {
        const bundle = this.bundles.find(b => b.id === bundleId);
        if (!bundle) return;
        
        // Add all products in bundle to wishlist
        bundle.products.forEach(productId => {
            if (window.wishlistSystem) {
                window.wishlistSystem.toggleWishlist(productId);
            }
        });
        
        // Show feedback
        this.showBundleWishlistMessage(bundle.name);
    }
    
    // Quick view bundle
    quickViewBundle(bundleId) {
        const bundle = this.bundles.find(b => b.id === bundleId);
        if (!bundle) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal bundle-quick-view-modal';
        modal.style.display = 'block';
        
        const bundleProducts = bundle.products.map(productId => this.getProductById(productId)).filter(Boolean);
        
        modal.innerHTML = `
            <div class="modal-content bundle-quick-view-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="bundle-quick-view-container">
                    <div class="bundle-quick-view-image">
                        <img src="${bundle.image}" alt="${bundle.name}">
                    </div>
                    <div class="bundle-quick-view-info">
                        <h2>${bundle.name}</h2>
                        <p class="bundle-description">${bundle.description}</p>
                        <div class="bundle-pricing">
                            <div class="bundle-price-row">
                                <span class="bundle-current-price">$${bundle.bundlePrice}</span>
                                <span class="bundle-original-price">$${bundle.originalTotal}</span>
                            </div>
                            <div class="bundle-savings-info">
                                <span class="bundle-savings-amount">Save $${bundle.savings}</span>
                                <span class="bundle-savings-percent">(${bundle.savingsPercent}% off)</span>
                            </div>
                        </div>
                        <div class="bundle-products-preview">
                            <h3>Items included:</h3>
                            <div class="bundle-products-list">
                                ${bundleProducts.map(product => `
                                    <div class="bundle-product-item">
                                        <img src="${product.image}" alt="${product.title}">
                                        <div class="bundle-product-info">
                                            <h4>${product.title}</h4>
                                            <span class="bundle-product-price">$${product.price}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="bundle-quick-view-actions">
                            <button class="btn btn-primary" onclick="bundlesManager.addBundleToCart('${bundle.id}')">
                                <i class="fas fa-shopping-cart"></i> Add Bundle to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="bundlesManager.toggleBundleWishlist('${bundle.id}')">
                                <i class="far fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Setup event listeners
    setupBundleEventListeners(container) {
        // Add hover effects and animations
        const bundleCards = container.querySelectorAll('.bundle-card');
        bundleCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Track bundle analytics
    trackBundlePurchase(bundleId) {
        const analytics = {
            bundleId: bundleId,
            timestamp: new Date().toISOString(),
            type: 'purchase'
        };
        
        this.bundleAnalytics.push(analytics);
        this.saveBundleAnalytics();
    }
    
    // Show messages
    showBundleAddedMessage(bundleName) {
        if (window.showNotification) {
            window.showNotification(`Bundle "${bundleName}" added to cart!`, 'success');
        }
    }
    
    showBundleWishlistMessage(bundleName) {
        if (window.showNotification) {
            window.showNotification(`Bundle "${bundleName}" added to wishlist!`, 'info');
        }
    }
    
    // Utility functions
    getProductById(productId) {
        // Try to get from CJ products first
        if (window.cjProductsManager) {
            const cjProduct = window.cjProductsManager.products.find(p => p.id === productId);
            if (cjProduct) return cjProduct;
        }
        
        // Fallback to main products
        if (window.ShopMax?.products) {
            return window.ShopMax.products.find(p => p.id === productId);
        }
        
        return null;
    }
    
    // Save data to localStorage
    saveBundles() {
        localStorage.setItem('product_bundles', JSON.stringify(this.bundles));
    }
    
    saveFrequentlyBoughtTogether() {
        localStorage.setItem('frequently_bought_together', JSON.stringify(this.frequentlyBoughtTogether));
    }
    
    saveBundleAnalytics() {
        localStorage.setItem('bundle_analytics', JSON.stringify(this.bundleAnalytics));
    }
}

// Initialize global instance
let bundlesManager = new ProductBundlesManager();

// Export for global access
window.ProductBundlesManager = ProductBundlesManager;

