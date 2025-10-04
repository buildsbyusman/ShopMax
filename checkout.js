/**
 * Checkout Process with Multiple Payment Methods System
 * Handles the complete checkout flow with various payment options
 */

class CheckoutManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.checkoutData = {
            customer: {
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
                isGuest: false
            },
            shipping: {
                address: null,
                method: null,
                instructions: ''
            },
            billing: {
                address: null,
                sameAsShipping: true
            },
            payment: {
                method: null,
                details: {},
                saveForFuture: false
            },
            order: {
                items: [],
                subtotal: 0,
                discounts: 0,
                shipping: 0,
                taxes: 0,
                fees: 0,
                total: 0
            }
        };

        this.paymentMethods = [
            {
                id: 'credit_card',
                name: 'Credit/Debit Card',
                description: 'Visa, Mastercard, American Express, Discover',
                icon: 'fas fa-credit-card',
                enabled: true,
                processingFee: 0.029,
                minAmount: 1.00,
                maxAmount: 10000.00,
                supportedCards: ['visa', 'mastercard', 'amex', 'discover'],
                securityFeatures: ['3D Secure', 'PCI DSS Compliant', 'Fraud Protection']
            },
            {
                id: 'paypal',
                name: 'PayPal',
                description: 'Pay with your PayPal account',
                icon: 'fab fa-paypal',
                enabled: true,
                processingFee: 0.034,
                minAmount: 1.00,
                maxAmount: 10000.00,
                features: ['Buyer Protection', 'Instant Payment', 'No Card Required']
            },
            {
                id: 'apple_pay',
                name: 'Apple Pay',
                description: 'Pay with Touch ID or Face ID',
                icon: 'fab fa-apple-pay',
                enabled: true,
                processingFee: 0.029,
                minAmount: 1.00,
                maxAmount: 10000.00,
                requirements: ['iOS Device', 'Touch ID/Face ID', 'Apple Wallet']
            },
            {
                id: 'google_pay',
                name: 'Google Pay',
                description: 'Pay with your Google account',
                icon: 'fab fa-google-pay',
                enabled: true,
                processingFee: 0.029,
                minAmount: 1.00,
                maxAmount: 10000.00,
                requirements: ['Android Device', 'Google Account', 'Google Pay App']
            },
            {
                id: 'bank_transfer',
                name: 'Bank Transfer',
                description: 'Direct bank transfer (ACH)',
                icon: 'fas fa-university',
                enabled: true,
                processingFee: 0.00,
                minAmount: 10.00,
                maxAmount: 50000.00,
                processingTime: '1-3 business days',
                features: ['Low Fees', 'Secure', 'Direct from Bank']
            },
            {
                id: 'crypto',
                name: 'Cryptocurrency',
                description: 'Pay with Bitcoin, Ethereum, or other crypto',
                icon: 'fab fa-bitcoin',
                enabled: true,
                processingFee: 0.01,
                minAmount: 10.00,
                maxAmount: 100000.00,
                supportedCoins: ['BTC', 'ETH', 'LTC', 'BCH'],
                features: ['Decentralized', 'Low Fees', 'Fast Settlement']
            },
            {
                id: 'klarna',
                name: 'Klarna',
                description: 'Pay in 4 interest-free installments',
                icon: 'fas fa-calendar-alt',
                enabled: true,
                processingFee: 0.039,
                minAmount: 10.00,
                maxAmount: 1000.00,
                features: ['Pay in 4', 'Interest Free', 'No Credit Check']
            },
            {
                id: 'afterpay',
                name: 'Afterpay',
                description: 'Buy now, pay later in 4 installments',
                icon: 'fas fa-credit-card',
                enabled: true,
                processingFee: 0.039,
                minAmount: 10.00,
                maxAmount: 1000.00,
                features: ['Pay in 4', 'No Interest', 'Instant Approval']
            }
        ];

        this.checkoutSteps = [
            {
                id: 1,
                title: 'Customer Information',
                description: 'Enter your contact details',
                icon: 'fas fa-user',
                required: true
            },
            {
                id: 2,
                title: 'Shipping & Delivery',
                description: 'Choose shipping address and method',
                icon: 'fas fa-shipping-fast',
                required: true
            },
            {
                id: 3,
                title: 'Payment Method',
                description: 'Select your preferred payment option',
                icon: 'fas fa-credit-card',
                required: true
            },
            {
                id: 4,
                title: 'Review & Place Order',
                description: 'Review your order and complete purchase',
                icon: 'fas fa-check-circle',
                required: true
            }
        ];

        this.init();
    }

    /**
     * Initialize the checkout system
     */
    init() {
        this.loadCheckoutData();
        this.setupEventListeners();
        this.loadCartData();
    }

    /**
     * Load cart data into checkout
     */
    loadCartData() {
        if (window.advancedCartManager) {
            const cartData = window.advancedCartManager.getCartData();
            this.checkoutData.order.items = cartData.items;
            this.checkoutData.order.subtotal = cartData.subtotal;
            this.checkoutData.order.discounts = cartData.discounts;
            this.checkoutData.order.shipping = cartData.shipping;
            this.checkoutData.order.taxes = cartData.taxes;
            this.checkoutData.order.fees = cartData.fees;
            this.checkoutData.order.total = cartData.total;
        }
    }

    /**
     * Start checkout process
     */
    startCheckout() {
        this.currentStep = 1;
        this.renderCheckoutPage();
        this.updateStepProgress();
    }

    /**
     * Render checkout page
     */
    renderCheckoutPage() {
        const container = document.getElementById('checkoutContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="checkout-page">
                <div class="checkout-header">
                    <h1>Checkout</h1>
                    <div class="checkout-progress">
                        ${this.checkoutSteps.map(step => `
                            <div class="progress-step ${step.id <= this.currentStep ? 'active' : ''} ${step.id < this.currentStep ? 'completed' : ''}">
                                <div class="step-icon">
                                    <i class="${step.icon}"></i>
                                </div>
                                <div class="step-info">
                                    <div class="step-title">${step.title}</div>
                                    <div class="step-description">${step.description}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="checkout-content">
                    <div class="checkout-main">
                        <div class="checkout-step" id="checkoutStep${this.currentStep}">
                            ${this.renderCurrentStep()}
                        </div>
                    </div>

                    <div class="checkout-sidebar">
                        <div class="order-summary">
                            <h3>Order Summary</h3>
                            <div class="summary-items">
                                ${this.checkoutData.order.items.map(item => `
                                    <div class="summary-item">
                                        <div class="item-image">
                                            <img src="${item.image}" alt="${item.name}">
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">${item.name}</div>
                                            <div class="item-options">${item.options ? item.options.join(', ') : ''}</div>
                                            <div class="item-quantity">Qty: ${item.quantity}</div>
                                        </div>
                                        <div class="item-price">${this.formatPrice(item.price * item.quantity)}</div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="summary-totals">
                                <div class="total-line">
                                    <span>Subtotal</span>
                                    <span>${this.formatPrice(this.checkoutData.order.subtotal)}</span>
                                </div>
                                ${this.checkoutData.order.discounts > 0 ? `
                                    <div class="total-line discount">
                                        <span>Discounts</span>
                                        <span>-${this.formatPrice(this.checkoutData.order.discounts)}</span>
                                    </div>
                                ` : ''}
                                <div class="total-line">
                                    <span>Shipping</span>
                                    <span>${this.checkoutData.order.shipping === 0 ? 'FREE' : this.formatPrice(this.checkoutData.order.shipping)}</span>
                                </div>
                                <div class="total-line">
                                    <span>Taxes</span>
                                    <span>${this.formatPrice(this.checkoutData.order.taxes)}</span>
                                </div>
                                <div class="total-line">
                                    <span>Fees</span>
                                    <span>${this.formatPrice(this.checkoutData.order.fees)}</span>
                                </div>
                                <div class="total-line total">
                                    <span>Total</span>
                                    <span>${this.formatPrice(this.checkoutData.order.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="security-badges">
                            <h4>Secure Checkout</h4>
                            <div class="badges">
                                <div class="badge">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>SSL Secured</span>
                                </div>
                                <div class="badge">
                                    <i class="fas fa-lock"></i>
                                    <span>PCI Compliant</span>
                                </div>
                                <div class="badge">
                                    <i class="fas fa-user-shield"></i>
                                    <span>Fraud Protection</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render current step content
     */
    renderCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.renderCustomerInfoStep();
            case 2:
                return this.renderShippingStep();
            case 3:
                return this.renderPaymentStep();
            case 4:
                return this.renderReviewStep();
            default:
                return '';
        }
    }

    /**
     * Render customer information step
     */
    renderCustomerInfoStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h2>Customer Information</h2>
                    <p>Enter your contact details to continue</p>
                </div>

                <div class="guest-checkout-option">
                    <div class="checkout-type-selector">
                        <label class="radio-option">
                            <input type="radio" name="checkoutType" value="guest" ${this.checkoutData.customer.isGuest ? 'checked' : ''}>
                            <span class="radio-label">
                                <i class="fas fa-user"></i>
                                <div>
                                    <strong>Guest Checkout</strong>
                                    <small>Checkout without creating an account</small>
                                </div>
                            </span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="checkoutType" value="account" ${!this.checkoutData.customer.isGuest ? 'checked' : ''}>
                            <span class="radio-label">
                                <i class="fas fa-user-circle"></i>
                                <div>
                                    <strong>Account Checkout</strong>
                                    <small>Sign in or create an account for faster checkout</small>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>

                <form class="customer-form" onsubmit="checkoutManager.handleCustomerInfo(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" name="email" value="${this.checkoutData.customer.email}" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" value="${this.checkoutData.customer.phone}" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" name="firstName" value="${this.checkoutData.customer.firstName}" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name *</label>
                            <input type="text" name="lastName" value="${this.checkoutData.customer.lastName}" required>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            Continue to Shipping
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    /**
     * Render shipping step
     */
    renderShippingStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h2>Shipping & Delivery</h2>
                    <p>Choose your shipping address and delivery method</p>
                </div>

                <div class="shipping-section">
                    <h3>Shipping Address</h3>
                    <div id="shippingAddressSelector">
                        ${this.renderAddressSelector()}
                    </div>
                </div>

                <div class="shipping-methods">
                    <h3>Delivery Method</h3>
                    <div class="shipping-options">
                        ${this.renderShippingOptions()}
                    </div>
                </div>

                <div class="delivery-instructions">
                    <h3>Delivery Instructions</h3>
                    <textarea placeholder="Add special delivery instructions (optional)"></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="checkoutManager.previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Back to Customer Info
                    </button>
                    <button type="button" class="btn btn-primary" onclick="checkoutManager.nextStep()">
                        Continue to Payment
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render payment step
     */
    renderPaymentStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h2>Payment Method</h2>
                    <p>Select your preferred payment option</p>
                </div>

                <div class="payment-methods">
                    ${this.paymentMethods.map(method => `
                        <div class="payment-method ${method.enabled ? '' : 'disabled'}" 
                             onclick="checkoutManager.selectPaymentMethod('${method.id}')">
                            <div class="method-header">
                                <div class="method-icon">
                                    <i class="${method.icon}"></i>
                                </div>
                                <div class="method-info">
                                    <h4>${method.name}</h4>
                                    <p>${method.description}</p>
                                </div>
                                <div class="method-radio">
                                    <input type="radio" name="paymentMethod" value="${method.id}">
                                </div>
                            </div>
                            ${method.features ? `
                                <div class="method-features">
                                    ${method.features.map(feature => `
                                        <span class="feature-tag">${feature}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="payment-details" id="paymentDetails">
                    <!-- Payment method specific details will be loaded here -->
                </div>

                <div class="billing-address">
                    <h3>Billing Address</h3>
                    <div class="billing-options">
                        <label class="checkbox-option">
                            <input type="checkbox" name="sameAsShipping" checked>
                            <span>Same as shipping address</span>
                        </label>
                    </div>
                    <div class="billing-address-form" id="billingAddressForm" style="display: none;">
                        <!-- Billing address form will be loaded here -->
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="checkoutManager.previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Back to Shipping
                    </button>
                    <button type="button" class="btn btn-primary" onclick="checkoutManager.nextStep()">
                        Continue to Review
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render review step
     */
    renderReviewStep() {
        return `
            <div class="step-content">
                <div class="step-header">
                    <h2>Review & Place Order</h2>
                    <p>Please review your order details before placing your order</p>
                </div>

                <div class="review-sections">
                    <div class="review-section">
                        <h3>Customer Information</h3>
                        <div class="review-content">
                            <p><strong>Name:</strong> ${this.checkoutData.customer.firstName} ${this.checkoutData.customer.lastName}</p>
                            <p><strong>Email:</strong> ${this.checkoutData.customer.email}</p>
                            <p><strong>Phone:</strong> ${this.checkoutData.customer.phone}</p>
                        </div>
                    </div>

                    <div class="review-section">
                        <h3>Shipping Address</h3>
                        <div class="review-content">
                            ${this.checkoutData.shipping.address ? `
                                <p>${this.checkoutData.shipping.address.firstName} ${this.checkoutData.shipping.address.lastName}</p>
                                <p>${this.checkoutData.shipping.address.address1}</p>
                                ${this.checkoutData.shipping.address.address2 ? `<p>${this.checkoutData.shipping.address.address2}</p>` : ''}
                                <p>${this.checkoutData.shipping.address.city}, ${this.checkoutData.shipping.address.state} ${this.checkoutData.shipping.address.zipCode}</p>
                            ` : '<p>No shipping address selected</p>'}
                        </div>
                    </div>

                    <div class="review-section">
                        <h3>Payment Method</h3>
                        <div class="review-content">
                            ${this.checkoutData.payment.method ? `
                                <p><strong>Method:</strong> ${this.paymentMethods.find(m => m.id === this.checkoutData.payment.method)?.name}</p>
                            ` : '<p>No payment method selected</p>'}
                        </div>
                    </div>
                </div>

                <div class="terms-and-conditions">
                    <label class="checkbox-option">
                        <input type="checkbox" name="acceptTerms" required>
                        <span>I agree to the <a href="#" target="_blank">Terms and Conditions</a> and <a href="#" target="_blank">Privacy Policy</a></span>
                    </label>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="checkoutManager.previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Back to Payment
                    </button>
                    <button type="button" class="btn btn-primary btn-large" onclick="checkoutManager.placeOrder()">
                        <i class="fas fa-lock"></i>
                        Place Order
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render address selector
     */
    renderAddressSelector() {
        if (window.shippingAddressesManager) {
            const addresses = window.shippingAddressesManager.getAllAddresses();
            return `
                <div class="address-selector">
                    ${addresses.map(address => `
                        <div class="address-option ${address.isDefault ? 'default' : ''}" 
                             onclick="checkoutManager.selectShippingAddress('${address.id}')">
                            <div class="address-type">
                                <i class="fas fa-${address.type === 'home' ? 'home' : 'building'}"></i>
                                <span>${address.type === 'home' ? 'Home' : 'Work'}</span>
                            </div>
                            <div class="address-details">
                                <div class="address-name">${address.firstName} ${address.lastName}</div>
                                <div class="address-street">${address.address1}</div>
                                ${address.address2 ? `<div class="address-street">${address.address2}</div>` : ''}
                                <div class="address-city">${address.city}, ${address.state} ${address.zipCode}</div>
                            </div>
                        </div>
                    `).join('')}
                    <button class="btn btn-secondary" onclick="checkoutManager.addNewAddress()">
                        <i class="fas fa-plus"></i> Add New Address
                    </button>
                </div>
            `;
        }
        return '<p>No addresses available. Please add a shipping address.</p>';
    }

    /**
     * Render shipping options
     */
    renderShippingOptions() {
        if (window.shippingAddressesManager) {
            const options = window.shippingAddressesManager.getShippingOptions();
            return options.map(option => `
                <div class="shipping-option" onclick="checkoutManager.selectShippingMethod('${option.id}')">
                    <div class="option-header">
                        <div class="option-icon">
                            <i class="${option.icon}"></i>
                        </div>
                        <div class="option-info">
                            <h4>${option.name}</h4>
                            <p>${option.description}</p>
                        </div>
                        <div class="option-cost">
                            ${option.cost === 0 ? 'FREE' : this.formatPrice(option.cost)}
                        </div>
                    </div>
                </div>
            `).join('');
        }
        return '';
    }

    /**
     * Handle customer information form
     */
    handleCustomerInfo(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        this.checkoutData.customer = {
            email: formData.get('email'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phone: formData.get('phone'),
            isGuest: formData.get('checkoutType') === 'guest'
        };

        this.nextStep();
    }

    /**
     * Select shipping address
     */
    selectShippingAddress(addressId) {
        if (window.shippingAddressesManager) {
            const address = window.shippingAddressesManager.getAddressById(addressId);
            this.checkoutData.shipping.address = address;
            this.updateStepProgress();
        }
    }

    /**
     * Select shipping method
     */
    selectShippingMethod(methodId) {
        if (window.shippingAddressesManager) {
            const method = window.shippingAddressesManager.getShippingOptions().find(m => m.id === methodId);
            this.checkoutData.shipping.method = method;
            this.updateStepProgress();
        }
    }

    /**
     * Select payment method
     */
    selectPaymentMethod(methodId) {
        const method = this.paymentMethods.find(m => m.id === methodId);
        if (method && method.enabled) {
            this.checkoutData.payment.method = methodId;
            this.renderPaymentDetails(methodId);
            this.updateStepProgress();
        }
    }

    /**
     * Render payment method details
     */
    renderPaymentDetails(methodId) {
        const container = document.getElementById('paymentDetails');
        if (!container) return;

        const method = this.paymentMethods.find(m => m.id === methodId);
        if (!method) return;

        switch (methodId) {
            case 'credit_card':
                container.innerHTML = this.renderCreditCardForm();
                break;
            case 'paypal':
                container.innerHTML = this.renderPayPalForm();
                break;
            case 'apple_pay':
                container.innerHTML = this.renderApplePayForm();
                break;
            case 'google_pay':
                container.innerHTML = this.renderGooglePayForm();
                break;
            case 'bank_transfer':
                container.innerHTML = this.renderBankTransferForm();
                break;
            case 'crypto':
                container.innerHTML = this.renderCryptoForm();
                break;
            case 'klarna':
                container.innerHTML = this.renderKlarnaForm();
                break;
            case 'afterpay':
                container.innerHTML = this.renderAfterpayForm();
                break;
            default:
                container.innerHTML = '';
        }
    }

    /**
     * Render credit card form
     */
    renderCreditCardForm() {
        return `
            <div class="payment-form">
                <h4>Card Information</h4>
                <div class="form-group">
                    <label>Card Number *</label>
                    <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expiry Date *</label>
                        <input type="text" name="expiryDate" placeholder="MM/YY" maxlength="5" required>
                    </div>
                    <div class="form-group">
                        <label>CVV *</label>
                        <input type="text" name="cvv" placeholder="123" maxlength="4" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Cardholder Name *</label>
                    <input type="text" name="cardholderName" placeholder="John Doe" required>
                </div>
                <div class="supported-cards">
                    <span>We accept:</span>
                    <div class="card-icons">
                        <i class="fab fa-cc-visa"></i>
                        <i class="fab fa-cc-mastercard"></i>
                        <i class="fab fa-cc-amex"></i>
                        <i class="fab fa-cc-discover"></i>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render PayPal form
     */
    renderPayPalForm() {
        return `
            <div class="payment-form">
                <div class="paypal-info">
                    <div class="paypal-logo">
                        <i class="fab fa-paypal"></i>
                    </div>
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                    <div class="paypal-features">
                        <div class="feature">
                            <i class="fas fa-shield-alt"></i>
                            <span>Buyer Protection</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bolt"></i>
                            <span>Instant Payment</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-credit-card"></i>
                            <span>No Card Required</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Apple Pay form
     */
    renderApplePayForm() {
        return `
            <div class="payment-form">
                <div class="apple-pay-info">
                    <div class="apple-pay-logo">
                        <i class="fab fa-apple-pay"></i>
                    </div>
                    <p>Pay securely with Touch ID or Face ID on your Apple device.</p>
                    <div class="apple-pay-requirements">
                        <h5>Requirements:</h5>
                        <ul>
                            <li>iOS Device with Touch ID or Face ID</li>
                            <li>Apple Wallet set up</li>
                            <li>Valid payment method in Apple Wallet</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary apple-pay-btn">
                        <i class="fab fa-apple-pay"></i>
                        Pay with Apple Pay
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render Google Pay form
     */
    renderGooglePayForm() {
        return `
            <div class="payment-form">
                <div class="google-pay-info">
                    <div class="google-pay-logo">
                        <i class="fab fa-google-pay"></i>
                    </div>
                    <p>Pay securely with your Google account on your Android device.</p>
                    <div class="google-pay-requirements">
                        <h5>Requirements:</h5>
                        <ul>
                            <li>Android Device</li>
                            <li>Google Account</li>
                            <li>Google Pay App installed</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary google-pay-btn">
                        <i class="fab fa-google-pay"></i>
                        Pay with Google Pay
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render bank transfer form
     */
    renderBankTransferForm() {
        return `
            <div class="payment-form">
                <div class="bank-transfer-info">
                    <h4>Bank Transfer Details</h4>
                    <p>You will receive bank transfer instructions after placing your order.</p>
                    <div class="transfer-info">
                        <div class="info-item">
                            <strong>Processing Time:</strong> 1-3 business days
                        </div>
                        <div class="info-item">
                            <strong>Processing Fee:</strong> FREE
                        </div>
                        <div class="info-item">
                            <strong>Maximum Amount:</strong> $50,000
                        </div>
                    </div>
                    <div class="transfer-features">
                        <div class="feature">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Low Fees</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-shield-alt"></i>
                            <span>Secure</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-university"></i>
                            <span>Direct from Bank</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render crypto form
     */
    renderCryptoForm() {
        return `
            <div class="payment-form">
                <div class="crypto-info">
                    <h4>Cryptocurrency Payment</h4>
                    <p>Pay with Bitcoin, Ethereum, or other supported cryptocurrencies.</p>
                    <div class="crypto-options">
                        <h5>Supported Cryptocurrencies:</h5>
                        <div class="crypto-list">
                            <div class="crypto-option">
                                <i class="fab fa-bitcoin"></i>
                                <span>Bitcoin (BTC)</span>
                            </div>
                            <div class="crypto-option">
                                <i class="fab fa-ethereum"></i>
                                <span>Ethereum (ETH)</span>
                            </div>
                            <div class="crypto-option">
                                <i class="fas fa-coins"></i>
                                <span>Litecoin (LTC)</span>
                            </div>
                            <div class="crypto-option">
                                <i class="fas fa-coins"></i>
                                <span>Bitcoin Cash (BCH)</span>
                            </div>
                        </div>
                    </div>
                    <div class="crypto-features">
                        <div class="feature">
                            <i class="fas fa-network-wired"></i>
                            <span>Decentralized</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Low Fees</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bolt"></i>
                            <span>Fast Settlement</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Klarna form
     */
    renderKlarnaForm() {
        return `
            <div class="payment-form">
                <div class="klarna-info">
                    <div class="klarna-logo">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h4>Pay in 4 with Klarna</h4>
                    <p>Split your purchase into 4 interest-free payments.</p>
                    <div class="klarna-breakdown">
                        <div class="payment-schedule">
                            <div class="payment-item">
                                <span>Today</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 2 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 4 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 6 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="klarna-features">
                        <div class="feature">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Pay in 4</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-percentage"></i>
                            <span>Interest Free</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check-circle"></i>
                            <span>No Credit Check</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render Afterpay form
     */
    renderAfterpayForm() {
        return `
            <div class="payment-form">
                <div class="afterpay-info">
                    <div class="afterpay-logo">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <h4>Buy Now, Pay Later with Afterpay</h4>
                    <p>Split your purchase into 4 interest-free installments.</p>
                    <div class="afterpay-breakdown">
                        <div class="payment-schedule">
                            <div class="payment-item">
                                <span>Today</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 2 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 4 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                            <div class="payment-item">
                                <span>In 6 weeks</span>
                                <span>${this.formatPrice(this.checkoutData.order.total / 4)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="afterpay-features">
                        <div class="feature">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Pay in 4</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-percentage"></i>
                            <span>No Interest</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bolt"></i>
                            <span>Instant Approval</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Navigate to next step
     */
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.renderCheckoutPage();
            this.updateStepProgress();
        }
    }

    /**
     * Navigate to previous step
     */
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.renderCheckoutPage();
            this.updateStepProgress();
        }
    }

    /**
     * Update step progress
     */
    updateStepProgress() {
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
            }
        });
    }

    /**
     * Place order
     */
    placeOrder() {
        // Validate all required fields
        if (!this.validateCheckoutData()) {
            this.showNotification('Please complete all required fields', 'error');
            return;
        }

        // Show loading state
        this.showLoadingState();

        // Simulate order processing
        setTimeout(() => {
            this.processOrder();
        }, 2000);
    }

    /**
     * Validate checkout data
     */
    validateCheckoutData() {
        // Validate customer info
        if (!this.checkoutData.customer.email || !this.checkoutData.customer.firstName || !this.checkoutData.customer.lastName) {
            return false;
        }

        // Validate shipping
        if (!this.checkoutData.shipping.address || !this.checkoutData.shipping.method) {
            return false;
        }

        // Validate payment
        if (!this.checkoutData.payment.method) {
            return false;
        }

        return true;
    }

    /**
     * Process order
     */
    processOrder() {
        // Generate order number
        const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Create order object
        const order = {
            id: orderNumber,
            customer: this.checkoutData.customer,
            shipping: this.checkoutData.shipping,
            billing: this.checkoutData.billing,
            payment: this.checkoutData.payment,
            order: this.checkoutData.order,
            status: 'processing',
            createdAt: new Date().toISOString()
        };

        // Save order to localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        if (window.advancedCartManager) {
            window.advancedCartManager.clearCart();
        }

        // Redirect to order confirmation
        window.location.href = `order-confirmation.html?order=${orderNumber}`;
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const placeOrderBtn = document.querySelector('.btn-large');
        if (placeOrderBtn) {
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
            placeOrderBtn.disabled = true;
        }
    }

    /**
     * Add new address
     */
    addNewAddress() {
        if (window.shippingAddressesManager) {
            window.shippingAddressesManager.openAddAddressModal();
        }
    }

    /**
     * Format price
     */
    formatPrice(amount) {
        return `$${amount.toFixed(2)}`;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for checkout type changes
        document.addEventListener('change', (e) => {
            if (e.target.name === 'checkoutType') {
                this.checkoutData.customer.isGuest = e.target.value === 'guest';
            }
        });

        // Listen for billing address changes
        document.addEventListener('change', (e) => {
            if (e.target.name === 'sameAsShipping') {
                this.checkoutData.billing.sameAsShipping = e.target.checked;
                const billingForm = document.getElementById('billingAddressForm');
                if (billingForm) {
                    billingForm.style.display = e.target.checked ? 'none' : 'block';
                }
            }
        });
    }

    /**
     * Load checkout data from localStorage
     */
    loadCheckoutData() {
        const saved = localStorage.getItem('checkoutData');
        if (saved) {
            this.checkoutData = { ...this.checkoutData, ...JSON.parse(saved) };
        }
    }

    /**
     * Save checkout data to localStorage
     */
    saveCheckoutData() {
        localStorage.setItem('checkoutData', JSON.stringify(this.checkoutData));
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

// Initialize the checkout manager
const checkoutManager = new CheckoutManager();

// Global functions for checkout
window.startCheckout = () => checkoutManager.startCheckout();
window.selectPaymentMethod = (methodId) => checkoutManager.selectPaymentMethod(methodId);
window.selectShippingAddress = (addressId) => checkoutManager.selectShippingAddress(addressId);
window.selectShippingMethod = (methodId) => checkoutManager.selectShippingMethod(methodId);
window.addNewAddress = () => checkoutManager.addNewAddress();
window.handleCustomerInfo = (event) => checkoutManager.handleCustomerInfo(event);
window.nextStep = () => checkoutManager.nextStep();
window.previousStep = () => checkoutManager.previousStep();
window.placeOrder = () => checkoutManager.placeOrder();

