/**
 * Loading States and Skeleton Loaders Utility
 * Provides functions to show/hide loading states throughout the application
 */

class LoadingManager {
    constructor() {
        this.activeLoaders = new Set();
        this.loadingOverlay = null;
        this.pageLoader = null;
    }

    /**
     * Show page loading overlay
     */
    showPageLoader(message = 'Loading...') {
        if (this.pageLoader) return;

        this.pageLoader = document.createElement('div');
        this.pageLoader.className = 'page-loading';
        this.pageLoader.innerHTML = `
            <div class="loading-logo">🛍️</div>
            <div class="loading-text">${message}</div>
            <div class="loading-progress">
                <div class="loading-progress-bar"></div>
            </div>
        `;

        document.body.appendChild(this.pageLoader);
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hide page loading overlay
     */
    hidePageLoader() {
        if (this.pageLoader) {
            this.pageLoader.remove();
            this.pageLoader = null;
            document.body.style.overflow = '';
        }
    }

    /**
     * Show loading overlay with custom content
     */
    showLoadingOverlay(title, message = '') {
        if (this.loadingOverlay) return;

        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="loading-content">
                <h3>${title}</h3>
                ${message ? `<p>${message}</p>` : ''}
                <div class="loading-spinner loading-spinner-large loading-spinner-brown"></div>
            </div>
        `;

        document.body.appendChild(this.loadingOverlay);
    }

    /**
     * Hide loading overlay
     */
    hideLoadingOverlay() {
        if (this.loadingOverlay) {
            this.loadingOverlay.remove();
            this.loadingOverlay = null;
        }
    }

    /**
     * Show skeleton loader for product grid
     */
    showProductSkeleton(container, count = 8) {
        const skeletonHTML = Array.from({ length: count }, () => `
            <div class="product-skeleton">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-price"></div>
                <div class="skeleton skeleton-rating"></div>
                <div class="skeleton skeleton-button"></div>
            </div>
        `).join('');

        container.innerHTML = skeletonHTML;
        container.classList.add('content-loading');
    }

    /**
     * Show skeleton loader for category grid
     */
    showCategorySkeleton(container, count = 6) {
        const skeletonHTML = Array.from({ length: count }, () => `
            <div class="category-skeleton">
                <div class="skeleton skeleton-icon"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-description"></div>
                <div class="skeleton skeleton-description"></div>
            </div>
        `).join('');

        container.innerHTML = skeletonHTML;
        container.classList.add('content-loading');
    }

    /**
     * Show skeleton loader for table
     */
    showTableSkeleton(container, rows = 5) {
        const skeletonHTML = `
            <div class="table-skeleton">
                <div class="skeleton skeleton-header"></div>
                ${Array.from({ length: rows }, () => '<div class="skeleton skeleton-row"></div>').join('')}
            </div>
        `;

        container.innerHTML = skeletonHTML;
        container.classList.add('content-loading');
    }

    /**
     * Hide skeleton loader and show content
     */
    hideSkeleton(container) {
        container.classList.remove('content-loading');
    }

    /**
     * Set button loading state
     */
    setButtonLoading(button, loading = true) {
        if (loading) {
            button.classList.add('btn-loading');
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Loading...';
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
                delete button.dataset.originalText;
            }
        }
    }

    /**
     * Set form loading state
     */
    setFormLoading(form, loading = true) {
        if (loading) {
            form.classList.add('form-loading');
            const inputs = form.querySelectorAll('input, button, select, textarea');
            inputs.forEach(input => input.disabled = true);
        } else {
            form.classList.remove('form-loading');
            const inputs = form.querySelectorAll('input, button, select, textarea');
            inputs.forEach(input => input.disabled = false);
        }
    }

    /**
     * Set search loading state
     */
    setSearchLoading(searchContainer, loading = true) {
        if (loading) {
            searchContainer.classList.add('search-loading');
        } else {
            searchContainer.classList.remove('search-loading');
        }
    }

    /**
     * Show loading spinner in element
     */
    showSpinner(element, size = 'normal') {
        const spinner = document.createElement('div');
        spinner.className = `loading-spinner ${size === 'large' ? 'loading-spinner-large' : ''}`;
        element.appendChild(spinner);
        return spinner;
    }

    /**
     * Hide loading spinner
     */
    hideSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    /**
     * Simulate loading with progress
     */
    simulateLoading(duration = 2000, onProgress = null, onComplete = null) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (onProgress) {
                onProgress(progress);
            }
            
            if (progress >= 1) {
                clearInterval(interval);
                if (onComplete) {
                    onComplete();
                }
            }
        }, 50);
        
        return interval;
    }

    /**
     * Show loading state for AJAX requests
     */
    showAjaxLoading(container, message = 'Loading...') {
        const loaderId = `ajax-loader-${Date.now()}`;
        this.activeLoaders.add(loaderId);
        
        const loader = document.createElement('div');
        loader.id = loaderId;
        loader.className = 'ajax-loading';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner loading-spinner-large loading-spinner-brown"></div>
                <p>${message}</p>
            </div>
        `;
        
        container.appendChild(loader);
        return loaderId;
    }

    /**
     * Hide AJAX loading state
     */
    hideAjaxLoading(loaderId) {
        const loader = document.getElementById(loaderId);
        if (loader) {
            loader.remove();
            this.activeLoaders.delete(loaderId);
        }
    }

    /**
     * Hide all active loaders
     */
    hideAllLoaders() {
        this.hidePageLoader();
        this.hideLoadingOverlay();
        
        this.activeLoaders.forEach(loaderId => {
            this.hideAjaxLoading(loaderId);
        });
        
        this.activeLoaders.clear();
    }
}

// Create global instance
window.loadingManager = new LoadingManager();

// Add CSS for AJAX loading
const ajaxLoadingCSS = `
.ajax-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border-radius: 10px;
}

.ajax-loading .loading-content {
    text-align: center;
    color: var(--primary-black);
}

.ajax-loading .loading-content p {
    margin-top: 1rem;
    color: var(--medium-gray);
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = ajaxLoadingCSS;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingManager;
}
