// Price Tracking and Price History System

class PriceTrackingManager {
    constructor() {
        this.priceHistory = JSON.parse(localStorage.getItem('price_history') || '[]');
        this.priceAlerts = JSON.parse(localStorage.getItem('price_alerts') || '[]');
        this.priceComparisons = JSON.parse(localStorage.getItem('price_comparisons') || '[]');
        this.initializePriceData();
    }
    
    // Initialize with mock price tracking data
    initializePriceData() {
        if (this.priceHistory.length === 0) {
            this.priceHistory = [
                {
                    productId: 'CJ-001',
                    productName: 'Premium Wireless Earbuds',
                    priceHistory: [
                        {
                            date: '2024-01-01',
                            price: 99.99,
                            originalPrice: 99.99,
                            discount: 0,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Initial launch price'
                        },
                        {
                            date: '2024-01-15',
                            price: 89.99,
                            originalPrice: 99.99,
                            discount: 10.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Early bird discount'
                        },
                        {
                            date: '2024-02-01',
                            price: 79.99,
                            originalPrice: 99.99,
                            discount: 20.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Valentine\'s Day sale'
                        },
                        {
                            date: '2024-02-15',
                            price: 85.99,
                            originalPrice: 99.99,
                            discount: 14.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Regular pricing'
                        },
                        {
                            date: '2024-03-01',
                            price: 79.99,
                            originalPrice: 99.99,
                            discount: 20.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Spring sale'
                        }
                    ],
                    currentPrice: 79.99,
                    originalPrice: 99.99,
                    lowestPrice: 79.99,
                    highestPrice: 99.99,
                    averagePrice: 85.19,
                    priceChange: -20.00,
                    priceChangePercent: -20.0,
                    lastUpdated: '2024-03-01'
                },
                {
                    productId: 'CJ-002',
                    productName: 'Smart Fitness Tracker',
                    priceHistory: [
                        {
                            date: '2024-01-01',
                            price: 149.99,
                            originalPrice: 149.99,
                            discount: 0,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Initial launch price'
                        },
                        {
                            date: '2024-01-20',
                            price: 129.99,
                            originalPrice: 149.99,
                            discount: 20.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'New Year promotion'
                        },
                        {
                            date: '2024-02-10',
                            price: 119.99,
                            originalPrice: 149.99,
                            discount: 30.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Fitness month sale'
                        },
                        {
                            date: '2024-02-25',
                            price: 139.99,
                            originalPrice: 149.99,
                            discount: 10.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Regular pricing'
                        }
                    ],
                    currentPrice: 119.99,
                    originalPrice: 149.99,
                    lowestPrice: 119.99,
                    highestPrice: 149.99,
                    averagePrice: 134.99,
                    priceChange: -30.00,
                    priceChangePercent: -20.0,
                    lastUpdated: '2024-02-10'
                },
                {
                    productId: 'CJ-003',
                    productName: 'Smart LED Strip Lights',
                    priceHistory: [
                        {
                            date: '2024-01-01',
                            price: 29.99,
                            originalPrice: 29.99,
                            discount: 0,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Initial launch price'
                        },
                        {
                            date: '2024-01-15',
                            price: 24.99,
                            originalPrice: 29.99,
                            discount: 5.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Bundle discount'
                        },
                        {
                            date: '2024-02-01',
                            price: 19.99,
                            originalPrice: 29.99,
                            discount: 10.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Flash sale'
                        },
                        {
                            date: '2024-02-15',
                            price: 22.99,
                            originalPrice: 29.99,
                            discount: 7.00,
                            currency: 'USD',
                            source: 'ShopMax',
                            availability: 'in_stock',
                            notes: 'Regular pricing'
                        }
                    ],
                    currentPrice: 19.99,
                    originalPrice: 29.99,
                    lowestPrice: 19.99,
                    highestPrice: 29.99,
                    averagePrice: 24.24,
                    priceChange: -10.00,
                    priceChangePercent: -33.3,
                    lastUpdated: '2024-02-01'
                }
            ];
            
            this.savePriceHistory();
        }
        
        if (this.priceAlerts.length === 0) {
            this.initializePriceAlerts();
        }
        
        if (this.priceComparisons.length === 0) {
            this.initializePriceComparisons();
        }
    }
    
