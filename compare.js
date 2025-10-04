// Product Comparison System

class CompareSystem {
    constructor() {
        this.compareList = JSON.parse(localStorage.getItem('compare_list') || '[]');
        this.maxCompareItems = 4; // Maximum items that can be compared
    }
    
    // Add product to comparison
    addToCompare(productId, productData = null) {
        // Check if product is already in comparison
        if (this.isInCompare(productId)) {
            return false;
        }
        
        // Check if comparison list is full
        if (this.compareList.length >= this.maxCompareItems) {
            return false;
        }
        
        const compareItem = {
            id: Date.now().toString(),
            productId: productId,
            addedAt: new Date().toISOString(),
            productData: productData || this.getProductData(productId)
        };
        
        this.compareList.push(compareItem);
        this.saveCompareList();
        this.updateCompareUI();
        
        return true;
    }
    
    // Remove product from comparison
    removeFromCompare(productId) {
        const initialLength = this.compareList.length;
        this.compareList = this.compareList.filter(item => item.productId != productId);
        
        if (this.compareList.length < initialLength) {
            this.saveCompareList();
            this.updateCompareUI();
            return true;
        }
        
        return false;
    }
    
    // Toggle product in comparison
    toggleCompare(productId, productData = null) {
        if (this.isInCompare(productId)) {
            return this.removeFromCompare(productId);
        } else {
            return this.addToCompare(productId, productData);
        }
    }
    
    // Check if product is in comparison
    isInCompare(productId) {
        return this.compareList.some(item => item.productId == productId);
    }
    
    // Get comparison items
    getCompareItems() {
        return this.compareList.map(item => ({
            ...item,
            product: this.getProductData(item.productId)
        }));
    }
    
    // Get comparison count
    getCompareCount() {
        return this.compareList.length;
    }
    
    // Clear comparison list
    clearCompare() {
        this.compareList = [];
        this.saveCompareList();
        this.updateCompareUI();
    }
    
    // Get product data
    getProductData(productId) {
        const products = window.ShopMax?.products || [];
        return products.find(p => p.id == productId);
    }
    
    // Save comparison list to localStorage
    saveCompareList() {
        localStorage.setItem('compare_list', JSON.stringify(this.compareList));
    }
    
    // Update comparison UI elements
    updateCompareUI() {
        // Update comparison count in header
        const compareCount = document.getElementById('compareCount');
        if (compareCount) {
            compareCount.textContent = this.getCompareCount();
        }
        
        // Update comparison buttons
        document.querySelectorAll('.compare-btn').forEach(btn => {
            const productId = btn.dataset.productId;
            if (productId) {
                if (this.isInCompare(productId)) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-balance-scale"></i> In Compare';
                } else {
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-balance-scale"></i> Add to Compare';
                }
            }
        });
        
