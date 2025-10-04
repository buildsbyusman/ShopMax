// Product Variants System with Dynamic Pricing

class ProductVariantsManager {
    constructor() {
        this.variants = JSON.parse(localStorage.getItem('product_variants') || '[]');
        this.variantPricing = JSON.parse(localStorage.getItem('variant_pricing') || '[]');
        this.selectedVariants = {};
        this.initializeVariantData();
    }
    
    // Initialize with mock variant data
    initializeVariantData() {
        if (this.variants.length === 0) {
            this.variants = [
                {
                    productId: 'CJ-001',
                    variants: {
                        color: [
                            { id: 'black', name: 'Black', value: '#000000', priceModifier: 0, stock: 50 },
                            { id: 'white', name: 'White', value: '#ffffff', priceModifier: 0, stock: 30 },
                            { id: 'blue', name: 'Blue', value: '#0066cc', priceModifier: 5, stock: 25 },
                            { id: 'red', name: 'Red', value: '#cc0000', priceModifier: 5, stock: 20 }
                        ],
                        size: [
                            { id: 'small', name: 'Small', value: 'S', priceModifier: -5, stock: 40 },
                            { id: 'medium', name: 'Medium', value: 'M', priceModifier: 0, stock: 60 },
                            { id: 'large', name: 'Large', value: 'L', priceModifier: 5, stock: 35 },
                            { id: 'xlarge', name: 'Extra Large', value: 'XL', priceModifier: 10, stock: 25 }
                        ],
                        style: [
                            { id: 'classic', name: 'Classic', value: 'Classic', priceModifier: 0, stock: 50 },
                            { id: 'premium', name: 'Premium', value: 'Premium', priceModifier: 15, stock: 30 },
                            { id: 'pro', name: 'Pro', value: 'Pro', priceModifier: 25, stock: 20 }
                        ]
                    }
                },
                {
                    productId: 'CJ-002',
                    variants: {
                        color: [
                            { id: 'black', name: 'Black', value: '#000000', priceModifier: 0, stock: 40 },
                            { id: 'silver', name: 'Silver', value: '#c0c0c0', priceModifier: 3, stock: 35 },
                            { id: 'gold', name: 'Gold', value: '#ffd700', priceModifier: 8, stock: 25 }
                        ],
                        band_size: [
                            { id: 'small', name: 'Small (140-180mm)', value: 'S', priceModifier: 0, stock: 30 },
                            { id: 'medium', name: 'Medium (180-200mm)', value: 'M', priceModifier: 0, stock: 50 },
                            { id: 'large', name: 'Large (200-220mm)', value: 'L', priceModifier: 0, stock: 20 }
                        ]
                    }
                },
                {
                    productId: 'CJ-003',
                    variants: {
                        length: [
                            { id: '5m', name: '5 Meters', value: '5m', priceModifier: 0, stock: 100 },
                            { id: '10m', name: '10 Meters', value: '10m', priceModifier: 8, stock: 80 },
                            { id: '20m', name: '20 Meters', value: '20m', priceModifier: 15, stock: 60 }
                        ],
                        color: [
                            { id: 'warm_white', name: 'Warm White', value: '#fff8dc', priceModifier: 0, stock: 50 },
                            { id: 'cool_white', name: 'Cool White', value: '#ffffff', priceModifier: 0, stock: 50 },
                            { id: 'rgb', name: 'RGB Color', value: 'rgb', priceModifier: 10, stock: 40 }
                        ]
                    }
                },
                {
                    productId: 'CJ-004',
                    variants: {
                        material: [
                            { id: 'plastic', name: 'Plastic', value: 'Plastic', priceModifier: 0, stock: 100 },
                            { id: 'aluminum', name: 'Aluminum', value: 'Aluminum', priceModifier: 8, stock: 80 },
                            { id: 'wood', name: 'Wood', value: 'Wood', priceModifier: 12, stock: 60 }
                        ],
                        angle: [
                            { id: 'adjustable', name: 'Adjustable', value: 'Adjustable', priceModifier: 5, stock: 80 },
                            { id: 'fixed', name: 'Fixed', value: 'Fixed', priceModifier: 0, stock: 100 }
                        ]
                    }
                },
                {
                    productId: 'CJ-007',
                    variants: {
                        frame_color: [
                            { id: 'black', name: 'Black', value: '#000000', priceModifier: 0, stock: 50 },
                            { id: 'brown', name: 'Brown', value: '#8b4513', priceModifier: 0, stock: 40 },
                            { id: 'tortoise', name: 'Tortoise', value: 'tortoise', priceModifier: 5, stock: 30 }
                        ],
                        lens_type: [
                            { id: 'standard', name: 'Standard', value: 'Standard', priceModifier: 0, stock: 60 },
                            { id: 'polarized', name: 'Polarized', value: 'Polarized', priceModifier: 15, stock: 40 },
                            { id: 'blue_light', name: 'Blue Light Filter', value: 'Blue Light', priceModifier: 10, stock: 35 }
                        ]
                    }
                }
            ];
            
            this.saveVariants();
        }
        
        if (this.variantPricing.length === 0) {
            this.initializeVariantPricing();
        }
    }
    
