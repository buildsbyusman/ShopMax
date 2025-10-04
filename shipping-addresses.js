/**
 * Multiple Shipping Addresses and Options System
 * Handles multiple shipping addresses, delivery options, and address management
 */

class ShippingAddressesManager {
    constructor() {
        this.addresses = JSON.parse(localStorage.getItem('shippingAddresses')) || [];
        this.defaultAddress = JSON.parse(localStorage.getItem('defaultShippingAddress')) || null;
        this.shippingOptions = [
            {
                id: 'standard',
                name: 'Standard Shipping',
                description: '5-7 business days',
                cost: 9.99,
                estimatedDays: '5-7',
                icon: 'fas fa-truck',
                available: true,
                features: ['Tracking included', 'Signature required']
            },
            {
                id: 'express',
                name: 'Express Shipping',
                description: '2-3 business days',
                cost: 19.99,
                estimatedDays: '2-3',
                icon: 'fas fa-shipping-fast',
                available: true,
                features: ['Priority handling', 'Tracking included', 'Signature required']
            },
            {
                id: 'overnight',
                name: 'Overnight Shipping',
                description: 'Next business day',
                cost: 39.99,
                estimatedDays: '1',
                icon: 'fas fa-rocket',
                available: true,
                features: ['Same-day processing', 'Priority tracking', 'Signature required']
            },
            {
                id: 'free',
                name: 'Free Shipping',
                description: '7-10 business days',
                cost: 0,
                estimatedDays: '7-10',
                icon: 'fas fa-gift',
                available: true,
                features: ['No minimum order', 'Tracking included'],
                requirements: 'Orders over $50'
            },
            {
                id: 'pickup',
                name: 'Store Pickup',
                description: 'Ready in 2 hours',
                cost: 0,
                estimatedDays: '0',
                icon: 'fas fa-store',
                available: true,
                features: ['No shipping cost', 'Ready in 2 hours', 'ID required'],
                locations: [
                    { id: 'store1', name: 'Downtown Store', address: '123 Main St, Downtown', hours: '9 AM - 9 PM' },
                    { id: 'store2', name: 'Mall Location', address: '456 Mall Ave, Shopping Center', hours: '10 AM - 10 PM' }
                ]
            }
        ];

        this.deliveryOptions = [
            {
                id: 'home',
                name: 'Home Delivery',
                description: 'Delivered to your doorstep',
                icon: 'fas fa-home',
                available: true
            },
            {
                id: 'office',
                name: 'Office Delivery',
                description: 'Delivered to your workplace',
                icon: 'fas fa-building',
                available: true
            },
            {
                id: 'neighbor',
                name: 'Neighbor Delivery',
                description: 'Leave with a trusted neighbor',
                icon: 'fas fa-user-friends',
                available: true
            },
            {
                id: 'secure_location',
                name: 'Secure Location',
                description: 'Leave in a secure location',
                icon: 'fas fa-shield-alt',
                available: true
            },
            {
                id: 'signature_required',
                name: 'Signature Required',
                description: 'Must be signed for by recipient',
                icon: 'fas fa-signature',
                available: true
            }
        ];

        this.specialInstructions = [
            'Leave at front door',
            'Ring doorbell',
            'Call upon arrival',
            'Leave with doorman',
            'Leave in mailbox',
            'Call before delivery',
            'No signature required',
            'Leave with neighbor'
        ];

        this.init();
    }

    /**
     * Initialize the shipping addresses system
     */
    init() {
        this.loadAddresses();
        this.setupEventListeners();
    }

    /**
     * Load addresses from localStorage
     */
    loadAddresses() {
        if (this.addresses.length === 0) {
            // Add sample addresses for demo
            this.addSampleAddresses();
        }
    }

