/**
 * Product Availability Notifications Manager
 * Handles stock notifications, back-in-stock alerts, pre-order notifications, and availability tracking
 */

class ProductAvailabilityNotificationsManager {
    constructor() {
        this.notificationData = {
            '1': { // Product ID 1
                currentStock: 0,
                expectedRestock: '2024-01-15',
                isBackorderable: true,
                isPreorderable: false,
                preorderDate: null,
                estimatedShipping: '2024-01-20',
                notificationSettings: {
                    emailEnabled: true,
                    smsEnabled: false,
                    pushEnabled: true,
                    notifyOnRestock: true,
                    notifyOnPriceDrop: true,
                    notifyOnSale: true
                }
            },
            '2': { // Product ID 2
                currentStock: 5,
                expectedRestock: null,
                isBackorderable: false,
                isPreorderable: false,
                preorderDate: null,
                estimatedShipping: '2024-01-10',
                notificationSettings: {
                    emailEnabled: true,
                    smsEnabled: true,
                    pushEnabled: true,
                    notifyOnRestock: true,
                    notifyOnPriceDrop: false,
                    notifyOnSale: true
                }
            },
            '3': { // Product ID 3
                currentStock: 0,
                expectedRestock: null,
                isBackorderable: false,
                isPreorderable: true,
                preorderDate: '2024-02-01',
                estimatedShipping: '2024-02-05',
                notificationSettings: {
                    emailEnabled: true,
                    smsEnabled: false,
                    pushEnabled: true,
                    notifyOnRestock: true,
                    notifyOnPriceDrop: true,
                    notifyOnSale: true
                }
            }
        };

        this.userNotifications = JSON.parse(localStorage.getItem('userNotifications')) || [];
    }

    /**
     * Render the availability notifications section
     */
    renderAvailabilityNotifications(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.notificationData[productId] || this.notificationData['1'];
        const userNotification = this.getUserNotification(productId);
        
        container.innerHTML = `
            <div class="availability-notifications-section">
                <div class="notifications-header">
                    <h3><i class="fas fa-bell"></i> Availability Notifications</h3>
                    <p>Stay informed about stock updates, price changes, and special offers for this product.</p>
                </div>

                <div class="notifications-content">
                    <div class="stock-status-card">
                        ${this.renderStockStatus(data, productId)}
                    </div>

                    <div class="notification-options">
                        <h4>Notification Preferences</h4>
                        <div class="notification-types">
                            ${this.renderNotificationTypes(data, productId, userNotification)}
                        </div>
                    </div>

                    <div class="notification-form">
                        ${this.renderNotificationForm(productId, userNotification)}
                    </div>

                    <div class="notification-history">
                        ${this.renderNotificationHistory(productId)}
                    </div>
                </div>
            </div>
        `;

        this.initializeNotificationHandlers(productId);
    }

