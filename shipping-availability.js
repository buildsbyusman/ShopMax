// Product Availability and Shipping Information System

class ShippingAvailabilityManager {
    constructor() {
        this.shippingOptions = JSON.parse(localStorage.getItem('shipping_options') || '[]');
        this.availabilityData = JSON.parse(localStorage.getItem('availability_data') || '[]');
        this.userLocation = JSON.parse(localStorage.getItem('user_location') || 'null');
        this.initializeShippingData();
    }
    
    // Initialize with mock shipping and availability data
    initializeShippingData() {
        if (this.shippingOptions.length === 0) {
            this.shippingOptions = [
                {
                    id: 'standard',
                    name: 'Standard Shipping',
                    description: 'Regular delivery within 5-7 business days',
                    price: 0,
                    minOrderValue: 50,
                    estimatedDays: '5-7',
                    icon: 'fas fa-truck',
                    color: '#28a745'
                },
                {
                    id: 'express',
                    name: 'Express Shipping',
                    description: 'Fast delivery within 2-3 business days',
                    price: 9.99,
                    minOrderValue: 0,
                    estimatedDays: '2-3',
                    icon: 'fas fa-shipping-fast',
                    color: '#007bff'
                },
                {
                    id: 'overnight',
                    name: 'Overnight Shipping',
                    description: 'Next business day delivery',
                    price: 19.99,
                    minOrderValue: 0,
                    estimatedDays: '1',
                    icon: 'fas fa-rocket',
                    color: '#dc3545'
                },
                {
                    id: 'pickup',
                    name: 'Store Pickup',
                    description: 'Pick up from our nearest store',
                    price: 0,
                    minOrderValue: 0,
                    estimatedDays: 'Same day',
                    icon: 'fas fa-store',
                    color: '#6f42c1'
                }
            ];
            
            this.saveShippingOptions();
        }
        
        if (this.availabilityData.length === 0) {
            this.initializeAvailabilityData();
        }
    }
    
    // Initialize availability data
    initializeAvailabilityData() {
        this.availabilityData = [
            {
                productId: 'CJ-001',
                stock: 150,
                lowStockThreshold: 20,
                availability: {
                    inStock: true,
                    estimatedRestock: null,
                    backorderAvailable: false,
                    preorderAvailable: false
                },
                shipping: {
                    standard: { available: true, days: '5-7' },
                    express: { available: true, days: '2-3' },
                    overnight: { available: true, days: '1' },
                    pickup: { available: true, days: 'Same day' }
                },
                warehouses: [
                    {
                        id: 'warehouse-1',
                        name: 'Main Warehouse',
                        location: 'Los Angeles, CA',
                        stock: 100,
                        shippingZones: ['US-CA', 'US-NV', 'US-AZ']
                    },
                    {
                        id: 'warehouse-2',
                        name: 'East Coast Warehouse',
                        location: 'New York, NY',
                        stock: 50,
                        shippingZones: ['US-NY', 'US-NJ', 'US-CT', 'US-PA']
                    }
                ]
            },
            {
                productId: 'CJ-002',
                stock: 80,
                lowStockThreshold: 15,
                availability: {
                    inStock: true,
                    estimatedRestock: null,
                    backorderAvailable: true,
                    preorderAvailable: false
                },
                shipping: {
                    standard: { available: true, days: '5-7' },
                    express: { available: true, days: '2-3' },
                    overnight: { available: false, days: null },
                    pickup: { available: true, days: 'Same day' }
                },
                warehouses: [
                    {
                        id: 'warehouse-1',
                        name: 'Main Warehouse',
                        location: 'Los Angeles, CA',
                        stock: 50,
                        shippingZones: ['US-CA', 'US-NV', 'US-AZ']
                    },
                    {
                        id: 'warehouse-2',
                        name: 'East Coast Warehouse',
                        location: 'New York, NY',
                        stock: 30,
                        shippingZones: ['US-NY', 'US-NJ', 'US-CT', 'US-PA']
                    }
                ]
            },
            {
                productId: 'CJ-003',
                stock: 0,
                lowStockThreshold: 25,
                availability: {
                    inStock: false,
                    estimatedRestock: '2024-02-15',
                    backorderAvailable: true,
                    preorderAvailable: false
                },
                shipping: {
                    standard: { available: false, days: null },
                    express: { available: false, days: null },
                    overnight: { available: false, days: null },
                    pickup: { available: false, days: null }
                },
                warehouses: [
                    {
                        id: 'warehouse-1',
                        name: 'Main Warehouse',
                        location: 'Los Angeles, CA',
                        stock: 0,
                        shippingZones: ['US-CA', 'US-NV', 'US-AZ']
                    }
                ]
            }
        ];
        
        this.saveAvailabilityData();
    }
    
    // Get availability data for a product
    getProductAvailability(productId) {
        return this.availabilityData.find(item => item.productId === productId);
    }
    
