/**
 * Cart Price Breakdown with Taxes and Fees System
 * Handles detailed price calculations, taxes, fees, and discounts
 */

class CartPricingManager {
    constructor() {
        this.taxRates = {
            'US': {
                'federal': 0.0,
                'state': {
                    'CA': 0.0875, // 8.75%
                    'NY': 0.08,   // 8%
                    'TX': 0.0625, // 6.25%
                    'FL': 0.06,   // 6%
                    'WA': 0.065,  // 6.5%
                    'default': 0.07 // 7% default
                },
                'local': {
                    'default': 0.01 // 1% default local tax
                }
            },
            'CA': {
                'federal': 0.05, // 5% GST
                'provincial': {
                    'ON': 0.08,   // 8% PST
                    'BC': 0.07,   // 7% PST
                    'AB': 0.00,   // 0% PST
                    'QC': 0.09975, // 9.975% PST
                    'default': 0.05 // 5% default
                }
            },
            'UK': {
                'vat': 0.20 // 20% VAT
            },
            'EU': {
                'vat': 0.19 // 19% VAT (Germany rate)
            }
        };

        this.fees = {
            processing: {
                name: 'Processing Fee',
                description: 'Payment processing fee',
                rate: 0.029, // 2.9%
                minAmount: 0.30,
                maxAmount: 10.00,
                type: 'percentage'
            },
            handling: {
                name: 'Handling Fee',
                description: 'Order processing and packaging',
                amount: 2.99,
                type: 'fixed'
            },
            insurance: {
                name: 'Shipping Insurance',
                description: 'Protect your shipment',
                rate: 0.01, // 1%
                minAmount: 1.00,
                maxAmount: 50.00,
                type: 'percentage',
                optional: true
            },
            signature: {
                name: 'Signature Confirmation',
                description: 'Require signature upon delivery',
                amount: 3.99,
                type: 'fixed',
                optional: true
            }
        };

        this.discounts = {
            coupon: {
                name: 'Coupon Discount',
                type: 'percentage',
                value: 0,
                code: '',
                description: ''
            },
            loyalty: {
                name: 'Loyalty Points',
                type: 'fixed',
                value: 0,
                points: 0,
                description: ''
            },
            bulk: {
                name: 'Bulk Discount',
                type: 'percentage',
                value: 0,
                description: ''
            },
            seasonal: {
                name: 'Seasonal Sale',
                type: 'percentage',
                value: 0,
                description: ''
            }
        };

        this.shippingThresholds = {
            free: 50.00,
            express: 100.00,
            overnight: 200.00
        };

        this.currency = 'USD';
        this.currencySymbol = '$';
        this.decimalPlaces = 2;

        this.init();
    }

