// Product Videos and Multimedia Content System

class ProductMultimediaManager {
    constructor() {
        this.multimediaContent = JSON.parse(localStorage.getItem('product_multimedia') || '[]');
        this.videoAnalytics = JSON.parse(localStorage.getItem('video_analytics') || '[]');
        this.initializeMultimediaData();
    }
    
    // Initialize with mock multimedia data
    initializeMultimediaData() {
        if (this.multimediaContent.length === 0) {
            this.multimediaContent = [
                {
                    productId: 'CJ-001',
                    multimedia: {
                        videos: [
                            {
                                id: 'video-001',
                                title: 'Product Overview',
                                description: 'Complete overview of the wireless earbuds features and design',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/000000/FFFFFF?text=Product+Overview',
                                duration: '2:30',
                                type: 'overview',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 15420,
                                likes: 892,
                                uploadDate: '2024-01-10'
                            },
                            {
                                id: 'video-002',
                                title: 'Setup and Pairing Guide',
                                description: 'Step-by-step guide to set up and pair your earbuds',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/8B4513/FFFFFF?text=Setup+Guide',
                                duration: '1:45',
                                type: 'tutorial',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 8930,
                                likes: 456,
                                uploadDate: '2024-01-08'
                            },
                            {
                                id: 'video-003',
                                title: 'Sound Quality Demo',
                                description: 'Experience the premium sound quality and noise cancellation',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/000000/FFFFFF?text=Sound+Demo',
                                duration: '3:15',
                                type: 'demo',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 12300,
                                likes: 678,
                                uploadDate: '2024-01-05'
                            },
                            {
                                id: 'video-004',
                                title: 'Water Resistance Test',
                                description: 'Watch our earbuds survive various water resistance tests',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/0066CC/FFFFFF?text=Water+Test',
                                duration: '2:00',
                                type: 'test',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 9870,
                                likes: 523,
                                uploadDate: '2024-01-03'
                            }
                        ],
                        images: [
                            {
                                id: 'img-001',
                                title: '360° View',
                                description: 'Interactive 360-degree view of the product',
                                url: 'https://via.placeholder.com/800x600/000000/FFFFFF?text=360+View',
                                type: '360',
                                alt: '360 degree view of wireless earbuds',
                                gallery: true,
                                zoomable: true
                            },
                            {
                                id: 'img-002',
                                title: 'Size Comparison',
                                description: 'Size comparison with everyday objects',
                                url: 'https://via.placeholder.com/800x600/8B4513/FFFFFF?text=Size+Comparison',
                                type: 'comparison',
                                alt: 'Size comparison of wireless earbuds',
                                gallery: true,
                                zoomable: true
                            },
                            {
                                id: 'img-003',
                                title: 'Color Variants',
                                description: 'All available color options',
                                url: 'https://via.placeholder.com/800x600/FFFFFF/000000?text=Color+Variants',
                                type: 'variants',
                                alt: 'Color variants of wireless earbuds',
                                gallery: true,
                                zoomable: true
                            }
                        ],
                        documents: [
                            {
                                id: 'doc-001',
                                title: 'User Manual',
                                description: 'Complete user manual with setup and usage instructions',
                                url: '#',
                                type: 'pdf',
                                size: '2.5 MB',
                                pages: 24,
                                language: 'en',
                                downloadCount: 15420
                            },
                            {
                                id: 'doc-002',
                                title: 'Quick Start Guide',
                                description: 'Quick start guide for immediate setup',
                                url: '#',
                                type: 'pdf',
                                size: '1.2 MB',
                                pages: 8,
                                language: 'en',
                                downloadCount: 8930
                            },
                            {
                                id: 'doc-003',
                                title: 'Warranty Information',
                                description: 'Warranty terms and conditions',
                                url: '#',
                                type: 'pdf',
                                size: '0.8 MB',
                                pages: 4,
                                language: 'en',
                                downloadCount: 4560
                            }
                        ]
                    }
                },
                {
                    productId: 'CJ-002',
                    multimedia: {
                        videos: [
                            {
                                id: 'video-005',
                                title: 'Fitness Tracker Overview',
                                description: 'Complete overview of fitness tracking features',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/000000/FFFFFF?text=Fitness+Overview',
                                duration: '3:00',
                                type: 'overview',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 12800,
                                likes: 745,
                                uploadDate: '2024-01-12'
                            },
                            {
                                id: 'video-006',
                                title: 'Workout Modes Demo',
                                description: 'Demonstration of various workout tracking modes',
                                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                                thumbnail: 'https://via.placeholder.com/640x360/8B4513/FFFFFF?text=Workout+Modes',
                                duration: '2:45',
                                type: 'demo',
                                quality: ['720p', '1080p'],
                                language: 'en',
                                captions: true,
                                autoplay: false,
                                views: 9650,
                                likes: 432,
                                uploadDate: '2024-01-10'
                            }
                        ],
                        images: [
                            {
                                id: 'img-004',
                                title: 'Display Quality',
                                description: 'High-resolution display quality showcase',
                                url: 'https://via.placeholder.com/800x600/000000/FFFFFF?text=Display+Quality',
                                type: 'display',
                                alt: 'Fitness tracker display quality',
                                gallery: true,
                                zoomable: true
                            }
                        ],
                        documents: [
                            {
                                id: 'doc-004',
                                title: 'Fitness Tracker Manual',
                                description: 'Complete manual for fitness tracker setup and usage',
                                url: '#',
                                type: 'pdf',
                                size: '3.2 MB',
                                pages: 32,
                                language: 'en',
                                downloadCount: 12800
                            }
                        ]
                    }
                }
            ];
            
            this.saveMultimediaContent();
        }
    }
    
