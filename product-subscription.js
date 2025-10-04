/**
 * Product Subscription and Auto-Reorder Manager
 * Handles subscription plans, auto-reorder settings, delivery schedules, and subscription management
 */

class ProductSubscriptionManager {
    constructor() {
        this.subscriptionData = {
            '1': { // Product ID 1
                available: true,
                plans: [
                    {
                        id: 'monthly',
                        name: 'Monthly Subscription',
                        description: 'Get this product delivered every month',
                        frequency: 'monthly',
                        interval: 1,
                        discount: 10,
                        price: 71.99,
                        originalPrice: 79.99,
                        savings: 8.00,
                        deliveryDays: [1, 15], // 1st and 15th of each month
                        flexibility: 'high',
                        features: [
                            '10% discount on every order',
                            'Free shipping on all deliveries',
                            'Flexible delivery dates',
                            'Easy skip or cancel anytime',
                            'Priority customer support'
                        ],
                        popular: true
                    },
                    {
                        id: 'biweekly',
                        name: 'Bi-Weekly Subscription',
                        description: 'Get this product delivered every 2 weeks',
                        frequency: 'biweekly',
                        interval: 2,
                        discount: 15,
                        price: 67.99,
                        originalPrice: 79.99,
                        savings: 12.00,
                        deliveryDays: [1, 15], // Every 2 weeks
                        flexibility: 'medium',
                        features: [
                            '15% discount on every order',
                            'Free shipping on all deliveries',
                            'Regular delivery schedule',
                            'Easy skip or cancel anytime',
                            'Priority customer support'
                        ],
                        popular: false
                    },
                    {
                        id: 'weekly',
                        name: 'Weekly Subscription',
                        description: 'Get this product delivered every week',
                        frequency: 'weekly',
                        interval: 1,
                        discount: 20,
                        price: 63.99,
                        originalPrice: 79.99,
                        savings: 16.00,
                        deliveryDays: [1], // Every week
                        flexibility: 'low',
                        features: [
                            '20% discount on every order',
                            'Free shipping on all deliveries',
                            'Consistent weekly delivery',
                            'Easy skip or cancel anytime',
                            'Priority customer support'
                        ],
                        popular: false
                    }
                ],
                benefits: [
                    {
                        icon: 'fas fa-percentage',
                        title: 'Save Money',
                        description: 'Get up to 20% off with subscription discounts'
                    },
                    {
                        icon: 'fas fa-shipping-fast',
                        title: 'Free Shipping',
                        description: 'Free shipping on all subscription deliveries'
                    },
                    {
                        icon: 'fas fa-calendar-alt',
                        title: 'Never Run Out',
                        description: 'Automatic delivery ensures you never run out'
                    },
                    {
                        icon: 'fas fa-cog',
                        title: 'Flexible Control',
                        description: 'Skip, pause, or cancel anytime with ease'
                    }
                ],
                customization: {
                    quantityOptions: [1, 2, 3, 4, 5],
                    deliveryDays: [1, 5, 10, 15, 20, 25],
                    skipOptions: ['Skip next delivery', 'Pause for 1 month', 'Pause for 2 months', 'Pause for 3 months']
                }
            },
            '2': { // Product ID 2
                available: true,
                plans: [
                    {
                        id: 'monthly',
                        name: 'Monthly Subscription',
                        description: 'Get this product delivered every month',
                        frequency: 'monthly',
                        interval: 1,
                        discount: 5,
                        price: 28.49,
                        originalPrice: 29.99,
                        savings: 1.50,
                        deliveryDays: [1, 15],
                        flexibility: 'high',
                        features: [
                            '5% discount on every order',
                            'Free shipping on all deliveries',
                            'Flexible delivery dates',
                            'Easy skip or cancel anytime'
                        ],
                        popular: true
                    }
                ],
                benefits: [
                    {
                        icon: 'fas fa-percentage',
                        title: 'Save Money',
                        description: 'Get 5% off with subscription discounts'
                    },
                    {
                        icon: 'fas fa-shipping-fast',
                        title: 'Free Shipping',
                        description: 'Free shipping on all subscription deliveries'
                    }
                ],
                customization: {
                    quantityOptions: [1, 2, 3],
                    deliveryDays: [1, 15],
                    skipOptions: ['Skip next delivery', 'Pause for 1 month']
                }
            },
            '3': { // Product ID 3
                available: false
            }
        };

        this.userSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions')) || {};
    }

