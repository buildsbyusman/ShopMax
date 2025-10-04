/**
 * Product Size Guides and Fit Information Manager
 * Handles size guides, fit information, measurement charts, and size recommendations
 */

class ProductSizeGuideManager {
    constructor() {
        this.sizeGuideData = {
            '1': { // Product ID 1 - Headphones
                productType: 'headphones',
                hasSizeGuide: false,
                fitInfo: {
                    title: 'Perfect Fit Guide',
                    description: 'Ensure optimal comfort and sound quality with our comprehensive fit guide.',
                    features: [
                        'Adjustable headband for all head sizes',
                        'Rotating ear cups for perfect angle',
                        'Memory foam padding for comfort',
                        'Lightweight design reduces pressure'
                    ],
                    tips: [
                        'Adjust headband to sit comfortably on top of head',
                        'Ear cups should fully cover ears without pressure',
                        'Headband should not press against skull',
                        'Test for 15-30 minutes to ensure comfort'
                    ]
                },
                measurements: {
                    headband: {
                        min: '18cm',
                        max: '25cm',
                        adjustable: true
                    },
                    earCups: {
                        diameter: '10cm',
                        depth: '2.5cm',
                        material: 'Memory foam with protein leather'
                    },
                    weight: '280g',
                    cableLength: '1.2m'
                }
            },
            '2': { // Product ID 2 - Clothing
                productType: 'clothing',
                hasSizeGuide: true,
                sizeGuide: {
                    title: 'Size Chart',
                    description: 'Find your perfect fit using our detailed size measurements.',
                    categories: [
                        {
                            name: 'Tops',
                            measurements: [
                                { size: 'XS', chest: '32-34"', waist: '26-28"', length: '26"' },
                                { size: 'S', chest: '34-36"', waist: '28-30"', length: '27"' },
                                { size: 'M', chest: '36-38"', waist: '30-32"', length: '28"' },
                                { size: 'L', chest: '38-40"', waist: '32-34"', length: '29"' },
                                { size: 'XL', chest: '40-42"', waist: '34-36"', length: '30"' },
                                { size: 'XXL', chest: '42-44"', waist: '36-38"', length: '31"' }
                            ]
                        },
                        {
                            name: 'Bottoms',
                            measurements: [
                                { size: 'XS', waist: '26-28"', hip: '34-36"', inseam: '30"' },
                                { size: 'S', waist: '28-30"', hip: '36-38"', inseam: '31"' },
                                { size: 'M', waist: '30-32"', hip: '38-40"', inseam: '32"' },
                                { size: 'L', waist: '32-34"', hip: '40-42"', inseam: '33"' },
                                { size: 'XL', waist: '34-36"', hip: '42-44"', inseam: '34"' },
                                { size: 'XXL', waist: '36-38"', hip: '44-46"', inseam: '35"' }
                            ]
                        }
                    ]
                },
                fitInfo: {
                    title: 'How to Measure',
                    description: 'Get accurate measurements for the perfect fit.',
                    steps: [
                        {
                            step: 1,
                            title: 'Chest Measurement',
                            description: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.',
                            image: 'https://via.placeholder.com/300x200?text=Chest+Measurement',
                            tips: ['Wear a thin shirt or no shirt', 'Keep arms at sides', 'Measure at nipple level']
                        },
                        {
                            step: 2,
                            title: 'Waist Measurement',
                            description: 'Measure around your natural waistline, typically the narrowest part of your torso.',
                            image: 'https://via.placeholder.com/300x200?text=Waist+Measurement',
                            tips: ['Measure without clothing', 'Keep tape snug but not tight', 'Breathe normally']
                        },
                        {
                            step: 3,
                            title: 'Hip Measurement',
                            description: 'Measure around the fullest part of your hips and buttocks.',
                            image: 'https://via.placeholder.com/300x200?text=Hip+Measurement',
                            tips: ['Stand with feet together', 'Measure at widest point', 'Keep tape parallel to ground']
                        },
                        {
                            step: 4,
                            title: 'Inseam Measurement',
                            description: 'Measure from the crotch to the bottom of your ankle bone.',
                            image: 'https://via.placeholder.com/300x200?text=Inseam+Measurement',
                            tips: ['Wear shoes you plan to wear', 'Have someone help you', 'Stand straight and relaxed']
                        }
                    ]
                },
                sizeRecommendation: {
                    enabled: true,
                    questions: [
                        {
                            id: 'height',
                            question: 'What is your height?',
                            type: 'select',
                            options: [
                                { value: 'under-5-2', label: 'Under 5\'2"' },
                                { value: '5-2-5-4', label: '5\'2" - 5\'4"' },
                                { value: '5-4-5-6', label: '5\'4" - 5\'6"' },
                                { value: '5-6-5-8', label: '5\'6" - 5\'8"' },
                                { value: '5-8-5-10', label: '5\'8" - 5\'10"' },
                                { value: '5-10-6-0', label: '5\'10" - 6\'0"' },
                                { value: 'over-6-0', label: 'Over 6\'0"' }
                            ]
                        },
                        {
                            id: 'weight',
                            question: 'What is your weight range?',
                            type: 'select',
                            options: [
                                { value: 'under-120', label: 'Under 120 lbs' },
                                { value: '120-140', label: '120-140 lbs' },
                                { value: '140-160', label: '140-160 lbs' },
                                { value: '160-180', label: '160-180 lbs' },
                                { value: '180-200', label: '180-200 lbs' },
                                { value: '200-220', label: '200-220 lbs' },
                                { value: 'over-220', label: 'Over 220 lbs' }
                            ]
                        },
                        {
                            id: 'body_type',
                            question: 'How would you describe your body type?',
                            type: 'select',
                            options: [
                                { value: 'slim', label: 'Slim' },
                                { value: 'athletic', label: 'Athletic' },
                                { value: 'average', label: 'Average' },
                                { value: 'curvy', label: 'Curvy' },
                                { value: 'plus', label: 'Plus Size' }
                            ]
                        },
                        {
                            id: 'fit_preference',
                            question: 'What fit do you prefer?',
                            type: 'select',
                            options: [
                                { value: 'slim', label: 'Slim Fit' },
                                { value: 'regular', label: 'Regular Fit' },
                                { value: 'loose', label: 'Loose Fit' }
                            ]
                        }
                    ]
                }
            },
            '3': { // Product ID 3 - Shoes
                productType: 'shoes',
                hasSizeGuide: true,
                sizeGuide: {
                    title: 'Shoe Size Chart',
                    description: 'Find your perfect shoe size with our comprehensive size guide.',
                    categories: [
                        {
                            name: 'Men\'s Shoes',
                            measurements: [
                                { size: '7', us: '7', uk: '6', eu: '40', cm: '25.0' },
                                { size: '7.5', us: '7.5', uk: '6.5', eu: '40.5', cm: '25.4' },
                                { size: '8', us: '8', uk: '7', eu: '41', cm: '25.8' },
                                { size: '8.5', us: '8.5', uk: '7.5', eu: '41.5', cm: '26.2' },
                                { size: '9', us: '9', uk: '8', eu: '42', cm: '26.6' },
                                { size: '9.5', us: '9.5', uk: '8.5', eu: '42.5', cm: '27.0' },
                                { size: '10', us: '10', uk: '9', eu: '43', cm: '27.4' },
                                { size: '10.5', us: '10.5', uk: '9.5', eu: '43.5', cm: '27.8' },
                                { size: '11', us: '11', uk: '10', eu: '44', cm: '28.2' },
                                { size: '11.5', us: '11.5', uk: '10.5', eu: '44.5', cm: '28.6' },
                                { size: '12', us: '12', uk: '11', eu: '45', cm: '29.0' }
                            ]
                        },
                        {
                            name: 'Women\'s Shoes',
                            measurements: [
                                { size: '5', us: '5', uk: '3', eu: '35', cm: '22.0' },
                                { size: '5.5', us: '5.5', uk: '3.5', eu: '35.5', cm: '22.4' },
                                { size: '6', us: '6', uk: '4', eu: '36', cm: '22.8' },
                                { size: '6.5', us: '6.5', uk: '4.5', eu: '36.5', cm: '23.2' },
                                { size: '7', us: '7', uk: '5', eu: '37', cm: '23.6' },
                                { size: '7.5', us: '7.5', uk: '5.5', eu: '37.5', cm: '24.0' },
                                { size: '8', us: '8', uk: '6', eu: '38', cm: '24.4' },
                                { size: '8.5', us: '8.5', uk: '6.5', eu: '38.5', cm: '24.8' },
                                { size: '9', us: '9', uk: '7', eu: '39', cm: '25.2' },
                                { size: '9.5', us: '9.5', uk: '7.5', eu: '39.5', cm: '25.6' },
                                { size: '10', us: '10', uk: '8', eu: '40', cm: '26.0' }
                            ]
                        }
                    ]
                },
                fitInfo: {
                    title: 'How to Measure Your Foot',
                    description: 'Get the perfect shoe fit with accurate foot measurements.',
                    steps: [
                        {
                            step: 1,
                            title: 'Prepare for Measurement',
                            description: 'Stand on a piece of paper with your heel against a wall.',
                            image: 'https://via.placeholder.com/300x200?text=Foot+Preparation',
                            tips: ['Wear socks you plan to wear with shoes', 'Stand straight with weight evenly distributed', 'Have someone help you for accuracy']
                        },
                        {
                            step: 2,
                            title: 'Mark Your Foot',
                            description: 'Draw a line at the tip of your longest toe and at your heel.',
                            image: 'https://via.placeholder.com/300x200?text=Foot+Marking',
                            tips: ['Use a pencil perpendicular to paper', 'Mark the longest toe (not always big toe)', 'Keep foot flat on paper']
                        },
                        {
                            step: 3,
                            title: 'Measure Length',
                            description: 'Measure the distance between the two marks in centimeters.',
                            image: 'https://via.placeholder.com/300x200?text=Foot+Length',
                            tips: ['Use a ruler or measuring tape', 'Measure to the nearest millimeter', 'Repeat for both feet and use larger measurement']
                        },
                        {
                            step: 4,
                            title: 'Measure Width',
                            description: 'Measure the widest part of your foot across the ball.',
                            image: 'https://via.placeholder.com/300x200?text=Foot+Width',
                            tips: ['Measure at the widest point', 'Keep measuring tape parallel to ground', 'Note if you have wide or narrow feet']
                        }
                    ]
                },
                sizeRecommendation: {
                    enabled: true,
                    questions: [
                        {
                            id: 'current_size',
                            question: 'What size do you typically wear?',
                            type: 'select',
                            options: [
                                { value: '5', label: '5' },
                                { value: '5.5', label: '5.5' },
                                { value: '6', label: '6' },
                                { value: '6.5', label: '6.5' },
                                { value: '7', label: '7' },
                                { value: '7.5', label: '7.5' },
                                { value: '8', label: '8' },
                                { value: '8.5', label: '8.5' },
                                { value: '9', label: '9' },
                                { value: '9.5', label: '9.5' },
                                { value: '10', label: '10' },
                                { value: '10.5', label: '10.5' },
                                { value: '11', label: '11' },
                                { value: '11.5', label: '11.5' },
                                { value: '12', label: '12' }
                            ]
                        },
                        {
                            id: 'foot_width',
                            question: 'How would you describe your foot width?',
                            type: 'select',
                            options: [
                                { value: 'narrow', label: 'Narrow' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'wide', label: 'Wide' },
                                { value: 'extra-wide', label: 'Extra Wide' }
                            ]
                        },
                        {
                            id: 'arch_type',
                            question: 'What type of arch do you have?',
                            type: 'select',
                            options: [
                                { value: 'low', label: 'Low/Flat Arch' },
                                { value: 'medium', label: 'Medium Arch' },
                                { value: 'high', label: 'High Arch' }
                            ]
                        },
                        {
                            id: 'fit_preference',
                            question: 'How do you prefer your shoes to fit?',
                            type: 'select',
                            options: [
                                { value: 'snug', label: 'Snug Fit' },
                                { value: 'comfortable', label: 'Comfortable Fit' },
                                { value: 'roomy', label: 'Roomy Fit' }
                            ]
                        }
                    ]
                }
            }
        };
    }

