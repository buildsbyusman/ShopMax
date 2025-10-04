// Product Recommendations System with CJ Dropshipping Integration

class RecommendationsSystem {
    constructor() {
        this.recommendations = JSON.parse(localStorage.getItem('product_recommendations') || '[]');
        this.userBehavior = JSON.parse(localStorage.getItem('user_behavior') || '[]');
        this.cjProducts = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    
    // Track user behavior for recommendations
    trackUserBehavior(action, productId, data = {}) {
        const behavior = {
            id: Date.now().toString(),
            userId: this.currentUser?.id || 'guest',
            action: action, // 'view', 'add_to_cart', 'purchase', 'wishlist', 'compare'
            productId: productId,
            timestamp: new Date().toISOString(),
            data: data
        };
        
        this.userBehavior.push(behavior);
        
        // Keep only last 100 behaviors to prevent storage bloat
        if (this.userBehavior.length > 100) {
            this.userBehavior = this.userBehavior.slice(-100);
        }
        
        localStorage.setItem('user_behavior', JSON.stringify(this.userBehavior));
        this.updateRecommendations();
    }
    
    // Get personalized recommendations
    getPersonalizedRecommendations(productId = null, limit = 8) {
        const recommendations = [];
        
        // 1. Based on current product (if viewing a product)
        if (productId) {
            recommendations.push(...this.getRelatedProducts(productId, limit / 2));
        }
        
        // 2. Based on user behavior
        recommendations.push(...this.getBehaviorBasedRecommendations(limit / 2));
        
        // 3. Based on popular items
        recommendations.push(...this.getPopularRecommendations(limit / 4));
        
        // 4. CJ Dropshipping trending products
        recommendations.push(...this.getCJTrendingProducts(limit / 4));
        
        // Remove duplicates and limit results
        const uniqueRecommendations = this.removeDuplicates(recommendations);
        return uniqueRecommendations.slice(0, limit);
    }
    
    // Get related products based on category and features
    getRelatedProducts(productId, limit = 4) {
        const currentProduct = this.getProductById(productId);
        if (!currentProduct) return [];
        
        const products = window.ShopMax?.products || [];
        const relatedProducts = products.filter(product => {
            if (product.id == productId) return false;
            
            // Same category
            if (product.category === currentProduct.category) return true;
            
            // Similar price range (±20%)
            const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price;
            if (priceDiff <= 0.2) return true;
            
            // Similar rating
            if (Math.abs(product.rating - currentProduct.rating) <= 1) return true;
            
            return false;
        });
        
        return this.shuffleArray(relatedProducts).slice(0, limit);
    }
    
    // Get recommendations based on user behavior
    getBehaviorBasedRecommendations(limit = 4) {
        if (this.userBehavior.length === 0) return [];
        
        const userProducts = this.userBehavior
            .filter(behavior => behavior.userId === (this.currentUser?.id || 'guest'))
            .map(behavior => behavior.productId);
        
        if (userProducts.length === 0) return [];
        
        const products = window.ShopMax?.products || [];
        const recommendations = [];
        
        // Find products in same categories as viewed products
        userProducts.forEach(productId => {
            const product = this.getProductById(productId);
            if (product) {
                const categoryProducts = products.filter(p => 
                    p.category === product.category && p.id != productId
                );
                recommendations.push(...categoryProducts);
            }
        });
        
        return this.shuffleArray(recommendations).slice(0, limit);
    }
    
    // Get popular recommendations
    getPopularRecommendations(limit = 4) {
        const products = window.ShopMax?.products || [];
        return products
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
    
    // Get CJ Dropshipping trending products
    getCJTrendingProducts(limit = 4) {
        // Mock CJ trending products - in real app, this would come from CJ API
        const cjTrending = [
            {
                id: 'CJ-TREND-001',
                title: 'Wireless Earbuds Pro',
                price: 29.99,
                originalPrice: 49.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Wireless+Earbuds',
                rating: 4.6,
                reviews: 1247,
                description: 'Premium wireless earbuds with active noise cancellation',
                inStock: true,
                stock: 200,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Best Seller']
            },
            {
                id: 'CJ-TREND-002',
                title: 'Smart Fitness Band',
                price: 19.99,
                originalPrice: 35.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Fitness+Band',
                rating: 4.4,
                reviews: 892,
                description: 'Advanced fitness tracking with heart rate monitor',
                inStock: true,
                stock: 150,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'New']
            },
            {
                id: 'CJ-TREND-003',
                title: 'LED Strip Lights RGB',
                price: 12.99,
                originalPrice: 24.99,
                category: 'home',
                image: 'https://via.placeholder.com/300x300?text=LED+Strip',
                rating: 4.7,
                reviews: 2156,
                description: 'Smart LED strip lights with app control',
                inStock: true,
                stock: 300,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Sale']
            },
            {
                id: 'CJ-TREND-004',
                title: 'Phone Stand Adjustable',
                price: 8.99,
                originalPrice: 15.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/300x300?text=Phone+Stand',
                rating: 4.5,
                reviews: 678,
                description: 'Adjustable phone stand for desk and bed',
                inStock: true,
                stock: 250,
                source: 'cj_dropshipping',
                trending: true,
                badges: ['Trending', 'Prime']
            }
        ];
        
        return cjTrending.slice(0, limit);
    }
    
    // Get "Customers who bought this also bought" recommendations
    getCustomersAlsoBought(productId, limit = 6) {
        // Mock data - in real app, this would come from purchase history analysis
        const mockAlsoBought = [
            {
                id: 'AB-001',
                title: 'Phone Case Clear',
                price: 9.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/200x200?text=Phone+Case',
                rating: 4.3,
                reviews: 234,
                description: 'Clear protective phone case',
                inStock: true,
                stock: 100
            },
            {
                id: 'AB-002',
                title: 'Screen Protector',
                price: 6.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/200x200?text=Screen+Protector',
                rating: 4.5,
                reviews: 189,
                description: 'Tempered glass screen protector',
                inStock: true,
                stock: 150
            },
            {
                id: 'AB-003',
                title: 'USB-C Cable',
                price: 7.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/200x200?text=USB+Cable',
                rating: 4.2,
                reviews: 156,
                description: 'Fast charging USB-C cable',
                inStock: true,
                stock: 200
            }
        ];
        
        return mockAlsoBought.slice(0, limit);
    }
    
    // Get "Frequently bought together" recommendations
    getFrequentlyBoughtTogether(productId, limit = 3) {
        // Mock data - in real app, this would come from basket analysis
        const mockBundle = [
            {
                id: 'FBT-001',
                title: 'Premium Carrying Case',
                price: 19.99,
                category: 'accessories',
                image: 'https://via.placeholder.com/200x200?text=Carrying+Case',
                rating: 4.6,
                reviews: 89,
                description: 'Premium carrying case with protection',
                inStock: true,
                stock: 75
            },
            {
                id: 'FBT-002',
                title: 'Extra USB-C Cable',
                price: 9.99,
                category: 'electronics',
                image: 'https://via.placeholder.com/200x200?text=Extra+Cable',
                rating: 4.4,
                reviews: 67,
                description: 'Extra USB-C charging cable',
                inStock: true,
                stock: 120
            },
            {
                id: 'FBT-003',
                title: 'Cleaning Kit',
                price: 4.99,
                category: 'accessories',
                image: 'https://via.placeholder.com/200x200?text=Cleaning+Kit',
                rating: 4.2,
                reviews: 45,
                description: 'Professional cleaning kit',
                inStock: true,
                stock: 90
            }
        ];
        
        return mockBundle.slice(0, limit);
    }
    
    // Update recommendations based on user behavior
    updateRecommendations() {
        // This would typically run in the background
        // For now, we'll just trigger a UI update
        this.renderRecommendations();
    }
    
    // Render recommendations in various sections
    renderRecommendations(containerId = 'recommendationsContainer', type = 'personalized') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        let recommendations = [];
        let title = '';
        
        switch (type) {
            case 'personalized':
                recommendations = this.getPersonalizedRecommendations();
                title = 'Recommended for You';
                break;
            case 'trending':
                recommendations = this.getCJTrendingProducts();
                title = 'Trending Now';
                break;
            case 'popular':
                recommendations = this.getPopularRecommendations();
                title = 'Popular Products';
                break;
            case 'customers_also_bought':
                const currentProductId = container.dataset.productId;
                recommendations = this.getCustomersAlsoBought(currentProductId);
                title = 'Customers who bought this also bought';
                break;
            case 'frequently_bought_together':
                const productId = container.dataset.productId;
                recommendations = this.getFrequentlyBoughtTogether(productId);
                title = 'Frequently bought together';
                break;
        }
        
        if (recommendations.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = `
            <div class="recommendations-section">
                <h2 class="recommendations-title">${title}</h2>
                <div class="recommendations-grid">
                    ${recommendations.map(product => this.renderRecommendationCard(product)).join('')}
                </div>
            </div>
        `;
        
        this.setupRecommendationEventListeners(container);
    }
    
    // Render individual recommendation card
    renderRecommendationCard(product) {
        const isOnSale = product.originalPrice && product.price < product.originalPrice;
        const discountPercent = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        return `
            <div class="recommendation-card" data-product-id="${product.id}">
                <div class="recommendation-image">
                    <img src="${product.image}" alt="${product.title}" 
                         onclick="window.location.href='product-detail.html?id=${product.id}'">
                    ${product.badges ? product.badges.map(badge => 
                        `<span class="recommendation-badge ${badge.toLowerCase().replace(' ', '-')}">${badge}</span>`
                    ).join('') : ''}
                    ${isOnSale ? `<span class="recommendation-badge sale">${discountPercent}% OFF</span>` : ''}
                    <div class="recommendation-actions">
                        <button class="action-btn wishlist-btn" onclick="wishlistSystem.toggleWishlist(${product.id})" 
                                title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn compare-btn" onclick="compareSystem.toggleCompare(${product.id})" 
                                title="Add to Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                        <button class="action-btn quick-view-btn" onclick="recommendationsSystem.quickView(${product.id})" 
                                title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="recommendation-info">
                    <h3 class="recommendation-title" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        ${product.title}
                    </h3>
                    <div class="recommendation-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                    <div class="recommendation-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="recommendation-availability">
                        ${product.inStock ? 
                            '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                            '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                        }
                    </div>
                    <button class="add-to-cart-btn" onclick="window.Cart.addToCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    // Setup event listeners for recommendations
    setupRecommendationEventListeners(container) {
        // Add hover effects and animations
        const cards = container.querySelectorAll('.recommendation-card');
        cards.forEach(card => {
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
    
    // Quick view functionality
    quickView(productId) {
        const product = this.getProductById(productId);
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
                        <div class="quick-view-actions">
                            <button class="btn btn-primary" onclick="window.Cart.addToCart(${product.id})">
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
    
    // Utility functions
    getProductById(productId) {
        const products = window.ShopMax?.products || [];
        return products.find(p => p.id == productId);
    }
    
    removeDuplicates(recommendations) {
        const seen = new Set();
        return recommendations.filter(product => {
            if (seen.has(product.id)) {
                return false;
            }
            seen.add(product.id);
            return true;
        });
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
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

// Initialize global instance
let recommendationsSystem = new RecommendationsSystem();

// Export for global access
window.RecommendationsSystem = RecommendationsSystem;

