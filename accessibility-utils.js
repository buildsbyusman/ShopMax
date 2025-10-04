/**
 * Accessibility Utilities
 * Provides keyboard navigation, ARIA management, and screen reader support
 */

class AccessibilityManager {
    constructor() {
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        this.modalStack = [];
        this.previousFocus = null;
        this.init();
    }

    /**
     * Initialize accessibility features
     */
    init() {
        this.setupKeyboardNavigation();
        this.setupARIA();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
        this.setupSkipLinks();
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Handle Escape key for modals and overlays
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });

        // Handle Tab key for focus trapping
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabKey(e);
            }
        });

        // Handle Enter and Space for custom interactive elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.handleActivationKey(e);
            }
        });
    }

    /**
     * Setup ARIA attributes
     */
    setupARIA() {
        // Add ARIA labels to interactive elements without text
        this.addAriaLabels();
        
        // Setup live regions for dynamic content
        this.setupLiveRegions();
        
        // Setup landmarks
        this.setupLandmarks();
    }

    /**
     * Add ARIA labels to elements
     */
    addAriaLabels() {
        // Cart icon
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon && !cartIcon.getAttribute('aria-label')) {
            cartIcon.setAttribute('aria-label', 'Shopping cart');
        }

        // Wishlist icon
        const wishlistIcon = document.querySelector('.wishlist-icon');
        if (wishlistIcon && !wishlistIcon.getAttribute('aria-label')) {
            wishlistIcon.setAttribute('aria-label', 'Wishlist');
        }

        // Search button
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn && !searchBtn.getAttribute('aria-label')) {
            searchBtn.setAttribute('aria-label', 'Search products');
        }

        // Close buttons
        const closeBtns = document.querySelectorAll('.close-btn, .modal-close');
        closeBtns.forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'Close');
            }
        });

        // Product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            if (!card.getAttribute('aria-label')) {
                const title = card.querySelector('.product-title')?.textContent || `Product ${index + 1}`;
                card.setAttribute('aria-label', `View details for ${title}`);
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
            }
        });
    }

    /**
     * Setup live regions for screen readers
     */
    setupLiveRegions() {
        // Create live region for notifications
        if (!document.getElementById('live-region-notifications')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region-notifications';
            liveRegion.className = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        // Create live region for cart updates
        if (!document.getElementById('live-region-cart')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region-cart';
            liveRegion.className = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }

        // Create live region for search results
        if (!document.getElementById('live-region-search')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region-search';
            liveRegion.className = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(liveRegion);
        }
    }

    /**
     * Setup landmarks
     */
    setupLandmarks() {
        // Add main landmark
        const main = document.querySelector('main');
        if (main && !main.getAttribute('role')) {
            main.setAttribute('role', 'main');
        }

        // Add navigation landmarks
        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => {
            if (!nav.getAttribute('role')) {
                nav.setAttribute('role', 'navigation');
            }
        });

        // Add header landmark
        const header = document.querySelector('header');
        if (header && !header.getAttribute('role')) {
            header.setAttribute('role', 'banner');
        }

        // Add footer landmark
        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Track focus changes
        document.addEventListener('focusin', (e) => {
            this.previousFocus = e.target;
        });

        // Handle focus restoration
        window.addEventListener('beforeunload', () => {
            this.saveFocusState();
        });
    }

    /**
     * Setup skip links
     */
    setupSkipLinks() {
        // Add skip to main content link
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Add skip to navigation link
        if (!document.querySelector('.skip-nav')) {
            const skipNav = document.createElement('a');
            skipNav.href = '#main-navigation';
            skipNav.className = 'skip-link skip-nav';
            skipNav.textContent = 'Skip to navigation';
            document.body.insertBefore(skipNav, document.querySelector('.skip-link'));
        }
    }

    /**
     * Handle Escape key
     */
    handleEscapeKey() {
        // Close topmost modal
        if (this.modalStack.length > 0) {
            const topModal = this.modalStack[this.modalStack.length - 1];
            this.closeModal(topModal);
        }
        // Close cart sidebar
        else if (document.getElementById('cartSidebar')?.classList.contains('open')) {
            this.closeCartSidebar();
        }
        // Close wishlist sidebar
        else if (document.getElementById('wishlistSidebar')?.classList.contains('open')) {
            this.closeWishlistSidebar();
        }
    }

    /**
     * Handle Tab key for focus trapping
     */
    handleTabKey(e) {
        const activeModal = this.getActiveModal();
        if (activeModal) {
            this.trapFocus(e, activeModal);
        }
    }

    /**
     * Handle Enter and Space keys
     */
    handleActivationKey(e) {
        const target = e.target;
        
        // Handle product cards
        if (target.classList.contains('product-card')) {
            e.preventDefault();
            const link = target.querySelector('a');
            if (link) {
                link.click();
            }
        }
        
        // Handle custom buttons
        if (target.getAttribute('role') === 'button' && !target.tagName.toLowerCase() === 'button') {
            e.preventDefault();
            target.click();
        }
    }

    /**
     * Trap focus within modal
     */
    trapFocus(e, modal) {
        const focusableElements = modal.querySelectorAll(this.focusableElements);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Open modal with accessibility features
     */
    openModal(modal) {
        this.previousFocus = document.activeElement;
        this.modalStack.push(modal);
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('aria-modal', 'true');
        
        // Focus first focusable element
        const firstFocusable = modal.querySelector(this.focusableElements);
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        // Hide other content from screen readers
        this.hideContentFromScreenReaders();
    }

    /**
     * Close modal with accessibility features
     */
    closeModal(modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        
        this.modalStack.pop();
        
        // Restore focus
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
        
        // Show content to screen readers
        this.showContentToScreenReaders();
    }

    /**
     * Get active modal
     */
    getActiveModal() {
        return this.modalStack[this.modalStack.length - 1] || null;
    }

    /**
     * Hide content from screen readers
     */
    hideContentFromScreenReaders() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Show content to screen readers
     */
    showContentToScreenReaders() {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
    }

    /**
     * Announce message to screen readers
     */
    announce(message, priority = 'polite') {
        const liveRegion = document.getElementById('live-region-notifications');
        if (liveRegion) {
            liveRegion.setAttribute('aria-live', priority);
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Announce cart update
     */
    announceCartUpdate(message) {
        const liveRegion = document.getElementById('live-region-cart');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Announce search results
     */
    announceSearchResults(count, query) {
        const liveRegion = document.getElementById('live-region-search');
        if (liveRegion) {
            const message = count > 0 
                ? `Found ${count} results for "${query}"`
                : `No results found for "${query}"`;
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 2000);
        }
    }

    /**
     * Setup tab navigation
     */
    setupTabNavigation(container) {
        const tabList = container.querySelector('.tab-list');
        const tabPanels = container.querySelectorAll('.tab-panel');
        
        if (!tabList) return;
        
        const tabs = tabList.querySelectorAll('.tab-button');
        
        tabs.forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            tab.setAttribute('aria-controls', `tab-panel-${index}`);
            
            tab.addEventListener('click', () => {
                this.activateTab(tabs, tabPanels, index);
            });
            
            tab.addEventListener('keydown', (e) => {
                this.handleTabKeyNavigation(e, tabs, index);
            });
        });
        
        tabPanels.forEach((panel, index) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('id', `tab-panel-${index}`);
            panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });
    }

    /**
     * Activate tab
     */
    activateTab(tabs, tabPanels, activeIndex) {
        tabs.forEach((tab, index) => {
            const isActive = index === activeIndex;
            tab.setAttribute('aria-selected', isActive);
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
            tab.classList.toggle('active', isActive);
        });
        
        tabPanels.forEach((panel, index) => {
            const isActive = index === activeIndex;
            panel.setAttribute('aria-hidden', !isActive);
            panel.style.display = isActive ? 'block' : 'none';
        });
    }

    /**
     * Handle tab key navigation
     */
    handleTabKeyNavigation(e, tabs, currentIndex) {
        let newIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = tabs.length - 1;
                break;
        }
        
        if (newIndex !== currentIndex) {
            tabs[newIndex].focus();
            this.activateTab(tabs, document.querySelectorAll('.tab-panel'), newIndex);
        }
    }

    /**
     * Close cart sidebar
     */
    closeCartSidebar() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
            if (this.previousFocus) {
                this.previousFocus.focus();
            }
        }
    }

    /**
     * Close wishlist sidebar
     */
    closeWishlistSidebar() {
        const wishlistSidebar = document.getElementById('wishlistSidebar');
        if (wishlistSidebar) {
            wishlistSidebar.classList.remove('open');
            if (this.previousFocus) {
                this.previousFocus.focus();
            }
        }
    }

    /**
     * Save focus state
     */
    saveFocusState() {
        if (this.previousFocus) {
            localStorage.setItem('lastFocusedElement', this.previousFocus.id || this.previousFocus.className);
        }
    }

    /**
     * Restore focus state
     */
    restoreFocusState() {
        const lastFocused = localStorage.getItem('lastFocusedElement');
        if (lastFocused) {
            const element = document.getElementById(lastFocused) || document.querySelector(`.${lastFocused}`);
            if (element) {
                element.focus();
            }
        }
    }

    /**
     * Setup form accessibility
     */
    setupFormAccessibility(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add required indicator
            if (input.hasAttribute('required')) {
                const label = form.querySelector(`label[for="${input.id}"]`);
                if (label && !label.querySelector('.required-indicator')) {
                    const indicator = document.createElement('span');
                    indicator.className = 'required-indicator';
                    indicator.textContent = ' *';
                    indicator.setAttribute('aria-label', 'required');
                    label.appendChild(indicator);
                }
            }
            
            // Add help text
            if (input.hasAttribute('aria-describedby')) {
                const helpId = input.getAttribute('aria-describedby');
                const helpElement = document.getElementById(helpId);
                if (helpElement) {
                    helpElement.setAttribute('role', 'note');
                }
            }
        });
    }

    /**
     * Setup product grid accessibility
     */
    setupProductGridAccessibility(container) {
        const productCards = container.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            // Add grid role
            if (!container.getAttribute('role')) {
                container.setAttribute('role', 'grid');
            }
            
            // Add gridcell role to cards
            card.setAttribute('role', 'gridcell');
            card.setAttribute('aria-rowindex', Math.floor(index / 4) + 1);
            card.setAttribute('aria-colindex', (index % 4) + 1);
        });
    }
}

// Create global instance
window.accessibilityManager = new AccessibilityManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