    // Get shipping options for a product
    getShippingOptions(productId, userLocation = null) {
        const availability = this.getProductAvailability(productId);
        if (!availability) return this.shippingOptions;
        
        const availableOptions = this.shippingOptions.filter(option => {
            return availability.shipping[option.id] && availability.shipping[option.id].available;
        });
        
        // Filter by user location if provided
        if (userLocation) {
            return availableOptions.filter(option => {
                return this.isShippingAvailableToLocation(option.id, userLocation, availability.warehouses);
            });
        }
        
        return availableOptions;
    }
    
    // Check if shipping is available to a specific location
    isShippingAvailableToLocation(shippingMethod, location, warehouses) {
        // This would integrate with a real shipping API
        // For now, we'll use mock logic
        return true;
    }
    
    // Calculate shipping cost
    calculateShippingCost(shippingMethod, orderValue, userLocation = null) {
        const option = this.shippingOptions.find(opt => opt.id === shippingMethod);
        if (!option) return 0;
        
        let cost = option.price;
        
        // Free shipping for orders above minimum value
        if (orderValue >= option.minOrderValue) {
            cost = 0;
        }
        
        // Location-based pricing (mock)
        if (userLocation) {
            cost = this.getLocationBasedShippingCost(shippingMethod, userLocation, cost);
        }
        
        return cost;
    }
    
    // Get location-based shipping cost
    getLocationBasedShippingCost(shippingMethod, location, baseCost) {
        // Mock location-based pricing
        const locationMultipliers = {
            'US-CA': 1.0,
            'US-NY': 1.1,
            'US-TX': 1.2,
            'US-FL': 1.15,
            'US-AL': 1.3
        };
        
        const multiplier = locationMultipliers[location] || 1.2;
        return Math.round(baseCost * multiplier * 100) / 100;
    }
    
    // Get estimated delivery date
    getEstimatedDeliveryDate(shippingMethod, userLocation = null) {
        const option = this.shippingOptions.find(opt => opt.id === shippingMethod);
        if (!option) return null;
        
        const days = parseInt(option.estimatedDays.split('-')[0]);
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + days);
        
        // Add buffer for location
        if (userLocation && this.isRemoteLocation(userLocation)) {
            deliveryDate.setDate(deliveryDate.getDate() + 2);
        }
        