    // Get multimedia content for a product
    getProductMultimedia(productId) {
        return this.multimediaContent.find(content => content.productId === productId);
    }
    
    // Render multimedia section
    renderMultimediaSection(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const productMultimedia = this.getProductMultimedia(productId);
        if (!productMultimedia) {
            container.innerHTML = '';
            return;
        }
        
        const multimedia = productMultimedia.multimedia;
        
        let html = `
            <div class="product-multimedia">
                <div class="multimedia-header">
                    <h3>Product Videos & Media</h3>
                    <div class="multimedia-stats">
                        <span class="video-count">${multimedia.videos.length} videos</span>
                        <span class="image-count">${multimedia.images.length} images</span>
                        <span class="doc-count">${multimedia.documents.length} documents</span>
                    </div>
                </div>
                
                <div class="multimedia-navigation">
                    <button class="multimedia-tab active" onclick="productMultimediaManager.showTab('videos')">
                        <i class="fas fa-play-circle"></i> Videos
                    </button>
                    <button class="multimedia-tab" onclick="productMultimediaManager.showTab('images')">
                        <i class="fas fa-images"></i> Images
                    </button>
                    <button class="multimedia-tab" onclick="productMultimediaManager.showTab('documents')">
                        <i class="fas fa-file-pdf"></i> Documents
                    </button>
                </div>
                
                <div class="multimedia-content">
                    <div class="multimedia-tab-content active" id="videos-tab">
                        ${this.renderVideosSection(multimedia.videos)}
                    </div>
                    <div class="multimedia-tab-content" id="images-tab">
                        ${this.renderImagesSection(multimedia.images)}
                    </div>
                    <div class="multimedia-tab-content" id="documents-tab">
                        ${this.renderDocumentsSection(multimedia.documents)}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.setupMultimediaEventListeners();
    }
    
    // Render videos section
    renderVideosSection(videos) {
        if (videos.length === 0) {
            return '<div class="no-content">No videos available for this product.</div>';
        }
        
        return `
            <div class="videos-section">
                <div class="featured-video">
                    <h4>Featured Video</h4>
                    <div class="video-player" id="featuredVideoPlayer">
                        ${this.renderVideoPlayer(videos[0])}
                    </div>
                </div>
                
                <div class="video-gallery">
                    <h4>All Videos</h4>
                    <div class="video-grid">
                        ${videos.map(video => this.renderVideoThumbnail(video)).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render video player
    renderVideoPlayer(video) {
        return `
            <div class="video-container">
                <div class="video-wrapper">
                    <iframe 
                        src="${video.url}" 
                        title="${video.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h5>${video.title}</h5>
                    <p>${video.description}</p>
                    <div class="video-meta">
                        <span class="video-duration"><i class="fas fa-clock"></i> ${video.duration}</span>
                        <span class="video-views"><i class="fas fa-eye"></i> ${this.formatNumber(video.views)} views</span>
                        <span class="video-likes"><i class="fas fa-thumbs-up"></i> ${this.formatNumber(video.likes)}</span>
                        <span class="video-date"><i class="fas fa-calendar"></i> ${new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div class="video-actions">
                        <button class="video-action-btn" onclick="productMultimediaManager.likeVideo('${video.id}')">
                            <i class="fas fa-thumbs-up"></i> Like
                        </button>
                        <button class="video-action-btn" onclick="productMultimediaManager.shareVideo('${video.id}')">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="video-action-btn" onclick="productMultimediaManager.downloadVideo('${video.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render video thumbnail
    renderVideoThumbnail(video) {
        return `
            <div class="video-thumbnail" onclick="productMultimediaManager.playVideo('${video.id}')">
                <div class="thumbnail-image">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="play-overlay">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="video-duration-badge">${video.duration}</div>
                </div>
                <div class="thumbnail-info">
                    <h6>${video.title}</h6>
                    <p>${video.description}</p>
                    <div class="thumbnail-meta">
                        <span class="views">${this.formatNumber(video.views)} views</span>
                        <span class="likes">${this.formatNumber(video.likes)} likes</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render images section
    renderImagesSection(images) {
        if (images.length === 0) {
            return '<div class="no-content">No images available for this product.</div>';
        }
        
        return `
            <div class="images-section">
                <div class="image-gallery">
                    ${images.map(image => this.renderImageItem(image)).join('')}
                </div>
            </div>
        `;
    }
    
    // Render image item
    renderImageItem(image) {
        return `
            <div class="image-item" onclick="productMultimediaManager.openImageModal('${image.id}')">
                <div class="image-container">
                    <img src="${image.url}" alt="${image.alt}">
                    <div class="image-overlay">
                        <div class="image-actions">
                            <button class="image-action-btn" onclick="event.stopPropagation(); productMultimediaManager.zoomImage('${image.id}')">
                                <i class="fas fa-search-plus"></i>
                            </button>
                            <button class="image-action-btn" onclick="event.stopPropagation(); productMultimediaManager.downloadImage('${image.id}')">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="image-info">
                    <h6>${image.title}</h6>
                    <p>${image.description}</p>
                </div>
            </div>
        `;
    }
    
    // Render documents section
    renderDocumentsSection(documents) {
        if (documents.length === 0) {
            return '<div class="no-content">No documents available for this product.</div>';
        }
        
        return `
            <div class="documents-section">
                <div class="documents-list">
                    ${documents.map(doc => this.renderDocumentItem(doc)).join('')}
                </div>
            </div>
        `;
    }
    
    // Render document item
    renderDocumentItem(doc) {
        return `
            <div class="document-item">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <h6>${doc.title}</h6>
                    <p>${doc.description}</p>
                    <div class="document-meta">
                        <span class="doc-size">${doc.size}</span>
                        <span class="doc-pages">${doc.pages} pages</span>
                        <span class="doc-downloads">${this.formatNumber(doc.downloadCount)} downloads</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="document-action-btn" onclick="productMultimediaManager.previewDocument('${doc.id}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    <button class="document-action-btn primary" onclick="productMultimediaManager.downloadDocument('${doc.id}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `;
    }
    
    // Show multimedia tab
    showTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.multimedia-tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.multimedia-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Add active class to selected tab
        event.target.classList.add('active');
    }
    
    // Play video
    playVideo(videoId) {
        // Find video by ID and update featured player
        const productMultimedia = this.multimediaContent.find(content => 
            content.multimedia.videos.some(video => video.id === videoId)
        );
        
        if (productMultimedia) {
            const video = productMultimedia.multimedia.videos.find(v => v.id === videoId);
            if (video) {
                const player = document.getElementById('featuredVideoPlayer');
                player.innerHTML = this.renderVideoPlayer(video);
                
                // Track video play
                this.trackVideoAnalytics('play', videoId);
            }
        }
    }
    
    // Like video
    likeVideo(videoId) {
        // Find and update video likes
        this.multimediaContent.forEach(content => {
            const video = content.multimedia.videos.find(v => v.id === videoId);
            if (video) {
                video.likes++;
                this.saveMultimediaContent();
                
                // Update UI
                const likeBtn = event.target.closest('.video-action-btn');
                likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i> ${this.formatNumber(video.likes)}`;
                
                // Track analytics
                this.trackVideoAnalytics('like', videoId);
            }
        });
    }
    
    // Share video
    shareVideo(videoId) {
        // Find video
        const productMultimedia = this.multimediaContent.find(content => 
            content.multimedia.videos.some(video => video.id === videoId)
        );
        
        if (productMultimedia) {
            const video = productMultimedia.multimedia.videos.find(v => v.id === videoId);
            if (video && navigator.share) {
                navigator.share({
                    title: video.title,
                    text: video.description,
                    url: window.location.href
                });
            } else {
                // Fallback to clipboard
                navigator.clipboard.writeText(window.location.href);
                if (window.showNotification) {
                    window.showNotification('Link copied to clipboard!', 'success');
                }
            }
            
            // Track analytics
            this.trackVideoAnalytics('share', videoId);
        }
    }
    
    // Download video
    downloadVideo(videoId) {
        // Track analytics
        this.trackVideoAnalytics('download', videoId);
        
        if (window.showNotification) {
            window.showNotification('Video download started!', 'info');
        }
    }
    
    // Open image modal
    openImageModal(imageId) {
        // Find image
        const productMultimedia = this.multimediaContent.find(content => 
            content.multimedia.images.some(image => image.id === imageId)
        );
        
        if (productMultimedia) {
            const image = productMultimedia.multimedia.images.find(img => img.id === imageId);
            if (image) {
                const modal = document.createElement('div');
                modal.className = 'modal image-modal';
                modal.style.display = 'block';
                
                modal.innerHTML = `
                    <div class="modal-content image-modal-content">
                        <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
                        <div class="image-modal-container">
                            <img src="${image.url}" alt="${image.alt}">
                            <div class="image-modal-info">
                                <h4>${image.title}</h4>
                                <p>${image.description}</p>
                                <div class="image-modal-actions">
                                    <button class="btn btn-primary" onclick="productMultimediaManager.downloadImage('${image.id}')">
                                        <i class="fas fa-download"></i> Download
                                    </button>
                                    <button class="btn btn-secondary" onclick="productMultimediaManager.shareImage('${image.id}')">
                                        <i class="fas fa-share"></i> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
            }
        }
    }
    
    // Zoom image
    zoomImage(imageId) {
        // Implementation for image zoom
        if (window.showNotification) {
            window.showNotification('Image zoom feature coming soon!', 'info');
        }
    }
    
    // Download image
    downloadImage(imageId) {
        // Track analytics
        this.trackImageAnalytics('download', imageId);
        
        if (window.showNotification) {
            window.showNotification('Image download started!', 'info');
        }
    }
    
    // Share image
    shareImage(imageId) {
        // Track analytics
        this.trackImageAnalytics('share', imageId);
        
        if (window.showNotification) {
            window.showNotification('Image shared!', 'success');
        }
    }
    
    // Preview document
    previewDocument(docId) {
        // Track analytics
        this.trackDocumentAnalytics('preview', docId);
        
        if (window.showNotification) {
            window.showNotification('Document preview opened!', 'info');
        }
    }
    
    // Download document
    downloadDocument(docId) {
        // Find and update download count
        this.multimediaContent.forEach(content => {
            const doc = content.multimedia.documents.find(d => d.id === docId);
            if (doc) {
                doc.downloadCount++;
                this.saveMultimediaContent();
                
                // Update UI
                const downloadsSpan = event.target.closest('.document-item').querySelector('.doc-downloads');
                downloadsSpan.textContent = `${this.formatNumber(doc.downloadCount)} downloads`;
            }
        });
        
        // Track analytics
        this.trackDocumentAnalytics('download', docId);
        
        if (window.showNotification) {
            window.showNotification('Document download started!', 'info');
        }
    }
    
    // Format number for display
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // Track video analytics
    trackVideoAnalytics(action, videoId) {
        const analytics = {
            action: action,
            videoId: videoId,
            timestamp: new Date().toISOString()
        };
        
        this.videoAnalytics.push(analytics);
        this.saveVideoAnalytics();
    }
    
    // Track image analytics
    trackImageAnalytics(action, imageId) {
        const analytics = {
            action: action,
            imageId: imageId,
            timestamp: new Date().toISOString()
        };
        
        this.videoAnalytics.push(analytics);
        this.saveVideoAnalytics();
    }
    
    // Track document analytics
    trackDocumentAnalytics(action, docId) {
        const analytics = {
            action: action,
            docId: docId,
            timestamp: new Date().toISOString()
        };
        
        this.videoAnalytics.push(analytics);
        this.saveVideoAnalytics();
    }
    
    // Setup event listeners
    setupMultimediaEventListeners() {
        // Add any additional event listeners here
    }
    
    // Save data to localStorage
    saveMultimediaContent() {
        localStorage.setItem('product_multimedia', JSON.stringify(this.multimediaContent));
    }
    
    saveVideoAnalytics() {
        localStorage.setItem('video_analytics', JSON.stringify(this.videoAnalytics));
    }
}

// Initialize global instance
let productMultimediaManager = new ProductMultimediaManager();

// Export for global access
window.ProductMultimediaManager = ProductMultimediaManager;

