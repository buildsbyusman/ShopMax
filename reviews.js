// Reviews and Ratings System

class ReviewsSystem {
    constructor() {
        this.reviews = JSON.parse(localStorage.getItem('product_reviews') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    
    // Add a new review
    addReview(productId, reviewData) {
        const review = {
            id: Date.now().toString(),
            productId: productId,
            userId: this.currentUser?.id || 'guest',
            userName: this.currentUser?.name || 'Anonymous',
            userAvatar: this.currentUser?.avatar || this.generateAvatar(reviewData.userName || 'Anonymous'),
            rating: reviewData.rating,
            title: reviewData.title,
            content: reviewData.content,
            images: reviewData.images || [],
            verified: reviewData.verified || false,
            helpful: 0,
            notHelpful: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.reviews.push(review);
        this.saveReviews();
        return review;
    }
    
    // Get reviews for a product
    getProductReviews(productId, options = {}) {
        let productReviews = this.reviews.filter(review => review.productId == productId);
        
        // Sort reviews
        if (options.sortBy) {
            switch (options.sortBy) {
                case 'newest':
                    productReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'oldest':
                    productReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case 'highest':
                    productReviews.sort((a, b) => b.rating - a.rating);
                    break;
                case 'lowest':
                    productReviews.sort((a, b) => a.rating - b.rating);
                    break;
                case 'most_helpful':
                    productReviews.sort((a, b) => (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful));
                    break;
                case 'with_images':
                    productReviews = productReviews.filter(review => review.images.length > 0);
                    break;
            }
        }
        
        // Filter by rating
        if (options.rating) {
            productReviews = productReviews.filter(review => review.rating == options.rating);
        }
        
        // Pagination
        if (options.page && options.limit) {
            const startIndex = (options.page - 1) * options.limit;
            const endIndex = startIndex + options.limit;
            productReviews = productReviews.slice(startIndex, endIndex);
        }
        
        return productReviews;
    }
    
    // Get review statistics for a product
    getReviewStats(productId) {
        const productReviews = this.reviews.filter(review => review.productId == productId);
        
        if (productReviews.length === 0) {
            return {
                totalReviews: 0,
                averageRating: 0,
                ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                verifiedReviews: 0,
                reviewsWithImages: 0
            };
        }
        
        const totalReviews = productReviews.length;
        const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
        
        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        productReviews.forEach(review => {
            ratingDistribution[review.rating]++;
        });
        
        const verifiedReviews = productReviews.filter(review => review.verified).length;
        const reviewsWithImages = productReviews.filter(review => review.images.length > 0).length;
        
        return {
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10,
            ratingDistribution,
            verifiedReviews,
            reviewsWithImages
        };
    }
    
    // Mark review as helpful
    markReviewHelpful(reviewId, helpful = true) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            if (helpful) {
                review.helpful++;
            } else {
                review.notHelpful++;
            }
            this.saveReviews();
        }
    }
    
    // Report a review
    reportReview(reviewId, reason) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            review.reported = true;
            review.reportReason = reason;
            review.reportedAt = new Date().toISOString();
            this.saveReviews();
        }
    }
    
    // Save reviews to localStorage
    saveReviews() {
        localStorage.setItem('product_reviews', JSON.stringify(this.reviews));
    }
    
    // Generate avatar from name
    generateAvatar(name) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        return initials;
    }
    
    // Upload review images
    async uploadReviewImages(files) {
        const images = [];
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const imageData = await this.convertToBase64(file);
                images.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    data: imageData,
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
        }
        
        return images;
    }
    
    // Convert file to base64
    convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}

// Review Form Component
class ReviewForm {
    constructor(productId, containerId) {
        this.productId = productId;
        this.containerId = containerId;
        this.reviewsSystem = new ReviewsSystem();
        this.selectedImages = [];
    }
    
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="review-form-container">
                <h3>Write a Review</h3>
                <form id="reviewForm" class="review-form">
                    <div class="form-group">
                        <label>Overall Rating *</label>
                        <div class="rating-input">
                            <div class="star-rating" id="starRating">
                                <i class="far fa-star" data-rating="1"></i>
                                <i class="far fa-star" data-rating="2"></i>
                                <i class="far fa-star" data-rating="3"></i>
                                <i class="far fa-star" data-rating="4"></i>
                                <i class="far fa-star" data-rating="5"></i>
                            </div>
                            <span class="rating-text">Click to rate</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="reviewTitle">Review Title *</label>
                        <input type="text" id="reviewTitle" name="title" required 
                               placeholder="Summarize your review or highlight an important detail">
                    </div>
                    
