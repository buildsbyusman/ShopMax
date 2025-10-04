// Advanced Search System with Filters, Sorting, and Faceted Search

class AdvancedSearchManager {
    constructor() {
        this.searchResults = [];
        this.filteredResults = [];
        this.currentFilters = {
            query: '',
            category: '',
            priceRange: { min: 0, max: 1000 },
            rating: 0,
            brand: '',
            availability: 'all',
            features: [],
            colors: [],
            sizes: [],
            materials: [],
            sortBy: 'relevance',
            sortOrder: 'desc'
        };
        this.facetCounts = {};
        this.searchHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
        this.savedSearches = JSON.parse(localStorage.getItem('saved_searches') || '[]');
        this.initializeSearchData();
    }
    
    // Initialize search data and facets
    initializeSearchData() {
        this.allProducts = this.getAllProducts();
        this.brands = this.extractBrands();
        this.categories = this.extractCategories();
        this.features = this.extractFeatures();
        this.colors = this.extractColors();
        this.sizes = this.extractSizes();
        this.materials = this.extractMaterials();
    }
    
    // Get all products from various sources
    getAllProducts() {
        let products = [];
        
        // Add CJ products
        if (window.cjProductsManager) {
            products = products.concat(window.cjProductsManager.products);
        }
        
        // Add main products
        if (window.ShopMax?.products) {
            products = products.concat(window.ShopMax.products);
        }
        
        // Add bundle products
        if (window.bundlesManager) {
            window.bundlesManager.bundles.forEach(bundle => {
                bundle.products.forEach(productId => {
                    const product = this.getProductById(productId);
                    if (product) {
                        products.push({
                            ...product,
                            bundleId: bundle.id,
                            bundleName: bundle.name
                        });
                    }
                });
            });
        }
        
        return products;
    }
    
    // Extract unique brands
    extractBrands() {
        const brands = new Set();
        this.allProducts.forEach(product => {
            if (product.brand) {
                brands.add(product.brand);
            }
        });
        return Array.from(brands).sort();
    }
    
    // Extract unique categories
    extractCategories() {
        const categories = new Set();
        this.allProducts.forEach(product => {
            if (product.category) {
                categories.add(product.category);
            }
        });
        return Array.from(categories).sort();
    }
    
    // Extract unique features
    extractFeatures() {
        const features = new Set();
        this.allProducts.forEach(product => {
            if (product.features) {
                product.features.forEach(feature => features.add(feature));
            }
        });
        return Array.from(features).sort();
    }
    
    // Extract unique colors
    extractColors() {
        const colors = new Set();
        this.allProducts.forEach(product => {
            if (product.colors) {
                product.colors.forEach(color => colors.add(color));
            }
        });
        return Array.from(colors).sort();
    }
    
    // Extract unique sizes
    extractSizes() {
        const sizes = new Set();
        this.allProducts.forEach(product => {
            if (product.sizes) {
                product.sizes.forEach(size => sizes.add(size));
            }
        });
        return Array.from(sizes).sort();
    }
    
    // Extract unique materials
    extractMaterials() {
        const materials = new Set();
        this.allProducts.forEach(product => {
            if (product.materials) {
                product.materials.forEach(material => materials.add(material));
            }
        });
        return Array.from(materials).sort();
    }
    
    // Perform advanced search
    performSearch(query = '', filters = {}) {
        this.currentFilters.query = query;
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        let results = [...this.allProducts];
        
        // Text search
        if (query.trim()) {
            const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
            results = results.filter(product => {
                const searchableText = [
                    product.title,
                    product.description,
                    product.category,
                    product.brand,
                    product.features?.join(' '),
                    product.tags?.join(' ')
                ].join(' ').toLowerCase();
                
                return searchTerms.every(term => searchableText.includes(term));
            });
        }
        
        // Apply filters
        results = this.applyFilters(results);
        
        // Sort results
        results = this.sortResults(results);
        
        this.searchResults = results;
        this.filteredResults = results;
        this.updateFacetCounts();
        
        // Save to search history
        this.saveToSearchHistory(query, results.length);
        
        return results;
    }
    
    // Apply all filters
    applyFilters(products) {
        let filtered = [...products];
        
        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(product => product.category === this.currentFilters.category);
        }
        
        // Price range filter
        if (this.currentFilters.priceRange.min > 0 || this.currentFilters.priceRange.max < 1000) {
            filtered = filtered.filter(product => {
                const price = product.price || 0;
                return price >= this.currentFilters.priceRange.min && price <= this.currentFilters.priceRange.max;
            });
        }
        