        return deliveryDate;
    }
    
    // Check if location is remote
    isRemoteLocation(location) {
        const remoteLocations = ['US-AK', 'US-HI', 'US-PR'];
        return remoteLocations.includes(location);
    }
    
    // Render availability information
    renderAvailabilityInfo(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const availability = this.getProductAvailability(productId);
        if (!availability) {
            container.innerHTML = '';
            return;
        }
        
        let html = '<div class="availability-info">';
        
        // Stock status
        html += this.renderStockStatus(availability);
        
        // Shipping information
        html += this.renderShippingInfo(productId, availability);
        
        // Warehouse information
        html += this.renderWarehouseInfo(availability);
        
        html += '</div>';
        
        container.innerHTML = html;
    }
    
    // Render stock status
    renderStockStatus(availability) {
        const { stock, lowStockThreshold, availability: avail } = availability;
        
        let statusClass = 'in-stock';
        let statusText = 'In Stock';
        let statusIcon = 'fas fa-check-circle';
        
        if (!avail.inStock) {
            statusClass = 'out-of-stock';
            statusText = 'Out of Stock';
            statusIcon = 'fas fa-times-circle';
        } else if (stock <= lowStockThreshold) {
            statusClass = 'low-stock';
            statusText = 'Low Stock';
            statusIcon = 'fas fa-exclamation-triangle';
        }
        
        return `
            <div class="stock-status ${statusClass}">
                <div class="status-header">
                    <i class="${statusIcon}"></i>
                    <span class="status-text">${statusText}</span>
                </div>
                <div class="stock-details">
                    <div class="stock-count">${stock} units available</div>
                    ${stock <= lowStockThreshold ? '<div class="low-stock-warning">Only a few left!</div>' : ''}
                    ${avail.estimatedRestock ? `<div class="restock-info">Expected restock: ${new Date(avail.estimatedRestock).toLocaleDateString()}</div>` : ''}
                    ${avail.backorderAvailable ? '<div class="backorder-info">Backorder available</div>' : ''}
                    ${avail.preorderAvailable ? '<div class="preorder-info">Pre-order available</div>' : ''}
                </div>
            </div>
        `;
    }
    
    // Render shipping information
    renderShippingInfo(productId, availability) {
        const shippingOptions = this.getShippingOptions(productId);
        
        return `
            <div class="shipping-info">
                <h4>Shipping Options</h4>
                <div class="shipping-options">
                    ${shippingOptions.map(option => this.renderShippingOption(option, availability.shipping[option.id])).join('')}
                </div>
            </div>
        `;
    }
    
    // Render individual shipping option
    renderShippingOption(option, availability) {
        const isAvailable = availability && availability.available;
        const days = availability ? availability.days : 'N/A';
        
        return `
            <div class="shipping-option ${isAvailable ? 'available' : 'unavailable'}">
                <div class="shipping-icon" style="color: ${option.color}">
                    <i class="${option.icon}"></i>
                </div>
                <div class="shipping-details">
                    <div class="shipping-name">${option.name}</div>
                    <div class="shipping-description">${option.description}</div>
                    <div class="shipping-time">${days} business days</div>
                    <div class="shipping-price">
                        ${option.price === 0 ? 'Free' : `$${option.price}`}
                        ${option.minOrderValue > 0 ? ` (Free on orders over $${option.minOrderValue})` : ''}
                    </div>
                </div>
                <div class="shipping-status">
                    ${isAvailable ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}
                </div>
            </div>
        `;
    }
    
    // Render warehouse information
    renderWarehouseInfo(availability) {
        return `
            <div class="warehouse-info">
                <h4>Warehouse Locations</h4>
                <div class="warehouses">
                    ${availability.warehouses.map(warehouse => `
                        <div class="warehouse">
                            <div class="warehouse-name">${warehouse.name}</div>
                            <div class="warehouse-location">${warehouse.location}</div>
                            <div class="warehouse-stock">${warehouse.stock} units</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Render shipping calculator
    renderShippingCalculator(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const availability = this.getProductAvailability(productId);
        if (!availability) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = `
            <div class="shipping-calculator">
                <h4>Calculate Shipping</h4>
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="shippingZipCode">ZIP Code:</label>
                        <input type="text" id="shippingZipCode" placeholder="Enter ZIP code" maxlength="10">
                    </div>
                    <div class="form-group">
                        <label for="shippingMethod">Shipping Method:</label>
                        <select id="shippingMethod">
                            ${this.getShippingOptions(productId).map(option => 
                                `<option value="${option.id}">${option.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <button class="calculate-btn" onclick="shippingAvailabilityManager.calculateShipping('${productId}')">
                        Calculate
                    </button>
                </div>
                <div class="shipping-results" id="shippingResults">
                    <!-- Results will be displayed here -->
                </div>
            </div>
        `;
    }
    
    // Calculate shipping for specific location
    calculateShipping(productId) {
        const zipCode = document.getElementById('shippingZipCode').value;
        const shippingMethod = document.getElementById('shippingMethod').value;
        const resultsContainer = document.getElementById('shippingResults');
        
        if (!zipCode) {
            resultsContainer.innerHTML = '<div class="error">Please enter a ZIP code</div>';
            return;
        }
        
        // Mock calculation - in real app, this would call shipping API
        const cost = this.calculateShippingCost(shippingMethod, 0, zipCode);
        const deliveryDate = this.getEstimatedDeliveryDate(shippingMethod, zipCode);
        const option = this.shippingOptions.find(opt => opt.id === shippingMethod);
        
        resultsContainer.innerHTML = `
            <div class="shipping-result">
                <div class="result-header">
                    <i class="${option.icon}" style="color: ${option.color}"></i>
                    <span class="result-method">${option.name}</span>
                </div>
                <div class="result-details">
                    <div class="result-cost">$${cost.toFixed(2)}</div>
                    <div class="result-delivery">Estimated delivery: ${deliveryDate.toLocaleDateString()}</div>
                    <div class="result-time">${option.estimatedDays} business days</div>
                </div>
            </div>
        `;
    }
    
    // Update stock after purchase
    updateStock(productId, quantity) {
        const availability = this.getProductAvailability(productId);
        if (availability) {
            availability.stock = Math.max(0, availability.stock - quantity);
            this.saveAvailabilityData();
        }
    }
    
    // Check if product is available
    isProductAvailable(productId, quantity = 1) {
        const availability = this.getProductAvailability(productId);
        if (!availability) return false;
        
        return availability.availability.inStock && availability.stock >= quantity;
    }
    
    // Get stock level
    getStockLevel(productId) {
        const availability = this.getProductAvailability(productId);
        return availability ? availability.stock : 0;
    }
    
    // Set user location
    setUserLocation(location) {
        this.userLocation = location;
        localStorage.setItem('user_location', JSON.stringify(location));
    }
    
    // Get user location
    getUserLocation() {
        return this.userLocation;
    }
    
    // Save data to localStorage
    saveShippingOptions() {
        localStorage.setItem('shipping_options', JSON.stringify(this.shippingOptions));
    }
    
    saveAvailabilityData() {
        localStorage.setItem('availability_data', JSON.stringify(this.availabilityData));
    }
}

// Initialize global instance
let shippingAvailabilityManager = new ShippingAvailabilityManager();

// Export for global access
window.ShippingAvailabilityManager = ShippingAvailabilityManager;

