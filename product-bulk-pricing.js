/**
 * Product Bulk Pricing and Quantity Discounts Manager
 * Handles bulk pricing tiers, quantity discounts, volume pricing, and promotional offers
 */

class ProductBulkPricingManager {
    constructor() {
        this.bulkPricingData = {
            '1': { // Product ID 1
                basePrice: 79.99,
                currency: 'USD',
                bulkPricing: [
                    {
                        minQuantity: 1,
                        maxQuantity: 4,
                        price: 79.99,
                        discount: 0,
                        savings: 0,
                        label: 'Regular Price'
                    },
                    {
                        minQuantity: 5,
                        maxQuantity: 9,
                        price: 74.99,
                        discount: 6.25,
                        savings: 25.00,
                        label: '5% Off'
                    },
                    {
                        minQuantity: 10,
                        maxQuantity: 24,
                        price: 69.99,
                        discount: 12.5,
                        savings: 100.00,
                        label: '12% Off'
                    },
                    {
                        minQuantity: 25,
                        maxQuantity: 49,
                        price: 64.99,
                        discount: 18.75,
                        savings: 375.00,
                        label: '18% Off'
                    },
                    {
                        minQuantity: 50,
                        maxQuantity: 99,
                        price: 59.99,
                        discount: 25,
                        savings: 1000.00,
                        label: '25% Off'
                    },
                    {
                        minQuantity: 100,
                        maxQuantity: null,
                        price: 54.99,
                        discount: 31.25,
                        savings: 2500.00,
                        label: '31% Off'
                    }
                ],
                promotionalOffers: [
                    {
                        id: 'bulk_bonus',
                        title: 'Buy 10 Get 1 Free',
                        description: 'Purchase 10 units and get 1 additional unit free',
                        type: 'bonus',
                        minQuantity: 10,
                        bonusQuantity: 1,
                        validUntil: '2024-12-31',
                        isActive: true
                    },
                    {
                        id: 'free_shipping',
                        title: 'Free Shipping on Orders Over $500',
                        description: 'Get free shipping when your order total exceeds $500',
                        type: 'shipping',
                        minOrderValue: 500,
                        validUntil: '2024-12-31',
                        isActive: true
                    }
                ],
                volumeDiscounts: [
                    {
                        category: 'Business',
                        minQuantity: 25,
                        discount: 20,
                        requirements: 'Business account required',
                        benefits: ['Priority support', 'Dedicated account manager', 'Custom pricing available']
                    },
                    {
                        category: 'Wholesale',
                        minQuantity: 100,
                        discount: 30,
                        requirements: 'Wholesale account and minimum order verification',
                        benefits: ['Wholesale pricing', 'Bulk shipping options', 'Custom packaging available']
                    }
                ]
            },
            '2': { // Product ID 2
                basePrice: 29.99,
                currency: 'USD',
                bulkPricing: [
                    {
                        minQuantity: 1,
                        maxQuantity: 2,
                        price: 29.99,
                        discount: 0,
                        savings: 0,
                        label: 'Regular Price'
                    },
                    {
                        minQuantity: 3,
                        maxQuantity: 5,
                        price: 26.99,
                        discount: 10,
                        savings: 9.00,
                        label: '10% Off'
                    },
                    {
                        minQuantity: 6,
                        maxQuantity: 9,
                        price: 23.99,
                        discount: 20,
                        savings: 36.00,
                        label: '20% Off'
                    },
                    {
                        minQuantity: 10,
                        maxQuantity: null,
                        price: 20.99,
                        discount: 30,
                        savings: 90.00,
                        label: '30% Off'
                    }
                ],
                promotionalOffers: [
                    {
                        id: 'buy_2_get_1',
                        title: 'Buy 2 Get 1 Free',
                        description: 'Purchase 2 units and get 1 additional unit free',
                        type: 'bonus',
                        minQuantity: 2,
                        bonusQuantity: 1,
                        validUntil: '2024-12-31',
                        isActive: true
                    }
                ],
                volumeDiscounts: []
            },
            '3': { // Product ID 3
                basePrice: 199.99,
                currency: 'USD',
                bulkPricing: [
                    {
                        minQuantity: 1,
                        maxQuantity: 1,
                        price: 199.99,
                        discount: 0,
                        savings: 0,
                        label: 'Regular Price'
                    },
                    {
                        minQuantity: 2,
                        maxQuantity: 4,
                        price: 189.99,
                        discount: 5,
                        savings: 40.00,
                        label: '5% Off'
                    },
                    {
                        minQuantity: 5,
                        maxQuantity: null,
                        price: 179.99,
                        discount: 10,
                        savings: 100.00,
                        label: '10% Off'
                    }
                ],
                promotionalOffers: [],
                volumeDiscounts: []
            }
        };
    }

