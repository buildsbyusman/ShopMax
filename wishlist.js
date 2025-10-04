// Wishlist System

class WishlistSystem {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    
    // Add product to wishlist
    addToWishlist(productId, productData = null) {
        // Check if product is already in wishlist
        if (this.isInWishlist(productId)) {
            return false;
        }
        
        const wishlistItem = {
            id: Date.now().toString(),
            productId: productId,
            addedAt: new Date().toISOString(),
            userId: this.currentUser?.id || 'guest',
            productData: productData || this.getProductData(productId)
        };
        
        this.wishlist.push(wishlistItem);
        this.saveWishlist();
        this.updateWishlistUI();
        
        return true;
    }
    
    // Remove product from wishlist
    removeFromWishlist(productId) {
        const initialLength = this.wishlist.length;
        this.wishlist = this.wishlist.filter(item => item.productId != productId);
        
        if (this.wishlist.length < initialLength) {
            this.saveWishlist();
            this.updateWishlistUI();
            return true;
        }
        
        return false;
    }
    
    // Toggle product in wishlist
    toggleWishlist(productId, productData = null) {
        if (this.isInWishlist(productId)) {
            return this.removeFromWishlist(productId);
        } else {
            return this.addToWishlist(productId, productData);
        }
    }
    
    // Check if product is in wishlist
    isInWishlist(productId) {
        return this.wishlist.some(item => item.productId == productId);
    }
    
    // Get wishlist items
    getWishlistItems() {
        return this.wishlist.map(item => ({
            ...item,
            product: this.getProductData(item.productId)
        }));
    }
    
    // Get wishlist count
    getWishlistCount() {
        return this.wishlist.length;
    }
    
    // Clear wishlist
    clearWishlist() {
        this.wishlist = [];
        this.saveWishlist();
        this.updateWishlistUI();
    }
    
    // Move item to cart
    moveToCart(productId) {
        const wishlistItem = this.wishlist.find(item => item.productId == productId);
        if (wishlistItem) {
            // Add to cart
            if (window.Cart) {
                window.Cart.addToCart(productId, 1);
                this.removeFromWishlist(productId);
            }
        }
    }
    