    /**
     * Render stock status card
     */
    renderStockStatus(data, productId) {
        let statusClass = 'in-stock';
        let statusText = 'In Stock';
        let statusIcon = 'fas fa-check-circle';
        let statusMessage = 'Available for immediate shipping';

        if (data.currentStock === 0) {
            if (data.isPreorderable) {
                statusClass = 'preorder';
                statusText = 'Pre-Order';
                statusIcon = 'fas fa-clock';
                statusMessage = `Available for pre-order. Ships ${new Date(data.estimatedShipping).toLocaleDateString()}`;
            } else if (data.isBackorderable) {
                statusClass = 'backorder';
                statusText = 'Backorder';
                statusIcon = 'fas fa-hourglass-half';
                statusMessage = `Available for backorder. Expected restock: ${new Date(data.expectedRestock).toLocaleDateString()}`;
            } else {
                statusClass = 'out-of-stock';
                statusText = 'Out of Stock';
                statusIcon = 'fas fa-times-circle';
                statusMessage = 'Currently unavailable';
            }
        } else if (data.currentStock <= 5) {
            statusClass = 'low-stock';
            statusText = 'Low Stock';
            statusIcon = 'fas fa-exclamation-triangle';
            statusMessage = `Only ${data.currentStock} left in stock`;
        }

        return `
            <div class="stock-status ${statusClass}">
                <div class="status-icon">
                    <i class="${statusIcon}"></i>
                </div>
                <div class="status-info">
                    <h4>${statusText}</h4>
                    <p>${statusMessage}</p>
                    ${data.currentStock > 0 ? `
                        <div class="stock-quantity">
                            <span class="quantity-label">Stock:</span>
                            <span class="quantity-value">${data.currentStock} units</span>
                        </div>
                    ` : ''}
                    ${data.expectedRestock ? `
                        <div class="restock-info">
                            <span class="restock-label">Expected Restock:</span>
                            <span class="restock-date">${new Date(data.expectedRestock).toLocaleDateString()}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Render notification types
     */
    renderNotificationTypes(data, productId, userNotification) {
        const notificationTypes = [
            {
                id: 'restock',
                title: 'Back in Stock',
                description: 'Get notified when this item is back in stock',
                icon: 'fas fa-box',
                enabled: data.notificationSettings.notifyOnRestock,
                available: data.currentStock === 0
            },
            {
                id: 'price_drop',
                title: 'Price Drop',
                description: 'Get notified when the price decreases',
                icon: 'fas fa-tag',
                enabled: data.notificationSettings.notifyOnPriceDrop,
                available: true
            },
            {
                id: 'sale',
                title: 'Special Offers',
                description: 'Get notified about sales and promotions',
                icon: 'fas fa-percentage',
                enabled: data.notificationSettings.notifyOnSale,
                available: true
            },
            {
                id: 'preorder',
                title: 'Pre-Order Available',
                description: 'Get notified when pre-orders become available',
                icon: 'fas fa-clock',
                enabled: true,
                available: data.isPreorderable && !data.isPreorderable
            }
        ];

        return notificationTypes.map(type => `
            <div class="notification-type ${!type.available ? 'unavailable' : ''}">
                <div class="type-header">
                    <div class="type-icon">
                        <i class="${type.icon}"></i>
                    </div>
                    <div class="type-info">
                        <h5>${type.title}</h5>
                        <p>${type.description}</p>
                    </div>
                    <div class="type-toggle">
                        <label class="toggle-switch">
                            <input type="checkbox" 
                                   ${type.enabled && type.available ? 'checked' : ''} 
                                   ${!type.available ? 'disabled' : ''}
                                   data-notification-type="${type.id}">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render notification form
     */
    renderNotificationForm(productId, userNotification) {
        return `
            <div class="notification-form-card">
                <h4>Set Up Notifications</h4>
                <form id="notificationForm" class="notification-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" 
                                   id="email" 
                                   name="email" 
                                   value="${userNotification?.email || ''}"
                                   placeholder="Enter your email address"
                                   required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number (Optional)</label>
                            <input type="tel" 
                                   id="phone" 
                                   name="phone" 
                                   value="${userNotification?.phone || ''}"
                                   placeholder="Enter your phone number">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="notificationMethods">Notification Methods</label>
                        <div class="method-options">
                            <label class="method-option">
                                <input type="checkbox" 
                                       name="methods" 
                                       value="email" 
                                       ${userNotification?.methods?.includes('email') ? 'checked' : 'checked'}>
                                <span class="method-icon"><i class="fas fa-envelope"></i></span>
                                <span class="method-text">Email</span>
                            </label>
                            <label class="method-option">
                                <input type="checkbox" 
                                       name="methods" 
                                       value="sms"
                                       ${userNotification?.methods?.includes('sms') ? 'checked' : ''}>
                                <span class="method-icon"><i class="fas fa-sms"></i></span>
                                <span class="method-text">SMS</span>
                            </label>
                            <label class="method-option">
                                <input type="checkbox" 
                                       name="methods" 
                                       value="push"
                                       ${userNotification?.methods?.includes('push') ? 'checked' : 'checked'}>
                                <span class="method-icon"><i class="fas fa-bell"></i></span>
                                <span class="method-text">Push Notification</span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="frequency">Notification Frequency</label>
                        <select id="frequency" name="frequency">
                            <option value="immediate" ${userNotification?.frequency === 'immediate' ? 'selected' : 'selected'}>Immediate</option>
                            <option value="daily" ${userNotification?.frequency === 'daily' ? 'selected' : ''}>Daily Digest</option>
                            <option value="weekly" ${userNotification?.frequency === 'weekly' ? 'selected' : ''}>Weekly Digest</option>
                        </select>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-bell"></i> Set Up Notifications
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="productAvailabilityNotificationsManager.clearNotifications('${productId}')">
                            <i class="fas fa-times"></i> Clear All
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    /**
     * Render notification history
     */
    renderNotificationHistory(productId) {
        const history = this.getNotificationHistory(productId);
        
        if (history.length === 0) {
            return `
                <div class="notification-history-card">
                    <h4>Notification History</h4>
                    <div class="no-history">
                        <i class="fas fa-history"></i>
                        <p>No notifications sent yet</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="notification-history-card">
                <h4>Notification History</h4>
                <div class="history-list">
                    ${history.map(notification => `
                        <div class="history-item ${notification.status}">
                            <div class="history-icon">
                                <i class="${this.getNotificationIcon(notification.type)}"></i>
                            </div>
                            <div class="history-content">
                                <h5>${notification.title}</h5>
                                <p>${notification.message}</p>
                                <div class="history-meta">
                                    <span class="history-date">${new Date(notification.date).toLocaleDateString()}</span>
                                    <span class="history-method">${notification.method}</span>
                                    <span class="history-status">${notification.status}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Initialize notification handlers
     */
    initializeNotificationHandlers(productId) {
        const form = document.getElementById('notificationForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNotificationSubmit(productId);
            });
        }

        // Handle notification type toggles
        const toggles = document.querySelectorAll('[data-notification-type]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.handleNotificationToggle(productId, e.target.dataset.notificationType, e.target.checked);
            });
        });
    }

