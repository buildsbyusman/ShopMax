// Product Badges System (Best Seller, New, Sale, Prime, etc.)

class ProductBadgesManager {
    constructor() {
        this.badges = JSON.parse(localStorage.getItem('product_badges') || '[]');
        this.badgeTemplates = JSON.parse(localStorage.getItem('badge_templates') || '[]');
        this.badgeAnalytics = JSON.parse(localStorage.getItem('badge_analytics') || '[]');
        this.initializeBadgeData();
    }
    
    // Initialize with mock badge data
    initializeBadgeData() {
        if (this.badges.length === 0) {
            this.badges = [
                {
                    productId: 'CJ-001',
                    badges: [
                        {
                            id: 'badge-001',
                            type: 'best_seller',
                            title: 'Best Seller',
                            description: 'Top selling product in Electronics category',
                            icon: 'fas fa-trophy',
                            color: '#FFD700',
                            backgroundColor: '#FFF8DC',
                            borderColor: '#FFD700',
                            priority: 1,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                salesRank: 1,
                                category: 'electronics',
                                timePeriod: '30_days'
                            },
                            stats: {
                                salesCount: 15420,
                                rank: 1,
                                category: 'Electronics'
                            }
                        },
                        {
                            id: 'badge-002',
                            type: 'new',
                            title: 'New Arrival',
                            description: 'Recently added to our catalog',
                            icon: 'fas fa-sparkles',
                            color: '#00BFFF',
                            backgroundColor: '#E6F7FF',
                            borderColor: '#00BFFF',
                            priority: 2,
                            startDate: '2024-01-15',
                            endDate: '2024-04-15',
                            criteria: {
                                daysSinceAdded: 30,
                                isNew: true
                            },
                            stats: {
                                daysSinceAdded: 15,
                                addedDate: '2024-01-15'
                            }
                        },
                        {
                            id: 'badge-003',
                            type: 'sale',
                            title: '20% Off',
                            description: 'Limited time discount',
                            icon: 'fas fa-percentage',
                            color: '#FF4444',
                            backgroundColor: '#FFE6E6',
                            borderColor: '#FF4444',
                            priority: 3,
                            startDate: '2024-01-20',
                            endDate: '2024-02-20',
                            criteria: {
                                discountPercentage: 20,
                                originalPrice: 99.99,
                                salePrice: 79.99
                            },
                            stats: {
                                discountAmount: 20.00,
                                discountPercentage: 20,
                                originalPrice: 99.99,
                                salePrice: 79.99
                            }
                        }
                    ]
                },
                {
                    productId: 'CJ-002',
                    badges: [
                        {
                            id: 'badge-004',
                            type: 'trending',
                            title: 'Trending',
                            description: 'Rising in popularity',
                            icon: 'fas fa-fire',
                            color: '#FF6B35',
                            backgroundColor: '#FFF0E6',
                            borderColor: '#FF6B35',
                            priority: 1,
                            startDate: '2024-01-10',
                            endDate: '2024-03-10',
                            criteria: {
                                viewIncrease: 150,
                                timePeriod: '7_days'
                            },
                            stats: {
                                viewIncrease: 150,
                                currentViews: 8930,
                                previousViews: 3572
                            }
                        },
                        {
                            id: 'badge-005',
                            type: 'cj_exclusive',
                            title: 'CJ Exclusive',
                            description: 'Exclusive to CJ Dropshipping',
                            icon: 'fas fa-crown',
                            color: '#8B4513',
                            backgroundColor: '#F5E6D3',
                            borderColor: '#8B4513',
                            priority: 2,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                isExclusive: true,
                                supplier: 'CJ Dropshipping'
                            },
                            stats: {
                                isExclusive: true,
                                supplier: 'CJ Dropshipping'
                            }
                        }
                    ]
                },
                {
                    productId: 'CJ-003',
                    badges: [
                        {
                            id: 'badge-006',
                            type: 'limited_edition',
                            title: 'Limited Edition',
                            description: 'Limited quantity available',
                            icon: 'fas fa-gem',
                            color: '#9B59B6',
                            backgroundColor: '#F4E6F7',
                            borderColor: '#9B59B6',
                            priority: 1,
                            startDate: '2024-01-01',
                            endDate: '2024-06-30',
                            criteria: {
                                maxQuantity: 1000,
                                currentStock: 150
                            },
                            stats: {
                                maxQuantity: 1000,
                                currentStock: 150,
                                stockPercentage: 15
                            }
                        },
                        {
                            id: 'badge-007',
                            type: 'free_shipping',
                            title: 'Free Shipping',
                            description: 'Free shipping on this item',
                            icon: 'fas fa-shipping-fast',
                            color: '#27AE60',
                            backgroundColor: '#E6F7E6',
                            borderColor: '#27AE60',
                            priority: 2,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                freeShipping: true,
                                minOrderValue: 0
                            },
                            stats: {
                                freeShipping: true,
                                shippingCost: 0
                            }
                        }
                    ]
                },
                {
                    productId: 'CJ-004',
                    badges: [
                        {
                            id: 'badge-008',
                            type: 'customer_choice',
                            title: "Customer's Choice",
                            description: 'Highly rated by customers',
                            icon: 'fas fa-star',
                            color: '#F39C12',
                            backgroundColor: '#FEF9E7',
                            borderColor: '#F39C12',
                            priority: 1,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                minRating: 4.5,
                                minReviews: 100
                            },
                            stats: {
                                rating: 4.8,
                                reviewCount: 1250,
                                category: 'Accessories'
                            }
                        }
                    ]
                },
                {
                    productId: 'CJ-007',
                    badges: [
                        {
                            id: 'badge-009',
                            type: 'eco_friendly',
                            title: 'Eco Friendly',
                            description: 'Environmentally conscious product',
                            icon: 'fas fa-leaf',
                            color: '#2ECC71',
                            backgroundColor: '#E6F7E6',
                            borderColor: '#2ECC71',
                            priority: 1,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                ecoFriendly: true,
                                certifications: ['Recyclable', 'Biodegradable']
                            },
                            stats: {
                                ecoFriendly: true,
                                certifications: ['Recyclable', 'Biodegradable'],
                                carbonFootprint: 'Low'
                            }
                        },
                        {
                            id: 'badge-010',
                            type: 'fast_delivery',
                            title: 'Fast Delivery',
                            description: 'Same day shipping available',
                            icon: 'fas fa-rocket',
                            color: '#E74C3C',
                            backgroundColor: '#FDE6E6',
                            borderColor: '#E74C3C',
                            priority: 2,
                            startDate: '2024-01-01',
                            endDate: '2024-12-31',
                            criteria: {
                                sameDayShipping: true,
                                deliveryTime: '1-2 days'
                            },
                            stats: {
                                sameDayShipping: true,
                                deliveryTime: '1-2 days',
                                deliveryOptions: ['Standard', 'Express', 'Same Day']
                            }
                        }
                    ]
                }
            ];
            
            this.saveBadges();
        }
        
        if (this.badgeTemplates.length === 0) {
            this.initializeBadgeTemplates();
        }
    }
    
    // Initialize badge templates
    initializeBadgeTemplates() {
        this.badgeTemplates = {
            best_seller: {
                title: 'Best Seller',
                icon: 'fas fa-trophy',
                color: '#FFD700',
                backgroundColor: '#FFF8DC',
                borderColor: '#FFD700',
                criteria: {
                    salesRank: 1,
                    minSales: 1000,
                    timePeriod: '30_days'
                }
            },
            new: {
                title: 'New Arrival',
                icon: 'fas fa-sparkles',
                color: '#00BFFF',
                backgroundColor: '#E6F7FF',
                borderColor: '#00BFFF',
                criteria: {
                    daysSinceAdded: 30,
                    isNew: true
                }
            },
            sale: {
                title: 'Sale',
                icon: 'fas fa-percentage',
                color: '#FF4444',
                backgroundColor: '#FFE6E6',
                borderColor: '#FF4444',
                criteria: {
                    minDiscountPercentage: 10
                }
            },
            trending: {
                title: 'Trending',
                icon: 'fas fa-fire',
                color: '#FF6B35',
                backgroundColor: '#FFF0E6',
                borderColor: '#FF6B35',
                criteria: {
                    viewIncrease: 100,
                    timePeriod: '7_days'
                }
            },
            cj_exclusive: {
                title: 'CJ Exclusive',
                icon: 'fas fa-crown',
                color: '#8B4513',
                backgroundColor: '#F5E6D3',
                borderColor: '#8B4513',
                criteria: {
                    isExclusive: true,
                    supplier: 'CJ Dropshipping'
                }
            },
            limited_edition: {
                title: 'Limited Edition',
                icon: 'fas fa-gem',
                color: '#9B59B6',
                backgroundColor: '#F4E6F7',
                borderColor: '#9B59B6',
                criteria: {
                    maxQuantity: 1000,
                    lowStock: true
                }
            },
            free_shipping: {
                title: 'Free Shipping',
                icon: 'fas fa-shipping-fast',
                color: '#27AE60',
                backgroundColor: '#E6F7E6',
                borderColor: '#27AE60',
                criteria: {
                    freeShipping: true
                }
            },
            customer_choice: {
                title: "Customer's Choice",
                icon: 'fas fa-star',
                color: '#F39C12',
                backgroundColor: '#FEF9E7',
                borderColor: '#F39C12',
                criteria: {
                    minRating: 4.5,
                    minReviews: 50
                }
            },
            eco_friendly: {
                title: 'Eco Friendly',
                icon: 'fas fa-leaf',
                color: '#2ECC71',
                backgroundColor: '#E6F7E6',
                borderColor: '#2ECC71',
                criteria: {
                    ecoFriendly: true
                }
            },
            fast_delivery: {
                title: 'Fast Delivery',
                icon: 'fas fa-rocket',
                color: '#E74C3C',
                backgroundColor: '#FDE6E6',
                borderColor: '#E74C3C',
                criteria: {
                    sameDayShipping: true
                }
            }
        };
        
        this.saveBadgeTemplates();
    }
    
    // Get badges for a product
    getProductBadges(productId) {
        const productBadges = this.badges.find(badge => badge.productId === productId);
        return productBadges ? productBadges.badges : [];
    }
    
    // Get active badges for a product
    getActiveProductBadges(productId) {
        const badges = this.getProductBadges(productId);
        const now = new Date();
        
        return badges.filter(badge => {
            const startDate = new Date(badge.startDate);
            const endDate = new Date(badge.endDate);
            return now >= startDate && now <= endDate;
        }).sort((a, b) => a.priority - b.priority);
    }
    
    // Render badges for a product
    renderProductBadges(productId, containerId, maxBadges = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const activeBadges = this.getActiveProductBadges(productId);
        const badgesToShow = activeBadges.slice(0, maxBadges);
        
        if (badgesToShow.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        let html = `
            <div class="product-badges">
                ${badgesToShow.map(badge => this.renderBadge(badge)).join('')}
                ${activeBadges.length > maxBadges ? `
                    <div class="badge-more" onclick="productBadgesManager.showAllBadges('${productId}')">
                        <span class="badge-count">+${activeBadges.length - maxBadges}</span>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                ` : ''}
            </div>
        `;
        
        container.innerHTML = html;
        this.setupBadgeEventListeners();
    }
    
    // Render a single badge
    renderBadge(badge) {
        return `
            <div class="product-badge ${badge.type}" 
                 data-badge-id="${badge.id}"
                 onclick="productBadgesManager.showBadgeDetails('${badge.id}')"
                 title="${badge.description}">
                <i class="${badge.icon}"></i>
                <span class="badge-text">${badge.title}</span>
                ${badge.type === 'sale' && badge.stats.discountPercentage ? 
                    `<span class="badge-discount">${badge.stats.discountPercentage}%</span>` : ''}
            </div>
        `;
    }
    
    // Render badge details modal
    showBadgeDetails(badgeId) {
        const badge = this.findBadgeById(badgeId);
        if (!badge) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal badge-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content badge-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="badge-details">
                    <div class="badge-header">
                        <div class="badge-icon-large ${badge.type}">
                            <i class="${badge.icon}"></i>
                        </div>
                        <div class="badge-info">
                            <h3>${badge.title}</h3>
                            <p>${badge.description}</p>
                        </div>
                    </div>
                    
                    <div class="badge-stats">
                        <h4>Statistics</h4>
                        <div class="stats-grid">
                            ${this.renderBadgeStats(badge)}
                        </div>
                    </div>
                    
                    <div class="badge-criteria">
                        <h4>Eligibility Criteria</h4>
                        <div class="criteria-list">
                            ${this.renderBadgeCriteria(badge)}
                        </div>
                    </div>
                    
                    <div class="badge-validity">
                        <div class="validity-info">
                            <span class="validity-label">Valid from:</span>
                            <span class="validity-date">${new Date(badge.startDate).toLocaleDateString()}</span>
                        </div>
                        <div class="validity-info">
                            <span class="validity-label">Valid until:</span>
                            <span class="validity-date">${new Date(badge.endDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Track badge view
        this.trackBadgeAnalytics('view', badgeId);
    }
    
    // Render badge stats
    renderBadgeStats(badge) {
        const stats = badge.stats;
        let html = '';
        
        switch (badge.type) {
            case 'best_seller':
                html = `
                    <div class="stat-item">
                        <span class="stat-label">Sales Count:</span>
                        <span class="stat-value">${this.formatNumber(stats.salesCount)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rank:</span>
                        <span class="stat-value">#${stats.rank}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Category:</span>
                        <span class="stat-value">${stats.category}</span>
                    </div>
                `;
                break;
            case 'sale':
                html = `
                    <div class="stat-item">
                        <span class="stat-label">Discount:</span>
                        <span class="stat-value">${stats.discountPercentage}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">You Save:</span>
                        <span class="stat-value">$${stats.discountAmount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Original Price:</span>
                        <span class="stat-value">$${stats.originalPrice}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Sale Price:</span>
                        <span class="stat-value">$${stats.salePrice}</span>
                    </div>
                `;
                break;
            case 'trending':
                html = `
                    <div class="stat-item">
                        <span class="stat-label">View Increase:</span>
                        <span class="stat-value">+${stats.viewIncrease}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Current Views:</span>
                        <span class="stat-value">${this.formatNumber(stats.currentViews)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Previous Views:</span>
                        <span class="stat-value">${this.formatNumber(stats.previousViews)}</span>
                    </div>
                `;
                break;
            case 'customer_choice':
                html = `
                    <div class="stat-item">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">${stats.rating}/5.0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Reviews:</span>
                        <span class="stat-value">${this.formatNumber(stats.reviewCount)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Category:</span>
                        <span class="stat-value">${stats.category}</span>
                    </div>
                `;
                break;
            case 'limited_edition':
                html = `
                    <div class="stat-item">
                        <span class="stat-label">Max Quantity:</span>
                        <span class="stat-value">${this.formatNumber(stats.maxQuantity)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Current Stock:</span>
                        <span class="stat-value">${this.formatNumber(stats.currentStock)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Stock Left:</span>
                        <span class="stat-value">${stats.stockPercentage}%</span>
                    </div>
                `;
                break;
            default:
                html = '<div class="stat-item"><span class="stat-value">No specific statistics available</span></div>';
        }
        
        return html;
    }
    
    // Render badge criteria
    renderBadgeCriteria(badge) {
        const criteria = badge.criteria;
        let html = '';
        
        Object.entries(criteria).forEach(([key, value]) => {
            const label = this.formatCriteriaLabel(key);
            html += `
                <div class="criteria-item">
                    <span class="criteria-label">${label}:</span>
                    <span class="criteria-value">${this.formatCriteriaValue(value)}</span>
                </div>
            `;
        });
        
        return html;
    }
    
    // Show all badges for a product
    showAllBadges(productId) {
        const activeBadges = this.getActiveProductBadges(productId);
        
        const modal = document.createElement('div');
        modal.className = 'modal all-badges-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content all-badges-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="all-badges-header">
                    <h3>All Product Badges</h3>
                    <p>Complete list of badges for this product</p>
                </div>
                <div class="all-badges-grid">
                    ${activeBadges.map(badge => `
                        <div class="badge-card ${badge.type}" onclick="productBadgesManager.showBadgeDetails('${badge.id}')">
                            <div class="badge-card-icon">
                                <i class="${badge.icon}"></i>
                            </div>
                            <div class="badge-card-info">
                                <h4>${badge.title}</h4>
                                <p>${badge.description}</p>
                                <div class="badge-card-priority">
                                    Priority: ${badge.priority}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Find badge by ID
    findBadgeById(badgeId) {
        for (const productBadges of this.badges) {
            const badge = productBadges.badges.find(b => b.id === badgeId);
            if (badge) return badge;
        }
        return null;
    }
    
    // Format number for display
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Format criteria label
    formatCriteriaLabel(key) {
        const labelMap = {
            'salesRank': 'Sales Rank',
            'minSales': 'Minimum Sales',
            'timePeriod': 'Time Period',
            'daysSinceAdded': 'Days Since Added',
            'isNew': 'Is New Product',
            'discountPercentage': 'Discount Percentage',
            'viewIncrease': 'View Increase',
            'isExclusive': 'Is Exclusive',
            'supplier': 'Supplier',
            'maxQuantity': 'Maximum Quantity',
            'lowStock': 'Low Stock',
            'freeShipping': 'Free Shipping',
            'minRating': 'Minimum Rating',
            'minReviews': 'Minimum Reviews',
            'ecoFriendly': 'Eco Friendly',
            'sameDayShipping': 'Same Day Shipping',
            'deliveryTime': 'Delivery Time'
        };
        
        return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }
    
    // Format criteria value
    formatCriteriaValue(value) {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        } else if (Array.isArray(value)) {
            return value.join(', ');
        } else if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value.toString();
    }
    
    // Track badge analytics
    trackBadgeAnalytics(action, badgeId) {
        const analytics = {
            action: action,
            badgeId: badgeId,
            timestamp: new Date().toISOString()
        };
        
        this.badgeAnalytics.push(analytics);
        this.saveBadgeAnalytics();
    }
    
    // Setup event listeners
    setupBadgeEventListeners() {
        // Add any additional event listeners here
    }
    
    // Save data to localStorage
    saveBadges() {
        localStorage.setItem('product_badges', JSON.stringify(this.badges));
    }
    
    saveBadgeTemplates() {
        localStorage.setItem('badge_templates', JSON.stringify(this.badgeTemplates));
    }
    
    saveBadgeAnalytics() {
        localStorage.setItem('badge_analytics', JSON.stringify(this.badgeAnalytics));
    }
}

// Initialize global instance
let productBadgesManager = new ProductBadgesManager();

// Export for global access
window.ProductBadgesManager = ProductBadgesManager;

