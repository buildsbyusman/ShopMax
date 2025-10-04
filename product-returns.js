/**
 * Product Returns and Exchange Policy Manager
 * Handles return and exchange policy display, return request forms, and policy information
 */

class ProductReturnsManager {
    constructor() {
        this.returnPolicies = {
            '1': { // Product ID 1
                returnWindow: 30, // days
                exchangeWindow: 30, // days
                returnShipping: 'free', // free, customer_paid, conditional
                exchangeShipping: 'free',
                condition: 'unused', // unused, like_new, good, fair
                originalPackaging: true,
                receiptRequired: true,
                returnMethods: ['mail', 'store', 'pickup'],
                excludedItems: ['personalized_items', 'digital_downloads'],
                refundMethods: ['original_payment', 'store_credit', 'exchange'],
                processingTime: '5-7 business days',
                restockingFee: 0, // percentage
                returnReasons: [
                    'defective_item',
                    'wrong_item',
                    'not_as_described',
                    'changed_mind',
                    'size_issue',
                    'quality_issue'
                ],
                specialConditions: [
                    {
                        type: 'electronics',
                        condition: 'must_be_in_original_packaging',
                        note: 'All accessories and documentation must be included'
                    },
                    {
                        type: 'clothing',
                        condition: 'tags_must_be_attached',
                        note: 'Items must not show signs of wear or washing'
                    }
                ]
            },
            '2': {
                returnWindow: 14,
                exchangeWindow: 14,
                returnShipping: 'customer_paid',
                exchangeShipping: 'free',
                condition: 'like_new',
                originalPackaging: false,
                receiptRequired: false,
                returnMethods: ['mail', 'store'],
                excludedItems: ['personalized_items'],
                refundMethods: ['store_credit', 'exchange'],
                processingTime: '3-5 business days',
                restockingFee: 15,
                returnReasons: [
                    'defective_item',
                    'wrong_item',
                    'not_as_described',
                    'changed_mind'
                ],
                specialConditions: []
            }
        };

        this.returnReasons = {
            'defective_item': 'Item arrived damaged or defective',
            'wrong_item': 'Received wrong item',
            'not_as_described': 'Item does not match description',
            'changed_mind': 'Changed my mind',
            'size_issue': 'Size does not fit',
            'quality_issue': 'Quality not as expected',
            'late_delivery': 'Item arrived too late',
            'missing_parts': 'Missing parts or accessories'
        };

        this.returnStatuses = {
            'pending': 'Return Request Submitted',
            'approved': 'Return Approved',
            'received': 'Item Received',
            'processing': 'Processing Refund',
            'completed': 'Refund Completed',
            'rejected': 'Return Rejected',
            'exchanged': 'Item Exchanged'
        };
    }