                    <div class="form-group">
                        <label for="reviewContent">Your Review *</label>
                        <textarea id="reviewContent" name="content" required rows="5"
                                  placeholder="Tell others about your experience with this product"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Add Photos (Optional)</label>
                        <div class="image-upload">
                            <input type="file" id="reviewImages" multiple accept="image/*" style="display: none;">
                            <button type="button" class="upload-btn" onclick="document.getElementById('reviewImages').click()">
                                <i class="fas fa-camera"></i> Add Photos
                            </button>
                            <div class="uploaded-images" id="uploadedImages"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="verifiedPurchase" name="verified">
                            <span class="checkmark"></span>
                            I purchased this product
                        </label>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.review-form-container').remove()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Star rating
        const stars = document.querySelectorAll('#starRating i');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => this.setRating(index + 1));
            star.addEventListener('mouseenter', () => this.highlightStars(index + 1));
        });
        
        document.getElementById('starRating').addEventListener('mouseleave', () => {
            this.highlightStars(this.selectedRating || 0);
        });
        
        // Image upload
        document.getElementById('reviewImages').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });
        
        // Form submission
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview();
        });
    }
    
    setRating(rating) {
        this.selectedRating = rating;
        this.highlightStars(rating);
        
        const ratingText = document.querySelector('.rating-text');
        const ratingTexts = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        ratingText.textContent = ratingTexts[rating];
    }
    
    highlightStars(rating) {
        const stars = document.querySelectorAll('#starRating i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    async handleImageUpload(files) {
        const images = await this.reviewsSystem.uploadReviewImages(files);
        this.selectedImages = [...this.selectedImages, ...images];
        this.displayUploadedImages();
    }
    
    displayUploadedImages() {
        const container = document.getElementById('uploadedImages');
        container.innerHTML = this.selectedImages.map(image => `
            <div class="uploaded-image">
                <img src="${image.data}" alt="${image.name}">
                <button type="button" class="remove-image" onclick="reviewForm.removeImage('${image.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    removeImage(imageId) {
        this.selectedImages = this.selectedImages.filter(img => img.id !== imageId);
        this.displayUploadedImages();
    }
    
    async submitReview() {
        const formData = new FormData(document.getElementById('reviewForm'));
        
        if (!this.selectedRating) {
            return;
        }
        
        const reviewData = {
            rating: this.selectedRating,
            title: formData.get('title'),
            content: formData.get('content'),
            images: this.selectedImages,
            verified: formData.get('verified') === 'on'
        };
        
        try {
            const review = this.reviewsSystem.addReview(this.productId, reviewData);
            
            // Refresh reviews display
            if (window.ProductDetail) {
                window.ProductDetail.refreshReviews();
            }
            
            // Close form
            document.querySelector('.review-form-container').remove();
            
        } catch (error) {
            // Error handling without popup
        }
    }
}

// Reviews Display Component
class ReviewsDisplay {
    constructor(productId, containerId) {
        this.productId = productId;
        this.containerId = containerId;
        this.reviewsSystem = new ReviewsSystem();
        this.currentPage = 1;
        this.reviewsPerPage = 5;
        this.currentSort = 'newest';
        this.currentFilter = 'all';
    }
    
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        const stats = this.reviewsSystem.getReviewStats(this.productId);
        const reviews = this.reviewsSystem.getProductReviews(this.productId, {
            sortBy: this.currentSort,
            rating: this.currentFilter !== 'all' ? this.currentFilter : null,
            page: this.currentPage,
            limit: this.reviewsPerPage
        });
        
        container.innerHTML = `
            <div class="reviews-display">
                ${this.renderStats(stats)}
                ${this.renderFilters()}
                ${this.renderReviewsList(reviews)}
                ${this.renderPagination(stats.totalReviews)}
            </div>
        `;
        
        this.setupEventListeners();
    }
    
    renderStats(stats) {
        return `
            <div class="reviews-stats">
                <div class="overall-rating">
                    <div class="rating-number">${stats.averageRating}</div>
                    <div class="stars">${this.generateStars(stats.averageRating)}</div>
                    <div class="total-reviews">${stats.totalReviews} reviews</div>
                </div>
                <div class="rating-breakdown">
                    ${Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => `
                        <div class="rating-bar">
                            <span>${rating}★</span>
                            <div class="bar">
                                <div class="fill" style="width: ${(count / stats.totalReviews) * 100}%"></div>
                            </div>
                            <span>${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderFilters() {
        return `
            <div class="reviews-filters">
                <div class="filter-group">
                    <label>Sort by:</label>
                    <select id="sortReviews" onchange="reviewsDisplay.setSort(this.value)">
                        <option value="newest" ${this.currentSort === 'newest' ? 'selected' : ''}>Newest First</option>
                        <option value="oldest" ${this.currentSort === 'oldest' ? 'selected' : ''}>Oldest First</option>
                        <option value="highest" ${this.currentSort === 'highest' ? 'selected' : ''}>Highest Rating</option>
                        <option value="lowest" ${this.currentSort === 'lowest' ? 'selected' : ''}>Lowest Rating</option>
                        <option value="most_helpful" ${this.currentSort === 'most_helpful' ? 'selected' : ''}>Most Helpful</option>
                        <option value="with_images" ${this.currentSort === 'with_images' ? 'selected' : ''}>With Images</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Filter by rating:</label>
                    <select id="filterReviews" onchange="reviewsDisplay.setFilter(this.value)">
                        <option value="all" ${this.currentFilter === 'all' ? 'selected' : ''}>All Ratings</option>
                        <option value="5" ${this.currentFilter === '5' ? 'selected' : ''}>5 Stars</option>
                        <option value="4" ${this.currentFilter === '4' ? 'selected' : ''}>4 Stars</option>
                        <option value="3" ${this.currentFilter === '3' ? 'selected' : ''}>3 Stars</option>
                        <option value="2" ${this.currentFilter === '2' ? 'selected' : ''}>2 Stars</option>
                        <option value="1" ${this.currentFilter === '1' ? 'selected' : ''}>1 Star</option>
                    </select>
                </div>
            </div>
        `;
    }
    
    renderReviewsList(reviews) {
        if (reviews.length === 0) {
            return `
                <div class="no-reviews">
                    <i class="fas fa-comment-slash"></i>
                    <h3>No reviews yet</h3>
                    <p>Be the first to review this product!</p>
                </div>
            `;
        }
        
        return `
            <div class="reviews-list">
                ${reviews.map(review => this.renderReviewItem(review)).join('')}
            </div>
        `;
    }
    
    renderReviewItem(review) {
        return `
            <div class="review-item" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${review.userAvatar}</div>
                        <div class="reviewer-details">
                            <strong>${review.userName}</strong>
                            ${review.verified ? '<span class="verified-badge">Verified Purchase</span>' : ''}
                            <div class="review-rating">${this.generateStars(review.rating)}</div>
                        </div>
                    </div>
                    <div class="review-meta">
                        <div class="review-date">${this.formatDate(review.createdAt)}</div>
                        <div class="review-actions">
                            <button class="action-btn" onclick="reviewsDisplay.reportReview('${review.id}')" title="Report">
                                <i class="fas fa-flag"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="review-content">
                    <h4>${review.title}</h4>
                    <p>${review.content}</p>
                    ${review.images.length > 0 ? this.renderReviewImages(review.images) : ''}
                </div>
                <div class="review-helpful">
                    <span>Was this review helpful?</span>
                    <button class="helpful-btn" onclick="reviewsDisplay.markHelpful('${review.id}', true)">
                        Yes (${review.helpful})
                    </button>
                    <button class="helpful-btn" onclick="reviewsDisplay.markHelpful('${review.id}', false)">
                        No (${review.notHelpful})
                    </button>
                </div>
            </div>
        `;
    }
    
    renderReviewImages(images) {
        return `
            <div class="review-images">
                ${images.map(image => `
                    <img src="${image.data}" alt="Review image" onclick="reviewsDisplay.showImageModal('${image.data}')">
                `).join('')}
            </div>
        `;
    }
    
    renderPagination(totalReviews) {
        const totalPages = Math.ceil(totalReviews / this.reviewsPerPage);
        
        if (totalPages <= 1) return '';
        
        return `
            <div class="reviews-pagination">
                <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                        onclick="reviewsDisplay.goToPage(${this.currentPage - 1})">
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <div class="page-numbers">
                    ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
                        <button class="pagination-btn ${page === this.currentPage ? 'active' : ''}"
                                onclick="reviewsDisplay.goToPage(${page})">${page}</button>
                    `).join('')}
                </div>
                <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''}
                        onclick="reviewsDisplay.goToPage(${this.currentPage + 1})">
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Event listeners are set up via onclick attributes in the HTML
    }
    
    setSort(sortBy) {
        this.currentSort = sortBy;
        this.currentPage = 1;
        this.render();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        this.render();
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.render();
    }
    
    markHelpful(reviewId, helpful) {
        this.reviewsSystem.markReviewHelpful(reviewId, helpful);
        this.render();
    }
    
    reportReview(reviewId) {
        const reason = prompt('Please provide a reason for reporting this review:');
        if (reason) {
            this.reviewsSystem.reportReview(reviewId, reason);
        }
    }
    
    showImageModal(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                <img src="${imageSrc}" alt="Review image" style="max-width: 100%; max-height: 80vh;">
            </div>
        `;
        document.body.appendChild(modal);
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
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize global instances
let reviewsSystem = new ReviewsSystem();
let reviewForm = null;
let reviewsDisplay = null;

// Export for global access
window.ReviewsSystem = ReviewsSystem;
window.ReviewForm = ReviewForm;
window.ReviewsDisplay = ReviewsDisplay;