    // Initialize variant pricing rules
    initializeVariantPricing() {
        this.variantPricing = [
            {
                productId: 'CJ-001',
                basePrice: 29.99,
                pricingRules: {
                    color: {
                        'black': 0,
                        'white': 0,
                        'blue': 5,
                        'red': 5
                    },
                    size: {
                        'small': -5,
                        'medium': 0,
                        'large': 5,
                        'xlarge': 10
                    },
                    style: {
                        'classic': 0,
                        'premium': 15,
                        'pro': 25
                    }
                },
                bulkPricing: [
                    { minQty: 1, maxQty: 2, discount: 0 },
                    { minQty: 3, maxQty: 5, discount: 5 },
                    { minQty: 6, maxQty: 10, discount: 10 },
                    { minQty: 11, maxQty: 999, discount: 15 }
                ]
            },
            {
                productId: 'CJ-002',
                basePrice: 19.99,
                pricingRules: {
                    color: {
                        'black': 0,
                        'silver': 3,
                        'gold': 8
                    },
                    band_size: {
                        'small': 0,
                        'medium': 0,
                        'large': 0
                    }
                },
                bulkPricing: [
                    { minQty: 1, maxQty: 1, discount: 0 },
                    { minQty: 2, maxQty: 4, discount: 8 },
                    { minQty: 5, maxQty: 999, discount: 15 }
                ]
            }
        ];
        
        this.saveVariantPricing();
    }
    
    // Get variants for a product
    getProductVariants(productId) {
        return this.variants.find(v => v.productId === productId);
    }
    
    // Get variant pricing for a product
    getVariantPricing(productId) {
        return this.variantPricing.find(p => p.productId === productId);
    }
    
    // Calculate dynamic price based on selected variants
    calculateVariantPrice(productId, selectedVariants = {}, quantity = 1) {
        const pricing = this.getVariantPricing(productId);
        if (!pricing) return null;
        
        let price = pricing.basePrice;
        
        // Apply variant price modifiers
        Object.keys(selectedVariants).forEach(variantType => {
            const selectedValue = selectedVariants[variantType];
            if (pricing.pricingRules[variantType] && pricing.pricingRules[variantType][selectedValue] !== undefined) {
                price += pricing.pricingRules[variantType][selectedValue];
            }
        });
        
        // Apply bulk pricing
        if (pricing.bulkPricing) {
            const bulkRule = pricing.bulkPricing.find(rule => 
                quantity >= rule.minQty && quantity <= rule.maxQty
            );
            if (bulkRule) {
                price = price * (1 - bulkRule.discount / 100);
            }
        }
        
        return Math.round(price * 100) / 100; // Round to 2 decimal places
    }
    