    /**
     * Render the return and exchange policy section
     */
    renderReturnPolicy(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const policy = this.returnPolicies[productId] || this.returnPolicies['1'];
        
        container.innerHTML = `
            <div class="return-policy-section">
                <div class="return-policy-header">
                    <h3><i class="fas fa-undo-alt"></i> Return & Exchange Policy</h3>
                    <p>Our comprehensive return and exchange policy ensures your satisfaction with every purchase.</p>
                </div>

                <div class="return-policy-content">
                    <div class="policy-overview">
                        <div class="policy-cards">
                            <div class="policy-card">
                                <div class="policy-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="policy-info">
                                    <h4>Return Window</h4>
                                    <p class="policy-value">${policy.returnWindow} days</p>
                                    <p class="policy-note">From delivery date</p>
                                </div>
                            </div>

                            <div class="policy-card">
                                <div class="policy-icon">
                                    <i class="fas fa-exchange-alt"></i>
                                </div>
                                <div class="policy-info">
                                    <h4>Exchange Window</h4>
                                    <p class="policy-value">${policy.exchangeWindow} days</p>
                                    <p class="policy-note">From delivery date</p>
                                </div>
                            </div>

                            <div class="policy-card">
                                <div class="policy-icon">
                                    <i class="fas fa-shipping-fast"></i>
                                </div>
                                <div class="policy-info">
                                    <h4>Return Shipping</h4>
                                    <p class="policy-value">${this.formatShippingCost(policy.returnShipping)}</p>
                                    <p class="policy-note">Return method</p>
                                </div>
                            </div>

                            <div class="policy-card">
                                <div class="policy-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="policy-info">
                                    <h4>Processing Time</h4>
                                    <p class="policy-value">${policy.processingTime}</p>
                                    <p class="policy-note">After receiving item</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="policy-details">
                        <div class="policy-tabs">
                            <button class="policy-tab active" data-tab="conditions">
                                <i class="fas fa-list-check"></i> Conditions
                            </button>
                            <button class="policy-tab" data-tab="process">
                                <i class="fas fa-route"></i> Process
                            </button>
                            <button class="policy-tab" data-tab="methods">
                                <i class="fas fa-truck"></i> Methods
                            </button>
                            <button class="policy-tab" data-tab="exclusions">
                                <i class="fas fa-ban"></i> Exclusions
                            </button>
                        </div>

                        <div class="policy-tab-content">
                            <div class="policy-tab-panel active" id="conditions-panel">
                                ${this.renderConditionsPanel(policy)}
                            </div>
                            <div class="policy-tab-panel" id="process-panel">
                                ${this.renderProcessPanel(policy)}
                            </div>
                            <div class="policy-tab-panel" id="methods-panel">
                                ${this.renderMethodsPanel(policy)}
                            </div>
                            <div class="policy-tab-panel" id="exclusions-panel">
                                ${this.renderExclusionsPanel(policy)}
                            </div>
                        </div>
                    </div>

                    <div class="return-actions">
                        <button class="btn btn-primary" onclick="productReturnsManager.openReturnRequestModal('${productId}')">
                            <i class="fas fa-undo"></i> Start Return Request
                        </button>
                        <button class="btn btn-secondary" onclick="productReturnsManager.openExchangeRequestModal('${productId}')">
                            <i class="fas fa-exchange-alt"></i> Request Exchange
                        </button>
                        <button class="btn btn-outline" onclick="productReturnsManager.openReturnStatusModal()">
                            <i class="fas fa-search"></i> Check Return Status
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initializePolicyTabs();
    }

    /**
     * Render conditions panel
     */
    renderConditionsPanel(policy) {
        return `
            <div class="conditions-content">
                <div class="condition-item">
                    <div class="condition-header">
                        <i class="fas fa-box"></i>
                        <h4>Item Condition</h4>
                    </div>
                    <p>Items must be in <strong>${policy.condition.replace('_', ' ')}</strong> condition</p>
                </div>

                <div class="condition-item">
                    <div class="condition-header">
                        <i class="fas fa-receipt"></i>
                        <h4>Original Packaging</h4>
                    </div>
                    <p>${policy.originalPackaging ? 'Original packaging required' : 'Original packaging not required'}</p>
                </div>

                <div class="condition-item">
                    <div class="condition-header">
                        <i class="fas fa-file-invoice"></i>
                        <h4>Receipt/Invoice</h4>
                    </div>
                    <p>${policy.receiptRequired ? 'Receipt or invoice required' : 'Receipt not required'}</p>
                </div>

                ${policy.restockingFee > 0 ? `
                <div class="condition-item">
                    <div class="condition-header">
                        <i class="fas fa-percentage"></i>
                        <h4>Restocking Fee</h4>
                    </div>
                    <p>${policy.restockingFee}% restocking fee applies</p>
                </div>
                ` : ''}

                ${policy.specialConditions.length > 0 ? `
                <div class="special-conditions">
                    <h4><i class="fas fa-exclamation-triangle"></i> Special Conditions</h4>
                    ${policy.specialConditions.map(condition => `
                        <div class="special-condition">
                            <strong>${condition.type.replace('_', ' ').toUpperCase()}:</strong>
                            <p>${condition.condition.replace('_', ' ')}</p>
                            <small>${condition.note}</small>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Render process panel
     */
    renderProcessPanel(policy) {
        return `
            <div class="process-content">
                <div class="process-steps">
                    <div class="process-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Submit Request</h4>
                            <p>Fill out the return/exchange request form with your order details and reason for return.</p>
                        </div>
                    </div>

                    <div class="process-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Get Approval</h4>
                            <p>We'll review your request and send you a return authorization number if approved.</p>
                        </div>
                    </div>

                    <div class="process-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Package & Ship</h4>
                            <p>Package the item securely and ship it back using the provided return label or your preferred method.</p>
                        </div>
                    </div>

                    <div class="process-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Receive Refund</h4>
                            <p>Once we receive and inspect the item, we'll process your refund or exchange within ${policy.processingTime}.</p>
                        </div>
                    </div>
                </div>

                <div class="refund-methods">
                    <h4><i class="fas fa-credit-card"></i> Refund Methods</h4>
                    <div class="refund-options">
                        ${policy.refundMethods.map(method => `
                            <div class="refund-option">
                                <i class="fas fa-${this.getRefundMethodIcon(method)}"></i>
                                <span>${method.replace('_', ' ').toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render methods panel
     */
    renderMethodsPanel(policy) {
        return `
            <div class="methods-content">
                <div class="return-methods">
                    <h4><i class="fas fa-truck"></i> Available Return Methods</h4>
                    ${policy.returnMethods.map(method => `
                        <div class="method-option">
                            <div class="method-icon">
                                <i class="fas fa-${this.getMethodIcon(method)}"></i>
                            </div>
                            <div class="method-info">
                                <h5>${method.replace('_', ' ').toUpperCase()}</h5>
                                <p>${this.getMethodDescription(method)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="shipping-info">
                    <h4><i class="fas fa-info-circle"></i> Shipping Information</h4>
                    <div class="shipping-details">
                        <div class="shipping-detail">
                            <strong>Return Shipping:</strong>
                            <span>${this.formatShippingCost(policy.returnShipping)}</span>
                        </div>
                        <div class="shipping-detail">
                            <strong>Exchange Shipping:</strong>
                            <span>${this.formatShippingCost(policy.exchangeShipping)}</span>
                        </div>
                        <div class="shipping-detail">
                            <strong>Processing Time:</strong>
                            <span>${policy.processingTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render exclusions panel
     */
    renderExclusionsPanel(policy) {
        return `
            <div class="exclusions-content">
                <div class="excluded-items">
                    <h4><i class="fas fa-ban"></i> Items Not Eligible for Return</h4>
                    <div class="exclusion-list">
                        ${policy.excludedItems.map(item => `
                            <div class="exclusion-item">
                                <i class="fas fa-times-circle"></i>
                                <span>${item.replace('_', ' ').toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="return-reasons">
                    <h4><i class="fas fa-list"></i> Valid Return Reasons</h4>
                    <div class="reason-list">
                        ${policy.returnReasons.map(reason => `
                            <div class="reason-item">
                                <i class="fas fa-check-circle"></i>
                                <span>${this.returnReasons[reason] || reason.replace('_', ' ').toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="important-notes">
                    <h4><i class="fas fa-exclamation-triangle"></i> Important Notes</h4>
                    <ul>
                        <li>All returns must be initiated within the ${policy.returnWindow}-day return window</li>
                        <li>Items must be in original condition and packaging (if applicable)</li>
                        <li>We reserve the right to refuse returns that don't meet our conditions</li>
                        <li>Refunds will be processed to the original payment method</li>
                        <li>Custom or personalized items may have different return policies</li>
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Open return request modal
     */
    openReturnRequestModal(productId) {
        const modal = document.getElementById('returnRequestModal');
        if (!modal) {
            this.createReturnRequestModal();
        }
        
        const policy = this.returnPolicies[productId] || this.returnPolicies['1'];
        this.populateReturnRequestForm(productId, policy);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open exchange request modal
     */
    openExchangeRequestModal(productId) {
        const modal = document.getElementById('exchangeRequestModal');
        if (!modal) {
            this.createExchangeRequestModal();
        }
        
        const policy = this.returnPolicies[productId] || this.returnPolicies['1'];
        this.populateExchangeRequestForm(productId, policy);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open return status modal
     */
    openReturnStatusModal() {
        const modal = document.getElementById('returnStatusModal');
        if (!modal) {
            this.createReturnStatusModal();
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create return request modal
     */
    createReturnRequestModal() {
        const modalHTML = `
            <div id="returnRequestModal" class="modal return-request-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-undo"></i> Return Request</h3>
                        <button class="close-btn" onclick="productReturnsManager.closeReturnRequestModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="returnRequestForm" class="return-request-form">
                            <div class="form-section">
                                <h4>Order Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="orderNumber">Order Number *</label>
                                        <input type="text" id="orderNumber" name="orderNumber" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="orderDate">Order Date *</label>
                                        <input type="date" id="orderDate" name="orderDate" required>
                                    </div>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Return Details</h4>
                                <div class="form-group">
                                    <label for="returnReason">Reason for Return *</label>
                                    <select id="returnReason" name="returnReason" required>
                                        <option value="">Select a reason</option>
                                        <option value="defective_item">Item arrived damaged or defective</option>
                                        <option value="wrong_item">Received wrong item</option>
                                        <option value="not_as_described">Item does not match description</option>
                                        <option value="changed_mind">Changed my mind</option>
                                        <option value="size_issue">Size does not fit</option>
                                        <option value="quality_issue">Quality not as expected</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="returnDescription">Additional Details</label>
                                    <textarea id="returnDescription" name="returnDescription" rows="4" placeholder="Please provide additional details about your return..."></textarea>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Refund Preference</h4>
                                <div class="form-group">
                                    <label>How would you like to receive your refund?</label>
                                    <div class="radio-group">
                                        <label class="radio-option">
                                            <input type="radio" name="refundMethod" value="original_payment" checked>
                                            <span>Original Payment Method</span>
                                        </label>
                                        <label class="radio-option">
                                            <input type="radio" name="refundMethod" value="store_credit">
                                            <span>Store Credit</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productReturnsManager.closeReturnRequestModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit Return Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create exchange request modal
     */
    createExchangeRequestModal() {
        const modalHTML = `
            <div id="exchangeRequestModal" class="modal exchange-request-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-exchange-alt"></i> Exchange Request</h3>
                        <button class="close-btn" onclick="productReturnsManager.closeExchangeRequestModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="exchangeRequestForm" class="exchange-request-form">
                            <div class="form-section">
                                <h4>Order Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="exchangeOrderNumber">Order Number *</label>
                                        <input type="text" id="exchangeOrderNumber" name="orderNumber" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="exchangeOrderDate">Order Date *</label>
                                        <input type="date" id="exchangeOrderDate" name="orderDate" required>
                                    </div>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Exchange Details</h4>
                                <div class="form-group">
                                    <label for="exchangeReason">Reason for Exchange *</label>
                                    <select id="exchangeReason" name="exchangeReason" required>
                                        <option value="">Select a reason</option>
                                        <option value="size_issue">Size does not fit</option>
                                        <option value="color_preference">Different color preferred</option>
                                        <option value="style_preference">Different style preferred</option>
                                        <option value="defective_item">Item arrived damaged or defective</option>
                                        <option value="wrong_item">Received wrong item</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exchangeDescription">Additional Details</label>
                                    <textarea id="exchangeDescription" name="exchangeDescription" rows="4" placeholder="Please provide additional details about your exchange..."></textarea>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Replacement Item</h4>
                                <div class="form-group">
                                    <label for="replacementProduct">Select Replacement Product *</label>
                                    <select id="replacementProduct" name="replacementProduct" required>
                                        <option value="">Select a replacement</option>
                                        <option value="same_product_different_size">Same Product - Different Size</option>
                                        <option value="same_product_different_color">Same Product - Different Color</option>
                                        <option value="different_product">Different Product</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="replacementDetails">Replacement Details</label>
                                    <input type="text" id="replacementDetails" name="replacementDetails" placeholder="Specify size, color, or product details...">
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productReturnsManager.closeExchangeRequestModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit Exchange Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create return status modal
     */
    createReturnStatusModal() {
        const modalHTML = `
            <div id="returnStatusModal" class="modal return-status-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-search"></i> Check Return Status</h3>
                        <button class="close-btn" onclick="productReturnsManager.closeReturnStatusModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="returnStatusForm" class="return-status-form">
                            <div class="form-group">
                                <label for="statusOrderNumber">Order Number *</label>
                                <input type="text" id="statusOrderNumber" name="orderNumber" required placeholder="Enter your order number">
                            </div>
                            <div class="form-group">
                                <label for="statusEmail">Email Address *</label>
                                <input type="email" id="statusEmail" name="email" required placeholder="Enter your email address">
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productReturnsManager.closeReturnStatusModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Check Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Initialize policy tabs
     */
    initializePolicyTabs() {
        const tabs = document.querySelectorAll('.policy-tab');
        const panels = document.querySelectorAll('.policy-tab-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(`${targetTab}-panel`).classList.add('active');
            });
        });
    }

    /**
     * Helper methods
     */
    formatShippingCost(shipping) {
        switch (shipping) {
            case 'free': return 'FREE';
            case 'customer_paid': return 'Customer Paid';
            case 'conditional': return 'Conditional';
            default: return 'Contact Support';
        }
    }

    getRefundMethodIcon(method) {
        switch (method) {
            case 'original_payment': return 'credit-card';
            case 'store_credit': return 'gift-card';
            case 'exchange': return 'exchange-alt';
            default: return 'money-bill';
        }
    }

    getMethodIcon(method) {
        switch (method) {
            case 'mail': return 'envelope';
            case 'store': return 'store';
            case 'pickup': return 'truck';
            default: return 'shipping-fast';
        }
    }

    getMethodDescription(method) {
        switch (method) {
            case 'mail': return 'Ship the item back to us using the provided return label';
            case 'store': return 'Return the item to any of our physical store locations';
            case 'pickup': return 'Schedule a pickup from your location';
            default: return 'Contact support for assistance';
        }
    }

    /**
     * Close modals
     */
    closeReturnRequestModal() {
        const modal = document.getElementById('returnRequestModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeExchangeRequestModal() {
        const modal = document.getElementById('exchangeRequestModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeReturnStatusModal() {
        const modal = document.getElementById('returnStatusModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Populate return request form
     */
    populateReturnRequestForm(productId, policy) {
        // This would typically populate with actual order data
        // For demo purposes, we'll leave it empty for user input
    }

    /**
     * Populate exchange request form
     */
    populateExchangeRequestForm(productId, policy) {
        // This would typically populate with actual order data
        // For demo purposes, we'll leave it empty for user input
    }
}

// Initialize the manager
const productReturnsManager = new ProductReturnsManager();

// Global functions for modal interactions
window.openReturnRequestModal = (productId) => productReturnsManager.openReturnRequestModal(productId);
window.openExchangeRequestModal = (productId) => productReturnsManager.openExchangeRequestModal(productId);
window.openReturnStatusModal = () => productReturnsManager.openReturnStatusModal();
window.closeReturnRequestModal = () => productReturnsManager.closeReturnRequestModal();
window.closeExchangeRequestModal = () => productReturnsManager.closeExchangeRequestModal();
window.closeReturnStatusModal = () => productReturnsManager.closeReturnStatusModal();