    /**
     * Render the size guide and fit information section
     */
    renderSizeGuide(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.sizeGuideData[productId] || this.sizeGuideData['1'];
        
        container.innerHTML = `
            <div class="size-guide-section">
                <div class="size-guide-header">
                    <h3><i class="fas fa-ruler"></i> Size Guide & Fit Information</h3>
                    <p>Find your perfect fit with our comprehensive size guides and measurement tools.</p>
                </div>

                <div class="size-guide-content">
                    <div class="size-guide-tabs">
                        <button class="size-guide-tab active" data-tab="fit-info">
                            <i class="fas fa-info-circle"></i> Fit Information
                        </button>
                        ${data.hasSizeGuide ? `
                        <button class="size-guide-tab" data-tab="size-chart">
                            <i class="fas fa-table"></i> Size Chart
                        </button>
                        ` : ''}
                        <button class="size-guide-tab" data-tab="measurements">
                            <i class="fas fa-tape"></i> How to Measure
                        </button>
                        ${data.sizeRecommendation && data.sizeRecommendation.enabled ? `
                        <button class="size-guide-tab" data-tab="size-finder">
                            <i class="fas fa-search"></i> Size Finder
                        </button>
                        ` : ''}
                    </div>

                    <div class="size-guide-tab-content">
                        <div class="size-guide-tab-panel active" id="fit-info-panel">
                            ${this.renderFitInfoPanel(data)}
                        </div>
                        ${data.hasSizeGuide ? `
                        <div class="size-guide-tab-panel" id="size-chart-panel">
                            ${this.renderSizeChartPanel(data.sizeGuide)}
                        </div>
                        ` : ''}
                        <div class="size-guide-tab-panel" id="measurements-panel">
                            ${this.renderMeasurementsPanel(data.fitInfo)}
                        </div>
                        ${data.sizeRecommendation && data.sizeRecommendation.enabled ? `
                        <div class="size-guide-tab-panel" id="size-finder-panel">
                            ${this.renderSizeFinderPanel(data.sizeRecommendation)}
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        this.initializeSizeGuideTabs();
    }

