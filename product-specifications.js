// Product Specifications and Technical Details System

class ProductSpecificationsManager {
    constructor() {
        this.specifications = JSON.parse(localStorage.getItem('product_specifications') || '[]');
        this.technicalDetails = JSON.parse(localStorage.getItem('technical_details') || '[]');
        this.specificationTemplates = JSON.parse(localStorage.getItem('specification_templates') || '[]');
        this.initializeSpecificationData();
    }
    
    // Initialize with mock specification data
    initializeSpecificationData() {
        if (this.specifications.length === 0) {
            this.specifications = [
                {
                    productId: 'CJ-001',
                    category: 'electronics',
                    specifications: {
                        general: {
                            'Brand': 'TechMax',
                            'Model': 'TM-WE100',
                            'Product Type': 'Wireless Earbuds',
                            'Color': 'Black, White, Blue, Red',
                            'Weight': '5.2g per earbud',
                            'Dimensions': '2.5 x 1.8 x 2.1 cm',
                            'Package Contents': 'Earbuds, Charging Case, USB-C Cable, User Manual, Extra Ear Tips'
                        },
                        audio: {
                            'Driver Size': '10mm Dynamic Driver',
                            'Frequency Response': '20Hz - 20kHz',
                            'Impedance': '32Ω',
                            'Sensitivity': '98dB ± 3dB',
                            'Audio Codec': 'SBC, AAC, aptX',
                            'Noise Cancellation': 'Active Noise Cancellation (ANC)',
                            'Microphone': 'Dual MEMS Microphones with Noise Reduction'
                        },
                        connectivity: {
                            'Bluetooth Version': '5.2',
                            'Bluetooth Range': 'Up to 10 meters',
                            'Supported Profiles': 'A2DP, AVRCP, HFP, HSP',
                            'Compatibility': 'iOS 12+, Android 8.0+, Windows 10+',
                            'Pairing': 'Automatic pairing with last connected device'
                        },
                        battery: {
                            'Battery Life (Earbuds)': '6-8 hours continuous playback',
                            'Battery Life (Case)': '24 hours additional charge',
                            'Charging Time': '1.5 hours (earbuds), 2 hours (case)',
                            'Charging Method': 'USB-C, Wireless Charging (Qi compatible)',
                            'Battery Type': 'Lithium-ion',
                            'Standby Time': 'Up to 30 days'
                        },
                        features: {
                            'Touch Controls': 'Tap, Double-tap, Long-press gestures',
                            'Voice Assistant': 'Siri, Google Assistant, Alexa support',
                            'Water Resistance': 'IPX7 (30 minutes at 1 meter depth)',
                            'Sweat Resistance': 'Yes, suitable for workouts',
                            'Auto Play/Pause': 'Smart sensors detect when earbuds are removed',
                            'Find My Earbuds': 'Built-in location tracking'
                        }
                    }
                },
                {
                    productId: 'CJ-002',
                    category: 'electronics',
                    specifications: {
                        general: {
                            'Brand': 'FitTech',
                            'Model': 'FT-SMART-200',
                            'Product Type': 'Smart Fitness Tracker',
                            'Color': 'Black, Silver, Gold',
                            'Weight': '25g',
                            'Dimensions': '4.5 x 2.2 x 1.2 cm',
                            'Package Contents': 'Fitness Tracker, Charging Cable, User Manual, Warranty Card'
                        },
                        display: {
                            'Screen Type': '1.4" AMOLED Touch Display',
                            'Resolution': '320 x 360 pixels',
                            'Brightness': 'Up to 1000 nits',
                            'Always-On Display': 'Yes, customizable',
                            'Screen Protection': 'Corning Gorilla Glass 3'
                        },
                        sensors: {
                            'Heart Rate Monitor': '24/7 continuous monitoring',
                            'Blood Oxygen (SpO2)': 'Real-time measurement',
                            'Sleep Tracking': 'Advanced sleep stages analysis',
                            'Step Counter': '3-axis accelerometer',
                            'Calorie Burn': 'Advanced algorithm with heart rate',
                            'Stress Monitor': 'HRV-based stress tracking',
                            'Temperature Sensor': 'Body temperature monitoring'
                        },
                        connectivity: {
                            'Bluetooth Version': '5.0',
                            'Compatibility': 'iOS 12+, Android 8.0+',
                            'GPS': 'Built-in GPS + GLONASS',
                            'WiFi': '2.4GHz WiFi for faster sync',
                            'NFC': 'Yes, for contactless payments'
                        },
                        battery: {
                            'Battery Life': 'Up to 7 days typical use',
                            'Battery Life (GPS)': 'Up to 20 hours continuous GPS',
                            'Charging Time': '2 hours for full charge',
                            'Charging Method': 'Magnetic charging dock',
                            'Battery Type': 'Lithium-polymer'
                        },
                        fitness: {
                            'Workout Modes': '100+ sport modes',
                            'Water Resistance': '5ATM (50 meters)',
                            'Auto Workout Detection': 'Yes, for running and cycling',
                            'Recovery Time': 'Advanced recovery metrics',
                            'Training Load': 'Real-time training load analysis'
                        }
                    }
                },
                {
                    productId: 'CJ-003',
                    category: 'electronics',
                    specifications: {
                        general: {
                            'Brand': 'LEDMax',
                            'Model': 'LM-STRIP-300',
                            'Product Type': 'Smart LED Strip Lights',
                            'Color': 'Warm White, Cool White, RGB',
                            'Length': '5m, 10m, 20m options',
                            'Weight': '200g per 5m strip',
                            'Package Contents': 'LED Strip, Power Adapter, Remote Control, User Manual'
                        },
                        lighting: {
                            'LED Count': '300 LEDs per meter',
                            'LED Type': 'SMD 5050 RGB LEDs',
                            'Power Consumption': '18W per meter',
                            'Brightness': 'Up to 1500 lumens per meter',
                            'Color Temperature': '2700K - 6500K (white modes)',
                            'Color Accuracy': '16.7 million colors',
                            'Dimming Range': '1% - 100%'
                        },
                        connectivity: {
                            'Control Method': 'Smartphone App, Remote Control, Voice Control',
                            'WiFi': '2.4GHz WiFi connectivity',
                            'Bluetooth': 'Bluetooth 4.0 for direct control',
                            'Voice Assistant': 'Alexa, Google Assistant compatible',
                            'App Compatibility': 'iOS 12+, Android 8.0+'
                        },
                        features: {
                            'Music Sync': 'Real-time music visualization',
                            'Scene Modes': '50+ preset scenes',
                            'Timer Function': 'Customizable on/off schedules',
                            'Group Control': 'Control multiple strips simultaneously',
                            'Memory Function': 'Saves last used settings',
                            'Cuttable': 'Cut every 3 LEDs (10cm intervals)'
                        },
                        installation: {
                            'Installation': 'Self-adhesive backing',
                            'Operating Temperature': '-20°C to 60°C',
                            'Storage Temperature': '-30°C to 80°C',
                            'Humidity': '5% - 95% RH (non-condensing)',
                            'Certification': 'CE, FCC, RoHS certified'
                        }
                    }
                },
                {
                    productId: 'CJ-004',
                    category: 'accessories',
                    specifications: {
                        general: {
                            'Brand': 'DeskPro',
                            'Model': 'DP-PHONE-001',
                            'Product Type': 'Adjustable Phone Stand',
                            'Material': 'Plastic, Aluminum, Wood options',
                            'Color': 'Black, Silver, Natural Wood',
                            'Weight': '180g (Aluminum), 120g (Plastic), 200g (Wood)',
                            'Package Contents': 'Phone Stand, User Manual'
                        },
                        compatibility: {
                            'Phone Size': '4" - 7" smartphones',
                            'Weight Capacity': 'Up to 1kg (2.2 lbs)',
                            'Case Compatibility': 'Works with most phone cases',
                            'Universal Design': 'Fits all smartphone brands'
                        },
                        design: {
                            'Adjustment': 'Adjustable angle (0° - 80°)',
                            'Base Type': 'Non-slip rubber base',
                            'Height': 'Adjustable 8-15cm',
                            'Stability': 'Wide base for stability',
                            'Cable Management': 'Built-in cable routing'
                        },
                        features: {
                            '360° Rotation': 'Full rotation capability',
                            'Portrait/Landscape': 'Both orientations supported',
                            'Foldable': 'Collapsible for easy storage',
                            'Anti-Slip': 'Rubberized phone holder',
                            'Durability': 'High-quality materials'
                        }
                    }
                },
                {
                    productId: 'CJ-007',
                    category: 'accessories',
                    specifications: {
                        general: {
                            'Brand': 'StyleMax',
                            'Model': 'SM-SUNGLASSES-001',
                            'Product Type': 'Polarized Sunglasses',
                            'Frame Material': 'Acetate, Metal, Titanium options',
                            'Lens Material': 'CR-39, Polycarbonate, Glass',
                            'Color': 'Black, Brown, Tortoise frame options',
                            'Package Contents': 'Sunglasses, Case, Cleaning Cloth, Warranty Card'
                        },
                        lens: {
                            'Lens Type': 'Standard, Polarized, Blue Light Filter',
                            'UV Protection': '100% UVA/UVB protection',
                            'Lens Color': 'Multiple color options available',
                            'Polarization': 'Vertical polarization (if applicable)',
                            'Blue Light Filter': 'Blocks 40% blue light (if applicable)',
                            'Lens Coating': 'Anti-reflective, scratch-resistant'
                        },
                        frame: {
                            'Frame Style': 'Full rim, Semi-rimless, Rimless',
                            'Nose Pads': 'Adjustable silicone nose pads',
                            'Temple Length': '140mm, 150mm, 160mm options',
                            'Bridge Width': '18mm, 20mm, 22mm options',
                            'Hinge Type': 'Spring hinge for durability'
                        },
                        features: {
                            'Impact Resistance': 'ANSI Z87.1 certified',
                            'Scratch Resistance': 'Hard-coated lenses',
                            'Anti-Fog': 'Anti-fog coating available',
                            'Prescription Ready': 'Can accommodate prescription lenses',
                            'Warranty': '2-year manufacturer warranty'
                        }
                    }
                }
            ];
            
            this.saveSpecifications();
        }
        
        if (this.technicalDetails.length === 0) {
            this.initializeTechnicalDetails();
        }
        
        if (this.specificationTemplates.length === 0) {
            this.initializeSpecificationTemplates();
        }
    }
    
