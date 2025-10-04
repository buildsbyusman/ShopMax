/**
 * Cart Abandonment Recovery System
 * Handles cart abandonment detection, recovery campaigns, and re-engagement strategies
 */

class CartAbandonmentManager {
    constructor() {
        this.abandonmentData = {
            sessions: {},
            campaigns: [],
            recoveryStrategies: [],
            analytics: {
                totalAbandonments: 0,
                recoveredCarts: 0,
                recoveryRate: 0,
                averageRecoveryTime: 0
            }
        };

        this.settings = {
            abandonmentThreshold: 30 * 60 * 1000, // 30 minutes
            maxRecoveryAttempts: 3,
            recoveryIntervals: [
                30 * 60 * 1000,    // 30 minutes
                24 * 60 * 60 * 1000, // 24 hours
                72 * 60 * 60 * 1000  // 72 hours
            ],
            enableExitIntent: true,
            enableEmailRecovery: true,
            enableSmsRecovery: false,
            enablePushNotifications: true,
            enableDiscountOffers: true,
            maxDiscountPercentage: 20
        };

        this.recoveryStrategies = [
            {
                id: 'exit_intent',
                name: 'Exit Intent Popup',
                type: 'popup',
                trigger: 'exit_intent',
                delay: 0,
                enabled: true,
                template: 'exit_intent_popup'
            },
            {
                id: 'email_reminder_1',
                name: 'First Email Reminder',
                type: 'email',
                trigger: 'time_based',
                delay: 30 * 60 * 1000, // 30 minutes
                enabled: true,
                template: 'cart_reminder_1'
            },
            {
                id: 'email_reminder_2',
                name: 'Second Email Reminder',
                type: 'email',
                trigger: 'time_based',
                delay: 24 * 60 * 60 * 1000, // 24 hours
                enabled: true,
                template: 'cart_reminder_2'
            },
            {
                id: 'email_reminder_3',
                name: 'Final Email with Discount',
                type: 'email',
                trigger: 'time_based',
                delay: 72 * 60 * 60 * 1000, // 72 hours
                enabled: true,
                template: 'cart_reminder_discount'
            },
            {
                id: 'push_notification',
                name: 'Push Notification',
                type: 'push',
                trigger: 'time_based',
                delay: 2 * 60 * 60 * 1000, // 2 hours
                enabled: true,
                template: 'cart_push_reminder'
            }
        ];

        this.emailTemplates = {
            cart_reminder_1: {
                subject: "Don't forget your items!",
                preview: "You left some great items in your cart",
                content: `
                    <div class="email-template">
                        <h2>Hi {{customerName}},</h2>
                        <p>We noticed you left some items in your cart. Don't worry, we've saved them for you!</p>
                        <div class="cart-items">
                            {{cartItems}}
                        </div>
                        <p>Complete your purchase now and get free shipping on orders over $50!</p>
                        <a href="{{cartUrl}}" class="cta-button">Complete Purchase</a>
                    </div>
                `
            },
            cart_reminder_2: {
                subject: "Your cart is waiting for you",
                preview: "Still thinking about those items?",
                content: `
                    <div class="email-template">
                        <h2>Hi {{customerName}},</h2>
                        <p>Your cart is still waiting for you! These items are popular and may sell out soon.</p>
                        <div class="cart-items">
                            {{cartItems}}
                        </div>
                        <p>Don't miss out - complete your purchase today!</p>
                        <a href="{{cartUrl}}" class="cta-button">Complete Purchase</a>
                    </div>
                `
            },
            cart_reminder_discount: {
                subject: "Last chance - 15% off your cart!",
                preview: "Special discount just for you",
                content: `
                    <div class="email-template">
                        <h2>Hi {{customerName}},</h2>
                        <p>We don't want you to miss out! Here's a special 15% discount on your cart items.</p>
                        <div class="discount-banner">
                            <h3>Use code: SAVE15</h3>
                            <p>Valid for 24 hours only!</p>
                        </div>
                        <div class="cart-items">
                            {{cartItems}}
                        </div>
                        <p>This offer expires soon - don't wait!</p>
                        <a href="{{cartUrl}}?discount=SAVE15" class="cta-button">Complete Purchase with 15% Off</a>
                    </div>
                `
            }
        };

        this.init();
    }