    /**
     * Render the bulk pricing and quantity discounts section
     */
    renderBulkPricing(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        
        container.innerHTML = `
            <div class="bulk-pricing-section">
                <div class="bulk-pricing-header">
                    <h3><i class="fas fa-layer-group"></i> Bulk Pricing & Quantity Discounts</h3>
                    <p>Save more when you buy more! Take advantage of our volume discounts and special offers.</p>
                </div>

                <div class="bulk-pricing-content">
                    <div class="pricing-calculator">
                        ${this.renderPricingCalculator(data, productId)}
                    </div>

                    <div class="pricing-tiers">
                        ${this.renderPricingTiers(data)}
                    </div>

                    <div class="promotional-offers">
                        ${this.renderPromotionalOffers(data)}
                    </div>

                    <div class="volume-discounts">
                        ${this.renderVolumeDiscounts(data)}
                    </div>

                    <div class="bulk-benefits">
                        ${this.renderBulkBenefits()}
                    </div>
                </div>
            </div>
        `;

        this.initializeBulkPricingHandlers(productId);
    }

    /**
     * Render pricing calculator
     */
    renderPricingCalculator(data, productId) {
        return `
            <div class="pricing-calculator-card">
                <h4>Price Calculator</h4>
                <div class="calculator-content">
                    <div class="quantity-selector">
                        <label for="bulkQuantity">Quantity:</label>
                        <div class="quantity-input-group">
                            <button type="button" class="quantity-btn" onclick="productBulkPricingManager.decreaseQuantity('${productId}')">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" 
                                   id="bulkQuantity" 
                                   name="bulkQuantity" 
                                   value="1" 
                                   min="1" 
                                   max="999"
                                   onchange="productBulkPricingManager.updatePricing('${productId}')">
                            <button type="button" class="quantity-btn" onclick="productBulkPricingManager.increaseQuantity('${productId}')">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div class="pricing-display">
                        <div class="price-breakdown">
                            <div class="price-item">
                                <span class="price-label">Unit Price:</span>
                                <span class="price-value" id="unitPrice">$${data.basePrice.toFixed(2)}</span>
                            </div>
                            <div class="price-item">
                                <span class="price-label">Quantity:</span>
                                <span class="price-value" id="displayQuantity">1</span>
                            </div>
                            <div class="price-item discount" id="discountRow" style="display: none;">
                                <span class="price-label">Discount:</span>
                                <span class="price-value" id="discountAmount">-$0.00</span>
                            </div>
                            <div class="price-item total">
                                <span class="price-label">Total Price:</span>
                                <span class="price-value" id="totalPrice">$${data.basePrice.toFixed(2)}</span>
                            </div>
                            <div class="price-item savings" id="savingsRow" style="display: none;">
                                <span class="price-label">You Save:</span>
                                <span class="price-value" id="totalSavings">$0.00</span>
                            </div>
                        </div>

                        <div class="pricing-tier-info" id="pricingTierInfo">
                            <span class="tier-label">Regular Price</span>
                        </div>
                    </div>

                    <div class="calculator-actions">
                        <button class="btn btn-primary" onclick="productBulkPricingManager.addToCart('${productId}')">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="productBulkPricingManager.addToWishlist('${productId}')">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render pricing tiers
     */
    renderPricingTiers(data) {
        return `
            <div class="pricing-tiers-card">
                <h4>Volume Pricing Tiers</h4>
                <div class="tiers-table">
                    <div class="tiers-header">
                        <div class="tier-column">Quantity</div>
                        <div class="tier-column">Unit Price</div>
                        <div class="tier-column">Discount</div>
                        <div class="tier-column">Savings</div>
                        <div class="tier-column">Action</div>
                    </div>
                    <div class="tiers-body">
                        ${data.bulkPricing.map((tier, index) => `
                            <div class="tier-row ${index === 0 ? 'current' : ''}" data-tier="${index}">
                                <div class="tier-quantity">
                                    ${tier.maxQuantity ? `${tier.minQuantity}-${tier.maxQuantity}` : `${tier.minQuantity}+`}
                                </div>
                                <div class="tier-price">
                                    <span class="price">$${tier.price.toFixed(2)}</span>
                                    ${tier.discount > 0 ? `<span class="original-price">$${data.basePrice.toFixed(2)}</span>` : ''}
                                </div>
                                <div class="tier-discount">
                                    ${tier.discount > 0 ? `${tier.discount}%` : '-'}
                                </div>
                                <div class="tier-savings">
                                    ${tier.savings > 0 ? `$${tier.savings.toFixed(2)}` : '-'}
                                </div>
                                <div class="tier-action">
                                    <button class="btn btn-sm btn-outline" onclick="productBulkPricingManager.selectTier('${tier.minQuantity}')">
                                        Select
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render promotional offers
     */
    renderPromotionalOffers(data) {
        if (!data.promotionalOffers || data.promotionalOffers.length === 0) {
            return '';
        }

        return `
            <div class="promotional-offers-card">
                <h4>Special Offers</h4>
                <div class="offers-grid">
                    ${data.promotionalOffers.map(offer => `
                        <div class="offer-item ${offer.isActive ? 'active' : 'inactive'}">
                            <div class="offer-header">
                                <div class="offer-icon">
                                    <i class="fas fa-${this.getOfferIcon(offer.type)}"></i>
                                </div>
                                <div class="offer-status">
                                    ${offer.isActive ? '<span class="status-badge active">Active</span>' : '<span class="status-badge inactive">Expired</span>'}
                                </div>
                            </div>
                            <div class="offer-content">
                                <h5>${offer.title}</h5>
                                <p>${offer.description}</p>
                                <div class="offer-details">
                                    ${offer.type === 'bonus' ? `
                                        <div class="offer-detail">
                                            <i class="fas fa-shopping-cart"></i>
                                            <span>Min Qty: ${offer.minQuantity}</span>
                                        </div>
                                        <div class="offer-detail">
                                            <i class="fas fa-gift"></i>
                                            <span>Bonus: ${offer.bonusQuantity} free</span>
                                        </div>
                                    ` : ''}
                                    ${offer.type === 'shipping' ? `
                                        <div class="offer-detail">
                                            <i class="fas fa-dollar-sign"></i>
                                            <span>Min Order: $${offer.minOrderValue}</span>
                                        </div>
                                    ` : ''}
                                    <div class="offer-detail">
                                        <i class="fas fa-calendar"></i>
                                        <span>Valid until: ${new Date(offer.validUntil).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="offer-actions">
                                <button class="btn btn-primary btn-sm" ${!offer.isActive ? 'disabled' : ''}>
                                    ${offer.isActive ? 'Apply Offer' : 'Expired'}
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render volume discounts
     */
    renderVolumeDiscounts(data) {
        if (!data.volumeDiscounts || data.volumeDiscounts.length === 0) {
            return '';
        }

        return `
            <div class="volume-discounts-card">
                <h4>Volume Discounts</h4>
                <div class="volume-discounts-grid">
                    ${data.volumeDiscounts.map(discount => `
                        <div class="volume-discount-item">
                            <div class="discount-header">
                                <div class="discount-icon">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div class="discount-info">
                                    <h5>${discount.category} Pricing</h5>
                                    <div class="discount-rate">${discount.discount}% Off</div>
                                </div>
                            </div>
                            <div class="discount-content">
                                <div class="discount-requirements">
                                    <h6>Requirements:</h6>
                                    <ul>
                                        <li>Minimum quantity: ${discount.minQuantity} units</li>
                                        <li>${discount.requirements}</li>
                                    </ul>
                                </div>
                                <div class="discount-benefits">
                                    <h6>Benefits:</h6>
                                    <ul>
                                        ${discount.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="discount-actions">
                                <button class="btn btn-outline btn-sm">
                                    Learn More
                                </button>
                                <button class="btn btn-primary btn-sm">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render bulk benefits
     */
    renderBulkBenefits() {
        return `
            <div class="bulk-benefits-card">
                <h4>Benefits of Bulk Purchasing</h4>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="benefit-content">
                            <h5>Cost Savings</h5>
                            <p>Significant discounts on larger quantities with tiered pricing</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <i class="fas fa-shipping-fast"></i>
                        </div>
                        <div class="benefit-content">
                            <h5>Free Shipping</h5>
                            <p>Free shipping on bulk orders over $500</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="benefit-content">
                            <h5>Priority Support</h5>
                            <p>Dedicated customer support for bulk orders</p>
                        </div>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">
                            <i class="fas fa-gift"></i>
                        </div>
                        <div class="benefit-content">
                            <h5>Bonus Items</h5>
                            <p>Free bonus items with qualifying bulk purchases</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize bulk pricing handlers
     */
    initializeBulkPricingHandlers(productId) {
        const quantityInput = document.getElementById('bulkQuantity');
        if (quantityInput) {
            quantityInput.addEventListener('input', () => {
                this.updatePricing(productId);
            });
        }
    }

    /**
     * Update pricing based on quantity
     */
    updatePricing(productId) {
        const quantity = parseInt(document.getElementById('bulkQuantity').value) || 1;
        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        
        // Find the appropriate pricing tier
        const tier = data.bulkPricing.find(t => 
            quantity >= t.minQuantity && 
            (t.maxQuantity === null || quantity <= t.maxQuantity)
        );

        if (tier) {
            const totalPrice = tier.price * quantity;
            const totalSavings = tier.savings * Math.floor(quantity / tier.minQuantity);
            const discountAmount = (data.basePrice - tier.price) * quantity;

            // Update display
            document.getElementById('unitPrice').textContent = `$${tier.price.toFixed(2)}`;
            document.getElementById('displayQuantity').textContent = quantity;
            document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
            document.getElementById('pricingTierInfo').innerHTML = `<span class="tier-label">${tier.label}</span>`;

            // Show/hide discount and savings rows
            const discountRow = document.getElementById('discountRow');
            const savingsRow = document.getElementById('savingsRow');

            if (tier.discount > 0) {
                discountRow.style.display = 'flex';
                document.getElementById('discountAmount').textContent = `-$${discountAmount.toFixed(2)}`;
            } else {
                discountRow.style.display = 'none';
            }

            if (totalSavings > 0) {
                savingsRow.style.display = 'flex';
                document.getElementById('totalSavings').textContent = `$${totalSavings.toFixed(2)}`;
            } else {
                savingsRow.style.display = 'none';
            }

            // Update tier highlighting
            document.querySelectorAll('.tier-row').forEach(row => {
                row.classList.remove('current');
            });
            const tierIndex = data.bulkPricing.indexOf(tier);
            document.querySelector(`[data-tier="${tierIndex}"]`).classList.add('current');
        }
    }

    /**
     * Decrease quantity
     */
    decreaseQuantity(productId) {
        const quantityInput = document.getElementById('bulkQuantity');
        const currentQuantity = parseInt(quantityInput.value) || 1;
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
            this.updatePricing(productId);
        }
    }

    /**
     * Increase quantity
     */
    increaseQuantity(productId) {
        const quantityInput = document.getElementById('bulkQuantity');
        const currentQuantity = parseInt(quantityInput.value) || 1;
        if (currentQuantity < 999) {
            quantityInput.value = currentQuantity + 1;
            this.updatePricing(productId);
        }
    }

    /**
     * Select pricing tier
     */
    selectTier(minQuantity) {
        const quantityInput = document.getElementById('bulkQuantity');
        quantityInput.value = minQuantity;
        this.updatePricing('1'); // Assuming product ID 1 for demo
    }

    /**
     * Add to cart with bulk pricing
     */
    addToCart(productId) {
        const quantity = parseInt(document.getElementById('bulkQuantity').value) || 1;
        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        const tier = data.bulkPricing.find(t => 
            quantity >= t.minQuantity && 
            (t.maxQuantity === null || quantity <= t.maxQuantity)
        );

        if (tier) {
            // In a real application, this would add the item to cart with the bulk pricing
            alert(`Added ${quantity} units to cart at $${tier.price.toFixed(2)} each (${tier.label})`);
        }
    }

    /**
     * Add to wishlist
     */
    addToWishlist(productId) {
        const quantity = parseInt(document.getElementById('bulkQuantity').value) || 1;
        alert(`Added ${quantity} units to wishlist`);
    }

    /**
     * Get offer icon
     */
    getOfferIcon(type) {
        const icons = {
            'bonus': 'gift',
            'shipping': 'truck',
            'discount': 'percent',
            'cashback': 'money-bill-wave'
        };
        return icons[type] || 'tag';
    }

    /**
     * Get bulk pricing for quantity
     */
    getBulkPricing(productId, quantity) {
        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        return data.bulkPricing.find(t => 
            quantity >= t.minQuantity && 
            (t.maxQuantity === null || quantity <= t.maxQuantity)
        );
    }

    /**
     * Calculate total savings for quantity
     */
    calculateSavings(productId, quantity) {
        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        const tier = this.getBulkPricing(productId, quantity);
        
        if (tier && tier.discount > 0) {
            const regularTotal = data.basePrice * quantity;
            const discountedTotal = tier.price * quantity;
            return regularTotal - discountedTotal;
        }
        
        return 0;
    }

    /**
     * Get available promotional offers
     */
    getActiveOffers(productId) {
        const data = this.bulkPricingData[productId] || this.bulkPricingData['1'];
        return data.promotionalOffers.filter(offer => offer.isActive);
    }
}

// Initialize the manager
const productBulkPricingManager = new ProductBulkPricingManager();

// Global functions for bulk pricing interactions
window.decreaseQuantity = (productId) => productBulkPricingManager.decreaseQuantity(productId);
window.increaseQuantity = (productId) => productBulkPricingManager.increaseQuantity(productId);
window.updatePricing = (productId) => productBulkPricingManager.updatePricing(productId);
window.selectTier = (minQuantity) => productBulkPricingManager.selectTier(minQuantity);
window.addToCart = (productId) => productBulkPricingManager.addToCart(productId);
window.addToWishlist = (productId) => productBulkPricingManager.addToWishlist(productId);