    // Initialize technical details
    initializeTechnicalDetails() {
        this.technicalDetails = [
            {
                productId: 'CJ-001',
                technicalDetails: {
                    certifications: [
                        'FCC ID: 2A7TM-TMWE100',
                        'CE Marking',
                        'RoHS Compliant',
                        'Bluetooth SIG Certified',
                        'IPX7 Water Resistance Rating'
                    ],
                    warranty: {
                        'Manufacturer Warranty': '2 years from date of purchase',
                        'Coverage': 'Defects in materials and workmanship',
                        'Exclusions': 'Physical damage, water damage, normal wear',
                        'Service Centers': 'Authorized service centers worldwide'
                    },
                    compliance: {
                        'Safety Standards': 'FCC Part 15, CE, IC',
                        'Environmental': 'RoHS, REACH compliant',
                        'Packaging': 'Recyclable packaging materials',
                        'Disposal': 'WEEE compliant disposal instructions'
                    },
                    technicalSupport: {
                        'Support Hours': '24/7 online support',
                        'Phone Support': 'Monday-Friday 9AM-6PM EST',
                        'Email Support': 'support@techmax.com',
                        'Live Chat': 'Available on website',
                        'User Manual': 'Downloadable PDF available'
                    }
                }
            },
            {
                productId: 'CJ-002',
                technicalDetails: {
                    certifications: [
                        'FCC ID: 2A7FT-FTSMART200',
                        'CE Marking',
                        'RoHS Compliant',
                        'Bluetooth SIG Certified',
                        '5ATM Water Resistance Rating'
                    ],
                    warranty: {
                        'Manufacturer Warranty': '1 year from date of purchase',
                        'Coverage': 'Defects in materials and workmanship',
                        'Exclusions': 'Physical damage, water damage, battery degradation',
                        'Service Centers': 'Authorized service centers worldwide'
                    },
                    compliance: {
                        'Safety Standards': 'FCC Part 15, CE, IC',
                        'Environmental': 'RoHS, REACH compliant',
                        'Medical Device': 'FDA Class I medical device',
                        'Packaging': 'Recyclable packaging materials'
                    },
                    technicalSupport: {
                        'Support Hours': '24/7 online support',
                        'Phone Support': 'Monday-Friday 9AM-6PM EST',
                        'Email Support': 'support@fittech.com',
                        'Live Chat': 'Available on website',
                        'User Manual': 'Downloadable PDF available'
                    }
                }
            }
        ];
        
        this.saveTechnicalDetails();
    }
    
