/**
 * Product Installation Guides and Manuals Manager
 * Handles installation guides, user manuals, setup instructions, and troubleshooting guides
 */

class ProductInstallationManager {
    constructor() {
        this.installationData = {
            '1': { // Product ID 1
                guides: [
                    {
                        id: 'quick_start',
                        title: 'Quick Start Guide',
                        type: 'guide',
                        difficulty: 'beginner',
                        duration: '5-10 minutes',
                        description: 'Get your headphones up and running in minutes with this simple setup guide.',
                        steps: [
                            {
                                step: 1,
                                title: 'Unbox and Check Contents',
                                description: 'Remove all items from the box and verify you have the headphones, charging cable, and user manual.',
                                image: 'https://via.placeholder.com/400x300?text=Unboxing',
                                tips: ['Keep the original packaging for warranty purposes', 'Check for any visible damage']
                            },
                            {
                                step: 2,
                                title: 'Charge Your Headphones',
                                description: 'Connect the included USB-C cable to charge your headphones for at least 2 hours before first use.',
                                image: 'https://via.placeholder.com/400x300?text=Charging',
                                tips: ['LED indicator will show charging status', 'Full charge takes approximately 2-3 hours']
                            },
                            {
                                step: 3,
                                title: 'Power On and Pair',
                                description: 'Press and hold the power button for 3 seconds, then select "AeroSound Pro" from your device\'s Bluetooth settings.',
                                image: 'https://via.placeholder.com/400x300?text=Pairing',
                                tips: ['Make sure Bluetooth is enabled on your device', 'Keep devices within 3 feet during pairing']
                            },
                            {
                                step: 4,
                                title: 'Test Audio and Controls',
                                description: 'Play some music and test the volume controls, play/pause button, and noise cancellation feature.',
                                image: 'https://via.placeholder.com/400x300?text=Testing',
                                tips: ['Try different music genres to test audio quality', 'Test all physical buttons and touch controls']
                            }
                        ],
                        requirements: ['Smartphone, tablet, or computer with Bluetooth', 'USB-C charging cable (included)', '2-3 hours for initial charge'],
                        troubleshooting: [
                            {
                                issue: 'Headphones won\'t turn on',
                                solution: 'Ensure the headphones are fully charged. Press and hold the power button for 5 seconds.'
                            },
                            {
                                issue: 'Can\'t find device in Bluetooth settings',
                                solution: 'Make sure the headphones are in pairing mode (LED should be blinking blue).'
                            }
                        ]
                    },
                    {
                        id: 'advanced_setup',
                        title: 'Advanced Setup Guide',
                        type: 'guide',
                        difficulty: 'intermediate',
                        duration: '15-20 minutes',
                        description: 'Configure advanced features like noise cancellation, equalizer settings, and app integration.',
                        steps: [
                            {
                                step: 1,
                                title: 'Download the Companion App',
                                description: 'Download the "AeroSound Pro" app from the App Store or Google Play Store.',
                                image: 'https://via.placeholder.com/400x300?text=App+Download',
                                tips: ['App is available for iOS and Android', 'Create an account for cloud sync features']
                            },
                            {
                                step: 2,
                                title: 'Connect to App',
                                description: 'Open the app and follow the on-screen instructions to connect your headphones.',
                                image: 'https://via.placeholder.com/400x300?text=App+Connection',
                                tips: ['Make sure headphones are connected via Bluetooth', 'Grant necessary permissions when prompted']
                            },
                            {
                                step: 3,
                                title: 'Configure Noise Cancellation',
                                description: 'Use the app to adjust noise cancellation levels and create custom profiles.',
                                image: 'https://via.placeholder.com/400x300?text=Noise+Cancellation',
                                tips: ['Test different environments (office, travel, home)', 'Save custom profiles for different situations']
                            },
                            {
                                step: 4,
                                title: 'Set Up Equalizer',
                                description: 'Customize your audio experience with the built-in equalizer and preset sound profiles.',
                                image: 'https://via.placeholder.com/400x300?text=Equalizer',
                                tips: ['Try different presets for various music genres', 'Create and save custom EQ settings']
                            }
                        ],
                        requirements: ['AeroSound Pro companion app', 'Smartphone with Bluetooth', 'Internet connection for app features'],
                        troubleshooting: [
                            {
                                issue: 'App can\'t find headphones',
                                solution: 'Ensure headphones are connected via Bluetooth and try restarting the app.'
                            },
                            {
                                issue: 'Noise cancellation not working',
                                solution: 'Check that noise cancellation is enabled in the app and headphones are properly fitted.'
                            }
                        ]
                    }
                ],
                manuals: [
                    {
                        id: 'user_manual',
                        title: 'User Manual',
                        type: 'manual',
                        format: 'PDF',
                        size: '5.2 MB',
                        pages: 48,
                        language: 'English',
                        version: '2.1',
                        lastUpdated: '2023-10-15',
                        description: 'Complete user manual covering all features, specifications, and troubleshooting.',
                        downloadUrl: '/manuals/aerosound-pro-user-manual.pdf',
                        sections: [
                            'Product Overview',
                            'Getting Started',
                            'Basic Operations',
                            'Advanced Features',
                            'App Integration',
                            'Troubleshooting',
                            'Specifications',
                            'Warranty Information'
                        ]
                    },
                    {
                        id: 'quick_reference',
                        title: 'Quick Reference Card',
                        type: 'manual',
                        format: 'PDF',
                        size: '1.8 MB',
                        pages: 4,
                        language: 'English',
                        version: '1.0',
                        lastUpdated: '2023-10-15',
                        description: 'Quick reference guide for common operations and button functions.',
                        downloadUrl: '/manuals/aerosound-pro-quick-reference.pdf',
                        sections: [
                            'Button Functions',
                            'LED Indicators',
                            'Common Operations',
                            'Troubleshooting Tips'
                        ]
                    }
                ],
                videos: [
                    {
                        id: 'unboxing_video',
                        title: 'Unboxing and First Setup',
                        duration: '3:45',
                        views: '125K',
                        uploadDate: '2023-09-20',
                        description: 'Watch as we unbox the AeroSound Pro headphones and walk through the initial setup process.',
                        thumbnail: 'https://via.placeholder.com/400x225?text=Unboxing+Video',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                    },
                    {
                        id: 'pairing_video',
                        title: 'How to Pair with Different Devices',
                        duration: '4:20',
                        views: '89K',
                        uploadDate: '2023-09-25',
                        description: 'Learn how to pair your AeroSound Pro headphones with smartphones, tablets, and computers.',
                        thumbnail: 'https://via.placeholder.com/400x225?text=Pairing+Video',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                    },
                    {
                        id: 'app_setup_video',
                        title: 'App Setup and Configuration',
                        duration: '6:15',
                        views: '67K',
                        uploadDate: '2023-10-01',
                        description: 'Complete walkthrough of the companion app setup and advanced feature configuration.',
                        thumbnail: 'https://via.placeholder.com/400x225?text=App+Setup+Video',
                        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                    }
                ],
                troubleshooting: [
                    {
                        category: 'Connection Issues',
                        problems: [
                            {
                                problem: 'Headphones won\'t connect to device',
                                solutions: [
                                    'Ensure Bluetooth is enabled on your device',
                                    'Reset headphones by holding power button for 10 seconds',
                                    'Remove headphones from device Bluetooth settings and re-pair',
                                    'Check if headphones are already connected to another device'
                                ],
                                prevention: 'Keep devices within 30 feet and avoid interference from other wireless devices'
                            },
                            {
                                problem: 'Audio cuts out or is choppy',
                                solutions: [
                                    'Move closer to your device (within 10 feet)',
                                    'Check for interference from WiFi or other Bluetooth devices',
                                    'Restart both headphones and your device',
                                    'Update device Bluetooth drivers'
                                ],
                                prevention: 'Avoid areas with heavy wireless interference'
                            }
                        ]
                    },
                    {
                        category: 'Audio Quality',
                        problems: [
                            {
                                problem: 'Poor audio quality or low volume',
                                solutions: [
                                    'Check volume levels on both device and headphones',
                                    'Clean the headphone drivers and ear cups',
                                    'Try different audio sources to isolate the issue',
                                    'Reset equalizer settings to default'
                                ],
                                prevention: 'Keep headphones clean and avoid extreme volume levels'
                            },
                            {
                                problem: 'Noise cancellation not working',
                                solutions: [
                                    'Ensure noise cancellation is enabled in the app',
                                    'Check that headphones are properly fitted',
                                    'Update to latest firmware version',
                                    'Try different noise cancellation modes'
                                ],
                                prevention: 'Regularly update firmware and maintain proper fit'
                            }
                        ]
                    },
                    {
                        category: 'Battery and Power',
                        problems: [
                            {
                                problem: 'Battery drains quickly',
                                solutions: [
                                    'Turn off noise cancellation when not needed',
                                    'Reduce volume levels',
                                    'Disable unnecessary app features',
                                    'Check for firmware updates'
                                ],
                                prevention: 'Use power-saving features and avoid extreme temperatures'
                            },
                            {
                                problem: 'Headphones won\'t charge',
                                solutions: [
                                    'Try a different USB-C cable',
                                    'Clean charging port with dry cloth',
                                    'Use original charging cable and adapter',
                                    'Check if charging port is damaged'
                                ],
                                prevention: 'Use only original charging accessories and keep port clean'
                            }
                        ]
                    }
                ],
                faq: [
                    {
                        question: 'How long does the battery last?',
                        answer: 'The AeroSound Pro headphones provide up to 30 hours of playback with noise cancellation off, and up to 20 hours with noise cancellation on. Charging time is approximately 2-3 hours for a full charge.'
                    },
                    {
                        question: 'Can I use these headphones while charging?',
                        answer: 'Yes, you can use the headphones while charging, but this may affect audio quality and charging speed. We recommend charging when not in use for optimal performance.'
                    },
                    {
                        question: 'Are the headphones waterproof?',
                        answer: 'The AeroSound Pro headphones are IPX4 rated, meaning they are resistant to splashes and light rain, but not suitable for swimming or submersion in water.'
                    },
                    {
                        question: 'Can I connect to multiple devices at once?',
                        answer: 'The headphones can remember up to 8 devices, but can only be actively connected to one device at a time. You can easily switch between devices using the app or Bluetooth settings.'
                    },
                    {
                        question: 'How do I update the firmware?',
                        answer: 'Firmware updates are handled automatically through the companion app when connected to WiFi. You can also manually check for updates in the app settings.'
                    }
                ]
            },
            '2': {
                guides: [
                    {
                        id: 'smartphone_setup',
                        title: 'Smartphone Setup Guide',
                        type: 'guide',
                        difficulty: 'beginner',
                        duration: '3-5 minutes',
                        description: 'Quick setup guide for connecting to smartphones and tablets.',
                        steps: [
                            {
                                step: 1,
                                title: 'Enable Bluetooth',
                                description: 'Go to your device settings and enable Bluetooth.',
                                image: 'https://via.placeholder.com/400x300?text=Bluetooth+Settings',
                                tips: ['Make sure Bluetooth is discoverable', 'Close other Bluetooth apps']
                            },
                            {
                                step: 2,
                                title: 'Put Device in Pairing Mode',
                                description: 'Press and hold the power button until the LED starts blinking.',
                                image: 'https://via.placeholder.com/400x300?text=Pairing+Mode',
                                tips: ['LED should blink blue', 'Keep device close during pairing']
                            }
                        ],
                        requirements: ['Smartphone or tablet with Bluetooth', 'Device in pairing mode'],
                        troubleshooting: [
                            {
                                issue: 'Device not found',
                                solution: 'Make sure both devices are in pairing mode and close to each other.'
                            }
                        ]
                    }
                ],
                manuals: [
                    {
                        id: 'user_manual_v2',
                        title: 'User Manual v2.0',
                        type: 'manual',
                        format: 'PDF',
                        size: '3.8 MB',
                        pages: 32,
                        language: 'English',
                        version: '2.0',
                        lastUpdated: '2023-09-10',
                        description: 'Updated user manual with latest features and improvements.',
                        downloadUrl: '/manuals/smartphone-pro-user-manual.pdf',
                        sections: [
                            'Getting Started',
                            'Basic Features',
                            'Advanced Settings',
                            'Troubleshooting'
                        ]
                    }
                ],
                videos: [],
                troubleshooting: [],
                faq: []
            }
        };
    }

