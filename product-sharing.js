// Product Sharing Functionality System (Social Media, Email, etc.)

class ProductSharingManager {
    constructor() {
        this.sharingHistory = JSON.parse(localStorage.getItem('sharing_history') || '[]');
        this.sharingTemplates = JSON.parse(localStorage.getItem('sharing_templates') || '[]');
        this.sharingAnalytics = JSON.parse(localStorage.getItem('sharing_analytics') || '[]');
        this.initializeSharingData();
    }
    
    // Initialize with mock sharing data
    initializeSharingData() {
        if (this.sharingTemplates.length === 0) {
            this.sharingTemplates = {
                social: {
                    facebook: {
                        name: 'Facebook',
                        icon: 'fab fa-facebook-f',
                        color: '#1877F2',
                        url: 'https://www.facebook.com/sharer/sharer.php?u={url}&quote={title}',
                        template: 'Check out this amazing product: {title} - {price}'
                    },
                    twitter: {
                        name: 'Twitter',
                        icon: 'fab fa-twitter',
                        color: '#1DA1F2',
                        url: 'https://twitter.com/intent/tweet?url={url}&text={title}&hashtags={hashtags}',
                        template: 'Just found this great product: {title} - {price} {hashtags}'
                    },
                    instagram: {
                        name: 'Instagram',
                        icon: 'fab fa-instagram',
                        color: '#E4405F',
                        url: 'https://www.instagram.com/',
                        template: 'Check out this product: {title} - {price}'
                    },
                    pinterest: {
                        name: 'Pinterest',
                        icon: 'fab fa-pinterest-p',
                        color: '#BD081C',
                        url: 'https://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}',
                        template: 'Love this product: {title} - {price}'
                    },
                    linkedin: {
                        name: 'LinkedIn',
                        icon: 'fab fa-linkedin-in',
                        color: '#0077B5',
                        url: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
                        template: 'Professional recommendation: {title} - {price}'
                    },
                    whatsapp: {
                        name: 'WhatsApp',
                        icon: 'fab fa-whatsapp',
                        color: '#25D366',
                        url: 'https://wa.me/?text={title}%20{url}',
                        template: 'Check out this product: {title} - {price}'
                    },
                    telegram: {
                        name: 'Telegram',
                        icon: 'fab fa-telegram-plane',
                        color: '#0088CC',
                        url: 'https://t.me/share/url?url={url}&text={title}',
                        template: 'Great product: {title} - {price}'
                    }
                },
                messaging: {
                    email: {
                        name: 'Email',
                        icon: 'fas fa-envelope',
                        color: '#EA4335',
                        template: 'Check out this amazing product I found: {title} - {price}',
                        subject: 'Product Recommendation: {title}'
                    },
                    sms: {
                        name: 'SMS',
                        icon: 'fas fa-sms',
                        color: '#34A853',
                        template: 'Check out this product: {title} - {price} {url}'
                    }
                },
                copy: {
                    link: {
                        name: 'Copy Link',
                        icon: 'fas fa-link',
                        color: '#6C757D',
                        action: 'copy'
                    },
                    embed: {
                        name: 'Embed Code',
                        icon: 'fas fa-code',
                        color: '#6C757D',
                        action: 'embed'
                    }
                }
            };
            
            this.saveSharingTemplates();
        }
    }
    
    // Get product data for sharing
    getProductData(productId) {
        // In a real implementation, this would fetch from the product database
        const mockProducts = {
            '1': {
                id: '1',
                name: 'Premium Wireless Earbuds',
                price: 79.99,
                originalPrice: 99.99,
                image: 'https://via.placeholder.com/500x500?text=Wireless+Earbuds',
                description: 'High-quality wireless earbuds with noise cancellation',
                url: window.location.origin + '/product-detail.html?id=1',
                category: 'Electronics',
                brand: 'TechMax',
                rating: 4.5,
                reviewCount: 1284
            },
            '2': {
                id: '2',
                name: 'Smart Fitness Tracker',
                price: 119.99,
                originalPrice: 149.99,
                image: 'https://via.placeholder.com/500x500?text=Fitness+Tracker',
                description: 'Advanced fitness tracker with heart rate monitoring',
                url: window.location.origin + '/product-detail.html?id=2',
                category: 'Electronics',
                brand: 'FitTech',
                rating: 4.3,
                reviewCount: 892
            }
        };
        
        return mockProducts[productId] || mockProducts['1'];
    }
    