        // Show/hide comparison bar
        this.updateCompareBar();
    }
    
    // Update comparison bar
    updateCompareBar() {
        const compareBar = document.getElementById('compareBar');
        if (compareBar) {
            if (this.compareList.length > 0) {
                compareBar.style.display = 'block';
                this.updateCompareBarContent();
            } else {
                compareBar.style.display = 'none';
            }
        }
    }
    
    // Update comparison bar content
    updateCompareBarContent() {
        const compareBar = document.getElementById('compareBar');
        if (!compareBar) return;
        
        const items = this.getCompareItems();
        
        compareBar.innerHTML = `
            <div class="compare-bar-content">
                <div class="compare-items">
                    ${items.map(item => `
                        <div class="compare-item" data-product-id="${item.productId}">
                            <img src="${item.product?.image || 'https://via.placeholder.com/60x60'}" alt="${item.product?.title || 'Product'}">
                            <span class="compare-item-title">${item.product?.title || 'Unknown Product'}</span>
                            <button class="remove-compare" onclick="compareSystem.removeFromCompare(${item.productId})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="compare-actions">
                    <button class="btn btn-primary" onclick="compareSystem.showCompareModal()">
                        Compare (${items.length})
                    </button>
                    <button class="btn btn-secondary" onclick="compareSystem.clearCompare()">
                        Clear All
                    </button>
                </div>
            </div>
        `;
    }
    
    // Show comparison modal
    showCompareModal() {
        const items = this.getCompareItems();
        
        if (items.length < 2) {
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal compare-modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content compare-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>Product Comparison</h2>
                <div class="compare-table-container">
                    ${this.renderCompareTable(items)}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Render comparison table
    renderCompareTable(items) {
        const products = items.map(item => item.product).filter(Boolean);
        
        if (products.length === 0) return '<p>No products to compare.</p>';
        
        // Get all unique specifications
        const allSpecs = new Set();
        products.forEach(product => {
            if (product.specifications) {
                Object.keys(product.specifications).forEach(spec => allSpecs.add(spec));
            }
        });
        
        const specifications = Array.from(allSpecs);
        
        return `
            <div class="compare-table">
                <div class="compare-header">
                    <div class="compare-cell compare-label">Product</div>
                    ${products.map(product => `
                        <div class="compare-cell compare-product">
                            <div class="compare-product-image">
                                <img src="${product.image}" alt="${product.title}">
                                <button class="remove-compare" onclick="compareSystem.removeFromCompare(${product.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <h3>${product.title}</h3>
                            <div class="compare-product-price">$${product.price}</div>
                            <div class="compare-product-rating">
                                ${this.generateStars(product.rating)} (${product.reviews})
                            </div>
                            <div class="compare-product-actions">
                                <button class="btn btn-primary btn-sm" onclick="window.Cart.addToCart(${product.id})">
                                    Add to Cart
                                </button>
                                <button class="btn btn-secondary btn-sm" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                    View Details
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="compare-section">
                    <div class="compare-cell compare-label">Description</div>
                    ${products.map(product => `
                        <div class="compare-cell">${product.description || 'No description available'}</div>
                    `).join('')}
                </div>
                
                <div class="compare-section">
                    <div class="compare-cell compare-label">Category</div>
                    ${products.map(product => `
                        <div class="compare-cell">${product.category || 'N/A'}</div>
                    `).join('')}
                </div>
                
                <div class="compare-section">
                    <div class="compare-cell compare-label">Availability</div>
                    ${products.map(product => `
                        <div class="compare-cell">
                            ${product.inStock ? 
                                '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                                '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                            }
                        </div>
                    `).join('')}
                </div>
                
                <div class="compare-section">
                    <div class="compare-cell compare-label">Stock Quantity</div>
                    ${products.map(product => `
                        <div class="compare-cell">${product.stock || 'N/A'}</div>
                    `).join('')}
                </div>
                
                ${specifications.map(spec => `
                    <div class="compare-section">
                        <div class="compare-cell compare-label">${spec}</div>
                        ${products.map(product => `
                            <div class="compare-cell">${product.specifications?.[spec] || 'N/A'}</div>
                        `).join('')}
                    </div>
                `).join('')}
                
                <div class="compare-section">
                    <div class="compare-cell compare-label">Features</div>
                    ${products.map(product => `
                        <div class="compare-cell">
                            ${product.features ? 
                                `<ul>${product.features.map(feature => `<li>${feature}</li>`).join('')}</ul>` : 
                                'No features listed'
                            }
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Create comparison button
    createCompareButton(productId, productData = null) {
        const isInCompare = this.isInCompare(productId);
        
        return `
            <button class="compare-btn ${isInCompare ? 'active' : ''}" 
                    data-product-id="${productId}"
                    onclick="compareSystem.toggleCompare(${productId}, ${JSON.stringify(productData).replace(/"/g, '&quot;')})">
                <i class="fas fa-balance-scale"></i>
                ${isInCompare ? 'In Compare' : 'Add to Compare'}
            </button>
        `;
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
}

// Comparison Bar Component
class CompareBar {
    constructor() {
        this.compareSystem = new CompareSystem();
    }
    
    render() {
        const compareBar = document.createElement('div');
        compareBar.className = 'compare-bar';
        compareBar.id = 'compareBar';
        compareBar.style.display = 'none';
        
        document.body.appendChild(compareBar);
        this.compareSystem.updateCompareBar();
    }
}

// Initialize global instances
let compareSystem = new CompareSystem();
let compareBar = new CompareBar();

// Initialize comparison system
document.addEventListener('DOMContentLoaded', function() {
    compareSystem.updateCompareUI();
    compareBar.render();
});

// Export for global access
window.CompareSystem = CompareSystem;
window.CompareBar = CompareBar;

