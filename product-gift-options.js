/**
 * Product Gift Options and Gift Wrapping Manager
 * Handles gift wrapping, gift messages, gift cards, gift sets, and special gift features
 */

class ProductGiftOptionsManager {
    constructor() {
        this.giftOptionsData = {
            '1': { // Product ID 1
                giftWrapping: {
                    available: true,
                    options: [
                        {
                            id: 'premium_wrap',
                            name: 'Premium Gift Wrap',
                            description: 'Elegant premium wrapping with ribbon and bow',
                            price: 8.99,
                            image: 'https://via.placeholder.com/200x150?text=Premium+Wrap',
                            features: ['Premium paper', 'Matching ribbon', 'Gift bow', 'Gift tag'],
                            estimatedTime: '2-3 business days'
                        },
                        {
                            id: 'standard_wrap',
                            name: 'Standard Gift Wrap',
                            description: 'Classic gift wrapping with ribbon',
                            price: 4.99,
                            image: 'https://via.placeholder.com/200x150?text=Standard+Wrap',
                            features: ['Quality paper', 'Matching ribbon', 'Gift tag'],
                            estimatedTime: '1-2 business days'
                        },
                        {
                            id: 'eco_wrap',
                            name: 'Eco-Friendly Wrap',
                            description: 'Sustainable wrapping made from recycled materials',
                            price: 6.99,
                            image: 'https://via.placeholder.com/200x150?text=Eco+Wrap',
                            features: ['Recycled paper', 'Biodegradable ribbon', 'Eco gift tag'],
                            estimatedTime: '2-3 business days'
                        },
                        {
                            id: 'luxury_box',
                            name: 'Luxury Gift Box',
                            description: 'Premium gift box with satin lining',
                            price: 12.99,
                            image: 'https://via.placeholder.com/200x150?text=Luxury+Box',
                            features: ['Premium box', 'Satin lining', 'Ribbon bow', 'Gift card'],
                            estimatedTime: '3-5 business days'
                        }
                    ]
                },
                giftMessages: {
                    available: true,
                    maxLength: 200,
                    templates: [
                        'Happy Birthday! Hope you love this gift!',
                        'Congratulations on your special day!',
                        'Thank you for being amazing!',
                        'Wishing you all the best!',
                        'Hope this brings a smile to your face!',
                        'With love and best wishes!',
                        'Merry Christmas and Happy New Year!',
                        'Happy Anniversary!',
                        'Congratulations on your achievement!',
                        'Just because you deserve it!'
                    ],
                    specialOccasions: [
                        { occasion: 'Birthday', icon: 'fas fa-birthday-cake', color: '#ff6b6b' },
                        { occasion: 'Anniversary', icon: 'fas fa-heart', color: '#ff9ff3' },
                        { occasion: 'Wedding', icon: 'fas fa-ring', color: '#54a0ff' },
                        { occasion: 'Graduation', icon: 'fas fa-graduation-cap', color: '#5f27cd' },
                        { occasion: 'Baby Shower', icon: 'fas fa-baby', color: '#00d2d3' },
                        { occasion: 'Holiday', icon: 'fas fa-gift', color: '#ff9f43' },
                        { occasion: 'Thank You', icon: 'fas fa-hands-helping', color: '#10ac84' },
                        { occasion: 'Congratulations', icon: 'fas fa-trophy', color: '#feca57' }
                    ]
                },
                giftCards: {
                    available: true,
                    options: [
                        {
                            id: 'digital_card',
                            name: 'Digital Gift Card',
                            description: 'Instant digital gift card delivered via email',
                            price: 0,
                            deliveryTime: 'Instant',
                            features: ['Instant delivery', 'Email notification', 'Mobile-friendly']
                        },
                        {
                            id: 'physical_card',
                            name: 'Physical Gift Card',
                            description: 'Beautiful physical gift card with envelope',
                            price: 2.99,
                            deliveryTime: '3-5 business days',
                            features: ['Premium card stock', 'Gift envelope', 'Personal message']
                        }
                    ]
                },
                giftSets: {
                    available: true,
                    sets: [
                        {
                            id: 'headphone_set',
                            name: 'Complete Audio Experience',
                            description: 'Everything needed for the perfect audio experience',
                            price: 129.99,
                            originalPrice: 149.99,
                            savings: 20.00,
                            items: [
                                'AeroSound Pro Headphones',
                                'Premium Carrying Case',
                                'Cleaning Kit',
                                'Extra Ear Cushions'
                            ],
                            image: 'https://via.placeholder.com/300x200?text=Audio+Set'
                        },
                        {
                            id: 'tech_lover_set',
                            name: 'Tech Lover\'s Bundle',
                            description: 'Perfect for the tech enthusiast in your life',
                            price: 199.99,
                            originalPrice: 229.99,
                            savings: 30.00,
                            items: [
                                'AeroSound Pro Headphones',
                                'Wireless Charging Pad',
                                'Premium USB-C Cable',
                                'Screen Cleaning Kit'
                            ],
                            image: 'https://via.placeholder.com/300x200?text=Tech+Bundle'
                        }
                    ]
                },
                specialFeatures: {
                    giftReceipt: true,
                    surpriseDelivery: true,
                    giftTracking: true,
                    customPackaging: true,
                    giftInsurance: true
                }
            },
            '2': { // Product ID 2
                giftWrapping: {
                    available: true,
                    options: [
                        {
                            id: 'standard_wrap',
                            name: 'Standard Gift Wrap',
                            description: 'Classic gift wrapping with ribbon',
                            price: 3.99,
                            image: 'https://via.placeholder.com/200x150?text=Standard+Wrap',
                            features: ['Quality paper', 'Matching ribbon', 'Gift tag'],
                            estimatedTime: '1-2 business days'
                        }
                    ]
                },
                giftMessages: {
                    available: true,
                    maxLength: 150,
                    templates: [
                        'Happy Birthday!',
                        'Congratulations!',
                        'Thank you!',
                        'Best wishes!'
                    ],
                    specialOccasions: [
                        { occasion: 'Birthday', icon: 'fas fa-birthday-cake', color: '#ff6b6b' },
                        { occasion: 'Thank You', icon: 'fas fa-hands-helping', color: '#10ac84' }
                    ]
                },
                giftCards: {
                    available: false
                },
                giftSets: {
                    available: false
                },
                specialFeatures: {
                    giftReceipt: true,
                    surpriseDelivery: false,
                    giftTracking: true,
                    customPackaging: false,
                    giftInsurance: false
                }
            }
        };
    }