        // Rating filter
        if (this.currentFilters.rating > 0) {
            filtered = filtered.filter(product => (product.rating || 0) >= this.currentFilters.rating);
        }
        
        // Brand filter
        if (this.currentFilters.brand) {
            filtered = filtered.filter(product => product.brand === this.currentFilters.brand);
        }
        
        // Availability filter
        if (this.currentFilters.availability !== 'all') {
            if (this.currentFilters.availability === 'in_stock') {
                filtered = filtered.filter(product => product.inStock);
            } else if (this.currentFilters.availability === 'out_of_stock') {
                filtered = filtered.filter(product => !product.inStock);
            }
        }
        
        // Features filter
        if (this.currentFilters.features.length > 0) {
            filtered = filtered.filter(product => {
                return this.currentFilters.features.every(feature => 
                    product.features && product.features.includes(feature)
                );
            });
        }
        
        // Colors filter
        if (this.currentFilters.colors.length > 0) {
            filtered = filtered.filter(product => {
                return this.currentFilters.colors.some(color => 
                    product.colors && product.colors.includes(color)
                );
            });
        }
        
        // Sizes filter
        if (this.currentFilters.sizes.length > 0) {
            filtered = filtered.filter(product => {
                return this.currentFilters.sizes.some(size => 
                    product.sizes && product.sizes.includes(size)
                );
            });
        }
        
        // Materials filter
        if (this.currentFilters.materials.length > 0) {
            filtered = filtered.filter(product => {
                return this.currentFilters.materials.some(material => 
                    product.materials && product.materials.includes(material)
                );
            });
        }
        