    // Share wishlist
    shareWishlist() {
        const wishlistData = {
            items: this.wishlist.map(item => ({
                productId: item.productId,
                productName: item.productData?.title || 'Unknown Product'
            })),
            sharedAt: new Date().toISOString()
        };
        
        const shareText = `Check out my wishlist on ShopMax!\n\n${wishlistData.items.map(item => `• ${item.productName}`).join('\n')}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My ShopMax Wishlist',
                text: shareText,
                url: window.location.origin
            });
        } else {
            navigator.clipboard.writeText(shareText);
        }
    }
    
    // Get product data
    getProductData(productId) {
        const products = window.ShopMax?.products || [];
        return products.find(p => p.id == productId);
    }
    
    // Save wishlist to localStorage
    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
    
    // Update wishlist UI elements
    updateWishlistUI() {
        // Update wishlist count in header
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            const count = this.getWishlistCount();
            wishlistCount.textContent = count;
            
            // Show/hide count based on whether there are items
            if (count > 0) {
                wishlistCount.style.display = 'block';
            } else {
                wishlistCount.style.display = 'none';
            }
        }
        
        // Update wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const productId = btn.dataset.productId;
            if (productId) {
                if (this.isInWishlist(productId)) {
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                } else {
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                }
            }
        });
        
        // Update heart icons
        document.querySelectorAll('.wishlist-heart').forEach(heart => {
            const productId = heart.dataset.productId;
            if (productId) {
                if (this.isInWishlist(productId)) {
                    heart.className = 'wishlist-heart fas fa-heart active';
                } else {
                    heart.className = 'wishlist-heart far fa-heart';
                }
            }
        });
    }
    
    // Create wishlist button
    createWishlistButton(productId, productData = null) {
        const isInWishlist = this.isInWishlist(productId);
        
        return `
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                    data-product-id="${productId}"
                    onclick="wishlistSystem.toggleWishlist(${productId}, ${JSON.stringify(productData).replace(/"/g, '&quot;')})">
                <i class="fas fa-heart"></i>
                ${isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
        `;
    }
    
    // Create wishlist heart icon
    createWishlistHeart(productId) {
        const isInWishlist = this.isInWishlist(productId);
        
        return `
            <i class="wishlist-heart ${isInWishlist ? 'fas fa-heart active' : 'far fa-heart'}" 
               data-product-id="${productId}"
               onclick="wishlistSystem.toggleWishlist(${productId})"
               title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
            </i>
        `;
    }
}

// Wishlist Page Component
class WishlistPage {
    constructor(containerId) {
        this.containerId = containerId;
        this.wishlistSystem = new WishlistSystem();
        this.currentSort = 'newest';
        this.currentFilter = 'all';
    }
    
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        const wishlistItems = this.wishlistSystem.getWishlistItems();
        
        if (wishlistItems.length === 0) {
            container.innerHTML = this.renderEmptyWishlist();
            return;
        }
        
        container.innerHTML = `
            <div class="wishlist-page">
                <div class="wishlist-header">
                    <h1>My Wishlist (${wishlistItems.length} items)</h1>
                    <div class="wishlist-actions">
                        <button class="btn btn-secondary" onclick="wishlistPage.shareWishlist()">
                            <i class="fas fa-share"></i> Share Wishlist
                        </button>
                        <button class="btn btn-danger" onclick="wishlistPage.clearWishlist()">
                            <i class="fas fa-trash"></i> Clear All
                        </button>
                    </div>
                </div>
                
                <div class="wishlist-filters">
                    <div class="filter-group">
                        <label>Sort by:</label>
                        <select id="sortWishlist" onchange="wishlistPage.setSort(this.value)">
                            <option value="newest" ${this.currentSort === 'newest' ? 'selected' : ''}>Newest First</option>
                            <option value="oldest" ${this.currentSort === 'oldest' ? 'selected' : ''}>Oldest First</option>
                            <option value="price-low" ${this.currentSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                            <option value="price-high" ${this.currentSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                            <option value="name" ${this.currentSort === 'name' ? 'selected' : ''}>Name A-Z</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Filter by:</label>
                        <select id="filterWishlist" onchange="wishlistPage.setFilter(this.value)">
                            <option value="all" ${this.currentFilter === 'all' ? 'selected' : ''}>All Items</option>
                            <option value="in-stock" ${this.currentFilter === 'in-stock' ? 'selected' : ''}>In Stock</option>
                            <option value="on-sale" ${this.currentFilter === 'on-sale' ? 'selected' : ''}>On Sale</option>
                        </select>
                    </div>
                </div>
                
                <div class="wishlist-items">
                    ${this.renderWishlistItems(wishlistItems)}
                </div>
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    renderEmptyWishlist() {
        return `
            <div class="empty-wishlist">
                <div class="empty-wishlist-content">
                    <i class="fas fa-heart"></i>
                    <h2>Your wishlist is empty</h2>
                    <p>Save items you love for later by clicking the heart icon on any product.</p>
                    <a href="products.html" class="btn btn-primary">
                        <i class="fas fa-shopping-bag"></i> Start Shopping
                    </a>
                </div>
            </div>
        `;
    }
    
    renderWishlistItems(items) {
        // Sort and filter items
        let sortedItems = [...items];
        
        // Sort
        switch (this.currentSort) {
            case 'newest':
                sortedItems.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
                break;
            case 'oldest':
                sortedItems.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
                break;
            case 'price-low':
                sortedItems.sort((a, b) => (a.product?.price || 0) - (b.product?.price || 0));
                break;
            case 'price-high':
                sortedItems.sort((a, b) => (b.product?.price || 0) - (a.product?.price || 0));
                break;
            case 'name':
                sortedItems.sort((a, b) => (a.product?.title || '').localeCompare(b.product?.title || ''));
                break;
        }
        
        // Filter
        if (this.currentFilter !== 'all') {
            sortedItems = sortedItems.filter(item => {
                switch (this.currentFilter) {
                    case 'in-stock':
                        return item.product?.inStock;
                    case 'on-sale':
                        return item.product?.originalPrice && item.product?.price < item.product?.originalPrice;
                    default:
                        return true;
                }
            });
        }
        
        return sortedItems.map(item => this.renderWishlistItem(item)).join('');
    }
    
    renderWishlistItem(item) {
        const product = item.product;
        if (!product) return '';
        
        const addedDate = new Date(item.addedAt).toLocaleDateString();
        const isOnSale = product.originalPrice && product.price < product.originalPrice;
        const discountPercent = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        return `
            <div class="wishlist-item" data-product-id="${item.productId}">
                <div class="wishlist-item-image">
                    <img src="${product.image}" alt="${product.title}" onclick="window.location.href='product-detail.html?id=${product.id}'">
                    ${isOnSale ? `<span class="sale-badge">${discountPercent}% OFF</span>` : ''}
                    <button class="remove-wishlist" onclick="wishlistPage.removeItem(${item.productId})" title="Remove from wishlist">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="wishlist-item-info">
                    <h3 class="product-title" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        ${product.title}
                    </h3>
                    
                    <div class="product-rating">
                        <div class="stars">${this.generateStars(product.rating)}</div>
                        <span class="rating-text">(${product.reviews})</span>
                    </div>
                    
                    <div class="product-price">
                        <span class="current-price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    
                    <div class="product-availability">
                        ${product.inStock ? 
                            '<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>' : 
                            '<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>'
                        }
                    </div>
                    
                    <div class="added-date">
                        Added on ${addedDate}
                    </div>
                </div>
                
                <div class="wishlist-item-actions">
                    <button class="btn btn-primary" onclick="wishlistPage.moveToCart(${item.productId})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Event listeners are set up via onclick attributes in the HTML
    }
    
    setSort(sortBy) {
        this.currentSort = sortBy;
        this.render();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    }
    
    removeItem(productId) {
        this.wishlistSystem.removeFromWishlist(productId);
        this.render();
    }
    
    moveToCart(productId) {
        this.wishlistSystem.moveToCart(productId);
    }
    
    shareWishlist() {
        this.wishlistSystem.shareWishlist();
    }
    
    clearWishlist() {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
            this.wishlistSystem.clearWishlist();
            this.render();
        }
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
}

// Wishlist Sidebar Component
class WishlistSidebar {
    constructor() {
        this.wishlistSystem = new WishlistSystem();
        this.isOpen = false;
    }
    
    render() {
        // Only render sidebar if it doesn't already exist
        if (!document.getElementById('wishlistSidebar')) {
            const sidebar = document.createElement('div');
            sidebar.className = 'wishlist-sidebar';
            sidebar.id = 'wishlistSidebar';
            sidebar.style.display = 'none'; // Hide by default
            sidebar.innerHTML = `
                <div class="wishlist-sidebar-header">
                    <h3>My Wishlist</h3>
                    <button class="close-wishlist" id="closeWishlistBtn">&times;</button>
                </div>
                <div class="wishlist-sidebar-content" id="wishlistSidebarContent">
                    ${this.renderWishlistContent()}
                </div>
            `;
            
            document.body.appendChild(sidebar);
            this.setupEventListeners();
        }
    }
    
    renderWishlistContent() {
        const items = this.wishlistSystem.getWishlistItems();
        
        if (items.length === 0) {
            return `
                <div class="empty-wishlist-sidebar">
                    <i class="fas fa-heart"></i>
                    <p>Your wishlist is empty</p>
                    <a href="products.html" class="btn btn-primary">Start Shopping</a>
                </div>
            `;
        }
        
        return `
            <div class="wishlist-items-sidebar">
                ${items.slice(0, 5).map(item => this.renderWishlistItemSidebar(item)).join('')}
                ${items.length > 5 ? `
                    <div class="view-all-wishlist">
                        <a href="wishlist.html" class="btn btn-secondary">View All (${items.length})</a>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    renderWishlistItemSidebar(item) {
        const product = item.product;
        if (!product) return '';
        
        return `
            <div class="wishlist-item-sidebar">
                <img src="${product.image}" alt="${product.title}" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="wishlist-item-info">
                    <h4 onclick="window.location.href='product-detail.html?id=${product.id}'">${product.title}</h4>
                    <div class="price">$${product.price}</div>
                    <div class="actions">
                        <button class="btn btn-sm btn-primary" onclick="wishlistSidebar.moveToCart(${item.productId})">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="wishlistSidebar.removeItem(${item.productId})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Setup close button event listener
        const closeBtn = document.getElementById('closeWishlistBtn');
        if (closeBtn) {
            closeBtn.onclick = () => this.close();
        }
    }
    
    open() {
        console.log('Opening wishlist sidebar...');
        const sidebar = document.getElementById('wishlistSidebar');
        const overlay = document.getElementById('wishlistOverlay') || this.createOverlay();
        
        if (sidebar) {
            console.log('Sidebar found, opening...');
            sidebar.style.display = 'block';
            sidebar.classList.add('open');
            overlay.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
            console.log('Wishlist sidebar opened successfully');
        } else {
            console.error('Wishlist sidebar not found!');
        }
    }
    
    close() {
        const sidebar = document.getElementById('wishlistSidebar');
        const overlay = document.getElementById('wishlistOverlay');
        
        if (sidebar) {
            sidebar.classList.remove('open');
            sidebar.style.display = 'none';
            if (overlay) overlay.classList.remove('active');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'wishlist-overlay';
        overlay.id = 'wishlistOverlay';
        overlay.onclick = () => this.close();
        document.body.appendChild(overlay);
        return overlay;
    }
    
    removeItem(productId) {
        this.wishlistSystem.removeFromWishlist(productId);
        this.updateContent();
    }
    
    moveToCart(productId) {
        this.wishlistSystem.moveToCart(productId);
    }
    
    updateContent() {
        const content = document.getElementById('wishlistSidebarContent');
        if (content) {
            content.innerHTML = this.renderWishlistContent();
        }
    }
}

// Initialize global instances
let wishlistSystem = new WishlistSystem();
let wishlistPage = null;
let wishlistSidebar = new WishlistSidebar();

// Initialize wishlist system
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing wishlist system...');
    
    try {
        window.wishlistSystem = new WishlistSystem();
        window.wishlistSidebar = new WishlistSidebar();
        
        // Update UI
        window.wishlistSystem.updateWishlistUI();
        window.wishlistSidebar.render();
        
        // Fix wishlist icon click handler
        const wishlistIcon = document.querySelector('.wishlist-icon');
        if (wishlistIcon) {
            console.log('Setting up wishlist icon click handler');
            wishlistIcon.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Wishlist icon clicked');
                
                if (window.wishlistSidebar) {
                    console.log('Opening wishlist sidebar');
                    window.wishlistSidebar.open();
                } else {
                    console.log('Wishlist sidebar not found, redirecting to wishlist page');
                    window.location.href = 'wishlist.html';
                }
            };
        } else {
            console.error('Wishlist icon not found');
        }
        
        console.log('Wishlist system initialized successfully');
    } catch (error) {
        console.error('Error initializing wishlist system:', error);
    }
});

// Export for global access
window.WishlistSystem = WishlistSystem;
window.WishlistPage = WishlistPage;
window.WishlistSidebar = WishlistSidebar;

// Global function for testing
window.testWishlist = function() {
    console.log('Testing wishlist functionality...');
    console.log('Wishlist system:', window.wishlistSystem);
    console.log('Wishlist sidebar:', window.wishlistSidebar);
    
    if (window.wishlistSidebar) {
        window.wishlistSidebar.open();
    } else {
        console.error('Wishlist sidebar not available');
    }
};