    // Check variant availability
    checkVariantAvailability(productId, selectedVariants) {
        const productVariants = this.getProductVariants(productId);
        if (!productVariants) return true;
        
        // Check if all selected variants are available
        for (const [variantType, variantValue] of Object.entries(selectedVariants)) {
            if (productVariants.variants[variantType]) {
                const variant = productVariants.variants[variantType].find(v => v.id === variantValue);
                if (!variant || variant.stock <= 0) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    // Get variant stock
    getVariantStock(productId, selectedVariants) {
        const productVariants = this.getProductVariants(productId);
        if (!productVariants) return 0;
        
        let minStock = Infinity;
        
        for (const [variantType, variantValue] of Object.entries(selectedVariants)) {
            if (productVariants.variants[variantType]) {
                const variant = productVariants.variants[variantType].find(v => v.id === variantValue);
                if (variant) {
                    minStock = Math.min(minStock, variant.stock);
                }
            }
        }
        
        return minStock === Infinity ? 0 : minStock;
    }
    
    // Render variant selector
    renderVariantSelector(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const productVariants = this.getProductVariants(productId);
        if (!productVariants) {
            container.innerHTML = '';
            return;
        }
        
        let html = '<div class="product-variants">';
        
        Object.keys(productVariants.variants).forEach(variantType => {
            const variants = productVariants.variants[variantType];
            const variantTypeName = this.formatVariantTypeName(variantType);
            
            html += `
                <div class="variant-group">
                    <label class="variant-label">${variantTypeName}:</label>
                    <div class="variant-options" data-variant-type="${variantType}">
                        ${variants.map(variant => this.renderVariantOption(variant, variantType, productId)).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        container.innerHTML = html;
        
        // Setup event listeners
        this.setupVariantEventListeners(productId);
    }
    
    // Render individual variant option
    renderVariantOption(variant, variantType, productId) {
        const isSelected = this.selectedVariants[productId] && 
                          this.selectedVariants[productId][variantType] === variant.id;
        const isOutOfStock = variant.stock <= 0;
        
        let optionClass = 'variant-option';
        if (isSelected) optionClass += ' selected';
        if (isOutOfStock) optionClass += ' out-of-stock';
        
        let optionContent = '';
        
        if (variantType === 'color' || variantType === 'frame_color') {
            optionContent = `
                <span class="color-swatch" style="background-color: ${variant.value}"></span>
                <span class="variant-name">${variant.name}</span>
            `;
        } else {
            optionContent = `
                <span class="variant-name">${variant.name}</span>
            `;
        }
        
        if (variant.priceModifier > 0) {
            optionContent += `<span class="price-modifier">+$${variant.priceModifier}</span>`;
        } else if (variant.priceModifier < 0) {
            optionContent += `<span class="price-modifier">$${variant.priceModifier}</span>`;
        }
        
        if (isOutOfStock) {
            optionContent += '<span class="stock-status">Out of Stock</span>';
        }
        
        return `
            <div class="${optionClass}" 
                 data-variant-id="${variant.id}" 
                 data-variant-type="${variantType}"
                 data-product-id="${productId}"
                 onclick="productVariantsManager.selectVariant('${productId}', '${variantType}', '${variant.id}')">
                ${optionContent}
            </div>
        `;
    }
    
    // Select a variant
    selectVariant(productId, variantType, variantId) {
        if (!this.selectedVariants[productId]) {
            this.selectedVariants[productId] = {};
        }
        
        this.selectedVariants[productId][variantType] = variantId;
        
        // Update UI
        this.updateVariantSelection(productId, variantType, variantId);
        this.updateVariantPrice(productId);
        this.updateVariantStock(productId);
        
        // Save selection
        this.saveSelectedVariants();
    }
    
    // Update variant selection UI
    updateVariantSelection(productId, variantType, variantId) {
        const variantOptions = document.querySelectorAll(`[data-product-id="${productId}"][data-variant-type="${variantType}"]`);
        
        variantOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.variantId === variantId) {
                option.classList.add('selected');
            }
        });
    }
    
    // Update variant price display
    updateVariantPrice(productId) {
        const selectedVariants = this.selectedVariants[productId] || {};
        const newPrice = this.calculateVariantPrice(productId, selectedVariants);
        
        if (newPrice !== null) {
            const priceElement = document.querySelector(`[data-product-id="${productId}"] .product-price .current-price`);
            if (priceElement) {
                priceElement.textContent = `$${newPrice}`;
            }
            
            // Update price in cart if item is already in cart
            this.updateCartItemPrice(productId, newPrice);
        }
    }
    
    // Update variant stock display
    updateVariantStock(productId) {
        const selectedVariants = this.selectedVariants[productId] || {};
        const stock = this.getVariantStock(productId, selectedVariants);
        const isAvailable = this.checkVariantAvailability(productId, selectedVariants);
        
        const stockElement = document.querySelector(`[data-product-id="${productId}"] .product-availability`);
        if (stockElement) {
            if (isAvailable && stock > 0) {
                stockElement.innerHTML = `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock (${stock} available)</span>`;
            } else {
                stockElement.innerHTML = '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>';
            }
        }
        
        // Update add to cart button
        const addToCartBtn = document.querySelector(`[data-product-id="${productId}"] .add-to-cart-btn`);
        if (addToCartBtn) {
            addToCartBtn.disabled = !isAvailable || stock <= 0;
        }
    }
    
    // Update cart item price
    updateCartItemPrice(productId, newPrice) {
        if (window.Cart && window.Cart.items) {
            const cartItem = window.Cart.items.find(item => item.id === productId);
            if (cartItem) {
                cartItem.price = newPrice;
                cartItem.variants = this.selectedVariants[productId] || {};
                window.Cart.updateCartDisplay();
            }
        }
    }
    
    // Setup variant event listeners
    setupVariantEventListeners(productId) {
        const variantOptions = document.querySelectorAll(`[data-product-id="${productId}"] .variant-option`);
        
        variantOptions.forEach(option => {
            option.addEventListener('mouseenter', () => {
                if (!option.classList.contains('out-of-stock')) {
                    option.style.transform = 'scale(1.05)';
                }
            });
            
            option.addEventListener('mouseleave', () => {
                option.style.transform = 'scale(1)';
            });
        });
    }
    
    // Format variant type name
    formatVariantTypeName(variantType) {
        const nameMap = {
            'color': 'Color',
            'size': 'Size',
            'style': 'Style',
            'band_size': 'Band Size',
            'length': 'Length',
            'material': 'Material',
            'angle': 'Angle',
            'frame_color': 'Frame Color',
            'lens_type': 'Lens Type'
        };
        
        return nameMap[variantType] || variantType.charAt(0).toUpperCase() + variantType.slice(1);
    }
    
    // Get selected variants for a product
    getSelectedVariants(productId) {
        return this.selectedVariants[productId] || {};
    }
    
    // Set selected variants for a product
    setSelectedVariants(productId, variants) {
        this.selectedVariants[productId] = variants;
        this.saveSelectedVariants();
    }
    
    // Clear selected variants for a product
    clearSelectedVariants(productId) {
        delete this.selectedVariants[productId];
        this.saveSelectedVariants();
    }
    
    // Save selected variants to localStorage
    saveSelectedVariants() {
        localStorage.setItem('selected_variants', JSON.stringify(this.selectedVariants));
    }
    
    // Load selected variants from localStorage
    loadSelectedVariants() {
        const saved = localStorage.getItem('selected_variants');
        if (saved) {
            this.selectedVariants = JSON.parse(saved);
        }
    }
    
    // Save variants to localStorage
    saveVariants() {
        localStorage.setItem('product_variants', JSON.stringify(this.variants));
    }
    
    // Save variant pricing to localStorage
    saveVariantPricing() {
        localStorage.setItem('variant_pricing', JSON.stringify(this.variantPricing));
    }
    
    // Initialize the manager
    initialize() {
        this.loadSelectedVariants();
    }
}

// Initialize global instance
let productVariantsManager = new ProductVariantsManager();

// Export for global access
window.ProductVariantsManager = ProductVariantsManager;