        return filtered;
    }
    
    // Sort results
    sortResults(products) {
        const { sortBy, sortOrder } = this.currentFilters;
        
        return products.sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'relevance':
                    // For relevance, we'll use a combination of factors
                    const aScore = this.calculateRelevanceScore(a);
                    const bScore = this.calculateRelevanceScore(b);
                    comparison = aScore - bScore;
                    break;
                case 'price':
                    comparison = (a.price || 0) - (b.price || 0);
                    break;
                case 'rating':
                    comparison = (a.rating || 0) - (b.rating || 0);
                    break;
                case 'newest':
                    comparison = new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
                    break;
                case 'popularity':
                    comparison = (b.popularity || 0) - (a.popularity || 0);
                    break;
                case 'name':
                    comparison = a.title.localeCompare(b.title);
                    break;
            }
            
            return sortOrder === 'desc' ? -comparison : comparison;
        });
    }
    
    // Calculate relevance score for search results
    calculateRelevanceScore(product) {
        let score = 0;
        const query = this.currentFilters.query.toLowerCase();
        
        // Title match (highest weight)
        if (product.title.toLowerCase().includes(query)) {
            score += 100;
        }
        
        // Category match
        if (product.category && product.category.toLowerCase().includes(query)) {
            score += 50;
        }
        
        // Brand match
        if (product.brand && product.brand.toLowerCase().includes(query)) {
            score += 40;
        }
        
        // Description match
        if (product.description && product.description.toLowerCase().includes(query)) {
            score += 30;
        }
        
        // Features match
        if (product.features) {
            product.features.forEach(feature => {
                if (feature.toLowerCase().includes(query)) {
                    score += 20;
                }
            });
        }
        
        // Rating boost
        score += (product.rating || 0) * 2;
        
        // Popularity boost
        score += (product.popularity || 0) * 0.1;
        
        return score;
    }
    
    // Update facet counts for current results
    updateFacetCounts() {
        this.facetCounts = {
            categories: {},
            brands: {},
            features: {},
            colors: {},
            sizes: {},
            materials: {},
            priceRanges: {},
            ratings: {}
        };
        
        this.searchResults.forEach(product => {
            // Category counts
            if (product.category) {
                this.facetCounts.categories[product.category] = (this.facetCounts.categories[product.category] || 0) + 1;
            }
            
            // Brand counts
            if (product.brand) {
                this.facetCounts.brands[product.brand] = (this.facetCounts.brands[product.brand] || 0) + 1;
            }
            
            // Feature counts
            if (product.features) {
                product.features.forEach(feature => {
                    this.facetCounts.features[feature] = (this.facetCounts.features[feature] || 0) + 1;
                });
            }
            
            // Color counts
            if (product.colors) {
                product.colors.forEach(color => {
                    this.facetCounts.colors[color] = (this.facetCounts.colors[color] || 0) + 1;
                });
            }
            
            // Size counts
            if (product.sizes) {
                product.sizes.forEach(size => {
                    this.facetCounts.sizes[size] = (this.facetCounts.sizes[size] || 0) + 1;
                });
            }
            
            // Material counts
            if (product.materials) {
                product.materials.forEach(material => {
                    this.facetCounts.materials[material] = (this.facetCounts.materials[material] || 0) + 1;
                });
            }
            
            // Price range counts
            const price = product.price || 0;
            const priceRange = this.getPriceRange(price);
            this.facetCounts.priceRanges[priceRange] = (this.facetCounts.priceRanges[priceRange] || 0) + 1;
            
            // Rating counts
            const rating = Math.floor(product.rating || 0);
            this.facetCounts.ratings[rating] = (this.facetCounts.ratings[rating] || 0) + 1;
        });
    }
    
    // Get price range for a given price
    getPriceRange(price) {
        if (price < 25) return '$0 - $25';
        if (price < 50) return '$25 - $50';
        if (price < 100) return '$50 - $100';
        if (price < 200) return '$100 - $200';
        return '$200+';
    }
    
    // Render search results
    renderSearchResults(containerId, results = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const productsToShow = results || this.filteredResults;
        
        if (productsToShow.length === 0) {
            container.innerHTML = this.renderNoResults();
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-header">
                <div class="results-count">
                    <span class="results-number">${productsToShow.length}</span> results found
                </div>
                <div class="results-actions">
                    <button class="save-search-btn" onclick="advancedSearchManager.saveCurrentSearch()">
                        <i class="fas fa-bookmark"></i> Save Search
                    </button>
                    <button class="clear-filters-btn" onclick="advancedSearchManager.clearAllFilters()">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                </div>
            </div>
            <div class="search-results-grid">
                ${productsToShow.map(product => this.renderProductCard(product)).join('')}
            </div>
        `;
        
        this.setupSearchResultEventListeners(container);
    }
    
    // Render individual product card
    renderProductCard(product) {
        const isOnSale = product.originalPrice && product.price < product.originalPrice;
        const discountPercent = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        return `
            <div class="search-result-card" data-product-id="${product.id}">
                <div class="result-image">
                    <img src="${product.image}" alt="${product.title}" 
                         onclick="window.location.href='product-detail.html?id=${product.id}'">
                    ${product.badges ? product.badges.map(badge => 
                        `<span class="result-badge ${badge.toLowerCase().replace(' ', '-')}">${badge}</span>`
                    ).join('') : ''}
                    ${isOnSale ? `<span class="result-badge sale">${discountPercent}% OFF</span>` : ''}
                    ${product.bundleId ? `<span class="result-badge bundle">Bundle</span>` : ''}
                    <div class="result-actions">
                        <button class="action-btn wishlist-btn" onclick="wishlistSystem.toggleWishlist('${product.id}')" 
                                title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-btn compare-btn" onclick="compareSystem.toggleCompare('${product.id}')" 
                                title="Add to Compare">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                        <button class="action-btn quick-view-btn" onclick="advancedSearchManager.quickView('${product.id}')" 
                                title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="result-info">
                    <div class="result-category">${product.category || 'General'}</div>
                    <h3 class="result-title" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        ${product.title}
                    </h3>
                    ${product.brand ? `<div class="result-brand">by ${product.brand}</div>` : ''}
                    <div class="result-rating">
                        <div class="stars">${this.generateStars(product.rating || 0)}</div>
                        <span class="rating-text">(${product.reviews || 0})</span>
                    </div>
                    <div class="result-price">
                        <span class="current-price">$${product.price || 0}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="result-availability">
                        ${product.inStock ? 
                            '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                            '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                        }
                    </div>
                    ${product.bundleId ? `<div class="result-bundle">Part of: ${product.bundleName}</div>` : ''}
                    <button class="add-to-cart-btn" onclick="window.Cart.addToCart('${product.id}')" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }
    
    // Render no results message
    renderNoResults() {
        return `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <div class="no-results-suggestions">
                    <h4>Suggestions:</h4>
                    <ul>
                        <li>Check your spelling</li>
                        <li>Try different keywords</li>
                        <li>Use more general terms</li>
                        <li>Remove some filters</li>
                    </ul>
                </div>
                <button class="clear-filters-btn" onclick="advancedSearchManager.clearAllFilters()">
                    Clear All Filters
                </button>
            </div>
        `;
    }
    
    // Render search filters sidebar
    renderSearchFilters(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="search-filters">
                <div class="filters-header">
                    <h3>Filters</h3>
                    <button class="clear-filters-btn" onclick="advancedSearchManager.clearAllFilters()">
                        Clear All
                    </button>
                </div>
                
                <div class="filter-section">
                    <h4>Price Range</h4>
                    <div class="price-range-filter">
                        <input type="range" id="priceMin" min="0" max="1000" value="${this.currentFilters.priceRange.min}" 
                               onchange="advancedSearchManager.updatePriceRange()">
                        <input type="range" id="priceMax" min="0" max="1000" value="${this.currentFilters.priceRange.max}" 
                               onchange="advancedSearchManager.updatePriceRange()">
                        <div class="price-range-display">
                            $<span id="priceMinDisplay">${this.currentFilters.priceRange.min}</span> - 
                            $<span id="priceMaxDisplay">${this.currentFilters.priceRange.max}</span>
                        </div>
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>Category</h4>
                    <div class="filter-options">
                        ${this.categories.map(category => `
                            <label class="filter-option">
                                <input type="radio" name="category" value="${category}" 
                                       ${this.currentFilters.category === category ? 'checked' : ''}
                                       onchange="advancedSearchManager.updateFilter('category', '${category}')">
                                <span class="filter-label">${category}</span>
                                <span class="filter-count">(${this.facetCounts.categories[category] || 0})</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>Brand</h4>
                    <div class="filter-options">
                        ${this.brands.map(brand => `
                            <label class="filter-option">
                                <input type="radio" name="brand" value="${brand}" 
                                       ${this.currentFilters.brand === brand ? 'checked' : ''}
                                       onchange="advancedSearchManager.updateFilter('brand', '${brand}')">
                                <span class="filter-label">${brand}</span>
                                <span class="filter-count">(${this.facetCounts.brands[brand] || 0})</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>Rating</h4>
                    <div class="rating-filter">
                        ${[4, 3, 2, 1].map(rating => `
                            <label class="filter-option">
                                <input type="radio" name="rating" value="${rating}" 
                                       ${this.currentFilters.rating === rating ? 'checked' : ''}
                                       onchange="advancedSearchManager.updateFilter('rating', ${rating})">
                                <span class="filter-label">
                                    ${this.generateStars(rating)} & Up
                                </span>
                                <span class="filter-count">(${this.facetCounts.ratings[rating] || 0})</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-section">
                    <h4>Availability</h4>
                    <div class="filter-options">
                        <label class="filter-option">
                            <input type="radio" name="availability" value="all" 
                                   ${this.currentFilters.availability === 'all' ? 'checked' : ''}
                                   onchange="advancedSearchManager.updateFilter('availability', 'all')">
                            <span class="filter-label">All Items</span>
                        </label>
                        <label class="filter-option">
                            <input type="radio" name="availability" value="in_stock" 
                                   ${this.currentFilters.availability === 'in_stock' ? 'checked' : ''}
                                   onchange="advancedSearchManager.updateFilter('availability', 'in_stock')">
                            <span class="filter-label">In Stock</span>
                        </label>
                        <label class="filter-option">
                            <input type="radio" name="availability" value="out_of_stock" 
                                   ${this.currentFilters.availability === 'out_of_stock' ? 'checked' : ''}
                                   onchange="advancedSearchManager.updateFilter('availability', 'out_of_stock')">
                            <span class="filter-label">Out of Stock</span>
                        </label>
                    </div>
                </div>
                
                ${this.features.length > 0 ? `
                <div class="filter-section">
                    <h4>Features</h4>
                    <div class="filter-options">
                        ${this.features.slice(0, 10).map(feature => `
                            <label class="filter-option">
                                <input type="checkbox" value="${feature}" 
                                       ${this.currentFilters.features.includes(feature) ? 'checked' : ''}
                                       onchange="advancedSearchManager.toggleArrayFilter('features', '${feature}')">
                                <span class="filter-label">${feature}</span>
                                <span class="filter-count">(${this.facetCounts.features[feature] || 0})</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${this.colors.length > 0 ? `
                <div class="filter-section">
                    <h4>Colors</h4>
                    <div class="color-filter">
                        ${this.colors.map(color => `
                            <label class="color-option">
                                <input type="checkbox" value="${color}" 
                                       ${this.currentFilters.colors.includes(color) ? 'checked' : ''}
                                       onchange="advancedSearchManager.toggleArrayFilter('colors', '${color}')">
                                <span class="color-swatch" style="background-color: ${this.getColorValue(color)}"></span>
                                <span class="color-name">${color}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    // Update filter
    updateFilter(filterName, value) {
        this.currentFilters[filterName] = value;
        this.performSearch();
        this.renderSearchResults('searchResults');
    }
    
    // Toggle array filter (for features, colors, etc.)
    toggleArrayFilter(filterName, value) {
        const currentValues = this.currentFilters[filterName];
        const index = currentValues.indexOf(value);
        
        if (index > -1) {
            currentValues.splice(index, 1);
        } else {
            currentValues.push(value);
        }
        
        this.performSearch();
        this.renderSearchResults('searchResults');
    }
    
    // Update price range
    updatePriceRange() {
        const minPrice = parseInt(document.getElementById('priceMin').value);
        const maxPrice = parseInt(document.getElementById('priceMax').value);
        
        this.currentFilters.priceRange = { min: minPrice, max: maxPrice };
        
        document.getElementById('priceMinDisplay').textContent = minPrice;
        document.getElementById('priceMaxDisplay').textContent = maxPrice;
        
        this.performSearch();
        this.renderSearchResults('searchResults');
    }
    
    // Clear all filters
    clearAllFilters() {
        this.currentFilters = {
            query: this.currentFilters.query,
            category: '',
            priceRange: { min: 0, max: 1000 },
            rating: 0,
            brand: '',
            availability: 'all',
            features: [],
            colors: [],
            sizes: [],
            materials: [],
            sortBy: 'relevance',
            sortOrder: 'desc'
        };
        
        this.performSearch();
        this.renderSearchResults('searchResults');
        this.renderSearchFilters('searchFilters');
    }
    
    // Save current search
    saveCurrentSearch() {
        const searchName = prompt('Enter a name for this search:');
        if (searchName) {
            const savedSearch = {
                id: Date.now().toString(),
                name: searchName,
                query: this.currentFilters.query,
                filters: { ...this.currentFilters },
                dateCreated: new Date().toISOString()
            };
            
            this.savedSearches.push(savedSearch);
            this.saveSavedSearches();
            
            if (window.showNotification) {
                window.showNotification('Search saved successfully!', 'success');
            }
        }
    }
    
    // Save to search history
    saveToSearchHistory(query, resultCount) {
        if (query.trim()) {
            const historyItem = {
                query: query,
                resultCount: resultCount,
                timestamp: new Date().toISOString()
            };
            
            // Remove duplicate
            this.searchHistory = this.searchHistory.filter(item => item.query !== query);
            
            // Add to beginning
            this.searchHistory.unshift(historyItem);
            
            // Keep only last 20 searches
            this.searchHistory = this.searchHistory.slice(0, 20);
            
            this.saveSearchHistory();
        }
    }
    
    // Quick view functionality
    quickView(productId) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal quick-view-modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content quick-view-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <div class="quick-view-container">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="quick-view-info">
                        <h2>${product.title}</h2>
                        <div class="quick-view-rating">
                            <div class="stars">${this.generateStars(product.rating || 0)}</div>
                            <span class="rating-text">(${product.reviews || 0} reviews)</span>
                        </div>
                        <div class="quick-view-price">
                            <span class="current-price">$${product.price || 0}</span>
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                        </div>
                        <p class="quick-view-description">${product.description || 'No description available.'}</p>
                        <div class="quick-view-actions">
                            <button class="btn btn-primary" onclick="window.Cart.addToCart('${product.id}')">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Setup event listeners
    setupSearchResultEventListeners(container) {
        const cards = container.querySelectorAll('.search-result-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Utility functions
    getProductById(productId) {
        return this.allProducts.find(p => p.id === productId);
    }
    
    getColorValue(colorName) {
        const colorMap = {
            'red': '#ff0000',
            'blue': '#0000ff',
            'green': '#008000',
            'yellow': '#ffff00',
            'black': '#000000',
            'white': '#ffffff',
            'gray': '#808080',
            'brown': '#a52a2a',
            'pink': '#ffc0cb',
            'purple': '#800080',
            'orange': '#ffa500'
        };
        return colorMap[colorName.toLowerCase()] || '#cccccc';
    }
    
    generateStars(rating) {
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
    
    // Save data to localStorage
    saveSearchHistory() {
        localStorage.setItem('search_history', JSON.stringify(this.searchHistory));
    }
    
    saveSavedSearches() {
        localStorage.setItem('saved_searches', JSON.stringify(this.savedSearches));
    }
}

// Initialize global instance
let advancedSearchManager = new AdvancedSearchManager();

// Export for global access
window.AdvancedSearchManager = AdvancedSearchManager;