    // Initialize specification templates
    initializeSpecificationTemplates() {
        this.specificationTemplates = {
            electronics: {
                general: ['Brand', 'Model', 'Product Type', 'Color', 'Weight', 'Dimensions', 'Package Contents'],
                audio: ['Driver Size', 'Frequency Response', 'Impedance', 'Sensitivity', 'Audio Codec', 'Noise Cancellation', 'Microphone'],
                connectivity: ['Bluetooth Version', 'Bluetooth Range', 'Supported Profiles', 'Compatibility', 'Pairing'],
                battery: ['Battery Life', 'Charging Time', 'Charging Method', 'Battery Type', 'Standby Time'],
                features: ['Touch Controls', 'Voice Assistant', 'Water Resistance', 'Sweat Resistance', 'Auto Play/Pause']
            },
            accessories: {
                general: ['Brand', 'Model', 'Product Type', 'Material', 'Color', 'Weight', 'Package Contents'],
                compatibility: ['Phone Size', 'Weight Capacity', 'Case Compatibility', 'Universal Design'],
                design: ['Adjustment', 'Base Type', 'Height', 'Stability', 'Cable Management'],
                features: ['360° Rotation', 'Portrait/Landscape', 'Foldable', 'Anti-Slip', 'Durability']
            },
            clothing: {
                general: ['Brand', 'Model', 'Product Type', 'Material', 'Color', 'Size', 'Package Contents'],
                sizing: ['Size Chart', 'Fit Type', 'Length', 'Width', 'Care Instructions'],
                features: ['Moisture Wicking', 'UV Protection', 'Breathability', 'Stretch', 'Durability']
            }
        };
        
        this.saveSpecificationTemplates();
    }
    