    /**
     * Render the gift options and gift wrapping section
     */
    renderGiftOptions(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.giftOptionsData[productId] || this.giftOptionsData['1'];
        
        container.innerHTML = `
            <div class="gift-options-section">
                <div class="gift-options-header">
                    <h3><i class="fas fa-gift"></i> Gift Options & Wrapping</h3>
                    <p>Make your gift extra special with our premium gift wrapping and personalization options.</p>
                </div>

                <div class="gift-options-content">
                    <div class="gift-wrapping-options">
                        ${this.renderGiftWrapping(data.giftWrapping)}
                    </div>

                    <div class="gift-message-options">
                        ${this.renderGiftMessages(data.giftMessages)}
                    </div>

                    <div class="gift-card-options">
                        ${this.renderGiftCards(data.giftCards)}
                    </div>

                    <div class="gift-sets-options">
                        ${this.renderGiftSets(data.giftSets)}
                    </div>

                    <div class="special-gift-features">
                        ${this.renderSpecialFeatures(data.specialFeatures)}
                    </div>

                    <div class="gift-summary">
                        ${this.renderGiftSummary()}
                    </div>
                </div>
            </div>
        `;

        this.initializeGiftOptionsHandlers(productId);
    }

    /**
     * Render gift wrapping options
     */
    renderGiftWrapping(giftWrapping) {
        if (!giftWrapping.available) {
            return '';
        }

        return `
            <div class="gift-wrapping-card">
                <h4>Gift Wrapping Options</h4>
                <div class="wrapping-options-grid">
                    ${giftWrapping.options.map(option => `
                        <div class="wrapping-option" data-option-id="${option.id}">
                            <div class="option-image">
                                <img src="${option.image}" alt="${option.name}" loading="lazy">
                                <div class="option-overlay">
                                    <button class="btn btn-primary btn-sm" onclick="productGiftOptionsManager.selectWrapping('${option.id}')">
                                        Select
                                    </button>
                                </div>
                            </div>
                            <div class="option-content">
                                <h5>${option.name}</h5>
                                <p>${option.description}</p>
                                <div class="option-price">
                                    <span class="price">$${option.price.toFixed(2)}</span>
                                </div>
                                <div class="option-features">
                                    <h6>Includes:</h6>
                                    <ul>
                                        ${option.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="option-timing">
                                    <i class="fas fa-clock"></i>
                                    <span>${option.estimatedTime}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render gift message options
     */
    renderGiftMessages(giftMessages) {
        if (!giftMessages.available) {
            return '';
        }

        return `
            <div class="gift-message-card">
                <h4>Personal Gift Message</h4>
                <div class="message-content">
                    <div class="message-input-section">
                        <label for="giftMessage">Your Message (${giftMessages.maxLength} characters max):</label>
                        <textarea 
                            id="giftMessage" 
                            name="giftMessage" 
                            rows="4" 
                            maxlength="${giftMessages.maxLength}"
                            placeholder="Write a personal message for the recipient..."
                            oninput="productGiftOptionsManager.updateMessageCounter()"
                        ></textarea>
                        <div class="message-counter">
                            <span id="messageCount">0</span> / ${giftMessages.maxLength} characters
                        </div>
                    </div>

                    <div class="message-templates">
                        <h5>Quick Message Templates:</h5>
                        <div class="templates-grid">
                            ${giftMessages.templates.map(template => `
                                <button class="template-btn" onclick="productGiftOptionsManager.useTemplate('${template}')">
                                    ${template}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="special-occasions">
                        <h5>Special Occasions:</h5>
                        <div class="occasions-grid">
                            ${giftMessages.specialOccasions.map(occasion => `
                                <div class="occasion-item" onclick="productGiftOptionsManager.selectOccasion('${occasion.occasion}')">
                                    <div class="occasion-icon" style="background-color: ${occasion.color}">
                                        <i class="${occasion.icon}"></i>
                                    </div>
                                    <span class="occasion-name">${occasion.occasion}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render gift card options
     */
    renderGiftCards(giftCards) {
        if (!giftCards.available) {
            return '';
        }

        return `
            <div class="gift-card-card">
                <h4>Gift Card Options</h4>
                <div class="gift-card-options-grid">
                    ${giftCards.options.map(option => `
                        <div class="gift-card-option" data-card-id="${option.id}">
                            <div class="card-header">
                                <div class="card-icon">
                                    <i class="fas fa-${option.id === 'digital_card' ? 'envelope' : 'credit-card'}"></i>
                                </div>
                                <div class="card-info">
                                    <h5>${option.name}</h5>
                                    <p>${option.description}</p>
                                </div>
                            </div>
                            <div class="card-details">
                                <div class="card-price">
                                    ${option.price > 0 ? `<span class="price">$${option.price.toFixed(2)}</span>` : '<span class="free">Free</span>'}
                                </div>
                                <div class="card-delivery">
                                    <i class="fas fa-clock"></i>
                                    <span>${option.deliveryTime}</span>
                                </div>
                                <div class="card-features">
                                    <ul>
                                        ${option.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-primary btn-sm" onclick="productGiftOptionsManager.selectGiftCard('${option.id}')">
                                    Select
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render gift sets options
     */
    renderGiftSets(giftSets) {
        if (!giftSets.available || !giftSets.sets || giftSets.sets.length === 0) {
            return '';
        }

        return `
            <div class="gift-sets-card">
                <h4>Gift Sets & Bundles</h4>
                <div class="gift-sets-grid">
                    ${giftSets.sets.map(set => `
                        <div class="gift-set-item" data-set-id="${set.id}">
                            <div class="set-image">
                                <img src="${set.image}" alt="${set.name}" loading="lazy">
                                <div class="set-savings">
                                    Save $${set.savings.toFixed(2)}
                                </div>
                            </div>
                            <div class="set-content">
                                <h5>${set.name}</h5>
                                <p>${set.description}</p>
                                <div class="set-pricing">
                                    <span class="current-price">$${set.price.toFixed(2)}</span>
                                    <span class="original-price">$${set.originalPrice.toFixed(2)}</span>
                                </div>
                                <div class="set-items">
                                    <h6>Includes:</h6>
                                    <ul>
                                        ${set.items.map(item => `<li>${item}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="set-actions">
                                <button class="btn btn-primary" onclick="productGiftOptionsManager.selectGiftSet('${set.id}')">
                                    <i class="fas fa-gift"></i> Add Gift Set
                                </button>
                                <button class="btn btn-outline" onclick="productGiftOptionsManager.viewGiftSetDetails('${set.id}')">
                                    View Details
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render special gift features
     */
    renderSpecialFeatures(specialFeatures) {
        return `
            <div class="special-features-card">
                <h4>Special Gift Features</h4>
                <div class="features-grid">
                    ${Object.entries(specialFeatures).map(([feature, available]) => `
                        <div class="feature-item ${available ? 'available' : 'unavailable'}">
                            <div class="feature-icon">
                                <i class="fas fa-${this.getFeatureIcon(feature)}"></i>
                            </div>
                            <div class="feature-content">
                                <h5>${this.getFeatureName(feature)}</h5>
                                <p>${this.getFeatureDescription(feature)}</p>
                            </div>
                            <div class="feature-status">
                                ${available ? '<span class="status-available">Available</span>' : '<span class="status-unavailable">Not Available</span>'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render gift summary
     */
    renderGiftSummary() {
        return `
            <div class="gift-summary-card">
                <h4>Gift Summary</h4>
                <div class="summary-content">
                    <div class="summary-items" id="giftSummaryItems">
                        <div class="no-items">
                            <i class="fas fa-gift"></i>
                            <p>No gift options selected yet</p>
                        </div>
                    </div>
                    <div class="summary-total" id="giftSummaryTotal" style="display: none;">
                        <div class="total-line">
                            <span>Gift Options Total:</span>
                            <span id="giftTotalAmount">$0.00</span>
                        </div>
                    </div>
                    <div class="summary-actions">
                        <button class="btn btn-primary" onclick="productGiftOptionsManager.proceedToCheckout()">
                            <i class="fas fa-shopping-cart"></i> Add to Cart with Gift Options
                        </button>
                        <button class="btn btn-secondary" onclick="productGiftOptionsManager.clearGiftOptions()">
                            <i class="fas fa-times"></i> Clear All
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize gift options handlers
     */
    initializeGiftOptionsHandlers(productId) {
        // Initialize message counter
        this.updateMessageCounter();
    }

    /**
     * Select gift wrapping option
     */
    selectWrapping(optionId) {
        // Remove previous selection
        document.querySelectorAll('.wrapping-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to current option
        const selectedOption = document.querySelector(`[data-option-id="${optionId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        this.updateGiftSummary();
    }

    /**
     * Use message template
     */
    useTemplate(template) {
        const messageTextarea = document.getElementById('giftMessage');
        if (messageTextarea) {
            messageTextarea.value = template;
            this.updateMessageCounter();
        }
    }

    /**
     * Select special occasion
     */
    selectOccasion(occasion) {
        const messageTextarea = document.getElementById('giftMessage');
        if (messageTextarea) {
            const currentMessage = messageTextarea.value;
            const occasionMessage = `Happy ${occasion}! `;
            
            if (currentMessage.includes(occasionMessage)) {
                // Remove if already present
                messageTextarea.value = currentMessage.replace(occasionMessage, '');
            } else {
                // Add to beginning
                messageTextarea.value = occasionMessage + currentMessage;
            }
            
            this.updateMessageCounter();
        }
    }

    /**
     * Select gift card option
     */
    selectGiftCard(cardId) {
        // Remove previous selection
        document.querySelectorAll('.gift-card-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to current option
        const selectedOption = document.querySelector(`[data-card-id="${cardId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        this.updateGiftSummary();
    }

    /**
     * Select gift set
     */
    selectGiftSet(setId) {
        alert(`Gift set "${setId}" added to cart!`);
        this.updateGiftSummary();
    }

    /**
     * View gift set details
     */
    viewGiftSetDetails(setId) {
        alert(`Viewing details for gift set "${setId}"`);
    }

    /**
     * Update message counter
     */
    updateMessageCounter() {
        const messageTextarea = document.getElementById('giftMessage');
        const counter = document.getElementById('messageCount');
        
        if (messageTextarea && counter) {
            const currentLength = messageTextarea.value.length;
            counter.textContent = currentLength;
            
            // Change color if approaching limit
            if (currentLength > 150) {
                counter.style.color = '#ff6b6b';
            } else if (currentLength > 100) {
                counter.style.color = '#ffa726';
            } else {
                counter.style.color = '#4caf50';
            }
        }
    }

    /**
     * Update gift summary
     */
    updateGiftSummary() {
        const summaryItems = document.getElementById('giftSummaryItems');
        const summaryTotal = document.getElementById('giftSummaryTotal');
        const totalAmount = document.getElementById('giftTotalAmount');
        
        if (!summaryItems || !summaryTotal || !totalAmount) return;

        let total = 0;
        let items = [];

        // Check selected wrapping
        const selectedWrapping = document.querySelector('.wrapping-option.selected');
        if (selectedWrapping) {
            const optionId = selectedWrapping.dataset.optionId;
            const data = this.giftOptionsData['1']; // Assuming product ID 1
            const wrappingOption = data.giftWrapping.options.find(opt => opt.id === optionId);
            if (wrappingOption) {
                total += wrappingOption.price;
                items.push({
                    name: wrappingOption.name,
                    price: wrappingOption.price
                });
            }
        }

        // Check selected gift card
        const selectedCard = document.querySelector('.gift-card-option.selected');
        if (selectedCard) {
            const cardId = selectedCard.dataset.cardId;
            const data = this.giftOptionsData['1']; // Assuming product ID 1
            const cardOption = data.giftCards.options.find(opt => opt.id === cardId);
            if (cardOption) {
                total += cardOption.price;
                items.push({
                    name: cardOption.name,
                    price: cardOption.price
                });
            }
        }

        // Update display
        if (items.length > 0) {
            summaryItems.innerHTML = items.map(item => `
                <div class="summary-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
            `).join('');
            
            totalAmount.textContent = `$${total.toFixed(2)}`;
            summaryTotal.style.display = 'block';
        } else {
            summaryItems.innerHTML = `
                <div class="no-items">
                    <i class="fas fa-gift"></i>
                    <p>No gift options selected yet</p>
                </div>
            `;
            summaryTotal.style.display = 'none';
        }
    }

    /**
     * Proceed to checkout with gift options
     */
    proceedToCheckout() {
        const selectedWrapping = document.querySelector('.wrapping-option.selected');
        const selectedCard = document.querySelector('.gift-card-option.selected');
        const giftMessage = document.getElementById('giftMessage')?.value;

        if (!selectedWrapping && !selectedCard && !giftMessage) {
            alert('Please select at least one gift option or add a message.');
            return;
        }

        alert('Proceeding to checkout with selected gift options!');
    }

    /**
     * Clear all gift options
     */
    clearGiftOptions() {
        // Clear selections
        document.querySelectorAll('.wrapping-option, .gift-card-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Clear message
        const messageTextarea = document.getElementById('giftMessage');
        if (messageTextarea) {
            messageTextarea.value = '';
            this.updateMessageCounter();
        }

        // Update summary
        this.updateGiftSummary();
    }

    /**
     * Get feature icon
     */
    getFeatureIcon(feature) {
        const icons = {
            'giftReceipt': 'receipt',
            'surpriseDelivery': 'truck',
            'giftTracking': 'map-marker-alt',
            'customPackaging': 'box',
            'giftInsurance': 'shield-alt'
        };
        return icons[feature] || 'star';
    }

    /**
     * Get feature name
     */
    getFeatureName(feature) {
        const names = {
            'giftReceipt': 'Gift Receipt',
            'surpriseDelivery': 'Surprise Delivery',
            'giftTracking': 'Gift Tracking',
            'customPackaging': 'Custom Packaging',
            'giftInsurance': 'Gift Insurance'
        };
        return names[feature] || feature;
    }

    /**
     * Get feature description
     */
    getFeatureDescription(feature) {
        const descriptions = {
            'giftReceipt': 'Receive a gift receipt without price information',
            'surpriseDelivery': 'Schedule delivery for a specific date',
            'giftTracking': 'Track your gift delivery in real-time',
            'customPackaging': 'Custom packaging with your personal touch',
            'giftInsurance': 'Protect your gift with insurance coverage'
        };
        return descriptions[feature] || 'Special gift feature';
    }
}

// Initialize the manager
const productGiftOptionsManager = new ProductGiftOptionsManager();

// Global functions for gift options interactions
window.selectWrapping = (optionId) => productGiftOptionsManager.selectWrapping(optionId);
window.useTemplate = (template) => productGiftOptionsManager.useTemplate(template);
window.selectOccasion = (occasion) => productGiftOptionsManager.selectOccasion(occasion);
window.selectGiftCard = (cardId) => productGiftOptionsManager.selectGiftCard(cardId);
window.selectGiftSet = (setId) => productGiftOptionsManager.selectGiftSet(setId);
window.viewGiftSetDetails = (setId) => productGiftOptionsManager.viewGiftSetDetails(setId);
window.updateMessageCounter = () => productGiftOptionsManager.updateMessageCounter();
window.proceedToCheckout = () => productGiftOptionsManager.proceedToCheckout();
window.clearGiftOptions = () => productGiftOptionsManager.clearGiftOptions();