    /**
     * Initialize the cart abandonment system
     */
    init() {
        this.loadAbandonmentData();
        this.setupEventListeners();
        this.startAbandonmentTracking();
        this.processRecoveryCampaigns();
    }

    /**
     * Start tracking cart abandonment
     */
    startAbandonmentTracking() {
        // Track when user adds items to cart
        this.trackCartActivity('cart_updated');
        
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackCartActivity('page_hidden');
            } else {
                this.trackCartActivity('page_visible');
            }
        });

        // Track before unload
        window.addEventListener('beforeunload', () => {
            this.trackCartActivity('page_unload');
        });

        // Setup exit intent detection
        if (this.settings.enableExitIntent) {
            this.setupExitIntentDetection();
        }
    }

    /**
     * Track cart activity
     */
    trackCartActivity(action, data = {}) {
        const sessionId = this.getSessionId();
        const timestamp = Date.now();
        
        if (!this.abandonmentData.sessions[sessionId]) {
            this.abandonmentData.sessions[sessionId] = {
                id: sessionId,
                startTime: timestamp,
                lastActivity: timestamp,
                cartItems: [],
                actions: [],
                status: 'active',
                recoveryAttempts: 0,
                recovered: false,
                customerInfo: this.getCustomerInfo()
            };
        }

        const session = this.abandonmentData.sessions[sessionId];
        session.lastActivity = timestamp;
        session.actions.push({
            action,
            timestamp,
            data
        });

        // Update cart items if cart data is available
        if (window.advancedCartManager) {
            const cartData = window.advancedCartManager.getCartData();
            session.cartItems = cartData.items;
        }

        // Check for abandonment
        this.checkForAbandonment(sessionId);
        
        this.saveAbandonmentData();
    }

    /**
     * Check if session should be marked as abandoned
     */
    checkForAbandonment(sessionId) {
        const session = this.abandonmentData.sessions[sessionId];
        if (!session || session.recovered || session.status === 'abandoned') return;

        const timeSinceLastActivity = Date.now() - session.lastActivity;
        
        if (timeSinceLastActivity >= this.settings.abandonmentThreshold && session.cartItems.length > 0) {
            this.markAsAbandoned(sessionId);
        }
    }

    /**
     * Mark session as abandoned
     */
    markAsAbandoned(sessionId) {
        const session = this.abandonmentData.sessions[sessionId];
        if (!session) return;

        session.status = 'abandoned';
        session.abandonedAt = Date.now();
        this.abandonmentData.analytics.totalAbandonments++;

        // Schedule recovery campaigns
        this.scheduleRecoveryCampaigns(sessionId);
        
        this.saveAbandonmentData();
        this.showAbandonmentNotification();
    }

    /**
     * Schedule recovery campaigns for abandoned cart
     */
    scheduleRecoveryCampaigns(sessionId) {
        const session = this.abandonmentData.sessions[sessionId];
        if (!session) return;

        this.recoveryStrategies.forEach(strategy => {
            if (!strategy.enabled) return;

            const campaign = {
                id: `${sessionId}_${strategy.id}`,
                sessionId,
                strategyId: strategy.id,
                scheduledTime: session.abandonedAt + strategy.delay,
                status: 'scheduled',
                attempts: 0,
                maxAttempts: 1
            };

            this.abandonmentData.campaigns.push(campaign);
        });
    }

    /**
     * Process recovery campaigns
     */
    processRecoveryCampaigns() {
        const now = Date.now();
        const dueCampaigns = this.abandonmentData.campaigns.filter(campaign => 
            campaign.status === 'scheduled' && 
            campaign.scheduledTime <= now &&
            campaign.attempts < campaign.maxAttempts
        );

        dueCampaigns.forEach(campaign => {
            this.executeRecoveryCampaign(campaign);
        });

        // Check every minute
        setTimeout(() => this.processRecoveryCampaigns(), 60000);
    }

    /**
     * Execute recovery campaign
     */
    executeRecoveryCampaign(campaign) {
        const session = this.abandonmentData.sessions[campaign.sessionId];
        if (!session || session.recovered) {
            campaign.status = 'cancelled';
            return;
        }

        const strategy = this.recoveryStrategies.find(s => s.id === campaign.strategyId);
        if (!strategy) return;

        campaign.attempts++;
        campaign.lastAttempt = Date.now();

        switch (strategy.type) {
            case 'email':
                this.sendRecoveryEmail(session, strategy);
                break;
            case 'push':
                this.sendPushNotification(session, strategy);
                break;
            case 'popup':
                this.showRecoveryPopup(session, strategy);
                break;
        }

        if (campaign.attempts >= campaign.maxAttempts) {
            campaign.status = 'completed';
        }

        this.saveAbandonmentData();
    }

    /**
     * Send recovery email
     */
    sendRecoveryEmail(session, strategy) {
        const template = this.emailTemplates[strategy.template];
        if (!template) return;

        const emailData = {
            to: session.customerInfo.email || 'customer@example.com',
            subject: template.subject,
            preview: template.preview,
            content: this.processEmailTemplate(template.content, session),
            cartUrl: this.generateCartRecoveryUrl(session.id)
        };

        // In a real application, this would send an actual email
        console.log('Sending recovery email:', emailData);
        this.trackRecoveryAction('email_sent', session.id, strategy.id);
    }

    /**
     * Send push notification
     */
    sendPushNotification(session, strategy) {
        if (!('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        const notification = new Notification('Don\'t forget your cart!', {
            body: `You have ${session.cartItems.length} items waiting in your cart`,
            icon: '/favicon.ico',
            tag: 'cart_abandonment'
        });

        notification.onclick = () => {
            window.focus();
            window.location.href = this.generateCartRecoveryUrl(session.id);
            notification.close();
        };

        this.trackRecoveryAction('push_sent', session.id, strategy.id);
    }

    /**
     * Show recovery popup
     */
    showRecoveryPopup(session, strategy) {
        if (strategy.trigger === 'exit_intent') {
            this.showExitIntentPopup(session);
        }
    }

    /**
     * Setup exit intent detection
     */
    setupExitIntentDetection() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                const sessionId = this.getSessionId();
                const session = this.abandonmentData.sessions[sessionId];
                
                if (session && session.cartItems.length > 0 && session.status === 'active') {
                    this.showExitIntentPopup(session);
                    exitIntentShown = true;
                }
            }
        });
    }

    /**
     * Show exit intent popup
     */
    showExitIntentPopup(session) {
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <button class="popup-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                <div class="popup-header">
                    <h3>Wait! Don't miss out!</h3>
                    <p>You have ${session.cartItems.length} items in your cart</p>
                </div>
                <div class="popup-body">
                    <div class="cart-preview">
                        ${session.cartItems.slice(0, 3).map(item => `
                            <div class="preview-item">
                                <img src="${item.image}" alt="${item.name}" />
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <span class="price">$${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        `).join('')}
                        ${session.cartItems.length > 3 ? `<p>+${session.cartItems.length - 3} more items</p>` : ''}
                    </div>
                    <div class="popup-actions">
                        <button class="btn btn-secondary" onclick="this.closest('.exit-intent-popup').remove()">
                            Continue Shopping
                        </button>
                        <button class="btn btn-primary" onclick="window.location.href='${this.generateCartRecoveryUrl(session.id)}'">
                            Complete Purchase
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(popup);
        this.trackRecoveryAction('exit_intent_shown', session.id, 'exit_intent');
    }

    /**
     * Process email template with session data
     */
    processEmailTemplate(template, session) {
        let content = template;
        
        // Replace placeholders
        content = content.replace(/\{\{customerName\}\}/g, session.customerInfo.name || 'Customer');
        content = content.replace(/\{\{cartUrl\}\}/g, this.generateCartRecoveryUrl(session.id));
        
        // Replace cart items
        const cartItemsHtml = session.cartItems.map(item => `
            <div class="email-cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
        
        content = content.replace(/\{\{cartItems\}\}/g, cartItemsHtml);
        
        return content;
    }

    /**
     * Generate cart recovery URL
     */
    generateCartRecoveryUrl(sessionId) {
        return `${window.location.origin}/cart.html?recovery=${sessionId}`;
    }

    /**
     * Track recovery action
     */
    trackRecoveryAction(action, sessionId, strategyId) {
        const session = this.abandonmentData.sessions[sessionId];
        if (session) {
            session.actions.push({
                action: `recovery_${action}`,
                timestamp: Date.now(),
                data: { strategyId }
            });
        }
    }

    /**
     * Mark cart as recovered
     */
    markAsRecovered(sessionId) {
        const session = this.abandonmentData.sessions[sessionId];
        if (!session) return;

        session.recovered = true;
        session.recoveredAt = Date.now();
        session.recoveryTime = session.recoveredAt - session.abandonedAt;
        
        this.abandonmentData.analytics.recoveredCarts++;
        this.abandonmentData.analytics.recoveryRate = 
            (this.abandonmentData.analytics.recoveredCarts / this.abandonmentData.analytics.totalAbandonments) * 100;
        
        // Cancel remaining campaigns
        this.abandonmentData.campaigns.forEach(campaign => {
            if (campaign.sessionId === sessionId && campaign.status === 'scheduled') {
                campaign.status = 'cancelled';
            }
        });

        this.saveAbandonmentData();
    }

    /**
     * Get session ID
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('cartAbandonmentSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('cartAbandonmentSessionId', sessionId);
        }
        return sessionId;
    }

    /**
     * Get customer info
     */
    getCustomerInfo() {
        // In a real application, this would get actual customer data
        return {
            name: 'Customer',
            email: 'customer@example.com',
            phone: '+1234567890',
            isLoggedIn: false
        };
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for cart updates
        document.addEventListener('cartUpdated', (e) => {
            this.trackCartActivity('cart_updated', e.detail);
        });

        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackCartActivity('page_hidden');
            } else {
                this.trackCartActivity('page_visible');
            }
        });
    }

    /**
     * Show abandonment notification
     */
    showAbandonmentNotification() {
        // This would typically be a subtle notification or analytics update
        console.log('Cart abandoned - recovery campaigns scheduled');
    }

    /**
     * Load abandonment data from localStorage
     */
    loadAbandonmentData() {
        const saved = localStorage.getItem('cartAbandonmentData');
        if (saved) {
            this.abandonmentData = { ...this.abandonmentData, ...JSON.parse(saved) };
        }
    }

    /**
     * Save abandonment data to localStorage
     */
    saveAbandonmentData() {
        localStorage.setItem('cartAbandonmentData', JSON.stringify(this.abandonmentData));
    }

    /**
     * Get abandonment analytics
     */
    getAnalytics() {
        return this.abandonmentData.analytics;
    }

    /**
     * Get recovery campaigns
     */
    getRecoveryCampaigns() {
        return this.abandonmentData.campaigns;
    }

    /**
     * Update recovery strategy settings
     */
    updateRecoveryStrategy(strategyId, updates) {
        const strategy = this.recoveryStrategies.find(s => s.id === strategyId);
        if (strategy) {
            Object.assign(strategy, updates);
        }
    }

    /**
     * Test recovery campaign
     */
    testRecoveryCampaign(strategyId) {
        const strategy = this.recoveryStrategies.find(s => s.id === strategyId);
        if (!strategy) return;

        const testSession = {
            id: 'test_session',
            cartItems: [
                {
                    id: '1',
                    name: 'Test Product',
                    price: 29.99,
                    quantity: 1,
                    image: 'https://via.placeholder.com/100x100?text=Test'
                }
            ],
            customerInfo: {
                name: 'Test Customer',
                email: 'test@example.com'
            }
        };

        switch (strategy.type) {
            case 'email':
                this.sendRecoveryEmail(testSession, strategy);
                break;
            case 'push':
                this.sendPushNotification(testSession, strategy);
                break;
            case 'popup':
                this.showRecoveryPopup(testSession, strategy);
                break;
        }
    }
}

// Initialize the cart abandonment manager
const cartAbandonmentManager = new CartAbandonmentManager();

// Global functions for cart abandonment
window.testRecoveryCampaign = (strategyId) => cartAbandonmentManager.testRecoveryCampaign(strategyId);
window.getAbandonmentAnalytics = () => cartAbandonmentManager.getAnalytics();
window.markCartAsRecovered = (sessionId) => cartAbandonmentManager.markAsRecovered(sessionId);

