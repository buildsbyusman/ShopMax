// CJ Dropshipping API Integration

class CJDropshippingAPI {
    constructor() {
        this.baseURL = 'https://api.cjdropshipping.com';
        this.apiKey = localStorage.getItem('cj_api_key') || '';
        this.apiSecret = localStorage.getItem('cj_api_secret') || '';
        this.isConfigured = !!(this.apiKey && this.apiSecret);
    }
    
    // Set API credentials
    setCredentials(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        localStorage.setItem('cj_api_key', apiKey);
        localStorage.setItem('cj_api_secret', apiSecret);
        this.isConfigured = true;
    }
    
    // Make API request
    async makeRequest(endpoint, method = 'GET', data = null) {
        if (!this.isConfigured) {
            throw new Error('CJ Dropshipping API not configured');
        }
        
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-API-Secret': this.apiSecret
        };
        
        const options = {
            method,
            headers
        };
        
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('CJ API Error:', error);
            throw error;
        }
    }
    
    // Search products
    async searchProducts(query, options = {}) {
        const params = new URLSearchParams({
            keyword: query,
            page: options.page || 1,
            pageSize: options.pageSize || 20,
            sort: options.sort || 'relevance',
            category: options.category || '',
            minPrice: options.minPrice || '',
            maxPrice: options.maxPrice || ''
        });
        
        return await this.makeRequest(`/product/search?${params}`);
    }
    
    // Get product details
    async getProductDetails(productId) {
        return await this.makeRequest(`/product/${productId}`);
    }
    
    // Get product categories
    async getCategories() {
        return await this.makeRequest('/category/list');
    }
    
    // Get product inventory
    async getProductInventory(productId) {
        return await this.makeRequest(`/product/${productId}/inventory`);
    }
    
    // Get shipping information
    async getShippingInfo(productId, country = 'US') {
        return await this.makeRequest(`/product/${productId}/shipping?country=${country}`);
    }
    
    // Create order
    async createOrder(orderData) {
        return await this.makeRequest('/order/create', 'POST', orderData);
    }
    
    // Get order status
    async getOrderStatus(orderId) {
        return await this.makeRequest(`/order/${orderId}/status`);
    }
    
    // Get account balance
    async getAccountBalance() {
        return await this.makeRequest('/account/balance');
    }
    
    // Test API connection
    async testConnection() {
        try {
            await this.getAccountBalance();
            return { success: true, message: 'Connection successful' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

// CJ Dropshipping Product Manager
class CJProductManager {
    constructor() {
        this.api = new CJDropshippingAPI();
        this.importedProducts = JSON.parse(localStorage.getItem('cj_imported_products') || '[]');
    }
    
    // Search and display CJ products
    async searchAndDisplayProducts(query, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            // Show loading state
            container.innerHTML = '<div class="loading">Searching products...</div>';
            
            // For demo purposes, use mock data
            const mockProducts = this.getMockProducts(query);
            
            // Display products
            this.displayCJProducts(mockProducts, container);
            
        } catch (error) {
            container.innerHTML = `<div class="error">Error searching products: ${error.message}</div>`;
        }
    }
    
    // Get mock products for demo
    getMockProducts(query) {
        const mockProducts = [
            {
                id: 'CJ001',
                title: 'Wireless Gaming Headset with RGB Lighting',
                price: 45.99,
                originalPrice: 65.99,
                category: 'Electronics',
                image: 'https://via.placeholder.com/200x200?text=Gaming+Headset',
                description: 'High-quality wireless gaming headset with RGB lighting, noise cancellation, and 7.1 surround sound.',
                stock: 150,
                rating: 4.5,
                reviews: 89,
                shipping: 'Free shipping',
                supplier: 'CJ Dropshipping',
                variants: [
                    { color: 'Black', size: 'One Size', price: 45.99, stock: 75 },
                    { color: 'White', size: 'One Size', price: 45.99, stock: 75 }
                ]
            },
            {
                id: 'CJ002',
                title: 'Smart Fitness Tracker Watch',
                price: 35.99,
                originalPrice: 55.99,
                category: 'Electronics',
                image: 'https://via.placeholder.com/200x200?text=Fitness+Watch',
                description: 'Waterproof smart fitness tracker with heart rate monitor, sleep tracking, and 7-day battery life.',
                stock: 200,
                rating: 4.3,
                reviews: 156,
                shipping: 'Free shipping',
                supplier: 'CJ Dropshipping',
                variants: [
                    { color: 'Black', size: 'One Size', price: 35.99, stock: 100 },
                    { color: 'Pink', size: 'One Size', price: 35.99, stock: 100 }
                ]
            },
            {
                id: 'CJ003',
                title: 'Bluetooth Wireless Earbuds',
                price: 25.99,
                originalPrice: 45.99,
                category: 'Electronics',
                image: 'https://via.placeholder.com/200x200?text=Wireless+Earbuds',
                description: 'True wireless earbuds with active noise cancellation and 20-hour battery life.',
                stock: 300,
                rating: 4.7,
                reviews: 234,
                shipping: 'Free shipping',
                supplier: 'CJ Dropshipping',
                variants: [
                    { color: 'Black', size: 'One Size', price: 25.99, stock: 150 },
                    { color: 'White', size: 'One Size', price: 25.99, stock: 150 }
                ]
            },
            {
                id: 'CJ004',
                title: 'LED Desk Lamp with USB Charging',
                price: 29.99,
                originalPrice: 49.99,
                category: 'Home & Office',
                image: 'https://via.placeholder.com/200x200?text=LED+Desk+Lamp',
                description: 'Adjustable LED desk lamp with USB charging port and touch control.',
                stock: 120,
                rating: 4.4,
                reviews: 67,
                shipping: 'Free shipping',
                supplier: 'CJ Dropshipping',
                variants: [
                    { color: 'White', size: 'One Size', price: 29.99, stock: 60 },
                    { color: 'Black', size: 'One Size', price: 29.99, stock: 60 }
                ]
            },
            {
                id: 'CJ005',
                title: 'Portable Phone Charger 20000mAh',
                price: 19.99,
                originalPrice: 35.99,
                category: 'Electronics',
                image: 'https://via.placeholder.com/200x200?text=Power+Bank',
                description: 'High-capacity portable charger with fast charging and LED display.',
                stock: 180,
                rating: 4.6,
                reviews: 145,
                shipping: 'Free shipping',
                supplier: 'CJ Dropshipping',
                variants: [
                    { color: 'Black', size: 'One Size', price: 19.99, stock: 90 },
                    { color: 'Blue', size: 'One Size', price: 19.99, stock: 90 }
                ]
            }
        ];
        
        // Filter by query if provided
        if (query) {
            return mockProducts.filter(product => 
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        return mockProducts;
    }
    
    // Display CJ products
    displayCJProducts(products, container) {
        if (products.length === 0) {
            container.innerHTML = '<div class="no-products">No products found matching your search.</div>';
            return;
        }
        
        container.innerHTML = products.map(product => `
            <div class="cj-product-card">
                <div class="cj-product-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><rect width=\"200\" height=\"200\" fill=\"%23f0f0f0\"/><text x=\"50%\" y=\"50%\" text-anchor=\"middle\" dy=\".3em\" fill=\"%23999\">No Image</text></svg>'">
                    <div class="cj-product-badge">CJ</div>
                </div>
                <div class="cj-product-info">
                    <h3 class="cj-product-title">${product.title}</h3>
                    <div class="cj-product-price">
                        <span class="current-price">$${product.price}</span>
                        <span class="original-price">$${product.originalPrice}</span>
                        <span class="discount">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                    </div>
                    <div class="cj-product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.reviews} reviews)</span>
                    </div>
                    <div class="cj-product-details">
                        <p><strong>Stock:</strong> ${product.stock} units</p>
                        <p><strong>Shipping:</strong> ${product.shipping}</p>
                        <p><strong>Supplier:</strong> ${product.supplier}</p>
                    </div>
                    <div class="cj-product-variants">
                        <h4>Available Variants:</h4>
                        ${product.variants.map(variant => `
                            <div class="variant-item">
                                <span>${variant.color} - $${variant.price} (${variant.stock} in stock)</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cj-product-actions">
                        <button class="btn btn-primary" onclick="cjProductManager.importProduct('${product.id}')">
                            <i class="fas fa-download"></i> Import Product
                        </button>
                        <button class="btn btn-secondary" onclick="cjProductManager.viewProductDetails('${product.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Generate star rating
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
    
    // Import product from CJ
    async importProduct(cjProductId) {
        try {
            // Get product details (in real app, this would be an API call)
            const cjProduct = this.getMockProducts().find(p => p.id === cjProductId);
            
            if (!cjProduct) {
                throw new Error('Product not found');
            }
            
            // Convert to our product format
            const importedProduct = {
                id: Date.now(),
                title: cjProduct.title,
                price: cjProduct.price,
                originalPrice: cjProduct.originalPrice,
                category: cjProduct.category.toLowerCase().replace(' & ', '-'),
                image: cjProduct.image,
                description: cjProduct.description,
                stock: cjProduct.stock,
                rating: cjProduct.rating,
                reviews: cjProduct.reviews,
                inStock: true,
                source: 'cj_dropshipping',
                cjProductId: cjProductId,
                variants: cjProduct.variants,
                importedAt: new Date().toISOString()
            };
            
            // Add to products
            const products = window.ShopMax?.products || [];
            products.push(importedProduct);
            window.ShopMax.products = products;
            
            // Save to imported products list
            this.importedProducts.push({
                cjProductId: cjProductId,
                localProductId: importedProduct.id,
                importedAt: importedProduct.importedAt
            });
            localStorage.setItem('cj_imported_products', JSON.stringify(this.importedProducts));
            
            // Update admin panel if open
            if (window.AdminPanel) {
                window.AdminPanel.displayProducts();
                window.AdminPanel.updateDashboard();
            }
            
            showMessage(`Product "${cjProduct.title}" imported successfully!`, 'success');
            
        } catch (error) {
            showMessage(`Error importing product: ${error.message}`, 'error');
        }
    }
    
    // View product details
    viewProductDetails(cjProductId) {
        const product = this.getMockProducts().find(p => p.id === cjProductId);
        if (product) {
            // Create modal with detailed product information
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'block';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                    <h2>${product.title}</h2>
                    <div class="product-detail-content">
                        <div class="product-detail-image">
                            <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 400px;">
                        </div>
                        <div class="product-detail-info">
                            <div class="price-info">
                                <span class="current-price">$${product.price}</span>
                                <span class="original-price">$${product.originalPrice}</span>
                            </div>
                            <div class="rating-info">
                                ${this.generateStars(product.rating)} (${product.reviews} reviews)
                            </div>
                            <div class="stock-info">
                                <strong>Stock:</strong> ${product.stock} units available
                            </div>
                            <div class="shipping-info">
                                <strong>Shipping:</strong> ${product.shipping}
                            </div>
                            <div class="description">
                                <h3>Description</h3>
                                <p>${product.description}</p>
                            </div>
                            <div class="variants">
                                <h3>Available Variants</h3>
                                ${product.variants.map(variant => `
                                    <div class="variant-detail">
                                        <strong>${variant.color}</strong> - $${variant.price} (${variant.stock} in stock)
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }
    
    // Sync all imported products
    async syncImportedProducts() {
        try {
            showMessage('Syncing imported products...', 'success');
            
            // In a real implementation, this would check for updates from CJ
            // For demo purposes, we'll just update the sync timestamp
            
            const lastSync = new Date().toISOString();
            localStorage.setItem('cj_last_sync', lastSync);
            
            // Update sync status in admin panel
            const lastSyncElement = document.getElementById('lastSync');
            const productsSyncedElement = document.getElementById('productsSynced');
            
            if (lastSyncElement) {
                lastSyncElement.textContent = new Date(lastSync).toLocaleString();
            }
            
            if (productsSyncedElement) {
                productsSyncedElement.textContent = this.importedProducts.length;
            }
            
            showMessage('Sync completed successfully!', 'success');
            
        } catch (error) {
            showMessage(`Sync failed: ${error.message}`, 'error');
        }
    }
    
    // Get import statistics
    getImportStats() {
        return {
            totalImported: this.importedProducts.length,
            lastSync: localStorage.getItem('cj_last_sync') || 'Never',
            isConfigured: this.api.isConfigured
        };
    }
}

// Initialize CJ Product Manager
const cjProductManager = new CJProductManager();

// Export for global access
window.CJProductManager = cjProductManager;
window.CJDropshippingAPI = CJDropshippingAPI;