    /**
     * Render the subscription and auto-reorder section
     */
    renderSubscription(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.subscriptionData[productId] || this.subscriptionData['1'];
        
        if (!data.available) {
            container.innerHTML = `
                <div class="subscription-section">
                    <div class="subscription-unavailable">
                        <i class="fas fa-times-circle"></i>
                        <h3>Subscription Not Available</h3>
                        <p>This product is not available for subscription at this time.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="subscription-section">
                <div class="subscription-header">
                    <h3><i class="fas fa-sync-alt"></i> Subscribe & Save</h3>
                    <p>Never run out of your favorite products with our convenient subscription service. Save money and enjoy automatic deliveries.</p>
                </div>

                <div class="subscription-content">
                    <div class="subscription-benefits">
                        ${this.renderSubscriptionBenefits(data.benefits)}
                    </div>

                    <div class="subscription-plans">
                        ${this.renderSubscriptionPlans(data.plans)}
                    </div>

                    <div class="subscription-customization">
                        ${this.renderSubscriptionCustomization(data.customization)}
                    </div>

                    <div class="subscription-summary">
                        ${this.renderSubscriptionSummary()}
                    </div>
                </div>
            </div>
        `;

        this.initializeSubscriptionHandlers(productId);
    }

    /**
     * Render subscription benefits
     */
    renderSubscriptionBenefits(benefits) {
        return `
            <div class="subscription-benefits-card">
                <h4>Why Subscribe?</h4>
                <div class="benefits-grid">
                    ${benefits.map(benefit => `
                        <div class="benefit-item">
                            <div class="benefit-icon">
                                <i class="${benefit.icon}"></i>
                            </div>
                            <div class="benefit-content">
                                <h5>${benefit.title}</h5>
                                <p>${benefit.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render subscription plans
     */
    renderSubscriptionPlans(plans) {
        return `
            <div class="subscription-plans-card">
                <h4>Choose Your Subscription Plan</h4>
                <div class="plans-grid">
                    ${plans.map(plan => `
                        <div class="plan-item ${plan.popular ? 'popular' : ''}" data-plan-id="${plan.id}">
                            ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
                            <div class="plan-header">
                                <h5>${plan.name}</h5>
                                <p>${plan.description}</p>
                            </div>
                            <div class="plan-pricing">
                                <div class="price-display">
                                    <span class="current-price">$${plan.price.toFixed(2)}</span>
                                    <span class="original-price">$${plan.originalPrice.toFixed(2)}</span>
                                </div>
                                <div class="discount-info">
                                    <span class="discount-percentage">${plan.discount}% OFF</span>
                                    <span class="savings-amount">Save $${plan.savings.toFixed(2)}</span>
                                </div>
                            </div>
                            <div class="plan-features">
                                <ul>
                                    ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="plan-actions">
                                <button class="btn btn-primary" onclick="productSubscriptionManager.selectPlan('${plan.id}')">
                                    <i class="fas fa-check"></i> Select Plan
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render subscription customization
     */
    renderSubscriptionCustomization(customization) {
        return `
            <div class="subscription-customization-card">
                <h4>Customize Your Subscription</h4>
                <div class="customization-content">
                    <div class="customization-section">
                        <h5>Quantity</h5>
                        <div class="quantity-options">
                            ${customization.quantityOptions.map(qty => `
                                <button class="quantity-btn" data-quantity="${qty}" onclick="productSubscriptionManager.selectQuantity(${qty})">
                                    ${qty}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="customization-section">
                        <h5>Delivery Day</h5>
                        <div class="delivery-options">
                            <select id="deliveryDay" onchange="productSubscriptionManager.updateDeliveryDay()">
                                <option value="">Select delivery day</option>
                                ${customization.deliveryDays.map(day => `
                                    <option value="${day}">${day}${this.getOrdinalSuffix(day)} of each month</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>

                    <div class="customization-section">
                        <h5>Next Delivery Date</h5>
                        <div class="delivery-date-picker">
                            <input type="date" id="nextDeliveryDate" onchange="productSubscriptionManager.updateDeliveryDate()">
                            <p class="date-help">Choose when you want your first delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render subscription summary
     */
    renderSubscriptionSummary() {
        return `
            <div class="subscription-summary-card">
                <h4>Subscription Summary</h4>
                <div class="summary-content">
                    <div class="summary-items" id="subscriptionSummaryItems">
                        <div class="no-selection">
                            <i class="fas fa-sync-alt"></i>
                            <p>No subscription plan selected yet</p>
                        </div>
                    </div>
                    <div class="summary-total" id="subscriptionSummaryTotal" style="display: none;">
                        <div class="total-line">
                            <span>Subscription Total:</span>
                            <span id="subscriptionTotalAmount">$0.00</span>
                        </div>
                        <div class="savings-line">
                            <span>You Save:</span>
                            <span id="subscriptionSavings">$0.00</span>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-primary" onclick="productSubscriptionManager.startSubscription()">
                            <i class="fas fa-play"></i> Start Subscription
                        </button>
                        <button class="btn btn-secondary" onclick="productSubscriptionManager.clearSubscription()">
                            <i class="fas fa-times"></i> Clear Selection
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize subscription handlers
     */
    initializeSubscriptionHandlers(productId) {
        // Set default quantity
        this.selectQuantity(1);
        
        // Set default delivery date to next month
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);
        document.getElementById('nextDeliveryDate').value = nextMonth.toISOString().split('T')[0];
    }

    /**
     * Select subscription plan
     */
    selectPlan(planId) {
        // Remove previous selection
        document.querySelectorAll('.plan-item').forEach(plan => {
            plan.classList.remove('selected');
        });

        // Add selection to current plan
        const selectedPlan = document.querySelector(`[data-plan-id="${planId}"]`);
        if (selectedPlan) {
            selectedPlan.classList.add('selected');
        }

        this.updateSubscriptionSummary();
    }

    /**
     * Select quantity
     */
    selectQuantity(quantity) {
        // Remove previous selection
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add selection to current quantity
        const selectedBtn = document.querySelector(`[data-quantity="${quantity}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }

        this.updateSubscriptionSummary();
    }

    /**
     * Update delivery day
     */
    updateDeliveryDay() {
        this.updateSubscriptionSummary();
    }

    /**
     * Update delivery date
     */
    updateDeliveryDate() {
        this.updateSubscriptionSummary();
    }

    /**
     * Update subscription summary
     */
    updateSubscriptionSummary() {
        const summaryItems = document.getElementById('subscriptionSummaryItems');
        const summaryTotal = document.getElementById('subscriptionSummaryTotal');
        const totalAmount = document.getElementById('subscriptionTotalAmount');
        const savingsAmount = document.getElementById('subscriptionSavings');
        
        if (!summaryItems || !summaryTotal || !totalAmount || !savingsAmount) return;

        const selectedPlan = document.querySelector('.plan-item.selected');
        const selectedQuantity = document.querySelector('.quantity-btn.selected');
        const deliveryDay = document.getElementById('deliveryDay')?.value;
        const deliveryDate = document.getElementById('nextDeliveryDate')?.value;

        if (selectedPlan && selectedQuantity) {
            const planId = selectedPlan.dataset.planId;
            const quantity = parseInt(selectedQuantity.dataset.quantity);
            const data = this.subscriptionData['1']; // Assuming product ID 1
            const plan = data.plans.find(p => p.id === planId);
            
            if (plan) {
                const totalPrice = plan.price * quantity;
                const totalSavings = plan.savings * quantity;
                
                summaryItems.innerHTML = `
                    <div class="summary-item">
                        <span class="item-label">Plan:</span>
                        <span class="item-value">${plan.name}</span>
                    </div>
                    <div class="summary-item">
                        <span class="item-label">Quantity:</span>
                        <span class="item-value">${quantity}</span>
                    </div>
                    <div class="summary-item">
                        <span class="item-label">Frequency:</span>
                        <span class="item-value">Every ${plan.interval} ${plan.frequency}</span>
                    </div>
                    ${deliveryDay ? `
                        <div class="summary-item">
                            <span class="item-label">Delivery Day:</span>
                            <span class="item-value">${deliveryDay}${this.getOrdinalSuffix(deliveryDay)} of each month</span>
                        </div>
                    ` : ''}
                    ${deliveryDate ? `
                        <div class="summary-item">
                            <span class="item-label">Next Delivery:</span>
                            <span class="item-value">${new Date(deliveryDate).toLocaleDateString()}</span>
                        </div>
                    ` : ''}
                `;
                
                totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
                savingsAmount.textContent = `$${totalSavings.toFixed(2)}`;
                summaryTotal.style.display = 'block';
            }
        } else {
            summaryItems.innerHTML = `
                <div class="no-selection">
                    <i class="fas fa-sync-alt"></i>
                    <p>No subscription plan selected yet</p>
                </div>
            `;
            summaryTotal.style.display = 'none';
        }
    }

    /**
     * Start subscription
     */
    startSubscription() {
        const selectedPlan = document.querySelector('.plan-item.selected');
        const selectedQuantity = document.querySelector('.quantity-btn.selected');
        const deliveryDay = document.getElementById('deliveryDay')?.value;
        const deliveryDate = document.getElementById('nextDeliveryDate')?.value;

        if (!selectedPlan || !selectedQuantity) {
            alert('Please select a subscription plan and quantity.');
            return;
        }

        if (!deliveryDay) {
            alert('Please select a delivery day.');
            return;
        }

        if (!deliveryDate) {
            alert('Please select a delivery date.');
            return;
        }

        // In a real application, this would create the subscription
        alert('Subscription started successfully! You will receive your first delivery on the selected date.');
        
        // Save subscription to localStorage
        const subscription = {
            planId: selectedPlan.dataset.planId,
            quantity: parseInt(selectedQuantity.dataset.quantity),
            deliveryDay: deliveryDay,
            nextDelivery: deliveryDate,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        this.userSubscriptions['1'] = subscription; // Assuming product ID 1
        localStorage.setItem('userSubscriptions', JSON.stringify(this.userSubscriptions));
    }

    /**
     * Clear subscription selection
     */
    clearSubscription() {
        // Clear selections
        document.querySelectorAll('.plan-item, .quantity-btn').forEach(item => {
            item.classList.remove('selected');
        });

        // Clear form fields
        document.getElementById('deliveryDay').value = '';
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);
        document.getElementById('nextDeliveryDate').value = nextMonth.toISOString().split('T')[0];

        // Update summary
        this.updateSubscriptionSummary();
    }

    /**
     * Get ordinal suffix for numbers
     */
    getOrdinalSuffix(num) {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) {
            return 'st';
        }
        if (j === 2 && k !== 12) {
            return 'nd';
        }
        if (j === 3 && k !== 13) {
            return 'rd';
        }
        return 'th';
    }

    /**
     * Get user subscriptions
     */
    getUserSubscriptions() {
        return this.userSubscriptions;
    }

    /**
     * Cancel subscription
     */
    cancelSubscription(productId) {
        if (this.userSubscriptions[productId]) {
            this.userSubscriptions[productId].status = 'cancelled';
            this.userSubscriptions[productId].cancelledAt = new Date().toISOString();
            localStorage.setItem('userSubscriptions', JSON.stringify(this.userSubscriptions));
            return true;
        }
        return false;
    }

    /**
     * Pause subscription
     */
    pauseSubscription(productId, duration) {
        if (this.userSubscriptions[productId]) {
            this.userSubscriptions[productId].status = 'paused';
            this.userSubscriptions[productId].pauseDuration = duration;
            this.userSubscriptions[productId].pausedAt = new Date().toISOString();
            localStorage.setItem('userSubscriptions', JSON.stringify(this.userSubscriptions));
            return true;
        }
        return false;
    }

    /**
     * Skip next delivery
     */
    skipNextDelivery(productId) {
        if (this.userSubscriptions[productId]) {
            this.userSubscriptions[productId].skipNext = true;
            this.userSubscriptions[productId].skipDate = new Date().toISOString();
            localStorage.setItem('userSubscriptions', JSON.stringify(this.userSubscriptions));
            return true;
        }
        return false;
    }
}

// Initialize the manager
const productSubscriptionManager = new ProductSubscriptionManager();

// Global functions for subscription interactions
window.selectPlan = (planId) => productSubscriptionManager.selectPlan(planId);
window.selectQuantity = (quantity) => productSubscriptionManager.selectQuantity(quantity);
window.updateDeliveryDay = () => productSubscriptionManager.updateDeliveryDay();
window.updateDeliveryDate = () => productSubscriptionManager.updateDeliveryDate();
window.startSubscription = () => productSubscriptionManager.startSubscription();
window.clearSubscription = () => productSubscriptionManager.clearSubscription();