    // Get specifications for a product
    getProductSpecifications(productId) {
        return this.specifications.find(spec => spec.productId === productId);
    }
    
    // Get technical details for a product
    getProductTechnicalDetails(productId) {
        return this.technicalDetails.find(details => details.productId === productId);
    }
    
    // Get specification template for a category
    getSpecificationTemplate(category) {
        return this.specificationTemplates[category] || {};
    }
    
    // Render specifications section
    renderSpecifications(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const productSpecs = this.getProductSpecifications(productId);
        if (!productSpecs) {
            container.innerHTML = '';
            return;
        }
        
        const specifications = productSpecs.specifications;
        const categories = Object.keys(specifications);
        
        if (categories.length === 0) {
            container.innerHTML = '<div class="no-specifications">No specifications available for this product.</div>';
            return;
        }
        
        let html = `
            <div class="product-specifications">
                <div class="specs-header">
                    <h3>Product Specifications</h3>
                    <div class="specs-actions">
                        <button class="expand-all-btn" onclick="productSpecificationsManager.expandAllSpecs()">
                            <i class="fas fa-expand-arrows-alt"></i> Expand All
                        </button>
                        <button class="collapse-all-btn" onclick="productSpecificationsManager.collapseAllSpecs()">
                            <i class="fas fa-compress-arrows-alt"></i> Collapse All
                        </button>
                    </div>
                </div>
                
                <div class="specs-navigation">
                    ${categories.map(category => `
                        <button class="spec-category-btn" onclick="productSpecificationsManager.scrollToCategory('${category}')">
                            ${this.formatCategoryName(category)}
                        </button>
                    `).join('')}
                </div>
                
                <div class="specs-content">
                    ${categories.map(category => this.renderSpecificationCategory(category, specifications[category])).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.setupSpecificationEventListeners();
    }
    
    // Render specification category
    renderSpecificationCategory(categoryName, specifications) {
        const categoryId = `spec-category-${categoryName}`;
        const categoryIcon = this.getCategoryIcon(categoryName);
        
        return `
            <div class="spec-category" id="${categoryId}">
                <div class="spec-category-header" onclick="productSpecificationsManager.toggleCategory('${categoryName}')">
                    <div class="category-info">
                        <i class="${categoryIcon}"></i>
                        <h4>${this.formatCategoryName(categoryName)}</h4>
                        <span class="spec-count">${Object.keys(specifications).length} specifications</span>
                    </div>
                    <i class="fas fa-chevron-down category-toggle"></i>
                </div>
                
                <div class="spec-category-content">
                    <div class="specs-table">
                        ${Object.entries(specifications).map(([key, value]) => `
                            <div class="spec-row">
                                <div class="spec-label">${key}</div>
                                <div class="spec-value">${this.formatSpecificationValue(value)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render technical details section
    renderTechnicalDetails(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const technicalDetails = this.getProductTechnicalDetails(productId);
        if (!technicalDetails) {
            container.innerHTML = '';
            return;
        }
        
        const details = technicalDetails.technicalDetails;
        
        let html = `
            <div class="technical-details">
                <div class="tech-header">
                    <h3>Technical Details & Support</h3>
                </div>
                
                <div class="tech-content">
                    ${this.renderTechnicalSection('Certifications', details.certifications, 'fas fa-certificate')}
                    ${this.renderTechnicalSection('Warranty Information', details.warranty, 'fas fa-shield-alt')}
                    ${this.renderTechnicalSection('Compliance & Standards', details.compliance, 'fas fa-check-circle')}
                    ${this.renderTechnicalSection('Technical Support', details.technicalSupport, 'fas fa-headset')}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    // Render technical section
    renderTechnicalSection(title, data, icon) {
        if (!data) return '';
        
        return `
            <div class="tech-section">
                <div class="tech-section-header">
                    <i class="${icon}"></i>
                    <h4>${title}</h4>
                </div>
                <div class="tech-section-content">
                    ${Array.isArray(data) ? 
                        `<ul class="tech-list">${data.map(item => `<li>${item}</li>`).join('')}</ul>` :
                        Object.entries(data).map(([key, value]) => `
                            <div class="tech-item">
                                <span class="tech-key">${key}:</span>
                                <span class="tech-value">${value}</span>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    }
    
    // Toggle category expansion
    toggleCategory(categoryName) {
        const category = document.getElementById(`spec-category-${categoryName}`);
        const content = category.querySelector('.spec-category-content');
        const toggle = category.querySelector('.category-toggle');
        
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            toggle.style.transform = 'rotate(180deg)';
            category.classList.add('expanded');
        } else {
            content.style.display = 'none';
            toggle.style.transform = 'rotate(0deg)';
            category.classList.remove('expanded');
        }
    }
    
    // Expand all specifications
    expandAllSpecs() {
        const categories = document.querySelectorAll('.spec-category');
        categories.forEach(category => {
            const content = category.querySelector('.spec-category-content');
            const toggle = category.querySelector('.category-toggle');
            content.style.display = 'block';
            toggle.style.transform = 'rotate(180deg)';
            category.classList.add('expanded');
        });
    }
    
    // Collapse all specifications
    collapseAllSpecs() {
        const categories = document.querySelectorAll('.spec-category');
        categories.forEach(category => {
            const content = category.querySelector('.spec-category-content');
            const toggle = category.querySelector('.category-toggle');
            content.style.display = 'none';
            toggle.style.transform = 'rotate(0deg)';
            category.classList.remove('expanded');
        });
    }
    
    // Scroll to category
    scrollToCategory(categoryName) {
        const category = document.getElementById(`spec-category-${categoryName}`);
        if (category) {
            category.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Expand the category if it's collapsed
            const content = category.querySelector('.spec-category-content');
            if (content.style.display === 'none' || content.style.display === '') {
                this.toggleCategory(categoryName);
            }
        }
    }
    
    // Format category name
    formatCategoryName(category) {
        const nameMap = {
            'general': 'General',
            'audio': 'Audio',
            'connectivity': 'Connectivity',
            'battery': 'Battery',
            'features': 'Features',
            'display': 'Display',
            'sensors': 'Sensors',
            'fitness': 'Fitness',
            'lighting': 'Lighting',
            'installation': 'Installation',
            'compatibility': 'Compatibility',
            'design': 'Design',
            'lens': 'Lens',
            'frame': 'Frame'
        };
        
        return nameMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Get category icon
    getCategoryIcon(category) {
        const iconMap = {
            'general': 'fas fa-info-circle',
            'audio': 'fas fa-volume-up',
            'connectivity': 'fas fa-wifi',
            'battery': 'fas fa-battery-full',
            'features': 'fas fa-star',
            'display': 'fas fa-tv',
            'sensors': 'fas fa-heartbeat',
            'fitness': 'fas fa-dumbbell',
            'lighting': 'fas fa-lightbulb',
            'installation': 'fas fa-tools',
            'compatibility': 'fas fa-mobile-alt',
            'design': 'fas fa-palette',
            'lens': 'fas fa-eye',
            'frame': 'fas fa-square'
        };
        
        return iconMap[category] || 'fas fa-cog';
    }
    
    // Format specification value
    formatSpecificationValue(value) {
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
        
        return value;
    }
    
    // Setup event listeners
    setupSpecificationEventListeners() {
        // Add any additional event listeners here
    }
    
    // Save data to localStorage
    saveSpecifications() {
        localStorage.setItem('product_specifications', JSON.stringify(this.specifications));
    }
    
    saveTechnicalDetails() {
        localStorage.setItem('technical_details', JSON.stringify(this.technicalDetails));
    }
    
    saveSpecificationTemplates() {
        localStorage.setItem('specification_templates', JSON.stringify(this.specificationTemplates));
    }
}

// Initialize global instance
let productSpecificationsManager = new ProductSpecificationsManager();

// Export for global access
window.ProductSpecificationsManager = ProductSpecificationsManager;