    // Render sharing section
    renderSharingSection(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const product = this.getProductData(productId);
        
        let html = `
            <div class="product-sharing-section">
                <div class="sharing-header">
                    <h3>Share This Product</h3>
                    <p>Let others know about this amazing product!</p>
                </div>
                
                <div class="sharing-content">
                    <div class="sharing-preview">
                        <div class="sharing-preview-card">
                            <img src="${product.image}" alt="${product.name}" class="preview-image">
                            <div class="preview-content">
                                <h4 class="preview-title">${product.name}</h4>
                                <p class="preview-description">${product.description}</p>
                                <div class="preview-price">
                                    <span class="current-price">$${product.price}</span>
                                    ${product.originalPrice > product.price ? 
                                        `<span class="original-price">$${product.originalPrice}</span>` : ''}
                                </div>
                                <div class="preview-rating">
                                    <div class="stars">
                                        ${this.renderStars(product.rating)}
                                    </div>
                                    <span class="rating-text">${product.rating} (${product.reviewCount} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sharing-options">
                        <div class="sharing-tabs">
                            <button class="sharing-tab active" onclick="productSharingManager.showSharingTab('social')">
                                <i class="fas fa-share-alt"></i> Social Media
                            </button>
                            <button class="sharing-tab" onclick="productSharingManager.showSharingTab('messaging')">
                                <i class="fas fa-envelope"></i> Messaging
                            </button>
                            <button class="sharing-tab" onclick="productSharingManager.showSharingTab('copy')">
                                <i class="fas fa-copy"></i> Copy & Embed
                            </button>
                        </div>
                        
                        <div class="sharing-tab-content">
                            <div class="sharing-tab-panel active" id="social-panel">
                                ${this.renderSocialSharing(product)}
                            </div>
                            <div class="sharing-tab-panel" id="messaging-panel">
                                ${this.renderMessagingSharing(product)}
                            </div>
                            <div class="sharing-tab-panel" id="copy-panel">
                                ${this.renderCopySharing(product)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.setupSharingEventListeners();
    }
    
    // Render social sharing options
    renderSocialSharing(product) {
        const socialPlatforms = this.sharingTemplates.social;
        
        return `
            <div class="social-sharing-grid">
                ${Object.entries(socialPlatforms).map(([key, platform]) => `
                    <button class="social-share-btn" 
                            style="background-color: ${platform.color}"
                            onclick="productSharingManager.shareToSocial('${key}', '${product.id}')"
                            title="Share on ${platform.name}">
                        <i class="${platform.icon}"></i>
                        <span>${platform.name}</span>
                    </button>
                `).join('')}
            </div>
            
            <div class="sharing-custom-message">
                <h4>Customize Your Message</h4>
                <textarea id="customMessage" 
                          placeholder="Add a personal message to your share..."
                          maxlength="280">Check out this amazing product: ${product.name} - $${product.price}</textarea>
                <div class="message-char-count">
                    <span id="charCount">0</span>/280 characters
                </div>
            </div>
        `;
    }
    
    // Render messaging sharing options
    renderMessagingSharing(product) {
        const messagingOptions = this.sharingTemplates.messaging;
        
        return `
            <div class="messaging-sharing-options">
                <div class="messaging-option">
                    <button class="messaging-btn email-btn" onclick="productSharingManager.openEmailShare('${product.id}')">
                        <i class="fas fa-envelope"></i>
                        <div class="messaging-info">
                            <h4>Email</h4>
                            <p>Send via email to friends and family</p>
                        </div>
                    </button>
                </div>
                
                <div class="messaging-option">
                    <button class="messaging-btn sms-btn" onclick="productSharingManager.openSMSShare('${product.id}')">
                        <i class="fas fa-sms"></i>
                        <div class="messaging-info">
                            <h4>SMS</h4>
                            <p>Send via text message</p>
                        </div>
                    </button>
                </div>
            </div>
            
            <div class="quick-share-options">
                <h4>Quick Share</h4>
                <div class="quick-share-grid">
                    <button class="quick-share-btn" onclick="productSharingManager.quickShare('email', '${product.id}')">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </button>
                    <button class="quick-share-btn" onclick="productSharingManager.quickShare('sms', '${product.id}')">
                        <i class="fas fa-sms"></i>
                        <span>SMS</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    // Render copy and embed options
    renderCopySharing(product) {
        return `
            <div class="copy-sharing-options">
                <div class="copy-option">
                    <h4>Copy Product Link</h4>
                    <div class="copy-input-group">
                        <input type="text" id="productLink" value="${product.url}" readonly>
                        <button class="copy-btn" onclick="productSharingManager.copyToClipboard('productLink')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                
                <div class="copy-option">
                    <h4>Copy Product Info</h4>
                    <div class="copy-input-group">
                        <textarea id="productInfo" readonly>${product.name} - $${product.price}
${product.description}
Rating: ${product.rating}/5 (${product.reviewCount} reviews)
${product.url}</textarea>
                        <button class="copy-btn" onclick="productSharingManager.copyToClipboard('productInfo')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                
                <div class="copy-option">
                    <h4>Embed Product Card</h4>
                    <div class="embed-preview">
                        <div class="embed-card">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="embed-content">
                                <h5>${product.name}</h5>
                                <p class="embed-price">$${product.price}</p>
                                <a href="${product.url}" target="_blank" class="embed-link">View Product</a>
                            </div>
                        </div>
                    </div>
                    <div class="copy-input-group">
                        <textarea id="embedCode" readonly><div class="product-embed-card">
    <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
        <h5 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">${product.name}</h5>
        <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #8B4513;">$${product.price}</p>
        <a href="${product.url}" target="_blank" style="color: #8B4513; text-decoration: none;">View Product</a>
    </div>
</div></textarea>
                        <button class="copy-btn" onclick="productSharingManager.copyToClipboard('embedCode')">
                            <i class="fas fa-copy"></i> Copy Code
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render stars for rating
    renderStars(rating) {
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
    
    // Share to social media
    shareToSocial(platform, productId) {
        const product = this.getProductData(productId);
        const platformData = this.sharingTemplates.social[platform];
        const customMessage = document.getElementById('customMessage')?.value || platformData.template;
        
        if (!platformData) return;
        
        const shareData = {
            url: product.url,
            title: product.name,
            price: `$${product.price}`,
            image: product.image,
            description: product.description,
            hashtags: '#ShopMax #Electronics #Deals'
        };
        
        let shareUrl = platformData.url;
        
        // Replace placeholders in URL
        Object.entries(shareData).forEach(([key, value]) => {
            shareUrl = shareUrl.replace(`{${key}}`, encodeURIComponent(value));
        });
        
        // Replace custom message
        shareUrl = shareUrl.replace('{title}', encodeURIComponent(customMessage));
        
        // Open sharing window
        const windowFeatures = 'width=600,height=400,scrollbars=yes,resizable=yes';
        window.open(shareUrl, 'share', windowFeatures);
        
        // Track sharing analytics
        this.trackSharingAnalytics('social', platform, productId);
        
        if (window.showNotification) {
            window.showNotification(`Sharing to ${platformData.name}...`, 'info');
        }
    }
    
    // Open email sharing modal
    openEmailShare(productId) {
        const product = this.getProductData(productId);
        
        const modal = document.createElement('div');
        modal.className = 'modal email-share-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content email-share-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="email-share-form">
                    <h3>Share via Email</h3>
                    
                    <div class="form-group">
                        <label for="recipientEmail">Recipient Email</label>
                        <input type="email" id="recipientEmail" placeholder="Enter email address" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="senderName">Your Name</label>
                        <input type="text" id="senderName" placeholder="Enter your name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="emailSubject">Subject</label>
                        <input type="text" id="emailSubject" value="Product Recommendation: ${product.name}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="emailMessage">Message</label>
                        <textarea id="emailMessage" rows="6" required>Hi there!

I wanted to share this amazing product with you:

${product.name} - $${product.price}
${product.description}

Rating: ${product.rating}/5 stars (${product.reviewCount} reviews)

Check it out here: ${product.url}

Best regards!</textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="productSharingManager.sendEmailShare('${productId}')">
                            <i class="fas fa-paper-plane"></i> Send Email
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Send email share
    sendEmailShare(productId) {
        const recipientEmail = document.getElementById('recipientEmail').value;
        const senderName = document.getElementById('senderName').value;
        const subject = document.getElementById('emailSubject').value;
        const message = document.getElementById('emailMessage').value;
        
        if (!recipientEmail || !senderName || !subject || !message) {
            if (window.showNotification) {
                window.showNotification('Please fill in all required fields.', 'error');
            }
            return;
        }
        
        // In a real implementation, this would send an actual email
        // For now, we'll simulate the email sending
        const emailData = {
            to: recipientEmail,
            from: senderName,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Track sharing analytics
        this.trackSharingAnalytics('email', 'email', productId);
        
        // Close modal
        document.querySelector('.email-share-modal').remove();
        
        if (window.showNotification) {
            window.showNotification('Email sent successfully!', 'success');
        }
    }
    
    // Open SMS sharing modal
    openSMSShare(productId) {
        const product = this.getProductData(productId);
        
        const modal = document.createElement('div');
        modal.className = 'modal sms-share-modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content sms-share-modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="sms-share-form">
                    <h3>Share via SMS</h3>
                    
                    <div class="form-group">
                        <label for="recipientPhone">Recipient Phone Number</label>
                        <input type="tel" id="recipientPhone" placeholder="Enter phone number" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="smsMessage">Message</label>
                        <textarea id="smsMessage" rows="4" maxlength="160" required>Check out this product: ${product.name} - $${product.price}
${product.url}</textarea>
                        <div class="sms-char-count">
                            <span id="smsCharCount">0</span>/160 characters
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="productSharingManager.sendSMSShare('${productId}')">
                            <i class="fas fa-sms"></i> Send SMS
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Setup character counter
        const smsMessage = document.getElementById('smsMessage');
        const smsCharCount = document.getElementById('smsCharCount');
        
        smsMessage.addEventListener('input', function() {
            smsCharCount.textContent = this.value.length;
        });
        
        smsCharCount.textContent = smsMessage.value.length;
    }
    
    // Send SMS share
    sendSMSShare(productId) {
        const recipientPhone = document.getElementById('recipientPhone').value;
        const message = document.getElementById('smsMessage').value;
        
        if (!recipientPhone || !message) {
            if (window.showNotification) {
                window.showNotification('Please fill in all required fields.', 'error');
            }
            return;
        }
        
        // In a real implementation, this would send an actual SMS
        // For now, we'll simulate the SMS sending
        const smsData = {
            to: recipientPhone,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Track sharing analytics
        this.trackSharingAnalytics('sms', 'sms', productId);
        
        // Close modal
        document.querySelector('.sms-share-modal').remove();
        
        if (window.showNotification) {
            window.showNotification('SMS sent successfully!', 'success');
        }
    }
    
    // Quick share functionality
    quickShare(method, productId) {
        if (method === 'email') {
            this.openEmailShare(productId);
        } else if (method === 'sms') {
            this.openSMSShare(productId);
        }
    }
    
    // Copy to clipboard
    copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.select();
        element.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            
            // Visual feedback
            const copyBtn = element.nextElementSibling;
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
            
            if (window.showNotification) {
                window.showNotification('Copied to clipboard!', 'success');
            }
            
            // Track sharing analytics
            this.trackSharingAnalytics('copy', elementId, '1');
            
        } catch (err) {
            if (window.showNotification) {
                window.showNotification('Failed to copy to clipboard.', 'error');
            }
        }
    }
    
    // Show sharing tab
    showSharingTab(tabName) {
        // Hide all tab panels
        document.querySelectorAll('.sharing-tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.sharing-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab panel
        document.getElementById(`${tabName}-panel`).classList.add('active');
        
        // Add active class to selected tab
        event.target.classList.add('active');
    }
    
    // Track sharing analytics
    trackSharingAnalytics(method, platform, productId) {
        const analytics = {
            method: method,
            platform: platform,
            productId: productId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        this.sharingAnalytics.push(analytics);
        this.saveSharingAnalytics();
    }
    
    // Setup event listeners
    setupSharingEventListeners() {
        // Character counter for custom message
        const customMessage = document.getElementById('customMessage');
        const charCount = document.getElementById('charCount');
        
        if (customMessage && charCount) {
            customMessage.addEventListener('input', function() {
                charCount.textContent = this.value.length;
            });
            
            charCount.textContent = customMessage.value.length;
        }
    }
    
    // Save data to localStorage
    saveSharingHistory() {
        localStorage.setItem('sharing_history', JSON.stringify(this.sharingHistory));
    }
    
    saveSharingTemplates() {
        localStorage.setItem('sharing_templates', JSON.stringify(this.sharingTemplates));
    }
    
    saveSharingAnalytics() {
        localStorage.setItem('sharing_analytics', JSON.stringify(this.sharingAnalytics));
    }
}

// Initialize global instance
let productSharingManager = new ProductSharingManager();

// Export for global access
window.ProductSharingManager = ProductSharingManager;

