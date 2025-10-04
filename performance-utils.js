/**
 * Performance Optimization Utilities
 * Provides lazy loading, image optimization, and performance monitoring
 */

class PerformanceManager {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        this.imageObserver = null;
        this.scriptObserver = null;
        this.loadedImages = new Set();
        this.init();
    }

    /**
     * Initialize performance features
     */
    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupResourcePreloading();
        this.setupPerformanceMonitoring();
        this.optimizeAnimations();
    }

    /**
     * Setup lazy loading for images and content
     */
    setupLazyLoading() {
        // Create intersection observer for lazy loading
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });

        // Setup lazy loading for background images
        const lazyBackgrounds = document.querySelectorAll('[data-bg]');
        lazyBackgrounds.forEach(element => {
            this.imageObserver.observe(element);
        });
    }

    /**
     * Load image with optimization
     */
    loadImage(img) {
        const src = img.dataset.src;
        if (!src || this.loadedImages.has(src)) return;

        // Create optimized image
        const optimizedImg = new Image();
        optimizedImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            this.loadedImages.add(src);
            
            // Remove loading placeholder
            const placeholder = img.parentNode.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
        };
        
        optimizedImg.onerror = () => {
            this.handleImageError(img);
        };
        
        optimizedImg.src = src;
    }

    /**
     * Handle image loading errors
     */
    handleImageError(img) {
        img.classList.add('error');
        
        // Show fallback image
        const fallback = img.dataset.fallback || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        img.src = fallback;
        
        if (window.errorHandler) {
            window.errorHandler.handleError(
                new Error(`Failed to load image: ${img.dataset.src}`),
                'Image Loading Error'
            );
        }
    }

    /**
     * Setup image optimization
     */
    setupImageOptimization() {
        // Add loading states to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.src && !img.dataset.src) return;
            
            // Add loading placeholder
            if (!img.classList.contains('loaded')) {
                this.addImagePlaceholder(img);
            }
            
            // Optimize image attributes
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
    }

    /**
     * Add image placeholder
     */
    addImagePlaceholder(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="loading-spinner"></div>
                <span>Loading image...</span>
            </div>
        `;
        
        img.parentNode.insertBefore(placeholder, img);
        img.style.display = 'none';
    }

    /**
     * Setup resource preloading
     */
    setupResourcePreloading() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Preload next page resources on hover
        this.setupHoverPreloading();
        
        // Preload images in viewport
        this.preloadVisibleImages();
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'css/style.css', as: 'style' },
            { href: 'js/main.js', as: 'script' },
            { href: 'js/cart.js', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    /**
     * Setup hover preloading
     */
    setupHoverPreloading() {
        const navLinks = document.querySelectorAll('nav a[href]');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.preloadPage(link.href);
            }, { once: true });
        });
    }

    /**
     * Preload page resources
     */
    preloadPage(url) {
        // Only preload internal pages
        if (!url.includes(window.location.origin)) return;
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    /**
     * Preload visible images
     */
    preloadVisibleImages() {
        const visibleImages = document.querySelectorAll('img[src]:not([data-preloaded])');
        visibleImages.forEach(img => {
            if (this.isInViewport(img)) {
                this.preloadImage(img.src);
                img.setAttribute('data-preloaded', 'true');
            }
        });
    }

    /**
     * Preload image
     */
    preloadImage(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    }

    /**
     * Check if element is in viewport
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.monitorCoreWebVitals();
        
        // Monitor resource loading
        this.monitorResourceLoading();
        
        // Monitor user interactions
        this.monitorUserInteractions();
    }

    /**
     * Monitor Core Web Vitals
     */
    monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    /**
     * Monitor resource loading
     */
    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
            
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            if (slowResources.length > 0) {
                console.warn('Slow resources:', slowResources);
            }
        });
    }

    /**
     * Monitor user interactions
     */
    monitorUserInteractions() {
        let interactionCount = 0;
        const interactions = ['click', 'keydown', 'scroll'];
        
        interactions.forEach(event => {
            document.addEventListener(event, () => {
                interactionCount++;
                if (interactionCount === 1) {
                    console.log('Time to Interactive:', performance.now());
                }
            }, { once: true });
        });
    }

    /**
     * Optimize animations
     */
    optimizeAnimations() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }
        
        // Use transform and opacity for better performance
        const animatedElements = document.querySelectorAll('[class*="animate"]');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    /**
     * Debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function calls
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Optimize scroll events
     */
    optimizeScrollEvents() {
        const scrollHandler = this.throttle(() => {
            // Handle scroll events efficiently
            this.handleScroll();
        }, 16); // ~60fps
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        // Update scroll position indicators
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    /**
     * Optimize resize events
     */
    optimizeResizeEvents() {
        const resizeHandler = this.debounce(() => {
            this.handleResize();
        }, 250);
        
        window.addEventListener('resize', resizeHandler);
    }

    /**
     * Handle resize events
     */
    handleResize() {
        // Recalculate layouts
        this.recalculateLayouts();
        
        // Update responsive images
        this.updateResponsiveImages();
    }

    /**
     * Recalculate layouts
     */
    recalculateLayouts() {
        // Force reflow for elements that need it
        const elements = document.querySelectorAll('.needs-reflow');
        elements.forEach(element => {
            element.offsetHeight; // Force reflow
        });
    }

    /**
     * Update responsive images
     */
    updateResponsiveImages() {
        const responsiveImages = document.querySelectorAll('img[data-srcset]');
        responsiveImages.forEach(img => {
            const srcset = img.dataset.srcset;
            if (srcset) {
                img.srcset = srcset;
            }
        });
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        
        if (this.scriptObserver) {
            this.scriptObserver.disconnect();
        }
    }
}

// Create global instance
window.performanceManager = new PerformanceManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.performanceManager.init();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    window.performanceManager.cleanup();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceManager;
}