    // Initialize price alerts
    initializePriceAlerts() {
        this.priceAlerts = [
            {
                id: 'alert-001',
                productId: 'CJ-001',
                productName: 'Premium Wireless Earbuds',
                targetPrice: 75.00,
                currentPrice: 79.99,
                alertType: 'price_drop',
                isActive: true,
                createdDate: '2024-02-15',
                lastTriggered: null,
                notificationMethod: 'email',
                userEmail: 'user@example.com'
            },
            {
                id: 'alert-002',
                productId: 'CJ-002',
                productName: 'Smart Fitness Tracker',
                targetPrice: 100.00,
                currentPrice: 119.99,
                alertType: 'price_drop',
                isActive: true,
                createdDate: '2024-02-20',
                lastTriggered: null,
                notificationMethod: 'email',
                userEmail: 'user@example.com'
            }
        ];
        
        this.savePriceAlerts();
    }
    
    // Initialize price comparisons
    initializePriceComparisons() {
        this.priceComparisons = [
            {
                productId: 'CJ-001',
                competitors: [
                    {
                        name: 'Amazon',
                        price: 89.99,
                        url: 'https://amazon.com/product',
                        lastChecked: '2024-03-01',
                        availability: 'in_stock'
                    },
                    {
                        name: 'Best Buy',
                        price: 95.99,
                        url: 'https://bestbuy.com/product',
                        lastChecked: '2024-03-01',
                        availability: 'in_stock'
                    },
                    {
                        name: 'Walmart',
                        price: 87.99,
                        url: 'https://walmart.com/product',
                        lastChecked: '2024-03-01',
                        availability: 'in_stock'
                    }
                ]
            }
        ];
        
        this.savePriceComparisons();
    }
    
    // Get price history for a product
    getProductPriceHistory(productId) {
        return this.priceHistory.find(history => history.productId === productId);
    }
    
    // Get price alerts for a product
    getProductPriceAlerts(productId) {
        return this.priceAlerts.filter(alert => alert.productId === productId);
    }
    
    // Get price comparisons for a product
    getProductPriceComparisons(productId) {
        return this.priceComparisons.find(comparison => comparison.productId === productId);
    }
    
