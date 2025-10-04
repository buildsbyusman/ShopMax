// Product Detail Page Functionality

let currentProduct = null;
let selectedVariants = {
    color: 'black',
    size: 'standard'
};
let currentPrice = 79.99;
let isZoomed = false;
let isInWishlist = false;
let isInCompare = false;

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    initializeProductDetail();
    loadProductData();
    setupEventListeners();
});

function initializeProductDetail() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProductById(productId);
    } else {
        // Load default product for demo
        loadDefaultProduct();
    }
}

function loadProductById(productId) {
    // In a real app, this would fetch from an API
    const products = window.ShopMax?.products || [];
    const product = products.find(p => p.id == productId);
    
    if (product) {
        currentProduct = product;
        displayProductDetails();
    } else {
        showMessage('Product not found', 'error');
        setTimeout(() => {
            window.location.href = 'products.html';
        }, 2000);
    }
}

function loadDefaultProduct() {
    // Demo product data
    currentProduct = {
        id: 1,
        title: "Wireless Bluetooth Headphones with Noise Cancellation",
        price: 79.99,
        originalPrice: 119.99,
        category: "electronics",
        image: "https://via.placeholder.com/500x500?text=Wireless+Headphones",
        rating: 4.5,
        reviews: 2847,
        description: "Experience premium sound quality with our Wireless Bluetooth Headphones featuring active noise cancellation technology. Perfect for music lovers, professionals, and anyone who values crystal-clear audio.",
        inStock: true,
        stock: 12,
        variants: {
            color: [
                { name: 'Black', value: 'black', price: 79.99, image: 'https://via.placeholder.com/500x500?text=Black+Headphones' },
                { name: 'White', value: 'white', price: 79.99, image: 'https://via.placeholder.com/500x500?text=White+Headphones' },
                { name: 'Blue', value: 'blue', price: 84.99, image: 'https://via.placeholder.com/500x500?text=Blue+Headphones' }
            ],
            size: [
                { name: 'Standard', value: 'standard', price: 0 },
                { name: 'Large', value: 'large', price: 10.00 }
            ]
        },
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Quick charge (3 min = 3 hours)",
            "Premium sound quality",
            "Comfortable over-ear design"
        ],
        specifications: {
            "Brand": "ShopMax Audio",
            "Model": "SM-WH-2024",
            "Connectivity": "Bluetooth 5.0, 3.5mm Jack",
            "Battery Life": "30 hours (with ANC off), 20 hours (with ANC on)",
            "Charging Time": "2 hours (full charge), 3 minutes (3 hours playback)",
            "Weight": "250g",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "32 ohms"
        },
        images: [
            'https://via.placeholder.com/500x500?text=Front+View',
            'https://via.placeholder.com/500x500?text=Side+View',
            'https://via.placeholder.com/500x500?text=Back+View',
            'https://via.placeholder.com/500x500?text=Detail+View',
            'https://via.placeholder.com/500x500?text=In+Use'
        ]
    };
    
    displayProductDetails();
}

function displayProductDetails() {
    if (!currentProduct) return;
    
    // Update page title
    document.title = `${currentProduct.title} - ShopMax`;
    
    // Update main image
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = currentProduct.images[0];
    }
    
    // Update product title
    const titleElement = document.querySelector('.product-title');
    if (titleElement) {
        titleElement.textContent = currentProduct.title;
    }
    
    // Update price
    updatePrice();
    
    // Update rating
    updateRating();
    
    // Update stock information
    updateStockInfo();
    
    // Update features
    updateFeatures();
    
    // Update specifications
    updateSpecifications();
    
    // Update images
    updateImageGallery();
}

function updatePrice() {
    const currentPriceElement = document.querySelector('.current-price');
    const originalPriceElement = document.querySelector('.original-price');
    const discountPercentElement = document.querySelector('.discount-percent');
    
    if (currentPriceElement) {
        currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
    }
    
    if (originalPriceElement && currentProduct.originalPrice) {
        originalPriceElement.textContent = `$${currentProduct.originalPrice.toFixed(2)}`;
    }
    
    if (discountPercentElement && currentProduct.originalPrice) {
        const discount = Math.round((1 - currentPrice / currentProduct.originalPrice) * 100);
        discountPercentElement.textContent = `Save ${discount}%`;
    }
}

function updateRating() {
    const ratingNumberElement = document.querySelector('.rating-number');
    const ratingLinkElement = document.querySelector('.rating-link');
    const starsElement = document.querySelector('.product-rating .stars');
    
    if (ratingNumberElement) {
        ratingNumberElement.textContent = currentProduct.rating;
    }
    
    if (ratingLinkElement) {
        ratingLinkElement.textContent = `(${currentProduct.reviews.toLocaleString()} ratings)`;
    }
    
    if (starsElement) {
        starsElement.innerHTML = generateStars(currentProduct.rating);
    }
}

function updateStockInfo() {
    const stockQuantityElement = document.querySelector('.stock-quantity');
    if (stockQuantityElement) {
        if (currentProduct.stock <= 10) {
            stockQuantityElement.textContent = `Only ${currentProduct.stock} left in stock - order soon`;
            stockQuantityElement.style.color = 'var(--danger-color)';
        } else {
            stockQuantityElement.textContent = `${currentProduct.stock} in stock`;
            stockQuantityElement.style.color = 'var(--success-color)';
        }
    }
}

function updateFeatures() {
    const featuresList = document.querySelector('.product-features ul');
    if (featuresList && currentProduct.features) {
        featuresList.innerHTML = currentProduct.features.map(feature => 
            `<li><i class="fas fa-check"></i> ${feature}</li>`
        ).join('');
    }
}