    /**
     * Initialize the cart pricing system
     */
    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
    }

    /**
     * Calculate complete price breakdown
     */
    calculatePriceBreakdown(cartItems, shippingAddress, shippingOption, appliedDiscounts = {}) {
        const breakdown = {
            subtotal: 0,
            discounts: 0,
            subtotalAfterDiscounts: 0,
            shipping: 0,
            taxes: 0,
            fees: 0,
            total: 0,
            savings: 0,
            details: {
                items: [],
                discounts: [],
                taxes: [],
                fees: [],
                shipping: null
            }
        };

        // Calculate subtotal
        breakdown.subtotal = this.calculateSubtotal(cartItems);
        breakdown.details.items = this.getItemBreakdown(cartItems);

        // Apply discounts
        breakdown.discounts = this.calculateDiscounts(breakdown.subtotal, appliedDiscounts);
        breakdown.details.discounts = this.getDiscountBreakdown(appliedDiscounts);
        breakdown.subtotalAfterDiscounts = breakdown.subtotal - breakdown.discounts;

        // Calculate shipping
        breakdown.shipping = this.calculateShipping(breakdown.subtotalAfterDiscounts, shippingOption);
        breakdown.details.shipping = this.getShippingBreakdown(shippingOption, breakdown.shipping);

        // Calculate taxes
        breakdown.taxes = this.calculateTaxes(breakdown.subtotalAfterDiscounts, shippingAddress);
        breakdown.details.taxes = this.getTaxBreakdown(breakdown.subtotalAfterDiscounts, shippingAddress);

        // Calculate fees
        breakdown.fees = this.calculateFees(breakdown.subtotalAfterDiscounts, shippingAddress);
        breakdown.details.fees = this.getFeeBreakdown(breakdown.subtotalAfterDiscounts, shippingAddress);

        // Calculate total
        breakdown.total = breakdown.subtotalAfterDiscounts + breakdown.shipping + breakdown.taxes + breakdown.fees;

        // Calculate savings
        breakdown.savings = this.calculateSavings(cartItems, appliedDiscounts);

        return breakdown;
    }

    /**
     * Calculate subtotal from cart items
     */
    calculateSubtotal(cartItems) {
        return cartItems.reduce((total, item) => {
            const itemTotal = item.price * item.quantity;
            return total + itemTotal;
        }, 0);
    }

    /**
     * Get item breakdown
     */
    getItemBreakdown(cartItems) {
        return cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            originalPrice: item.originalPrice || item.price,
            savings: item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0
        }));
    }

    /**
     * Calculate discounts
     */
    calculateDiscounts(subtotal, appliedDiscounts) {
        let totalDiscount = 0;

        Object.values(appliedDiscounts).forEach(discount => {
            if (discount.type === 'percentage') {
                totalDiscount += subtotal * (discount.value / 100);
            } else if (discount.type === 'fixed') {
                totalDiscount += discount.value;
            }
        });

        return Math.min(totalDiscount, subtotal); // Don't exceed subtotal
    }

    /**
     * Get discount breakdown
     */
    getDiscountBreakdown(appliedDiscounts) {
        return Object.values(appliedDiscounts).map(discount => ({
            name: discount.name,
            type: discount.type,
            value: discount.value,
            amount: discount.type === 'percentage' ? 
                (this.calculateSubtotal(window.advancedCartManager?.getCartData()?.items || []) * discount.value / 100) : 
                discount.value,
            description: discount.description,
            code: discount.code || ''
        }));
    }

    /**
     * Calculate shipping cost
     */
    calculateShipping(subtotal, shippingOption) {
        if (!shippingOption) return 0;

        // Free shipping threshold
        if (subtotal >= this.shippingThresholds.free && shippingOption.id === 'free') {
            return 0;
        }

        return shippingOption.cost || 0;
    }

    /**
     * Get shipping breakdown
     */
    getShippingBreakdown(shippingOption, shippingCost) {
        if (!shippingOption) return null;

        return {
            name: shippingOption.name,
            description: shippingOption.description,
            cost: shippingCost,
            estimatedDays: shippingOption.estimatedDays,
            features: shippingOption.features || []
        };
    }

    /**
     * Calculate taxes
     */
    calculateTaxes(subtotal, shippingAddress) {
        if (!shippingAddress) return 0;

        const country = shippingAddress.country || 'US';
        const state = shippingAddress.state;
        const taxRates = this.taxRates[country];

        if (!taxRates) return 0;

        let totalTaxRate = 0;

        // Federal tax
        if (taxRates.federal) {
            totalTaxRate += taxRates.federal;
        }

        // State/Provincial tax
        if (taxRates.state || taxRates.provincial) {
            const stateRates = taxRates.state || taxRates.provincial;
            const stateRate = stateRates[state] || stateRates.default || 0;
            totalTaxRate += stateRate;
        }

        // Local tax
        if (taxRates.local) {
            totalTaxRate += taxRates.local.default || 0;
        }

        // VAT (for EU/UK)
        if (taxRates.vat) {
            totalTaxRate += taxRates.vat;
        }

        return subtotal * totalTaxRate;
    }

    /**
     * Get tax breakdown
     */
    getTaxBreakdown(subtotal, shippingAddress) {
        if (!shippingAddress) return [];

        const country = shippingAddress.country || 'US';
        const state = shippingAddress.state;
        const taxRates = this.taxRates[country];

        if (!taxRates) return [];

        const taxes = [];

        // Federal tax
        if (taxRates.federal) {
            taxes.push({
                name: 'Federal Tax',
                rate: taxRates.federal * 100,
                amount: subtotal * taxRates.federal
            });
        }

        // State/Provincial tax
        if (taxRates.state || taxRates.provincial) {
            const stateRates = taxRates.state || taxRates.provincial;
            const stateRate = stateRates[state] || stateRates.default || 0;
            if (stateRate > 0) {
                taxes.push({
                    name: `${state} Tax`,
                    rate: stateRate * 100,
                    amount: subtotal * stateRate
                });
            }
        }

        // Local tax
        if (taxRates.local && taxRates.local.default) {
            taxes.push({
                name: 'Local Tax',
                rate: taxRates.local.default * 100,
                amount: subtotal * taxRates.local.default
            });
        }

        // VAT
        if (taxRates.vat) {
            taxes.push({
                name: 'VAT',
                rate: taxRates.vat * 100,
                amount: subtotal * taxRates.vat
            });
        }

        return taxes;
    }

    /**
     * Calculate fees
     */
    calculateFees(subtotal, shippingAddress) {
        let totalFees = 0;

        // Processing fee
        const processingFee = Math.max(
            subtotal * this.fees.processing.rate,
            this.fees.processing.minAmount
        );
        totalFees += Math.min(processingFee, this.fees.processing.maxAmount);

        // Handling fee
        totalFees += this.fees.handling.amount;

        return totalFees;
    }

    /**
     * Get fee breakdown
     */
    getFeeBreakdown(subtotal, shippingAddress) {
        const fees = [];

        // Processing fee
        const processingFee = Math.max(
            subtotal * this.fees.processing.rate,
            this.fees.processing.minAmount
        );
        fees.push({
            name: this.fees.processing.name,
            description: this.fees.processing.description,
            amount: Math.min(processingFee, this.fees.processing.maxAmount),
            type: this.fees.processing.type
        });

        // Handling fee
        fees.push({
            name: this.fees.handling.name,
            description: this.fees.handling.description,
            amount: this.fees.handling.amount,
            type: this.fees.handling.type
        });

        return fees;
    }

    /**
     * Calculate total savings
     */
    calculateSavings(cartItems, appliedDiscounts) {
        let itemSavings = 0;
        let discountSavings = 0;

        // Item savings (original price vs current price)
        cartItems.forEach(item => {
            if (item.originalPrice && item.originalPrice > item.price) {
                itemSavings += (item.originalPrice - item.price) * item.quantity;
            }
        });

        // Discount savings
        const subtotal = this.calculateSubtotal(cartItems);
        discountSavings = this.calculateDiscounts(subtotal, appliedDiscounts);

        return itemSavings + discountSavings;
    }

    /**
     * Apply coupon code
     */
    applyCoupon(code) {
        // Mock coupon validation
        const validCoupons = {
            'SAVE10': { type: 'percentage', value: 10, description: '10% off your order' },
            'SAVE20': { type: 'percentage', value: 20, description: '20% off your order' },
            'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping on your order' },
            'WELCOME15': { type: 'percentage', value: 15, description: '15% off for new customers' }
        };

        const coupon = validCoupons[code.toUpperCase()];
        if (coupon) {
            this.discounts.coupon = {
                name: 'Coupon Discount',
                type: coupon.type,
                value: coupon.value,
                code: code.toUpperCase(),
                description: coupon.description
            };
            return { success: true, coupon: this.discounts.coupon };
        }

        return { success: false, error: 'Invalid coupon code' };
    }

    /**
     * Remove coupon
     */
    removeCoupon() {
        this.discounts.coupon = {
            name: 'Coupon Discount',
            type: 'percentage',
            value: 0,
            code: '',
            description: ''
        };
    }

    /**
     * Apply loyalty points
     */
    applyLoyaltyPoints(points, pointValue = 0.01) {
        const maxPoints = 1000; // Maximum points that can be used
        const pointsToUse = Math.min(points, maxPoints);
        const discountAmount = pointsToUse * pointValue;

        this.discounts.loyalty = {
            name: 'Loyalty Points',
            type: 'fixed',
            value: discountAmount,
            points: pointsToUse,
            description: `${pointsToUse} loyalty points applied`
        };

        return { success: true, discount: this.discounts.loyalty };
    }

    /**
     * Render price breakdown
     */
    renderPriceBreakdown(containerId, breakdown) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="price-breakdown">
                <div class="breakdown-header">
                    <h3>Order Summary</h3>
                </div>
                
                <div class="breakdown-section">
                    <div class="breakdown-items">
                        <h4>Items (${breakdown.details.items.length})</h4>
                        <div class="items-list">
                            ${breakdown.details.items.map(item => `
                                <div class="item-row">
                                    <div class="item-info">
                                        <span class="item-name">${item.name}</span>
                                        <span class="item-quantity">× ${item.quantity}</span>
                                    </div>
                                    <div class="item-price">
                                        ${item.savings > 0 ? `
                                            <span class="original-price">${this.formatPrice(item.originalPrice * item.quantity)}</span>
                                            <span class="current-price">${this.formatPrice(item.total)}</span>
                                        ` : `
                                            <span class="current-price">${this.formatPrice(item.total)}</span>
                                        `}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="subtotal-row">
                            <span>Subtotal</span>
                            <span>${this.formatPrice(breakdown.subtotal)}</span>
                        </div>
                    </div>
                </div>

                ${breakdown.discounts > 0 ? `
                    <div class="breakdown-section">
                        <div class="discounts-section">
                            <h4>Discounts</h4>
                            <div class="discounts-list">
                                ${breakdown.details.discounts.map(discount => `
                                    <div class="discount-row">
                                        <div class="discount-info">
                                            <span class="discount-name">${discount.name}</span>
                                            ${discount.code ? `<span class="discount-code">(${discount.code})</span>` : ''}
                                        </div>
                                        <div class="discount-amount">
                                            -${this.formatPrice(discount.amount)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="discount-total-row">
                                <span>Total Discounts</span>
                                <span>-${this.formatPrice(breakdown.discounts)}</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                <div class="breakdown-section">
                    <div class="shipping-section">
                        <h4>Shipping</h4>
                        ${breakdown.details.shipping ? `
                            <div class="shipping-row">
                                <div class="shipping-info">
                                    <span class="shipping-name">${breakdown.details.shipping.name}</span>
                                    <span class="shipping-description">${breakdown.details.shipping.description}</span>
                                </div>
                                <div class="shipping-cost">
                                    ${breakdown.details.shipping.cost === 0 ? 'FREE' : this.formatPrice(breakdown.details.shipping.cost)}
                                </div>
                            </div>
                        ` : `
                            <div class="shipping-row">
                                <span>Shipping</span>
                                <span>${this.formatPrice(breakdown.shipping)}</span>
                            </div>
                        `}
                    </div>
                </div>

                ${breakdown.taxes > 0 ? `
                    <div class="breakdown-section">
                        <div class="taxes-section">
                            <h4>Taxes</h4>
                            <div class="taxes-list">
                                ${breakdown.details.taxes.map(tax => `
                                    <div class="tax-row">
                                        <span class="tax-name">${tax.name} (${tax.rate.toFixed(2)}%)</span>
                                        <span class="tax-amount">${this.formatPrice(tax.amount)}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="tax-total-row">
                                <span>Total Taxes</span>
                                <span>${this.formatPrice(breakdown.taxes)}</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${breakdown.fees > 0 ? `
                    <div class="breakdown-section">
                        <div class="fees-section">
                            <h4>Fees</h4>
                            <div class="fees-list">
                                ${breakdown.details.fees.map(fee => `
                                    <div class="fee-row">
                                        <div class="fee-info">
                                            <span class="fee-name">${fee.name}</span>
                                            <span class="fee-description">${fee.description}</span>
                                        </div>
                                        <div class="fee-amount">
                                            ${this.formatPrice(fee.amount)}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="fee-total-row">
                                <span>Total Fees</span>
                                <span>${this.formatPrice(breakdown.fees)}</span>
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${breakdown.savings > 0 ? `
                    <div class="breakdown-section savings-section">
                        <div class="savings-row">
                            <span class="savings-label">You Save</span>
                            <span class="savings-amount">${this.formatPrice(breakdown.savings)}</span>
                        </div>
                    </div>
                ` : ''}

                <div class="breakdown-section total-section">
                    <div class="total-row">
                        <span class="total-label">Total</span>
                        <span class="total-amount">${this.formatPrice(breakdown.total)}</span>
                    </div>
                </div>

                <div class="breakdown-actions">
                    <button class="btn btn-secondary" onclick="cartPricingManager.openCouponModal()">
                        <i class="fas fa-tag"></i> Apply Coupon
                    </button>
                    <button class="btn btn-secondary" onclick="cartPricingManager.openLoyaltyModal()">
                        <i class="fas fa-star"></i> Use Points
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Format price with currency
     */
    formatPrice(amount) {
        return `${this.currencySymbol}${amount.toFixed(this.decimalPlaces)}`;
    }

    /**
     * Open coupon modal
     */
    openCouponModal() {
        const modal = document.createElement('div');
        modal.className = 'coupon-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Apply Coupon Code</h3>
                    <button class="modal-close" onclick="this.closest('.coupon-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form onsubmit="cartPricingManager.applyCouponCode(event)">
                        <div class="form-group">
                            <label>Coupon Code</label>
                            <input type="text" id="couponCode" placeholder="Enter coupon code" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.coupon-modal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </form>
                    <div class="available-coupons">
                        <h4>Available Coupons</h4>
                        <div class="coupon-list">
                            <div class="coupon-item">
                                <span class="coupon-code">SAVE10</span>
                                <span class="coupon-description">10% off your order</span>
                            </div>
                            <div class="coupon-item">
                                <span class="coupon-code">SAVE20</span>
                                <span class="coupon-description">20% off your order</span>
                            </div>
                            <div class="coupon-item">
                                <span class="coupon-code">FREESHIP</span>
                                <span class="coupon-description">Free shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Apply coupon code
     */
    applyCouponCode(event) {
        event.preventDefault();
        const code = document.getElementById('couponCode').value;
        const result = this.applyCoupon(code);
        
        if (result.success) {
            this.showNotification('Coupon applied successfully!', 'success');
            event.target.closest('.coupon-modal').remove();
            this.refreshPriceBreakdown();
        } else {
            this.showNotification(result.error, 'error');
        }
    }

    /**
     * Open loyalty points modal
     */
    openLoyaltyModal() {
        const modal = document.createElement('div');
        modal.className = 'loyalty-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Use Loyalty Points</h3>
                    <button class="modal-close" onclick="this.closest('.loyalty-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="loyalty-info">
                        <p>You have <strong>2,500</strong> loyalty points available.</p>
                        <p>Each point is worth <strong>$${0.01}</strong>.</p>
                    </div>
                    <form onsubmit="cartPricingManager.applyLoyaltyPoints(event)">
                        <div class="form-group">
                            <label>Points to Use</label>
                            <input type="number" id="loyaltyPoints" placeholder="Enter points to use" min="0" max="2500" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.loyalty-modal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Apply Points</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Apply loyalty points
     */
    applyLoyaltyPoints(event) {
        event.preventDefault();
        const points = parseInt(document.getElementById('loyaltyPoints').value);
        const result = this.applyLoyaltyPoints(points);
        
        if (result.success) {
            this.showNotification('Loyalty points applied successfully!', 'success');
            event.target.closest('.loyalty-modal').remove();
            this.refreshPriceBreakdown();
        } else {
            this.showNotification('Failed to apply loyalty points', 'error');
        }
    }

    /**
     * Refresh price breakdown
     */
    refreshPriceBreakdown() {
        if (window.advancedCartManager) {
            const cartData = window.advancedCartManager.getCartData();
            const breakdown = this.calculatePriceBreakdown(
                cartData.items,
                cartData.shippingAddress,
                cartData.shippingOption,
                this.getAppliedDiscounts()
            );
            
            const container = document.querySelector('.price-breakdown');
            if (container) {
                this.renderPriceBreakdown(container.closest('[id]').id, breakdown);
            }
        }
    }

    /**
     * Get applied discounts
     */
    getAppliedDiscounts() {
        const discounts = {};
        
        if (this.discounts.coupon.value > 0) {
            discounts.coupon = this.discounts.coupon;
        }
        
        if (this.discounts.loyalty.value > 0) {
            discounts.loyalty = this.discounts.loyalty;
        }
        
        return discounts;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for cart updates
        document.addEventListener('cartUpdated', () => {
            this.refreshPriceBreakdown();
        });
    }

    /**
     * Load user preferences
     */
    loadUserPreferences() {
        const saved = localStorage.getItem('cartPricingPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            this.currency = preferences.currency || 'USD';
            this.currencySymbol = preferences.currencySymbol || '$';
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the cart pricing manager
const cartPricingManager = new CartPricingManager();

// Global functions for cart pricing
window.openCouponModal = () => cartPricingManager.openCouponModal();
window.openLoyaltyModal = () => cartPricingManager.openLoyaltyModal();
window.applyCouponCode = (event) => cartPricingManager.applyCouponCode(event);
window.applyLoyaltyPoints = (event) => cartPricingManager.applyLoyaltyPoints(event);

