/**
 * Enhanced Error Handling and User Feedback System
 * Provides comprehensive error handling, user notifications, and fallback states
 */

class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.notificationContainer = null;
        this.init();
    }

    /**
     * Initialize error handler
     */
    init() {
        this.createNotificationContainer();
        this.setupGlobalErrorHandlers();
        this.setupNetworkErrorHandling();
    }

    /**
     * Create notification container
     */
    createNotificationContainer() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.id = 'notification-container';
        this.notificationContainer.className = 'notification-container';
        document.body.appendChild(this.notificationContainer);
    }

    /**
     * Setup global error handlers
     */
    setupGlobalErrorHandlers() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });

        // Handle global JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'JavaScript Error', {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        // Handle resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError(event.target);
            }
        }, true);
    }

    /**
     * Setup network error handling
     */
    setupNetworkErrorHandling() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            this.showNotification('Connection restored!', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are offline. Some features may not work.', 'warning');
        });
    }

    /**
     * Handle general errors
     */
    handleError(error, type = 'Error', context = {}) {
        const errorInfo = {
            message: error?.message || error?.toString() || 'Unknown error',
            type: type,
            timestamp: new Date().toISOString(),
            context: context,
            stack: error?.stack,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        this.errorLog.push(errorInfo);
        console.error('Error handled:', errorInfo);

        // Show user-friendly error message
        this.showUserFriendlyError(errorInfo);
    }

    /**
     * Handle resource loading errors
     */
    handleResourceError(element) {
        const resourceType = element.tagName.toLowerCase();
        const src = element.src || element.href || 'unknown';
        
        this.handleError(
            new Error(`Failed to load ${resourceType}: ${src}`),
            'Resource Loading Error',
            { resourceType, src }
        );

        // Show fallback for images
        if (resourceType === 'img') {
            this.showImageFallback(element);
        }
    }

    /**
     * Show image fallback
     */
    showImageFallback(imgElement) {
        imgElement.style.display = 'none';
        
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.innerHTML = `
            <div class="fallback-icon">📷</div>
            <div class="fallback-text">Image not available</div>
        `;
        
        imgElement.parentNode.insertBefore(fallback, imgElement);
    }

    /**
     * Show user-friendly error message
     */
    showUserFriendlyError(errorInfo) {
        let message = 'Something went wrong. Please try again.';
        let type = 'error';

        // Customize message based on error type
        switch (errorInfo.type) {
            case 'Network Error':
            case 'Fetch Error':
                message = 'Network connection failed. Please check your internet connection.';
                type = 'warning';
                break;
            case 'Resource Loading Error':
                message = 'Some content failed to load. The page may not display correctly.';
                type = 'warning';
                break;
            case 'Validation Error':
                message = errorInfo.message;
                type = 'error';
                break;
            case 'Authentication Error':
                message = 'Please log in to continue.';
                type = 'warning';
                break;
            case 'Permission Error':
                message = 'You don\'t have permission to perform this action.';
                type = 'error';
                break;
        }

        this.showNotification(message, type, 5000);
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${this.getNotificationIcon(type)}</div>
                <div class="notification-message">${message}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        this.notificationContainer.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    /**
     * Get notification icon
     */
    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * Handle form validation errors
     */
    handleFormErrors(form, errors) {
        // Clear previous errors
        this.clearFormErrors(form);

        // Show field-specific errors
        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldError(field, errors[fieldName]);
            }
        });

        // Show general form error
        if (errors.general) {
            this.showNotification(errors.general, 'error');
        }
    }

    /**
     * Show field error
     */
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    /**
     * Clear form errors
     */
    clearFormErrors(form) {
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        const errorMessages = form.querySelectorAll('.field-error');
        errorMessages.forEach(message => message.remove());
    }

    /**
     * Handle API errors
     */
    handleApiError(response, context = '') {
        const errorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            context: context
        };

        let message = 'An error occurred while processing your request.';
        let type = 'error';

        switch (response.status) {
            case 400:
                message = 'Invalid request. Please check your input.';
                break;
            case 401:
                message = 'Please log in to continue.';
                type = 'warning';
                break;
            case 403:
                message = 'You don\'t have permission to perform this action.';
                break;
            case 404:
                message = 'The requested resource was not found.';
                break;
            case 429:
                message = 'Too many requests. Please wait a moment and try again.';
                type = 'warning';
                break;
            case 500:
                message = 'Server error. Please try again later.';
                break;
            case 503:
                message = 'Service temporarily unavailable. Please try again later.';
                type = 'warning';
                break;
        }

        this.showNotification(message, type);
        this.handleError(new Error(`API Error: ${response.status} ${response.statusText}`), 'API Error', errorInfo);
    }

    /**
     * Handle network errors
     */
    handleNetworkError(error, context = '') {
        let message = 'Network connection failed. Please check your internet connection.';
        let type = 'warning';

        if (error.name === 'AbortError') {
            message = 'Request was cancelled.';
            type = 'info';
        } else if (error.name === 'TimeoutError') {
            message = 'Request timed out. Please try again.';
        }

        this.showNotification(message, type);
        this.handleError(error, 'Network Error', { context });
    }

    /**
     * Show fallback content
     */
    showFallback(container, type, options = {}) {
        const fallbackHTML = this.getFallbackHTML(type, options);
        container.innerHTML = fallbackHTML;
    }

    /**
     * Get fallback HTML
     */
    getFallbackHTML(type, options = {}) {
        const fallbacks = {
            products: `
                <div class="fallback-content">
                    <div class="fallback-icon">📦</div>
                    <h3>No products found</h3>
                    <p>We couldn't find any products matching your criteria.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Try Again</button>
                </div>
            `,
            search: `
                <div class="fallback-content">
                    <div class="fallback-icon">🔍</div>
                    <h3>Search failed</h3>
                    <p>We couldn't complete your search. Please try again.</p>
                    <button class="btn btn-primary" onclick="document.querySelector('.search-form').submit()">Search Again</button>
                </div>
            `,
            cart: `
                <div class="fallback-content">
                    <div class="fallback-icon">🛒</div>
                    <h3>Cart unavailable</h3>
                    <p>We couldn't load your cart. Please refresh the page.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Refresh</button>
                </div>
            `,
            checkout: `
                <div class="fallback-content">
                    <div class="fallback-icon">💳</div>
                    <h3>Checkout unavailable</h3>
                    <p>We couldn't load the checkout page. Please try again.</p>
                    <button class="btn btn-primary" onclick="window.location.href='/cart.html'">Back to Cart</button>
                </div>
            `,
            generic: `
                <div class="fallback-content">
                    <div class="fallback-icon">⚠️</div>
                    <h3>Something went wrong</h3>
                    <p>We encountered an error. Please try again.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Reload Page</button>
                </div>
            `
        };

        return fallbacks[type] || fallbacks.generic;
    }

    /**
     * Retry failed operation
     */
    async retryOperation(operation, maxRetries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                if (attempt === maxRetries) {
                    throw error;
                }
                
                this.showNotification(`Attempt ${attempt} failed. Retrying...`, 'warning', 1000);
                await this.delay(delay * attempt);
            }
        }
    }

    /**
     * Delay utility
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get error log
     */
    getErrorLog() {
        return this.errorLog;
    }

    /**
     * Clear error log
     */
    clearErrorLog() {
        this.errorLog = [];
    }

    /**
     * Export error log
     */
    exportErrorLog() {
        const dataStr = JSON.stringify(this.errorLog, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `error-log-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// Create global instance
window.errorHandler = new ErrorHandler();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}