function updateSpecifications() {
    const specsTable = document.querySelector('.specifications-table');
    if (specsTable && currentProduct.specifications) {
        specsTable.innerHTML = Object.entries(currentProduct.specifications).map(([key, value]) => 
            `<tr><td>${key}</td><td>${value}</td></tr>`
        ).join('');
    }
}

function updateImageGallery() {
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    if (thumbnailGallery && currentProduct.images) {
        thumbnailGallery.innerHTML = currentProduct.images.map((image, index) => 
            `<div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${image}')">
                <img src="${image.replace('500x500', '100x100')}" alt="Product Image ${index + 1}">
            </div>`
        ).join('');
    }
}

function setupEventListeners() {
    // Variant selection
    const variantOptions = document.querySelectorAll('.variant-option');
    variantOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectVariant(this);
        });
    });
    
    // Image zoom
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.addEventListener('mousemove', handleImageZoom);
        mainImage.addEventListener('mouseleave', hideImageZoom);
    }
    
    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', validateQuantity);
    }
}

function selectVariant(optionElement) {
    const variantGroup = optionElement.closest('.variant-group');
    const variantType = variantGroup.querySelector('label').textContent.toLowerCase().replace(':', '');
    
    // Remove active class from siblings
    variantGroup.querySelectorAll('.variant-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    optionElement.classList.add('active');
    
    // Update selected variant
    if (variantType === 'color') {
        selectedVariants.color = optionElement.dataset.color;
    } else if (variantType === 'size') {
        selectedVariants.size = optionElement.dataset.size;
    }
    
    // Update price based on variant
    updatePriceForVariant(optionElement);
    
    // Update main image if color changed
    if (variantType === 'color') {
        updateMainImageForColor(optionElement.dataset.color);
    }
}

function updatePriceForVariant(optionElement) {
    const priceModifier = parseFloat(optionElement.dataset.price) || 0;
    currentPrice = currentProduct.price + priceModifier;
    updatePrice();
}

function updateMainImageForColor(color) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        // In a real app, you'd have different images for each color
        const colorImages = {
            'black': 'https://via.placeholder.com/500x500?text=Black+Headphones',
            'white': 'https://via.placeholder.com/500x500?text=White+Headphones',
            'blue': 'https://via.placeholder.com/500x500?text=Blue+Headphones'
        };
        
        if (colorImages[color]) {
            mainImage.src = colorImages[color];
        }
    }
}

function changeMainImage(imageUrl) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.closest('.thumbnail').classList.add('active');
}

function handleImageZoom(e) {
    if (!isZoomed) return;
    
    const mainImage = document.getElementById('mainProductImage');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomLens = document.querySelector('.zoom-lens');
    
    if (!mainImage || !zoomOverlay || !zoomLens) return;
    
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Position zoom lens
    zoomLens.style.left = x + 'px';
    zoomLens.style.top = y + 'px';
}

function hideImageZoom() {
    const zoomOverlay = document.getElementById('zoomOverlay');
    if (zoomOverlay) {
        zoomOverlay.style.opacity = '0';
    }
}

function toggleZoom() {
    isZoomed = !isZoomed;
    const mainImage = document.getElementById('mainProductImage');
    const zoomOverlay = document.getElementById('zoomOverlay');
    
    if (isZoomed) {
        mainImage.style.cursor = 'zoom-out';
        zoomOverlay.style.opacity = '1';
    } else {
        mainImage.style.cursor = 'zoom-in';
        zoomOverlay.style.opacity = '0';
    }
}

function toggleFullscreen() {
    const mainImage = document.getElementById('mainProductImage');
    const zoomModal = document.getElementById('zoomModal');
    const zoomImage = document.getElementById('zoomImage');
    
    zoomImage.src = mainImage.src;
    zoomModal.style.display = 'block';
}

function closeZoomModal() {
    const zoomModal = document.getElementById('zoomModal');
    zoomModal.style.display = 'none';
}

function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: currentProduct.title,
            text: `Check out this product: ${currentProduct.title}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showMessage('Product link copied to clipboard!', 'success');
        });
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const minValue = parseInt(quantityInput.min);
    
    if (currentValue > minValue) {
        quantityInput.value = currentValue - 1;
    }
}

function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    const value = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.min);
    const max = parseInt(quantityInput.max);
    
    if (value < min) {
        quantityInput.value = min;
    } else if (value > max) {
        quantityInput.value = max;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = {
        ...currentProduct,
        selectedVariants: { ...selectedVariants },
        quantity: quantity,
        price: currentPrice
    };
    
    // Add to cart using the cart system
    if (window.Cart) {
        window.Cart.addToCart(product.id, quantity);
    } else {
        // Fallback
        showMessage('Product added to cart!', 'success');
    }
}

function buyNow() {
    addToCart();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

function toggleWishlist() {
    isInWishlist = !isInWishlist;
    const wishlistBtn = document.querySelector('.wishlist-btn');
    
    if (isInWishlist) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
        showMessage('Added to wishlist!', 'success');
    } else {
        wishlistBtn.classList.remove('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Wishlist';
        showMessage('Removed from wishlist!', 'success');
    }
}

function addToCompare() {
    isInCompare = !isInCompare;
    const compareBtn = document.querySelector('.compare-btn');
    
    if (isInCompare) {
        compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i> Added to Compare';
        showMessage('Added to compare!', 'success');
    } else {
        compareBtn.innerHTML = '<i class="fas fa-balance-scale"></i> Add to Compare';
        showMessage('Removed from compare!', 'success');
    }
}

function showTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Add active class to clicked tab button
    event.target.classList.add('active');
}

function generateStars(rating) {
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

// Export functions for global access
window.ProductDetail = {
    changeMainImage,
    toggleZoom,
    toggleFullscreen,
    shareProduct,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    buyNow,
    toggleWishlist,
    addToCompare,
    showTab
};