    // Render price tracking section
    renderPriceTracking(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const priceHistory = this.getProductPriceHistory(productId);
        const priceAlerts = this.getProductPriceAlerts(productId);
        const priceComparisons = this.getProductPriceComparisons(productId);
        
        if (!priceHistory) {
            container.innerHTML = '<div class="no-price-data">No price tracking data available for this product.</div>';
            return;
        }
        
        let html = `
            <div class="price-tracking-section">
                <div class="price-tracking-header">
                    <h3>Price Tracking & History</h3>
                    <div class="price-tracking-actions">
                        <button class="btn btn-secondary" onclick="priceTrackingManager.createPriceAlert('${productId}')">
                            <i class="fas fa-bell"></i> Set Price Alert
                        </button>
                        <button class="btn btn-secondary" onclick="priceTrackingManager.refreshPrices('${productId}')">
                            <i class="fas fa-sync-alt"></i> Refresh Prices
                        </button>
                    </div>
                </div>
                
                <div class="price-tracking-content">
                    <div class="price-overview">
                        ${this.renderPriceOverview(priceHistory)}
                    </div>
                    
                    <div class="price-tracking-tabs">
                        <button class="price-tab active" onclick="priceTrackingManager.showPriceTab('history')">
                            <i class="fas fa-chart-line"></i> Price History
                        </button>
                        <button class="price-tab" onclick="priceTrackingManager.showPriceTab('alerts')">
                            <i class="fas fa-bell"></i> Price Alerts
                        </button>
                        <button class="price-tab" onclick="priceTrackingManager.showPriceTab('comparison')">
                            <i class="fas fa-balance-scale"></i> Price Comparison
                        </button>
                    </div>
                    
                    <div class="price-tab-content">
                        <div class="price-tab-panel active" id="price-history-panel">
                            ${this.renderPriceHistoryChart(priceHistory)}
                        </div>
                        <div class="price-tab-panel" id="price-alerts-panel">
                            ${this.renderPriceAlerts(priceAlerts, productId)}
                        </div>
                        <div class="price-tab-panel" id="price-comparison-panel">
                            ${this.renderPriceComparison(priceComparisons, productId)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.setupPriceTrackingEventListeners();
    }
    
    // Render price overview
    renderPriceOverview(priceHistory) {
        const priceChangeClass = priceHistory.priceChange < 0 ? 'price-decrease' : 'price-increase';
        const priceChangeIcon = priceHistory.priceChange < 0 ? 'fas fa-arrow-down' : 'fas fa-arrow-up';
        
        return `
            <div class="price-overview-grid">
                <div class="price-overview-item">
                    <div class="price-overview-label">Current Price</div>
                    <div class="price-overview-value current-price">$${priceHistory.currentPrice}</div>
                </div>
                <div class="price-overview-item">
                    <div class="price-overview-label">Original Price</div>
                    <div class="price-overview-value original-price">$${priceHistory.originalPrice}</div>
                </div>
                <div class="price-overview-item">
                    <div class="price-overview-label">Lowest Price</div>
                    <div class="price-overview-value lowest-price">$${priceHistory.lowestPrice}</div>
                </div>
                <div class="price-overview-item">
                    <div class="price-overview-label">Price Change</div>
                    <div class="price-overview-value ${priceChangeClass}">
                        <i class="${priceChangeIcon}"></i>
                        $${Math.abs(priceHistory.priceChange)} (${Math.abs(priceHistory.priceChangePercent)}%)
                    </div>
                </div>
                <div class="price-overview-item">
                    <div class="price-overview-label">Average Price</div>
                    <div class="price-overview-value average-price">$${priceHistory.averagePrice}</div>
                </div>
                <div class="price-overview-item">
                    <div class="price-overview-label">Last Updated</div>
                    <div class="price-overview-value last-updated">${new Date(priceHistory.lastUpdated).toLocaleDateString()}</div>
                </div>
            </div>
        `;
    }
    
    // Render price history chart
    renderPriceHistoryChart(priceHistory) {
        const history = priceHistory.priceHistory;
        const maxPrice = Math.max(...history.map(h => h.price));
        const minPrice = Math.min(...history.map(h => h.price));
        const priceRange = maxPrice - minPrice;
        
        return `
            <div class="price-history-chart">
                <div class="chart-header">
                    <h4>Price History (Last 6 Months)</h4>
                    <div class="chart-controls">
                        <button class="chart-control-btn active" onclick="priceTrackingManager.setChartPeriod('6m')">6M</button>
                        <button class="chart-control-btn" onclick="priceTrackingManager.setChartPeriod('1y')">1Y</button>
                        <button class="chart-control-btn" onclick="priceTrackingManager.setChartPeriod('all')">All</button>
                    </div>
                </div>
                
                <div class="chart-container">
                    <div class="chart-y-axis">
                        <div class="y-axis-label">$${maxPrice}</div>
                        <div class="y-axis-label">$${(maxPrice + minPrice) / 2}</div>
                        <div class="y-axis-label">$${minPrice}</div>
                    </div>
                    
                    <div class="chart-area">
                        <svg class="price-chart" viewBox="0 0 400 200">
                            ${this.renderPriceChartPath(history, maxPrice, minPrice, priceRange)}
                        </svg>
                        
                        <div class="chart-points">
                            ${history.map((point, index) => `
                                <div class="chart-point" 
                                     style="left: ${(index / (history.length - 1)) * 100}%; 
                                            bottom: ${((point.price - minPrice) / priceRange) * 100}%"
                                     data-price="$${point.price}"
                                     data-date="${new Date(point.date).toLocaleDateString()}"
                                     data-notes="${point.notes}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="chart-x-axis">
                    ${history.map((point, index) => `
                        <div class="x-axis-label" style="left: ${(index / (history.length - 1)) * 100}%">
                            ${new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    `).join('')}
                </div>
                
                <div class="chart-legend">
                    <div class="legend-item">
                        <div class="legend-color price-decrease"></div>
                        <span>Price Decrease</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color price-increase"></div>
                        <span>Price Increase</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render price chart path
    renderPriceChartPath(history, maxPrice, minPrice, priceRange) {
        let path = '';
        let previousX = 0;
        let previousY = 0;
        
        history.forEach((point, index) => {
            const x = (index / (history.length - 1)) * 400;
            const y = 200 - ((point.price - minPrice) / priceRange) * 200;
            
            if (index === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
            
            previousX = x;
            previousY = y;
        });
        
        return `
            <path d="${path}" 
                  stroke="var(--primary-brown)" 
                  stroke-width="3" 
                  fill="none" 
                  class="price-line"/>
            <path d="${path} L 400 200 L 0 200 Z" 
                  fill="url(#priceGradient)" 
                  opacity="0.3" 
                  class="price-area"/>
            <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--primary-brown);stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:var(--primary-brown);stop-opacity:0" />
                </linearGradient>
            </defs>
        `;
    }
    
    // Render price alerts
    renderPriceAlerts(alerts, productId) {
        if (alerts.length === 0) {
            return `
                <div class="no-alerts">
                    <i class="fas fa-bell-slash"></i>
                    <h4>No Price Alerts Set</h4>
                    <p>Set up price alerts to be notified when this product's price drops.</p>
                    <button class="btn btn-primary" onclick="priceTrackingManager.createPriceAlert('${productId}')">
                        <i class="fas fa-plus"></i> Create Price Alert
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="price-alerts-list">
                <div class="alerts-header">
                    <h4>Your Price Alerts</h4>
                    <button class="btn btn-secondary" onclick="priceTrackingManager.createPriceAlert('${productId}')">
                        <i class="fas fa-plus"></i> Add Alert
                    </button>
                </div>
                
                <div class="alerts-grid">
                    ${alerts.map(alert => this.renderPriceAlert(alert)).join('')}
                </div>
            </div>
        `;
    }
    
    // Render individual price alert
    renderPriceAlert(alert) {
        const statusClass = alert.isActive ? 'active' : 'inactive';
        const statusIcon = alert.isActive ? 'fas fa-bell' : 'fas fa-bell-slash';
        
        return `
            <div class="price-alert ${statusClass}">
                <div class="alert-header">
                    <div class="alert-status">
                        <i class="${statusIcon}"></i>
                        <span>${alert.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div class="alert-actions">
                        <button class="alert-action-btn" onclick="priceTrackingManager.editPriceAlert('${alert.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="alert-action-btn" onclick="priceTrackingManager.deletePriceAlert('${alert.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="alert-content">
                    <div class="alert-target">
                        <span class="alert-label">Target Price:</span>
                        <span class="alert-value">$${alert.targetPrice}</span>
                    </div>
                    <div class="alert-current">
                        <span class="alert-label">Current Price:</span>
                        <span class="alert-value">$${alert.currentPrice}</span>
                    </div>
                    <div class="alert-difference">
                        <span class="alert-label">Difference:</span>
                        <span class="alert-value ${alert.currentPrice <= alert.targetPrice ? 'price-decrease' : 'price-increase'}">
                            $${Math.abs(alert.currentPrice - alert.targetPrice)}
                        </span>
                    </div>
                </div>
                
                <div class="alert-footer">
                    <div class="alert-date">
                        Created: ${new Date(alert.createdDate).toLocaleDateString()}
                    </div>
                    <div class="alert-method">
                        <i class="fas fa-envelope"></i> Email
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render price comparison
    renderPriceComparison(comparison, productId) {
        if (!comparison || !comparison.competitors || comparison.competitors.length === 0) {
            return `
                <div class="no-comparison">
                    <i class="fas fa-balance-scale"></i>
                    <h4>No Price Comparison Available</h4>
                    <p>We're working on adding price comparisons with other retailers.</p>
                    <button class="btn btn-primary" onclick="priceTrackingManager.requestPriceComparison('${productId}')">
                        <i class="fas fa-plus"></i> Request Comparison
                    </button>
                </div>
            `;
        }
        
        const ourPrice = this.getProductPriceHistory(productId)?.currentPrice || 0;
        
        return `
            <div class="price-comparison">
                <div class="comparison-header">
                    <h4>Price Comparison</h4>
                    <div class="comparison-last-updated">
                        Last updated: ${new Date(comparison.competitors[0].lastChecked).toLocaleDateString()}
                    </div>
                </div>
                
                <div class="comparison-table">
                    <div class="comparison-row header">
                        <div class="comparison-store">Store</div>
                        <div class="comparison-price">Price</div>
                        <div class="comparison-availability">Availability</div>
                        <div class="comparison-savings">Savings</div>
                        <div class="comparison-action">Action</div>
                    </div>
                    
                    <div class="comparison-row our-price">
                        <div class="comparison-store">
                            <i class="fas fa-store"></i>
                            <span>ShopMax</span>
                            <span class="our-badge">Our Price</span>
                        </div>
                        <div class="comparison-price">$${ourPrice}</div>
                        <div class="comparison-availability">
                            <i class="fas fa-check-circle text-success"></i>
                            In Stock
                        </div>
                        <div class="comparison-savings">-</div>
                        <div class="comparison-action">
                            <button class="btn btn-primary btn-sm">Buy Now</button>
                        </div>
                    </div>
                    
                    ${comparison.competitors.map(competitor => {
                        const savings = competitor.price - ourPrice;
                        const savingsClass = savings > 0 ? 'price-decrease' : 'price-increase';
                        const savingsText = savings > 0 ? `Save $${savings.toFixed(2)}` : `+$${Math.abs(savings).toFixed(2)}`;
                        
                        return `
                            <div class="comparison-row competitor">
                                <div class="comparison-store">
                                    <i class="fas fa-external-link-alt"></i>
                                    <span>${competitor.name}</span>
                                </div>
                                <div class="comparison-price">$${competitor.price}</div>
                                <div class="comparison-availability">
                                    <i class="fas fa-${competitor.availability === 'in_stock' ? 'check-circle text-success' : 'times-circle text-danger'}"></i>
                                    ${competitor.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                                </div>
                                <div class="comparison-savings ${savingsClass}">${savingsText}</div>
                                <div class="comparison-action">
                                    <a href="${competitor.url}" target="_blank" class="btn btn-secondary btn-sm">
                                        <i class="fas fa-external-link-alt"></i> Visit
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="comparison-summary">
                    <div class="summary-item">
                        <span class="summary-label">Best Price:</span>
                        <span class="summary-value">$${Math.min(ourPrice, ...comparison.competitors.map(c => c.price))}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Average Price:</span>
                        <span class="summary-value">$${((ourPrice + comparison.competitors.reduce((sum, c) => sum + c.price, 0)) / (comparison.competitors.length + 1)).toFixed(2)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Price Range:</span>
                        <span class="summary-value">$${Math.min(ourPrice, ...comparison.competitors.map(c => c.price))} - $${Math.max(ourPrice, ...comparison.competitors.map(c => c.price))}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Create price alert
    createPriceAlert(productId) {
        const product = this.getProductPriceHistory(productId);
        if (!product) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal price-alert-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content price-alert-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="price-alert-form">
                    <h3>Create Price Alert</h3>
                    <p>Get notified when the price drops below your target amount.</p>
                    
                    <div class="form-group">
                        <label for="targetPrice">Target Price ($)</label>
                        <input type="number" id="targetPrice" step="0.01" min="0" max="${product.currentPrice}" 
                               value="${(product.currentPrice * 0.9).toFixed(2)}" placeholder="Enter target price">
                    </div>
                    
                    <div class="form-group">
                        <label for="alertEmail">Email Address</label>
                        <input type="email" id="alertEmail" value="user@example.com" placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label for="notificationMethod">Notification Method</label>
                        <select id="notificationMethod">
                            <option value="email">Email</option>
                            <option value="browser">Browser Notification</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="priceTrackingManager.savePriceAlert('${productId}')">
                            <i class="fas fa-bell"></i> Create Alert
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Save price alert
    savePriceAlert(productId) {
        const targetPrice = parseFloat(document.getElementById('targetPrice').value);
        const email = document.getElementById('alertEmail').value;
        const method = document.getElementById('notificationMethod').value;
        
        if (!targetPrice || !email) {
            if (window.showNotification) {
                window.showNotification('Please fill in all required fields.', 'error');
            }
            return;
        }
        
        const product = this.getProductPriceHistory(productId);
        if (!product) return;
        
        const newAlert = {
            id: 'alert-' + Date.now(),
            productId: productId,
            productName: product.productName,
            targetPrice: targetPrice,
            currentPrice: product.currentPrice,
            alertType: 'price_drop',
            isActive: true,
            createdDate: new Date().toISOString().split('T')[0],
            lastTriggered: null,
            notificationMethod: method,
            userEmail: email
        };
        
        this.priceAlerts.push(newAlert);
        this.savePriceAlerts();
        
        // Close modal
        document.querySelector('.price-alert-modal').remove();
        
        // Refresh alerts display
        this.renderPriceTracking(productId, 'priceTracking');
        
        if (window.showNotification) {
            window.showNotification('Price alert created successfully!', 'success');
        }
    }
    
    // Show price tab
    showPriceTab(tabName) {
        // Hide all tab panels
        document.querySelectorAll('.price-tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.price-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab panel
        document.getElementById(`price-${tabName}-panel`).classList.add('active');
        
        // Add active class to selected tab
        event.target.classList.add('active');
    }
    
    // Refresh prices
    refreshPrices(productId) {
        // Simulate price refresh
        if (window.showNotification) {
            window.showNotification('Prices refreshed successfully!', 'success');
        }
        
        // In a real implementation, this would fetch updated prices from APIs
        setTimeout(() => {
            this.renderPriceTracking(productId, 'priceTracking');
        }, 1000);
    }
    
    // Setup event listeners
    setupPriceTrackingEventListeners() {
        // Add chart point hover effects
        document.querySelectorAll('.chart-point').forEach(point => {
            point.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'chart-tooltip';
                tooltip.innerHTML = `
                    <div class="tooltip-price">${this.dataset.price}</div>
                    <div class="tooltip-date">${this.dataset.date}</div>
                    <div class="tooltip-notes">${this.dataset.notes}</div>
                `;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            });
            
            point.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.chart-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }
    
    // Save data to localStorage
    savePriceHistory() {
        localStorage.setItem('price_history', JSON.stringify(this.priceHistory));
    }
    
    savePriceAlerts() {
        localStorage.setItem('price_alerts', JSON.stringify(this.priceAlerts));
    }
    
    savePriceComparisons() {
        localStorage.setItem('price_comparisons', JSON.stringify(this.priceComparisons));
    }
}

// Initialize global instance
let priceTrackingManager = new PriceTrackingManager();

// Export for global access
window.PriceTrackingManager = PriceTrackingManager;

