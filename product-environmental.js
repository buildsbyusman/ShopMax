/**
 * Product Environmental and Sustainability Information Manager
 * Handles environmental impact, sustainability metrics, certifications, and eco-friendly features
 */

class ProductEnvironmentalManager {
    constructor() {
        this.environmentalData = {
            '1': { // Product ID 1
                available: true,
                overview: {
                    title: 'Environmental Impact',
                    description: 'This product is designed with sustainability in mind, featuring eco-friendly materials and responsible manufacturing practices.',
                    overallRating: 'B+',
                    ratingColor: '#4CAF50',
                    lastUpdated: '2023-10-15'
                },
                carbonFootprint: {
                    manufacturing: {
                        value: 2.3,
                        unit: 'kg CO2e',
                        description: 'Carbon emissions from manufacturing process',
                        comparison: '15% below industry average'
                    },
                    shipping: {
                        value: 0.8,
                        unit: 'kg CO2e',
                        description: 'Carbon emissions from shipping',
                        comparison: '20% below industry average'
                    },
                    usage: {
                        value: 0.1,
                        unit: 'kg CO2e/year',
                        description: 'Annual carbon emissions during use',
                        comparison: 'Energy efficient design'
                    },
                    disposal: {
                        value: 0.2,
                        unit: 'kg CO2e',
                        description: 'Carbon emissions from disposal',
                        comparison: 'Fully recyclable components'
                    },
                    total: {
                        value: 3.4,
                        unit: 'kg CO2e',
                        description: 'Total carbon footprint',
                        comparison: '18% below industry average'
                    }
                },
                materials: {
                    primary: [
                        {
                            name: 'Recycled Aluminum',
                            percentage: 45,
                            description: 'Lightweight and fully recyclable',
                            sustainability: 'high',
                            source: 'Post-consumer recycled content'
                        },
                        {
                            name: 'Bio-based Plastics',
                            percentage: 30,
                            description: 'Made from renewable plant sources',
                            sustainability: 'high',
                            source: 'Certified sustainable sources'
                        },
                        {
                            name: 'Recycled Steel',
                            percentage: 20,
                            description: 'Durable and recyclable',
                            sustainability: 'medium',
                            source: 'Industrial recycled content'
                        },
                        {
                            name: 'Other Materials',
                            percentage: 5,
                            description: 'Various components',
                            sustainability: 'medium',
                            source: 'Mixed sources'
                        }
                    ],
                    packaging: [
                        {
                            name: 'Recycled Cardboard',
                            percentage: 80,
                            description: 'Main packaging material',
                            sustainability: 'high',
                            source: 'Post-consumer recycled'
                        },
                        {
                            name: 'Biodegradable Foam',
                            percentage: 15,
                            description: 'Protective padding',
                            sustainability: 'high',
                            source: 'Plant-based materials'
                        },
                        {
                            name: 'Paper Tape',
                            percentage: 5,
                            description: 'Sealing and labeling',
                            sustainability: 'high',
                            source: 'Recycled paper'
                        }
                    ]
                },
                certifications: [
                    {
                        name: 'ENERGY STAR',
                        description: 'Certified for energy efficiency',
                        icon: 'fas fa-leaf',
                        color: '#4CAF50',
                        validUntil: '2025-12-31',
                        details: 'Meets strict energy efficiency guidelines set by the EPA'
                    },
                    {
                        name: 'EPEAT Gold',
                        description: 'Electronic Product Environmental Assessment Tool',
                        icon: 'fas fa-award',
                        color: '#FFD700',
                        validUntil: '2024-06-30',
                        details: 'Gold rating for environmental performance across the product lifecycle'
                    },
                    {
                        name: 'RoHS Compliant',
                        description: 'Restriction of Hazardous Substances',
                        icon: 'fas fa-shield-alt',
                        color: '#2196F3',
                        validUntil: 'Ongoing',
                        details: 'Free from hazardous substances like lead, mercury, and cadmium'
                    },
                    {
                        name: 'FSC Certified',
                        description: 'Forest Stewardship Council',
                        icon: 'fas fa-tree',
                        color: '#4CAF50',
                        validUntil: '2024-03-15',
                        details: 'Packaging materials sourced from responsibly managed forests'
                    }
                ],
                sustainabilityFeatures: [
                    {
                        category: 'Energy Efficiency',
                        features: [
                            {
                                name: 'Low Power Consumption',
                                description: 'Uses 30% less energy than similar products',
                                impact: 'Reduces carbon footprint during use'
                            },
                            {
                                name: 'Auto Sleep Mode',
                                description: 'Automatically enters low-power mode when not in use',
                                impact: 'Saves energy and extends battery life'
                            },
                            {
                                name: 'Energy Star Certified',
                                description: 'Meets strict energy efficiency standards',
                                impact: 'Verified energy savings'
                            }
                        ]
                    },
                    {
                        category: 'Material Sustainability',
                        features: [
                            {
                                name: 'Recycled Materials',
                                description: 'Made with 75% recycled content',
                                impact: 'Reduces demand for virgin materials'
                            },
                            {
                                name: 'Biodegradable Components',
                                description: 'Non-plastic parts are biodegradable',
                                impact: 'Reduces long-term environmental impact'
                            },
                            {
                                name: 'Modular Design',
                                description: 'Easy to repair and upgrade',
                                impact: 'Extends product lifespan'
                            }
                        ]
                    },
                    {
                        category: 'Packaging & Shipping',
                        features: [
                            {
                                name: 'Minimal Packaging',
                                description: 'Reduced packaging by 40% compared to previous models',
                                impact: 'Less waste and lower shipping emissions'
                            },
                            {
                                name: 'Recyclable Packaging',
                                description: '100% of packaging materials are recyclable',
                                impact: 'Zero packaging waste to landfill'
                            },
                            {
                                name: 'Carbon Neutral Shipping',
                                description: 'Shipping emissions are offset through verified programs',
                                impact: 'Net-zero shipping carbon footprint'
                            }
                        ]
                    }
                ],
                lifecycle: {
                    stages: [
                        {
                            stage: 'Design',
                            duration: '6 months',
                            impact: 'Low',
                            description: 'Eco-design principles applied from the start',
                            improvements: 'Material selection, energy efficiency, recyclability'
                        },
                        {
                            stage: 'Manufacturing',
                            duration: '2 months',
                            impact: 'Medium',
                            description: 'Responsible manufacturing with renewable energy',
                            improvements: 'Solar power, waste reduction, water conservation'
                        },
                        {
                            stage: 'Distribution',
                            duration: '1 week',
                            impact: 'Low',
                            description: 'Optimized logistics and carbon offset shipping',
                            improvements: 'Route optimization, electric vehicles, carbon credits'
                        },
                        {
                            stage: 'Use',
                            duration: '5+ years',
                            impact: 'Low',
                            description: 'Energy-efficient operation and long lifespan',
                            improvements: 'Low power consumption, durable design, repairability'
                        },
                        {
                            stage: 'End of Life',
                            duration: '1 month',
                            impact: 'Very Low',
                            description: 'Fully recyclable with take-back program',
                            improvements: 'Component recycling, material recovery, zero waste'
                        }
                    ]
                },
                impactMetrics: {
                    waterSaved: {
                        value: 45,
                        unit: 'liters',
                        description: 'Water saved through efficient manufacturing',
                        comparison: 'vs. traditional manufacturing'
                    },
                    wasteReduced: {
                        value: 2.1,
                        unit: 'kg',
                        description: 'Waste reduced through design and packaging',
                        comparison: 'vs. previous model'
                    },
                    energySaved: {
                        value: 85,
                        unit: 'kWh/year',
                        description: 'Energy saved during use',
                        comparison: 'vs. industry average'
                    },
                    treesSaved: {
                        value: 0.3,
                        unit: 'trees',
                        description: 'Trees saved through recycled packaging',
                        comparison: 'per product'
                    }
                },
                takeBackProgram: {
                    available: true,
                    description: 'Free recycling program for end-of-life products',
                    process: [
                        'Contact customer service to request recycling kit',
                        'Package your old product in the provided materials',
                        'Use prepaid shipping label to return',
                        'Receive confirmation of responsible recycling'
                    ],
                    benefits: [
                        'Free shipping and handling',
                        'Data security guaranteed',
                        'Certificate of responsible recycling',
                        'Contribution to circular economy'
                    ]
                }
            },
            '2': { // Product ID 2
                available: true,
                overview: {
                    title: 'Environmental Impact',
                    description: 'This product features sustainable materials and eco-friendly design.',
                    overallRating: 'B',
                    ratingColor: '#8BC34A',
                    lastUpdated: '2023-09-20'
                },
                carbonFootprint: {
                    total: {
                        value: 1.2,
                        unit: 'kg CO2e',
                        description: 'Total carbon footprint',
                        comparison: '10% below industry average'
                    }
                },
                materials: {
                    primary: [
                        {
                            name: 'Recycled Plastic',
                            percentage: 60,
                            description: 'Made from recycled materials',
                            sustainability: 'high',
                            source: 'Post-consumer recycled'
                        },
                        {
                            name: 'Natural Rubber',
                            percentage: 40,
                            description: 'Sustainable natural material',
                            sustainability: 'high',
                            source: 'Responsibly sourced'
                        }
                    ]
                },
                certifications: [
                    {
                        name: 'RoHS Compliant',
                        description: 'Restriction of Hazardous Substances',
                        icon: 'fas fa-shield-alt',
                        color: '#2196F3',
                        validUntil: 'Ongoing',
                        details: 'Free from hazardous substances'
                    }
                ],
                sustainabilityFeatures: [
                    {
                        category: 'Material Sustainability',
                        features: [
                            {
                                name: 'Recycled Content',
                                description: 'Made with 60% recycled materials',
                                impact: 'Reduces demand for virgin materials'
                            }
                        ]
                    }
                ],
                lifecycle: {
                    stages: [
                        {
                            stage: 'Manufacturing',
                            duration: '1 month',
                            impact: 'Low',
                            description: 'Efficient manufacturing process',
                            improvements: 'Waste reduction, energy efficiency'
                        }
                    ]
                },
                impactMetrics: {
                    wasteReduced: {
                        value: 0.5,
                        unit: 'kg',
                        description: 'Waste reduced through design',
                        comparison: 'vs. traditional products'
                    }
                },
                takeBackProgram: {
                    available: false
                }
            },
            '3': { // Product ID 3
                available: false
            }
        };
    }