    /**
     * Add sample addresses for demonstration
     */
    addSampleAddresses() {
        const sampleAddresses = [
            {
                id: 'addr_1',
                type: 'home',
                firstName: 'John',
                lastName: 'Doe',
                company: '',
                address1: '123 Main Street',
                address2: 'Apt 4B',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'US',
                phone: '+1-555-0123',
                isDefault: true,
                deliveryInstructions: 'Leave at front door',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'addr_2',
                type: 'work',
                firstName: 'John',
                lastName: 'Doe',
                company: 'Tech Corp',
                address1: '456 Business Ave',
                address2: 'Suite 200',
                city: 'New York',
                state: 'NY',
                zipCode: '10002',
                country: 'US',
                phone: '+1-555-0456',
                isDefault: false,
                deliveryInstructions: 'Call upon arrival',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        this.addresses = sampleAddresses;
        this.defaultAddress = sampleAddresses[0];
        this.saveAddresses();
    }

    /**
     * Add a new shipping address
     */
    addAddress(addressData) {
        const newAddress = {
            id: 'addr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            ...addressData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // If this is the first address or marked as default, make it default
        if (this.addresses.length === 0 || addressData.isDefault) {
            newAddress.isDefault = true;
            this.setDefaultAddress(newAddress.id);
        }

        this.addresses.push(newAddress);
        this.saveAddresses();
        return newAddress;
    }

    /**
     * Update an existing address
     */
    updateAddress(addressId, addressData) {
        const addressIndex = this.addresses.findIndex(addr => addr.id === addressId);
        if (addressIndex === -1) return null;

        this.addresses[addressIndex] = {
            ...this.addresses[addressIndex],
            ...addressData,
            updatedAt: new Date().toISOString()
        };

        this.saveAddresses();
        return this.addresses[addressIndex];
    }

    /**
     * Delete an address
     */
    deleteAddress(addressId) {
        const addressIndex = this.addresses.findIndex(addr => addr.id === addressId);
        if (addressIndex === -1) return false;

        const deletedAddress = this.addresses[addressIndex];
        this.addresses.splice(addressIndex, 1);

        // If deleted address was default, set another as default
        if (deletedAddress.isDefault && this.addresses.length > 0) {
            this.addresses[0].isDefault = true;
            this.defaultAddress = this.addresses[0];
        }

        this.saveAddresses();
        return true;
    }

    /**
     * Set default address
     */
    setDefaultAddress(addressId) {
        // Remove default from all addresses
        this.addresses.forEach(addr => {
            addr.isDefault = false;
        });

        // Set new default
        const address = this.addresses.find(addr => addr.id === addressId);
        if (address) {
            address.isDefault = true;
            this.defaultAddress = address;
            this.saveAddresses();
        }
    }

    /**
     * Get all addresses
     */
    getAllAddresses() {
        return this.addresses;
    }

    /**
     * Get default address
     */
    getDefaultAddress() {
        return this.defaultAddress;
    }

    /**
     * Get address by ID
     */
    getAddressById(addressId) {
        return this.addresses.find(addr => addr.id === addressId);
    }

    /**
     * Get shipping options
     */
    getShippingOptions() {
        return this.shippingOptions;
    }

    /**
     * Get delivery options
     */
    getDeliveryOptions() {
        return this.deliveryOptions;
    }

    /**
     * Calculate shipping cost
     */
    calculateShippingCost(shippingOptionId, orderTotal = 0) {
        const option = this.shippingOptions.find(opt => opt.id === shippingOptionId);
        if (!option) return 0;

        // Free shipping for orders over $50
        if (option.id === 'free' && orderTotal >= 50) {
            return 0;
        }

        return option.cost;
    }

    /**
     * Get estimated delivery date
     */
    getEstimatedDeliveryDate(shippingOptionId) {
        const option = this.shippingOptions.find(opt => opt.id === shippingOptionId);
        if (!option) return null;

        const days = parseInt(option.estimatedDays.split('-')[0]);
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + days);

        return deliveryDate;
    }

    /**
     * Validate address
     */
    validateAddress(addressData) {
        const errors = [];

        if (!addressData.firstName?.trim()) {
            errors.push('First name is required');
        }

        if (!addressData.lastName?.trim()) {
            errors.push('Last name is required');
        }

        if (!addressData.address1?.trim()) {
            errors.push('Address line 1 is required');
        }

        if (!addressData.city?.trim()) {
            errors.push('City is required');
        }

        if (!addressData.state?.trim()) {
            errors.push('State is required');
        }

        if (!addressData.zipCode?.trim()) {
            errors.push('ZIP code is required');
        }

        if (!addressData.phone?.trim()) {
            errors.push('Phone number is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Render address selector
     */
    renderAddressSelector(containerId, selectedAddressId = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const addresses = this.getAllAddresses();
        const defaultAddress = this.getDefaultAddress();

        container.innerHTML = `
            <div class="address-selector">
                <div class="address-selector-header">
                    <h3>Select Shipping Address</h3>
                    <button class="btn btn-secondary" onclick="shippingAddressesManager.openAddAddressModal()">
                        <i class="fas fa-plus"></i> Add New Address
                    </button>
                </div>
                <div class="addresses-list">
                    ${addresses.map(address => `
                        <div class="address-card ${address.isDefault ? 'default' : ''} ${selectedAddressId === address.id ? 'selected' : ''}" 
                             onclick="shippingAddressesManager.selectAddress('${address.id}')">
                            <div class="address-header">
                                <div class="address-type">
                                    <i class="fas fa-${address.type === 'home' ? 'home' : 'building'}"></i>
                                    <span>${address.type === 'home' ? 'Home' : 'Work'}</span>
                                    ${address.isDefault ? '<span class="default-badge">Default</span>' : ''}
                                </div>
                                <div class="address-actions">
                                    <button class="btn-icon" onclick="event.stopPropagation(); shippingAddressesManager.openEditAddressModal('${address.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn-icon" onclick="event.stopPropagation(); shippingAddressesManager.deleteAddress('${address.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="address-details">
                                <div class="address-name">${address.firstName} ${address.lastName}</div>
                                ${address.company ? `<div class="address-company">${address.company}</div>` : ''}
                                <div class="address-street">${address.address1}</div>
                                ${address.address2 ? `<div class="address-street">${address.address2}</div>` : ''}
                                <div class="address-city">${address.city}, ${address.state} ${address.zipCode}</div>
                                <div class="address-phone">${address.phone}</div>
                                ${address.deliveryInstructions ? `<div class="delivery-instructions">${address.deliveryInstructions}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render shipping options
     */
    renderShippingOptions(containerId, selectedOptionId = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="shipping-options">
                <h3>Shipping Options</h3>
                <div class="shipping-options-list">
                    ${this.shippingOptions.map(option => `
                        <div class="shipping-option ${selectedOptionId === option.id ? 'selected' : ''}" 
                             onclick="shippingAddressesManager.selectShippingOption('${option.id}')">
                            <div class="option-header">
                                <div class="option-icon">
                                    <i class="${option.icon}"></i>
                                </div>
                                <div class="option-info">
                                    <h4>${option.name}</h4>
                                    <p>${option.description}</p>
                                </div>
                                <div class="option-cost">
                                    ${option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                                </div>
                            </div>
                            <div class="option-features">
                                ${option.features.map(feature => `
                                    <span class="feature-tag">${feature}</span>
                                `).join('')}
                            </div>
                            ${option.requirements ? `<div class="option-requirements">${option.requirements}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render delivery options
     */
    renderDeliveryOptions(containerId, selectedOptions = []) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="delivery-options">
                <h3>Delivery Options</h3>
                <div class="delivery-options-list">
                    ${this.deliveryOptions.map(option => `
                        <div class="delivery-option ${selectedOptions.includes(option.id) ? 'selected' : ''}" 
                             onclick="shippingAddressesManager.toggleDeliveryOption('${option.id}')">
                            <div class="option-icon">
                                <i class="${option.icon}"></i>
                            </div>
                            <div class="option-info">
                                <h4>${option.name}</h4>
                                <p>${option.description}</p>
                            </div>
                            <div class="option-checkbox">
                                <input type="checkbox" ${selectedOptions.includes(option.id) ? 'checked' : ''}>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="special-instructions">
                    <h4>Special Instructions</h4>
                    <div class="instructions-grid">
                        ${this.specialInstructions.map(instruction => `
                            <button class="instruction-btn" onclick="shippingAddressesManager.selectInstruction('${instruction}')">
                                ${instruction}
                            </button>
                        `).join('')}
                    </div>
                    <textarea class="custom-instructions" placeholder="Add custom delivery instructions..."></textarea>
                </div>
            </div>
        `;
    }

    /**
     * Select address
     */
    selectAddress(addressId) {
        // Remove selected class from all addresses
        document.querySelectorAll('.address-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selected class to clicked address
        const selectedCard = document.querySelector(`[onclick*="${addressId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Trigger address selection event
        document.dispatchEvent(new CustomEvent('addressSelected', {
            detail: { addressId, address: this.getAddressById(addressId) }
        }));
    }

    /**
     * Select shipping option
     */
    selectShippingOption(optionId) {
        // Remove selected class from all options
        document.querySelectorAll('.shipping-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        const selectedOption = document.querySelector(`[onclick*="${optionId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        // Trigger shipping option selection event
        document.dispatchEvent(new CustomEvent('shippingOptionSelected', {
            detail: { optionId, option: this.shippingOptions.find(opt => opt.id === optionId) }
        }));
    }

    /**
     * Toggle delivery option
     */
    toggleDeliveryOption(optionId) {
        const option = document.querySelector(`[onclick*="${optionId}"]`);
        if (option) {
            option.classList.toggle('selected');
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        }
    }

    /**
     * Select instruction
     */
    selectInstruction(instruction) {
        const textarea = document.querySelector('.custom-instructions');
        if (textarea) {
            textarea.value = instruction;
        }
    }

    /**
     * Open add address modal
     */
    openAddAddressModal() {
        this.showAddressModal();
    }

    /**
     * Open edit address modal
     */
    openEditAddressModal(addressId) {
        const address = this.getAddressById(addressId);
        if (address) {
            this.showAddressModal(address);
        }
    }

    /**
     * Show address modal
     */
    showAddressModal(address = null) {
        const modal = document.createElement('div');
        modal.className = 'address-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${address ? 'Edit Address' : 'Add New Address'}</h3>
                    <button class="modal-close" onclick="this.closest('.address-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="address-form" onsubmit="shippingAddressesManager.saveAddress(event, '${address?.id || ''}')">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Address Type</label>
                                <select name="type" required>
                                    <option value="home" ${address?.type === 'home' ? 'selected' : ''}>Home</option>
                                    <option value="work" ${address?.type === 'work' ? 'selected' : ''}>Work</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Set as Default</label>
                                <input type="checkbox" name="isDefault" ${address?.isDefault ? 'checked' : ''}>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>First Name *</label>
                                <input type="text" name="firstName" value="${address?.firstName || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name *</label>
                                <input type="text" name="lastName" value="${address?.lastName || ''}" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" name="company" value="${address?.company || ''}">
                        </div>
                        <div class="form-group">
                            <label>Address Line 1 *</label>
                            <input type="text" name="address1" value="${address?.address1 || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Address Line 2</label>
                            <input type="text" name="address2" value="${address?.address2 || ''}">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>City *</label>
                                <input type="text" name="city" value="${address?.city || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>State *</label>
                                <input type="text" name="state" value="${address?.state || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>ZIP Code *</label>
                                <input type="text" name="zipCode" value="${address?.zipCode || ''}" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" value="${address?.phone || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Delivery Instructions</label>
                            <textarea name="deliveryInstructions" placeholder="Special delivery instructions...">${address?.deliveryInstructions || ''}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="this.closest('.address-modal').remove()">Cancel</button>
                            <button type="submit" class="btn btn-primary">${address ? 'Update Address' : 'Add Address'}</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Save address
     */
    saveAddress(event, addressId = null) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const addressData = {
            type: formData.get('type'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            company: formData.get('company'),
            address1: formData.get('address1'),
            address2: formData.get('address2'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipCode: formData.get('zipCode'),
            phone: formData.get('phone'),
            deliveryInstructions: formData.get('deliveryInstructions'),
            isDefault: formData.get('isDefault') === 'on'
        };

        // Validate address
        const validation = this.validateAddress(addressData);
        if (!validation.isValid) {
            alert('Please fix the following errors:\n' + validation.errors.join('\n'));
            return;
        }

        // Save address
        if (addressId) {
            this.updateAddress(addressId, addressData);
        } else {
            this.addAddress(addressData);
        }

        // Close modal
        event.target.closest('.address-modal').remove();

        // Refresh address selector if it exists
        const addressSelector = document.querySelector('.address-selector');
        if (addressSelector) {
            this.renderAddressSelector(addressSelector.closest('[id]').id);
        }

        this.showNotification(addressId ? 'Address updated successfully!' : 'Address added successfully!');
    }

    /**
     * Delete address with confirmation
     */
    deleteAddress(addressId) {
        if (confirm('Are you sure you want to delete this address?')) {
            const success = this.deleteAddress(addressId);
            if (success) {
                this.showNotification('Address deleted successfully!');
                // Refresh address selector if it exists
                const addressSelector = document.querySelector('.address-selector');
                if (addressSelector) {
                    this.renderAddressSelector(addressSelector.closest('[id]').id);
                }
            }
        }
    }

    /**
     * Save addresses to localStorage
     */
    saveAddresses() {
        localStorage.setItem('shippingAddresses', JSON.stringify(this.addresses));
        localStorage.setItem('defaultShippingAddress', JSON.stringify(this.defaultAddress));
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for address selection events
        document.addEventListener('addressSelected', (e) => {
            console.log('Address selected:', e.detail);
        });

        // Listen for shipping option selection events
        document.addEventListener('shippingOptionSelected', (e) => {
            console.log('Shipping option selected:', e.detail);
        });
    }

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
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

// Initialize the shipping addresses manager
const shippingAddressesManager = new ShippingAddressesManager();

// Global functions for shipping addresses
window.openAddAddressModal = () => shippingAddressesManager.openAddAddressModal();
window.openEditAddressModal = (addressId) => shippingAddressesManager.openEditAddressModal(addressId);
window.deleteAddress = (addressId) => shippingAddressesManager.deleteAddress(addressId);
window.selectAddress = (addressId) => shippingAddressesManager.selectAddress(addressId);
window.selectShippingOption = (optionId) => shippingAddressesManager.selectShippingOption(optionId);
window.toggleDeliveryOption = (optionId) => shippingAddressesManager.toggleDeliveryOption(optionId);
window.selectInstruction = (instruction) => shippingAddressesManager.selectInstruction(instruction);