    /**
     * Render fit information panel
     */
    renderFitInfoPanel(data) {
        return `
            <div class="fit-info-content">
                <div class="fit-info-overview">
                    <h4>${data.fitInfo.title}</h4>
                    <p>${data.fitInfo.description}</p>
                </div>

                <div class="fit-features">
                    <h5>Key Features:</h5>
                    <div class="features-grid">
                        ${data.fitInfo.features.map(feature => `
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="fit-tips">
                    <h5>Fit Tips:</h5>
                    <div class="tips-list">
                        ${data.fitInfo.tips.map(tip => `
                            <div class="tip-item">
                                <i class="fas fa-lightbulb"></i>
                                <span>${tip}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${data.measurements ? `
                <div class="product-measurements">
                    <h5>Product Measurements:</h5>
                    <div class="measurements-grid">
                        ${Object.entries(data.measurements).map(([key, value]) => `
                            <div class="measurement-item">
                                <span class="measurement-label">${this.formatMeasurementLabel(key)}:</span>
                                <span class="measurement-value">${typeof value === 'object' ? this.formatMeasurementValue(value) : value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Render size chart panel
     */
    renderSizeChartPanel(sizeGuide) {
        return `
            <div class="size-chart-content">
                <div class="size-chart-header">
                    <h4>${sizeGuide.title}</h4>
                    <p>${sizeGuide.description}</p>
                </div>

                <div class="size-chart-categories">
                    ${sizeGuide.categories.map(category => `
                        <div class="size-chart-category">
                            <h5>${category.name}</h5>
                            <div class="size-chart-table-container">
                                <table class="size-chart-table">
                                    <thead>
                                        <tr>
                                            ${Object.keys(category.measurements[0]).map(key => `
                                                <th>${this.formatTableHeader(key)}</th>
                                            `).join('')}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${category.measurements.map(measurement => `
                                            <tr>
                                                ${Object.values(measurement).map(value => `
                                                    <td>${value}</td>
                                                `).join('')}
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="size-chart-notes">
                    <h5>Important Notes:</h5>
                    <ul>
                        <li>Measurements are in inches unless otherwise specified</li>
                        <li>All measurements are body measurements, not garment measurements</li>
                        <li>For best fit, measure over undergarments</li>
                        <li>If between sizes, we recommend sizing up</li>
                        <li>Different brands may have different sizing standards</li>
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Render measurements panel
     */
    renderMeasurementsPanel(fitInfo) {
        return `
            <div class="measurements-content">
                <div class="measurements-header">
                    <h4>${fitInfo.title}</h4>
                    <p>${fitInfo.description}</p>
                </div>

                <div class="measurement-steps">
                    ${fitInfo.steps.map(step => `
                        <div class="measurement-step">
                            <div class="step-header">
                                <div class="step-number">${step.step}</div>
                                <h5>${step.title}</h5>
                            </div>
                            <div class="step-content">
                                <p>${step.description}</p>
                                ${step.image ? `<img src="${step.image}" alt="${step.title}" class="step-image">` : ''}
                                <div class="step-tips">
                                    <h6>Tips:</h6>
                                    <ul>
                                        ${step.tips.map(tip => `<li>${tip}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="measurement-tools">
                    <h5>Measurement Tools:</h5>
                    <div class="tools-grid">
                        <div class="tool-item">
                            <i class="fas fa-ruler"></i>
                            <span>Flexible Measuring Tape</span>
                        </div>
                        <div class="tool-item">
                            <i class="fas fa-pencil-alt"></i>
                            <span>Pencil or Marker</span>
                        </div>
                        <div class="tool-item">
                            <i class="fas fa-file-alt"></i>
                            <span>Paper or Cardboard</span>
                        </div>
                        <div class="tool-item">
                            <i class="fas fa-user-friends"></i>
                            <span>Helper (Recommended)</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render size finder panel
     */
    renderSizeFinderPanel(sizeRecommendation) {
        return `
            <div class="size-finder-content">
                <div class="size-finder-header">
                    <h4>Size Finder</h4>
                    <p>Answer a few questions to get personalized size recommendations.</p>
                </div>

                <div class="size-finder-form">
                    <form id="sizeFinderForm">
                        ${sizeRecommendation.questions.map((question, index) => `
                            <div class="form-question" data-question-index="${index}">
                                <label for="question-${index}">${question.question}</label>
                                <select id="question-${index}" name="${question.id}" required>
                                    <option value="">Select an option</option>
                                    ${question.options.map(option => `
                                        <option value="${option.value}">${option.label}</option>
                                    `).join('')}
                                </select>
                            </div>
                        `).join('')}
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="productSizeGuideManager.resetSizeFinder()">
                                Reset
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Get Size Recommendation
                            </button>
                        </div>
                    </form>
                </div>

                <div id="sizeRecommendationResult" class="size-recommendation-result" style="display: none;">
                    <!-- Size recommendation will be displayed here -->
                </div>
            </div>
        `;

        this.initializeSizeFinder();
    }

    /**
     * Initialize size guide tabs
     */
    initializeSizeGuideTabs() {
        const tabs = document.querySelectorAll('.size-guide-tab');
        const panels = document.querySelectorAll('.size-guide-tab-panel');

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
     * Initialize size finder
     */
    initializeSizeFinder() {
        const form = document.getElementById('sizeFinderForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processSizeFinder();
            });
        }
    }

    /**
     * Process size finder form
     */
    processSizeFinder() {
        const form = document.getElementById('sizeFinderForm');
        const formData = new FormData(form);
        const answers = {};
        
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }

        const recommendation = this.calculateSizeRecommendation(answers);
        this.displaySizeRecommendation(recommendation);
    }

    /**
     * Calculate size recommendation based on answers
     */
    calculateSizeRecommendation(answers) {
        // This is a simplified recommendation algorithm
        // In a real application, this would be more sophisticated
        
        let recommendedSize = 'M'; // Default
        let confidence = 'Medium';
        let reasoning = [];

        // Example logic for clothing
        if (answers.height && answers.weight) {
            if (answers.height === 'under-5-2' && answers.weight === 'under-120') {
                recommendedSize = 'XS';
                confidence = 'High';
                reasoning.push('Based on your height and weight, XS is recommended');
            } else if (answers.height === '5-2-5-4' && answers.weight === '120-140') {
                recommendedSize = 'S';
                confidence = 'High';
                reasoning.push('Based on your height and weight, S is recommended');
            } else if (answers.height === '5-4-5-6' && answers.weight === '140-160') {
                recommendedSize = 'M';
                confidence = 'High';
                reasoning.push('Based on your height and weight, M is recommended');
            } else if (answers.height === '5-6-5-8' && answers.weight === '160-180') {
                recommendedSize = 'L';
                confidence = 'High';
                reasoning.push('Based on your height and weight, L is recommended');
            } else if (answers.height === '5-8-5-10' && answers.weight === '180-200') {
                recommendedSize = 'XL';
                confidence = 'High';
                reasoning.push('Based on your height and weight, XL is recommended');
            } else {
                confidence = 'Medium';
                reasoning.push('Based on your measurements, we recommend this size');
            }
        }

        // Adjust based on fit preference
        if (answers.fit_preference === 'slim') {
            recommendedSize = this.getSmallerSize(recommendedSize);
            reasoning.push('Adjusted down for slim fit preference');
        } else if (answers.fit_preference === 'loose') {
            recommendedSize = this.getLargerSize(recommendedSize);
            reasoning.push('Adjusted up for loose fit preference');
        }

        return {
            size: recommendedSize,
            confidence: confidence,
            reasoning: reasoning,
            alternatives: this.getAlternativeSizes(recommendedSize)
        };
    }

    /**
     * Display size recommendation
     */
    displaySizeRecommendation(recommendation) {
        const resultDiv = document.getElementById('sizeRecommendationResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="recommendation-card">
                    <div class="recommendation-header">
                        <h5>Your Recommended Size</h5>
                        <div class="confidence-badge confidence-${recommendation.confidence.toLowerCase()}">
                            ${recommendation.confidence} Confidence
                        </div>
                    </div>
                    
                    <div class="recommended-size">
                        <span class="size-value">${recommendation.size}</span>
                    </div>
                    
                    <div class="recommendation-reasoning">
                        <h6>Why this size:</h6>
                        <ul>
                            ${recommendation.reasoning.map(reason => `<li>${reason}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${recommendation.alternatives.length > 0 ? `
                    <div class="alternative-sizes">
                        <h6>Alternative sizes to consider:</h6>
                        <div class="alternative-buttons">
                            ${recommendation.alternatives.map(size => `
                                <button class="btn btn-outline alternative-size-btn" onclick="productSizeGuideManager.selectAlternativeSize('${size}')">
                                    ${size}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="recommendation-actions">
                        <button class="btn btn-primary" onclick="productSizeGuideManager.addToCartWithSize('${recommendation.size}')">
                            Add to Cart - Size ${recommendation.size}
                        </button>
                        <button class="btn btn-secondary" onclick="productSizeGuideManager.resetSizeFinder()">
                            Try Again
                        </button>
                    </div>
                </div>
            `;
            
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Reset size finder
     */
    resetSizeFinder() {
        const form = document.getElementById('sizeFinderForm');
        const resultDiv = document.getElementById('sizeRecommendationResult');
        
        if (form) {
            form.reset();
        }
        
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    }

    /**
     * Helper methods
     */
    formatMeasurementLabel(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    formatMeasurementValue(value) {
        if (typeof value === 'object') {
            if (value.min && value.max) {
                return `${value.min} - ${value.max}`;
            }
            return Object.values(value).join(', ');
        }
        return value;
    }

    formatTableHeader(key) {
        const headers = {
            'size': 'Size',
            'chest': 'Chest',
            'waist': 'Waist',
            'hip': 'Hip',
            'length': 'Length',
            'inseam': 'Inseam',
            'us': 'US',
            'uk': 'UK',
            'eu': 'EU',
            'cm': 'CM'
        };
        return headers[key] || key.toUpperCase();
    }

    getSmallerSize(size) {
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const index = sizes.indexOf(size);
        return index > 0 ? sizes[index - 1] : size;
    }

    getLargerSize(size) {
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const index = sizes.indexOf(size);
        return index < sizes.length - 1 ? sizes[index + 1] : size;
    }

    getAlternativeSizes(size) {
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const index = sizes.indexOf(size);
        const alternatives = [];
        
        if (index > 0) alternatives.push(sizes[index - 1]);
        if (index < sizes.length - 1) alternatives.push(sizes[index + 1]);
        
        return alternatives;
    }

    /**
     * Select alternative size
     */
    selectAlternativeSize(size) {
        // This would typically update the product variant selection
        alert(`Selected size: ${size}`);
    }

    /**
     * Add to cart with specific size
     */
    addToCartWithSize(size) {
        // This would typically add the product to cart with the selected size
        alert(`Adding to cart with size: ${size}`);
    }
}

// Initialize the manager
const productSizeGuideManager = new ProductSizeGuideManager();

// Global functions for size guide interactions
window.resetSizeFinder = () => productSizeGuideManager.resetSizeFinder();
window.selectAlternativeSize = (size) => productSizeGuideManager.selectAlternativeSize(size);
window.addToCartWithSize = (size) => productSizeGuideManager.addToCartWithSize(size);