    /**
     * Render the environmental and sustainability information section
     */
    renderEnvironmental(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.environmentalData[productId] || this.environmentalData['1'];
        
        if (!data.available) {
            container.innerHTML = `
                <div class="environmental-section">
                    <div class="environmental-unavailable">
                        <i class="fas fa-leaf"></i>
                        <h3>Environmental Information Not Available</h3>
                        <p>Environmental impact data is not available for this product at this time.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="environmental-section">
                <div class="environmental-header">
                    <h3><i class="fas fa-leaf"></i> Environmental & Sustainability</h3>
                    <p>Learn about this product's environmental impact, sustainability features, and our commitment to a greener future.</p>
                </div>

                <div class="environmental-content">
                    <div class="environmental-overview">
                        ${this.renderEnvironmentalOverview(data.overview)}
                    </div>

                    <div class="carbon-footprint">
                        ${this.renderCarbonFootprint(data.carbonFootprint)}
                    </div>

                    <div class="materials-sustainability">
                        ${this.renderMaterialsSustainability(data.materials)}
                    </div>

                    <div class="certifications">
                        ${this.renderCertifications(data.certifications)}
                    </div>

                    <div class="sustainability-features">
                        ${this.renderSustainabilityFeatures(data.sustainabilityFeatures)}
                    </div>

                    <div class="lifecycle-analysis">
                        ${this.renderLifecycleAnalysis(data.lifecycle)}
                    </div>

                    <div class="impact-metrics">
                        ${this.renderImpactMetrics(data.impactMetrics)}
                    </div>

                    <div class="take-back-program">
                        ${this.renderTakeBackProgram(data.takeBackProgram)}
                    </div>
                </div>
            </div>
        `;

        this.initializeEnvironmentalHandlers(productId);
    }

    /**
     * Render environmental overview
     */
    renderEnvironmentalOverview(overview) {
        return `
            <div class="environmental-overview-card">
                <div class="overview-header">
                    <h4>${overview.title}</h4>
                    <div class="overall-rating">
                        <span class="rating-badge" style="background-color: ${overview.ratingColor}">
                            ${overview.overallRating}
                        </span>
                        <span class="rating-label">Overall Rating</span>
                    </div>
                </div>
                <p>${overview.description}</p>
                <div class="last-updated">
                    <i class="fas fa-calendar"></i>
                    <span>Last updated: ${new Date(overview.lastUpdated).toLocaleDateString()}</span>
                </div>
            </div>
        `;
    }

    /**
     * Render carbon footprint
     */
    renderCarbonFootprint(carbonFootprint) {
        return `
            <div class="carbon-footprint-card">
                <h4>Carbon Footprint</h4>
                <div class="footprint-grid">
                    ${Object.entries(carbonFootprint).map(([key, data]) => `
                        <div class="footprint-item ${key === 'total' ? 'total' : ''}">
                            <div class="footprint-header">
                                <h5>${this.getFootprintTitle(key)}</h5>
                                <div class="footprint-value">
                                    <span class="value">${data.value}</span>
                                    <span class="unit">${data.unit}</span>
                                </div>
                            </div>
                            <p class="footprint-description">${data.description}</p>
                            <div class="footprint-comparison">
                                <i class="fas fa-chart-line"></i>
                                <span>${data.comparison}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render materials sustainability
     */
    renderMaterialsSustainability(materials) {
        return `
            <div class="materials-sustainability-card">
                <h4>Materials & Sustainability</h4>
                <div class="materials-content">
                    <div class="materials-section">
                        <h5>Primary Materials</h5>
                        <div class="materials-chart">
                            ${materials.primary.map(material => `
                                <div class="material-item">
                                    <div class="material-bar">
                                        <div class="material-fill" style="width: ${material.percentage}%; background-color: ${this.getMaterialColor(material.sustainability)}"></div>
                                        <span class="material-percentage">${material.percentage}%</span>
                                    </div>
                                    <div class="material-info">
                                        <h6>${material.name}</h6>
                                        <p>${material.description}</p>
                                        <div class="material-source">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <span>${material.source}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="materials-section">
                        <h5>Packaging Materials</h5>
                        <div class="materials-chart">
                            ${materials.packaging.map(material => `
                                <div class="material-item">
                                    <div class="material-bar">
                                        <div class="material-fill" style="width: ${material.percentage}%; background-color: ${this.getMaterialColor(material.sustainability)}"></div>
                                        <span class="material-percentage">${material.percentage}%</span>
                                    </div>
                                    <div class="material-info">
                                        <h6>${material.name}</h6>
                                        <p>${material.description}</p>
                                        <div class="material-source">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <span>${material.source}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render certifications
     */
    renderCertifications(certifications) {
        return `
            <div class="certifications-card">
                <h4>Environmental Certifications</h4>
                <div class="certifications-grid">
                    ${certifications.map(cert => `
                        <div class="certification-item">
                            <div class="cert-icon" style="background-color: ${cert.color}">
                                <i class="${cert.icon}"></i>
                            </div>
                            <div class="cert-content">
                                <h5>${cert.name}</h5>
                                <p>${cert.description}</p>
                                <div class="cert-details">
                                    <div class="cert-validity">
                                        <i class="fas fa-calendar-check"></i>
                                        <span>Valid until: ${cert.validUntil === 'Ongoing' ? 'Ongoing' : new Date(cert.validUntil).toLocaleDateString()}</span>
                                    </div>
                                    <div class="cert-description">
                                        <i class="fas fa-info-circle"></i>
                                        <span>${cert.details}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render sustainability features
     */
    renderSustainabilityFeatures(sustainabilityFeatures) {
        return `
            <div class="sustainability-features-card">
                <h4>Sustainability Features</h4>
                <div class="features-content">
                    ${sustainabilityFeatures.map(category => `
                        <div class="feature-category">
                            <h5>${category.category}</h5>
                            <div class="feature-list">
                                ${category.features.map(feature => `
                                    <div class="feature-item">
                                        <div class="feature-icon">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                        <div class="feature-content">
                                            <h6>${feature.name}</h6>
                                            <p>${feature.description}</p>
                                            <div class="feature-impact">
                                                <i class="fas fa-leaf"></i>
                                                <span>${feature.impact}</span>
                                            </div>
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
     * Render lifecycle analysis
     */
    renderLifecycleAnalysis(lifecycle) {
        return `
            <div class="lifecycle-analysis-card">
                <h4>Product Lifecycle Analysis</h4>
                <div class="lifecycle-timeline">
                    ${lifecycle.stages.map((stage, index) => `
                        <div class="lifecycle-stage">
                            <div class="stage-marker">
                                <div class="stage-number">${index + 1}</div>
                                <div class="stage-impact ${stage.impact.toLowerCase()}">${stage.impact}</div>
                            </div>
                            <div class="stage-content">
                                <h5>${stage.stage}</h5>
                                <div class="stage-duration">
                                    <i class="fas fa-clock"></i>
                                    <span>${stage.duration}</span>
                                </div>
                                <p>${stage.description}</p>
                                <div class="stage-improvements">
                                    <h6>Environmental Improvements:</h6>
                                    <p>${stage.improvements}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render impact metrics
     */
    renderImpactMetrics(impactMetrics) {
        return `
            <div class="impact-metrics-card">
                <h4>Environmental Impact Metrics</h4>
                <div class="metrics-grid">
                    ${Object.entries(impactMetrics).map(([key, metric]) => `
                        <div class="metric-item">
                            <div class="metric-icon">
                                <i class="fas fa-${this.getMetricIcon(key)}"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">
                                    <span class="value">${metric.value}</span>
                                    <span class="unit">${metric.unit}</span>
                                </div>
                                <h5>${this.getMetricTitle(key)}</h5>
                                <p>${metric.description}</p>
                                <div class="metric-comparison">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>${metric.comparison}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render take-back program
     */
    renderTakeBackProgram(takeBackProgram) {
        if (!takeBackProgram.available) {
            return '';
        }

        return `
            <div class="take-back-program-card">
                <h4>Take-Back & Recycling Program</h4>
                <div class="program-content">
                    <div class="program-description">
                        <p>${takeBackProgram.description}</p>
                    </div>
                    
                    <div class="program-process">
                        <h5>How It Works:</h5>
                        <div class="process-steps">
                            ${takeBackProgram.process.map((step, index) => `
                                <div class="process-step">
                                    <div class="step-number">${index + 1}</div>
                                    <p>${step}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="program-benefits">
                        <h5>Benefits:</h5>
                        <div class="benefits-list">
                            ${takeBackProgram.benefits.map(benefit => `
                                <div class="benefit-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${benefit}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="program-actions">
                        <button class="btn btn-primary" onclick="productEnvironmentalManager.requestRecyclingKit()">
                            <i class="fas fa-recycle"></i> Request Recycling Kit
                        </button>
                        <button class="btn btn-secondary" onclick="productEnvironmentalManager.learnMoreRecycling()">
                            <i class="fas fa-info-circle"></i> Learn More
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Initialize environmental handlers
     */
    initializeEnvironmentalHandlers(productId) {
        // Initialize any interactive elements
    }

    /**
     * Get footprint title
     */
    getFootprintTitle(key) {
        const titles = {
            'manufacturing': 'Manufacturing',
            'shipping': 'Shipping',
            'usage': 'Usage',
            'disposal': 'Disposal',
            'total': 'Total'
        };
        return titles[key] || key;
    }

    /**
     * Get material color based on sustainability
     */
    getMaterialColor(sustainability) {
        const colors = {
            'high': '#4CAF50',
            'medium': '#FF9800',
            'low': '#F44336'
        };
        return colors[sustainability] || '#9E9E9E';
    }

    /**
     * Get metric icon
     */
    getMetricIcon(key) {
        const icons = {
            'waterSaved': 'tint',
            'wasteReduced': 'trash-alt',
            'energySaved': 'bolt',
            'treesSaved': 'tree'
        };
        return icons[key] || 'chart-line';
    }

    /**
     * Get metric title
     */
    getMetricTitle(key) {
        const titles = {
            'waterSaved': 'Water Saved',
            'wasteReduced': 'Waste Reduced',
            'energySaved': 'Energy Saved',
            'treesSaved': 'Trees Saved'
        };
        return titles[key] || key;
    }

    /**
     * Request recycling kit
     */
    requestRecyclingKit() {
        alert('Recycling kit request submitted! You will receive an email with instructions within 24 hours.');
    }

    /**
     * Learn more about recycling
     */
    learnMoreRecycling() {
        alert('Learn more about our recycling program and environmental commitment.');
    }
}

// Initialize the manager
const productEnvironmentalManager = new ProductEnvironmentalManager();

// Global functions for environmental interactions
window.requestRecyclingKit = () => productEnvironmentalManager.requestRecyclingKit();
window.learnMoreRecycling = () => productEnvironmentalManager.learnMoreRecycling();