    /**
     * Handle notification form submission
     */
    handleNotificationSubmit(productId) {
        const form = document.getElementById('notificationForm');
        const formData = new FormData(form);
        
        const notificationData = {
            productId: productId,
            email: formData.get('email'),
            phone: formData.get('phone'),
            methods: formData.getAll('methods'),
            frequency: formData.get('frequency'),
            createdAt: new Date().toISOString(),
            active: true
        };

        // Save notification settings
        this.saveUserNotification(notificationData);
        
        // Show success message
        this.showNotificationMessage('success', 'Notifications set up successfully! You will be notified when this item is back in stock or goes on sale.');
        
        // Update the form display
        this.renderAvailabilityNotifications(productId, 'availabilityNotifications');
    }

    /**
     * Handle notification toggle
     */
    handleNotificationToggle(productId, type, enabled) {
        const userNotification = this.getUserNotification(productId);
        if (userNotification) {
            userNotification.settings = userNotification.settings || {};
            userNotification.settings[type] = enabled;
            this.saveUserNotification(userNotification);
        }
    }

    /**
     * Clear all notifications
     */
    clearNotifications(productId) {
        if (confirm('Are you sure you want to clear all notifications for this product?')) {
            this.userNotifications = this.userNotifications.filter(n => n.productId !== productId);
            localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
            this.renderAvailabilityNotifications(productId, 'availabilityNotifications');
            this.showNotificationMessage('info', 'All notifications cleared for this product.');
        }
    }

    /**
     * Show notification message
     */
    showNotificationMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `notification-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(messageDiv);

        // Show message
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);

        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 5000);
    }

    /**
     * Get user notification for product
     */
    getUserNotification(productId) {
        return this.userNotifications.find(n => n.productId === productId);
    }

    /**
     * Save user notification
     */
    saveUserNotification(notificationData) {
        const existingIndex = this.userNotifications.findIndex(n => n.productId === notificationData.productId);
        
        if (existingIndex >= 0) {
            this.userNotifications[existingIndex] = notificationData;
        } else {
            this.userNotifications.push(notificationData);
        }
        
        localStorage.setItem('userNotifications', JSON.stringify(this.userNotifications));
    }

    /**
     * Get notification history for product
     */
    getNotificationHistory(productId) {
        // Mock notification history
        return [
            {
                type: 'restock',
                title: 'Back in Stock Notification',
                message: 'This item is now back in stock and available for purchase.',
                date: '2024-01-10',
                method: 'Email',
                status: 'sent'
            },
            {
                type: 'price_drop',
                title: 'Price Drop Alert',
                message: 'The price of this item has decreased by 15%.',
                date: '2024-01-08',
                method: 'Push',
                status: 'sent'
            },
            {
                type: 'sale',
                title: 'Special Offer',
                message: 'This item is now on sale with 20% off.',
                date: '2024-01-05',
                method: 'Email',
                status: 'sent'
            }
        ];
    }

    /**
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            'restock': 'fas fa-box',
            'price_drop': 'fas fa-tag',
            'sale': 'fas fa-percentage',
            'preorder': 'fas fa-clock'
        };
        return icons[type] || 'fas fa-bell';
    }

    /**
     * Check if user has notifications set up
     */
    hasNotifications(productId) {
        return this.getUserNotification(productId) !== undefined;
    }

    /**
     * Get notification count for user
     */
    getNotificationCount() {
        return this.userNotifications.length;
    }

    /**
     * Simulate sending notifications (for demo purposes)
     */
    simulateNotification(productId, type, message) {
        const userNotification = this.getUserNotification(productId);
        if (userNotification && userNotification.active) {
            // In a real application, this would send actual notifications
            console.log(`Sending ${type} notification to ${userNotification.email}: ${message}`);
            
            // Add to history
            const historyItem = {
                type: type,
                title: this.getNotificationTitle(type),
                message: message,
                date: new Date().toISOString(),
                method: userNotification.methods[0] || 'Email',
                status: 'sent'
            };
            
            // This would typically be stored in a database
            console.log('Notification sent:', historyItem);
        }
    }

    /**
     * Get notification title
     */
    getNotificationTitle(type) {
        const titles = {
            'restock': 'Back in Stock Notification',
            'price_drop': 'Price Drop Alert',
            'sale': 'Special Offer',
            'preorder': 'Pre-Order Available'
        };
        return titles[type] || 'Product Notification';
    }
}

// Initialize the manager
const productAvailabilityNotificationsManager = new ProductAvailabilityNotificationsManager();

// Global functions for notification interactions
window.clearNotifications = (productId) => productAvailabilityNotificationsManager.clearNotifications(productId);

