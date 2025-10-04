/**
 * Product Comparison System
 * Allows users to compare multiple products side by side
 */

class ProductComparison {
    constructor() {
        this.maxProducts = 4;
        this.comparisonProducts = [];
        this.comparisonModal = null;
        this.init();
    }

    /**
     * Initialize product comparison
     */
    init() {
        this.createComparisonModal();
        this.setupEventListeners();
        this.loadComparisonData();
    }

    /**
     * Create comparison modal
     */
    createComparisonModal() {
        this.comparisonModal = document.createElement('div');
        this.comparisonModal.className = 'comparison-modal';
        this.comparisonModal.innerHTML = `
            <div class="comparison-modal-content">
                <div class="comparison-header">
                    <h2>Product Comparison</h2>
                    <button class="comparison-close" onclick="productComparison.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="comparison-body">
                    <div class="comparison-table-container">
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th class="feature-column">Features</th>
                                    <th class="product-column" data-product-id="placeholder">
                                        <div class="add-product-slot">
                                            <button class="add-product-btn" onclick="productComparison.showAddProductModal()">
                                                <i class="fas fa-plus"></i>
                                                <span>Add Product</span>
                                            </button>
                                        </div>
                                    </th>
                                    <th class="product-column" data-product-id="placeholder">
                                        <div class="add-product-slot">
                                            <button class="add-product-btn" onclick="productComparison.showAddProductModal()">
                                                <i class="fas fa-plus"></i>
                                                <span>Add Product</span>
                                            </button>
                                        </div>
                                    </th>
                                    <th class="product-column" data-product-id="placeholder">
                                        <div class="add-product-slot">
                                            <button class="add-product-btn" onclick="productComparison.showAddProductModal()">
                                                <i class="fas fa-plus"></i>
                                                <span>Add Product</span>
                                            </button>
                                        </div>
                                    </th>
                                    <th class="product-column" data-product-id="placeholder">
                                        <div class="add-product-slot">
                                            <button class="add-product-btn" onclick="productComparison.showAddProductModal()">
                                                <i class="fas fa-plus"></i>
                                                <span>Add Product</span>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="comparisonTableBody">
                                <!-- Comparison rows will be generated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="comparison-footer">
                    <button class="btn btn-secondary" onclick="productComparison.clearComparison()">
                        Clear All
                    </button>
                    <button class="btn btn-primary" onclick="productComparison.exportComparison()">
                        Export Comparison
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(this.comparisonModal);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Close modal on overlay click
        this.comparisonModal.addEventListener('click', (e) => {
            if (e.target === this.comparisonModal) {
                this.closeModal();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.comparisonModal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    /**
     * Add product to comparison
     */
    addProduct(product) {
        if (this.comparisonProducts.length >= this.maxProducts) {
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    `You can compare up to ${this.maxProducts} products at once.`,
                    'warning'
                );
            }
            return false;
        }

        // Check if product is already in comparison
        if (this.comparisonProducts.find(p => p.id === product.id)) {
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    'This product is already in your comparison.',
                    'info'
                );
            }
            return false;
        }

        this.comparisonProducts.push(product);
        this.updateComparisonTable();
        this.updateComparisonButton();
        this.saveComparisonData();

        if (window.errorHandler) {
            window.errorHandler.showNotification(
                `${product.name} added to comparison`,
                'success'
            );
        }

        if (window.accessibilityManager) {
            window.accessibilityManager.announce(
                `${product.name} added to comparison. ${this.comparisonProducts.length} products in comparison.`
            );
        }

        return true;
    }

    /**
     * Remove product from comparison
     */
    removeProduct(productId) {
        this.comparisonProducts = this.comparisonProducts.filter(p => p.id !== productId);
        this.updateComparisonTable();
        this.updateComparisonButton();
        this.saveComparisonData();

        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Product removed from comparison',
                'info'
            );
        }
    }

    /**
     * Update comparison table
     */
    updateComparisonTable() {
        const tableBody = document.getElementById('comparisonTableBody');
        const productColumns = this.comparisonModal.querySelectorAll('.product-column');
        
        // Clear existing rows
        tableBody.innerHTML = '';
        
        // Update product columns
        productColumns.forEach((column, index) => {
            if (index < this.comparisonProducts.length) {
                const product = this.comparisonProducts[index];
                this.updateProductColumn(column, product);
            } else {
                this.resetProductColumn(column);
            }
        });

        // Generate comparison rows
        this.generateComparisonRows();
    }

    /**
     * Update product column
     */
    updateProductColumn(column, product) {
        column.dataset.productId = product.id;
        column.innerHTML = `
            <div class="product-header">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-rating">
                        ${this.generateStars(product.rating)}
                        <span class="rating-count">(${product.reviewCount})</span>
                    </div>
                </div>
                <button class="remove-product-btn" onclick="productComparison.removeProduct('${product.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }

    /**
     * Reset product column
     */
    resetProductColumn(column) {
        column.dataset.productId = 'placeholder';
        column.innerHTML = `
            <div class="add-product-slot">
                <button class="add-product-btn" onclick="productComparison.showAddProductModal()">
                    <i class="fas fa-plus"></i>
                    <span>Add Product</span>
                </button>
            </div>
        `;
    }

    /**
     * Generate comparison rows
     */
    generateComparisonRows() {
        const tableBody = document.getElementById('comparisonTableBody');
        const features = this.getComparisonFeatures();
        
        features.forEach(feature => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="feature-name">${feature.name}</td>
                ${this.generateFeatureCells(feature)}
            `;
            tableBody.appendChild(row);
        });
    }

    /**
     * Get comparison features
     */
    getComparisonFeatures() {
        return [
            { key: 'price', name: 'Price' },
            { key: 'rating', name: 'Rating' },
            { key: 'brand', name: 'Brand' },
            { key: 'category', name: 'Category' },
            { key: 'availability', name: 'Availability' },
            { key: 'shipping', name: 'Shipping' },
            { key: 'warranty', name: 'Warranty' },
            { key: 'weight', name: 'Weight' },
            { key: 'dimensions', name: 'Dimensions' },
            { key: 'color', name: 'Color' },
            { key: 'material', name: 'Material' },
            { key: 'features', name: 'Key Features' }
        ];
    }

    /**
     * Generate feature cells
     */
    generateFeatureCells(feature) {
        return this.comparisonProducts.map(product => {
            const value = this.getFeatureValue(product, feature.key);
            return `<td class="feature-value">${value}</td>`;
        }).join('') + 
        Array.from({ length: this.maxProducts - this.comparisonProducts.length }, () => 
            '<td class="feature-value">-</td>'
        ).join('');
    }

    /**
     * Get feature value
     */
    getFeatureValue(product, featureKey) {
        switch (featureKey) {
            case 'price':
                return `$${product.price}`;
            case 'rating':
                return `${product.rating}/5 (${product.reviewCount} reviews)`;
            case 'brand':
                return product.brand || 'N/A';
            case 'category':
                return product.category || 'N/A';
            case 'availability':
                return product.inStock ? 'In Stock' : 'Out of Stock';
            case 'shipping':
                return product.shipping || 'Standard';
            case 'warranty':
                return product.warranty || '1 Year';
            case 'weight':
                return product.weight || 'N/A';
            case 'dimensions':
                return product.dimensions || 'N/A';
            case 'color':
                return product.color || 'N/A';
            case 'material':
                return product.material || 'N/A';
            case 'features':
                return product.features ? product.features.slice(0, 3).join(', ') : 'N/A';
            default:
                return product[featureKey] || 'N/A';
        }
    }

    /**
     * Generate star rating
     */
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

    /**
     * Show add product modal
     */
    showAddProductModal() {
        // This would typically show a product selection modal
        // For now, we'll show a notification
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Click "Compare" button on any product to add it to comparison',
                'info',
                3000
            );
        }
    }

    /**
     * Open comparison modal
     */
    openModal() {
        if (this.comparisonProducts.length === 0) {
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    'Add products to comparison first',
                    'warning'
                );
            }
            return;
        }

        this.comparisonModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        if (window.accessibilityManager) {
            window.accessibilityManager.openModal(this.comparisonModal);
        }
    }

    /**
     * Close comparison modal
     */
    closeModal() {
        this.comparisonModal.classList.remove('show');
        document.body.style.overflow = '';
        
        if (window.accessibilityManager) {
            window.accessibilityManager.closeModal(this.comparisonModal);
        }
    }

    /**
     * Clear all products from comparison
     */
    clearComparison() {
        this.comparisonProducts = [];
        this.updateComparisonTable();
        this.updateComparisonButton();
        this.saveComparisonData();
        
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Comparison cleared',
                'info'
            );
        }
    }

    /**
     * Export comparison
     */
    exportComparison() {
        if (this.comparisonProducts.length === 0) {
            if (window.errorHandler) {
                window.errorHandler.showNotification(
                    'No products to export',
                    'warning'
                );
            }
            return;
        }

        const comparisonData = {
            products: this.comparisonProducts,
            features: this.getComparisonFeatures(),
            exportedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(comparisonData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `product-comparison-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        if (window.errorHandler) {
            window.errorHandler.showNotification(
                'Comparison exported successfully',
                'success'
            );
        }
    }

    /**
     * Update comparison button
     */
    updateComparisonButton() {
        const comparisonBtn = document.querySelector('.comparison-btn');
        if (comparisonBtn) {
            const count = this.comparisonProducts.length;
            const countBadge = comparisonBtn.querySelector('.comparison-count');
            
            if (count > 0) {
                countBadge.textContent = count;
                countBadge.style.display = 'inline-block';
                comparisonBtn.classList.add('has-items');
            } else {
                countBadge.style.display = 'none';
                comparisonBtn.classList.remove('has-items');
            }
        }
    }

    /**
     * Save comparison data
     */
    saveComparisonData() {
        localStorage.setItem('productComparison', JSON.stringify(this.comparisonProducts));
    }

    /**
     * Load comparison data
     */
    loadComparisonData() {
        const saved = localStorage.getItem('productComparison');
        if (saved) {
            try {
                this.comparisonProducts = JSON.parse(saved);
                this.updateComparisonButton();
            } catch (e) {
                console.error('Error loading comparison data:', e);
            }
        }
    }

    /**
     * Get comparison count
     */
    getComparisonCount() {
        return this.comparisonProducts.length;
    }

    /**
     * Check if product is in comparison
     */
    isInComparison(productId) {
        return this.comparisonProducts.some(p => p.id === productId);
    }
}

// Create global instance
window.productComparison = new ProductComparison();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.productComparison.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductComparison;
}