    /**
     * Render the installation guides and manuals section
     */
    renderInstallationSection(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.installationData[productId] || this.installationData['1'];
        
        container.innerHTML = `
            <div class="installation-section">
                <div class="installation-header">
                    <h3><i class="fas fa-tools"></i> Installation Guides & Manuals</h3>
                    <p>Everything you need to get started with your new product, from quick setup to advanced configuration.</p>
                </div>

                <div class="installation-content">
                    <div class="installation-tabs">
                        <button class="installation-tab active" data-tab="guides">
                            <i class="fas fa-book-open"></i> Setup Guides
                        </button>
                        <button class="installation-tab" data-tab="manuals">
                            <i class="fas fa-file-pdf"></i> Manuals
                        </button>
                        <button class="installation-tab" data-tab="videos">
                            <i class="fas fa-play-circle"></i> Video Tutorials
                        </button>
                        <button class="installation-tab" data-tab="troubleshooting">
                            <i class="fas fa-wrench"></i> Troubleshooting
                        </button>
                        <button class="installation-tab" data-tab="faq">
                            <i class="fas fa-question-circle"></i> FAQ
                        </button>
                    </div>

                    <div class="installation-tab-content">
                        <div class="installation-tab-panel active" id="guides-panel">
                            ${this.renderGuidesPanel(data.guides)}
                        </div>
                        <div class="installation-tab-panel" id="manuals-panel">
                            ${this.renderManualsPanel(data.manuals)}
                        </div>
                        <div class="installation-tab-panel" id="videos-panel">
                            ${this.renderVideosPanel(data.videos)}
                        </div>
                        <div class="installation-tab-panel" id="troubleshooting-panel">
                            ${this.renderTroubleshootingPanel(data.troubleshooting)}
                        </div>
                        <div class="installation-tab-panel" id="faq-panel">
                            ${this.renderFAQPanel(data.faq)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initializeInstallationTabs();
    }

    /**
     * Render guides panel
     */
    renderGuidesPanel(guides) {
        if (!guides || guides.length === 0) {
            return `
                <div class="no-content">
                    <i class="fas fa-book-open"></i>
                    <h4>No Setup Guides Available</h4>
                    <p>Setup guides for this product are coming soon.</p>
                </div>
            `;
        }

        return `
            <div class="guides-content">
                <div class="guides-grid">
                    ${guides.map(guide => `
                        <div class="guide-card" data-guide-id="${guide.id}">
                            <div class="guide-header">
                                <div class="guide-icon">
                                    <i class="fas fa-${this.getGuideIcon(guide.type)}"></i>
                                </div>
                                <div class="guide-meta">
                                    <div class="guide-difficulty difficulty-${guide.difficulty}">
                                        ${guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}
                                    </div>
                                    <div class="guide-duration">
                                        <i class="fas fa-clock"></i> ${guide.duration}
                                    </div>
                                </div>
                            </div>
                            <div class="guide-content">
                                <h4>${guide.title}</h4>
                                <p>${guide.description}</p>
                                <div class="guide-requirements">
                                    <h5>Requirements:</h5>
                                    <ul>
                                        ${guide.requirements.map(req => `<li>${req}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="guide-actions">
                                <button class="btn btn-primary" onclick="productInstallationManager.openGuideModal('${guide.id}')">
                                    <i class="fas fa-play"></i> Start Guide
                                </button>
                                <button class="btn btn-outline" onclick="productInstallationManager.downloadGuide('${guide.id}')">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render manuals panel
     */
    renderManualsPanel(manuals) {
        if (!manuals || manuals.length === 0) {
            return `
                <div class="no-content">
                    <i class="fas fa-file-pdf"></i>
                    <h4>No Manuals Available</h4>
                    <p>User manuals for this product are coming soon.</p>
                </div>
            `;
        }

        return `
            <div class="manuals-content">
                <div class="manuals-grid">
                    ${manuals.map(manual => `
                        <div class="manual-card">
                            <div class="manual-header">
                                <div class="manual-icon">
                                    <i class="fas fa-file-pdf"></i>
                                </div>
                                <div class="manual-meta">
                                    <div class="manual-format">${manual.format}</div>
                                    <div class="manual-size">${manual.size}</div>
                                </div>
                            </div>
                            <div class="manual-content">
                                <h4>${manual.title}</h4>
                                <p>${manual.description}</p>
                                <div class="manual-details">
                                    <div class="manual-detail">
                                        <i class="fas fa-file-alt"></i>
                                        <span>${manual.pages} pages</span>
                                    </div>
                                    <div class="manual-detail">
                                        <i class="fas fa-globe"></i>
                                        <span>${manual.language}</span>
                                    </div>
                                    <div class="manual-detail">
                                        <i class="fas fa-tag"></i>
                                        <span>v${manual.version}</span>
                                    </div>
                                    <div class="manual-detail">
                                        <i class="fas fa-calendar"></i>
                                        <span>Updated ${new Date(manual.lastUpdated).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div class="manual-sections">
                                    <h5>Sections:</h5>
                                    <div class="sections-list">
                                        ${manual.sections.map(section => `<span class="section-tag">${section}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="manual-actions">
                                <a href="${manual.downloadUrl}" class="btn btn-primary" download>
                                    <i class="fas fa-download"></i> Download PDF
                                </a>
                                <button class="btn btn-outline" onclick="productInstallationManager.previewManual('${manual.id}')">
                                    <i class="fas fa-eye"></i> Preview
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render videos panel
     */
    renderVideosPanel(videos) {
        if (!videos || videos.length === 0) {
            return `
                <div class="no-content">
                    <i class="fas fa-play-circle"></i>
                    <h4>No Video Tutorials Available</h4>
                    <p>Video tutorials for this product are coming soon.</p>
                </div>
            `;
        }

        return `
            <div class="videos-content">
                <div class="videos-grid">
                    ${videos.map(video => `
                        <div class="video-card" data-video-id="${video.id}">
                            <div class="video-thumbnail" onclick="productInstallationManager.openVideoModal('${video.id}')">
                                <img src="${video.thumbnail}" alt="${video.title}">
                                <div class="video-play-overlay">
                                    <i class="fas fa-play"></i>
                                </div>
                                <div class="video-duration">${video.duration}</div>
                            </div>
                            <div class="video-content">
                                <h4>${video.title}</h4>
                                <p>${video.description}</p>
                                <div class="video-meta">
                                    <div class="video-views">
                                        <i class="fas fa-eye"></i> ${video.views} views
                                    </div>
                                    <div class="video-date">
                                        <i class="fas fa-calendar"></i> ${new Date(video.uploadDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div class="video-actions">
                                <button class="btn btn-primary" onclick="productInstallationManager.openVideoModal('${video.id}')">
                                    <i class="fas fa-play"></i> Watch Video
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render troubleshooting panel
     */
    renderTroubleshootingPanel(troubleshooting) {
        if (!troubleshooting || troubleshooting.length === 0) {
            return `
                <div class="no-content">
                    <i class="fas fa-wrench"></i>
                    <h4>No Troubleshooting Available</h4>
                    <p>Troubleshooting guides for this product are coming soon.</p>
                </div>
            `;
        }

        return `
            <div class="troubleshooting-content">
                <div class="troubleshooting-categories">
                    ${troubleshooting.map(category => `
                        <div class="troubleshooting-category">
                            <div class="category-header">
                                <h4><i class="fas fa-${this.getTroubleshootingIcon(category.category)}"></i> ${category.category}</h4>
                            </div>
                            <div class="problems-list">
                                ${category.problems.map(problem => `
                                    <div class="problem-item">
                                        <div class="problem-header" onclick="productInstallationManager.toggleProblem('${category.category.replace(/\s+/g, '_')}_${problem.problem.replace(/\s+/g, '_')}')">
                                            <h5>${problem.problem}</h5>
                                            <i class="fas fa-chevron-down"></i>
                                        </div>
                                        <div class="problem-content" id="${category.category.replace(/\s+/g, '_')}_${problem.problem.replace(/\s+/g, '_')}">
                                            <div class="solutions">
                                                <h6>Solutions:</h6>
                                                <ol>
                                                    ${problem.solutions.map(solution => `<li>${solution}</li>`).join('')}
                                                </ol>
                                            </div>
                                            ${problem.prevention ? `
                                                <div class="prevention">
                                                    <h6>Prevention:</h6>
                                                    <p>${problem.prevention}</p>
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render FAQ panel
     */
    renderFAQPanel(faq) {
        if (!faq || faq.length === 0) {
            return `
                <div class="no-content">
                    <i class="fas fa-question-circle"></i>
                    <h4>No FAQ Available</h4>
                    <p>Frequently asked questions for this product are coming soon.</p>
                </div>
            `;
        }

        return `
            <div class="faq-content">
                <div class="faq-list">
                    ${faq.map((item, index) => `
                        <div class="faq-item">
                            <div class="faq-question" onclick="productInstallationManager.toggleFAQ(${index})">
                                <h4>${item.question}</h4>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="faq-answer" id="faq-answer-${index}">
                                <p>${item.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Open guide modal
     */
    openGuideModal(guideId) {
        const modal = document.getElementById('guideModal');
        if (!modal) {
            this.createGuideModal();
        }
        
        // Find the guide data
        const guide = this.findGuideById(guideId);
        if (guide) {
            this.populateGuideModal(guide);
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open video modal
     */
    openVideoModal(videoId) {
        const modal = document.getElementById('videoModal');
        if (!modal) {
            this.createVideoModal();
        }
        
        // Find the video data
        const video = this.findVideoById(videoId);
        if (video) {
            this.populateVideoModal(video);
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create guide modal
     */
    createGuideModal() {
        const modalHTML = `
            <div id="guideModal" class="modal guide-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-book-open"></i> Setup Guide</h3>
                        <button class="close-btn" onclick="productInstallationManager.closeGuideModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="guideContent">
                            <!-- Guide content will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create video modal
     */
    createVideoModal() {
        const modalHTML = `
            <div id="videoModal" class="modal video-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-play-circle"></i> Video Tutorial</h3>
                        <button class="close-btn" onclick="productInstallationManager.closeVideoModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="videoContent">
                            <!-- Video content will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Initialize installation tabs
     */
    initializeInstallationTabs() {
        const tabs = document.querySelectorAll('.installation-tab');
        const panels = document.querySelectorAll('.installation-tab-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                document.getElementById(`${targetTab}-panel`).classList.add('active');
            });
        });
    }

    /**
     * Toggle problem details
     */
    toggleProblem(problemId) {
        const content = document.getElementById(problemId);
        const header = content.previousElementSibling;
        const icon = header.querySelector('i');
        
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            content.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }

    /**
     * Toggle FAQ answer
     */
    toggleFAQ(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const question = answer.previousElementSibling;
        const icon = question.querySelector('i');
        
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            answer.style.display = 'none';
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }

    /**
     * Helper methods
     */
    getGuideIcon(type) {
        switch (type) {
            case 'guide': return 'book-open';
            case 'tutorial': return 'graduation-cap';
            case 'manual': return 'book';
            default: return 'file-alt';
        }
    }

    getTroubleshootingIcon(category) {
        switch (category.toLowerCase()) {
            case 'connection issues': return 'wifi';
            case 'audio quality': return 'volume-up';
            case 'battery and power': return 'battery-half';
            default: return 'exclamation-triangle';
        }
    }

    findGuideById(guideId) {
        for (const productId in this.installationData) {
            const guides = this.installationData[productId].guides;
            const guide = guides.find(g => g.id === guideId);
            if (guide) return guide;
        }
        return null;
    }

    findVideoById(videoId) {
        for (const productId in this.installationData) {
            const videos = this.installationData[productId].videos;
            const video = videos.find(v => v.id === videoId);
            if (video) return video;
        }
        return null;
    }

    /**
     * Populate guide modal
     */
    populateGuideModal(guide) {
        const content = document.getElementById('guideContent');
        if (content) {
            content.innerHTML = `
                <div class="guide-modal-content">
                    <div class="guide-header">
                        <h4>${guide.title}</h4>
                        <div class="guide-meta">
                            <span class="difficulty difficulty-${guide.difficulty}">${guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}</span>
                            <span class="duration"><i class="fas fa-clock"></i> ${guide.duration}</span>
                        </div>
                        <p>${guide.description}</p>
                    </div>
                    
                    <div class="guide-steps">
                        ${guide.steps.map(step => `
                            <div class="guide-step">
                                <div class="step-header">
                                    <div class="step-number">${step.step}</div>
                                    <h5>${step.title}</h5>
                                </div>
                                <div class="step-content">
                                    <p>${step.description}</p>
                                    ${step.image ? `<img src="${step.image}" alt="${step.title}" class="step-image">` : ''}
                                    ${step.tips ? `
                                        <div class="step-tips">
                                            <h6>Tips:</h6>
                                            <ul>
                                                ${step.tips.map(tip => `<li>${tip}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${guide.troubleshooting ? `
                        <div class="guide-troubleshooting">
                            <h5>Common Issues:</h5>
                            ${guide.troubleshooting.map(issue => `
                                <div class="troubleshooting-item">
                                    <strong>${issue.issue}:</strong> ${issue.solution}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    /**
     * Populate video modal
     */
    populateVideoModal(video) {
        const content = document.getElementById('videoContent');
        if (content) {
            content.innerHTML = `
                <div class="video-modal-content">
                    <div class="video-player">
                        <iframe src="${video.videoUrl}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="video-info">
                        <h4>${video.title}</h4>
                        <p>${video.description}</p>
                        <div class="video-stats">
                            <span><i class="fas fa-eye"></i> ${video.views} views</span>
                            <span><i class="fas fa-calendar"></i> ${new Date(video.uploadDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Close modals
     */
    closeGuideModal() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Download guide
     */
    downloadGuide(guideId) {
        // This would typically download a PDF version of the guide
        alert(`Downloading guide: ${guideId}`);
    }

    /**
     * Preview manual
     */
    previewManual(manualId) {
        // This would open a PDF preview modal
        alert(`Previewing manual: ${manualId}`);
    }
}

// Initialize the manager
const productInstallationManager = new ProductInstallationManager();

// Global functions for modal interactions
window.openGuideModal = (guideId) => productInstallationManager.openGuideModal(guideId);
window.openVideoModal = (videoId) => productInstallationManager.openVideoModal(videoId);
window.closeGuideModal = () => productInstallationManager.closeGuideModal();
window.closeVideoModal = () => productInstallationManager.closeVideoModal();
window.toggleProblem = (problemId) => productInstallationManager.toggleProblem(problemId);
window.toggleFAQ = (index) => productInstallationManager.toggleFAQ(index);

