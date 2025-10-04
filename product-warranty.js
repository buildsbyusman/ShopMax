/**
 * Product Warranty Information Manager
 * Handles warranty information display, warranty registration, and warranty claims
 */

class ProductWarrantyManager {
    constructor() {
        this.warrantyData = {
            '1': { // Product ID 1
                warrantyType: 'limited',
                duration: 12, // months
                coverage: 'manufacturing_defects',
                coverageDetails: [
                    'Manufacturing defects in materials and workmanship',
                    'Hardware failures under normal use',
                    'Battery performance issues',
                    'Audio quality problems'
                ],
                exclusions: [
                    'Physical damage from drops or impacts',
                    'Water damage or liquid exposure',
                    'Unauthorized repairs or modifications',
                    'Normal wear and tear',
                    'Cosmetic damage',
                    'Damage from misuse or abuse'
                ],
                registrationRequired: true,
                registrationDeadline: 30, // days from purchase
                claimProcess: 'standard',
                claimMethods: ['online', 'phone', 'email'],
                supportChannels: [
                    {
                        type: 'phone',
                        number: '1-800-WARRANTY',
                        hours: 'Mon-Fri 9AM-6PM EST',
                        description: 'Direct phone support for warranty claims'
                    },
                    {
                        type: 'email',
                        address: 'warranty@shopmax.com',
                        responseTime: '24-48 hours',
                        description: 'Email support for warranty inquiries'
                    },
                    {
                        type: 'online',
                        url: '/warranty-claim',
                        description: 'Online warranty claim submission'
                    }
                ],
                replacementPolicy: 'repair_or_replace',
                shippingCoverage: 'free',
                processingTime: '5-10 business days',
                warrantyTransferable: false,
                internationalCoverage: false,
                extendedWarrantyAvailable: true,
                extendedWarrantyOptions: [
                    {
                        duration: 24,
                        price: 29.99,
                        coverage: 'extended_manufacturing_defects',
                        description: 'Extended 2-year warranty coverage'
                    },
                    {
                        duration: 36,
                        price: 49.99,
                        coverage: 'comprehensive_protection',
                        description: 'Comprehensive 3-year protection plan'
                    }
                ],
                warrantyDocument: {
                    title: 'Limited Warranty Document',
                    url: '/documents/warranty-limited.pdf',
                    size: '2.1 MB',
                    lastUpdated: '2023-01-15'
                }
            },
            '2': {
                warrantyType: 'extended',
                duration: 24,
                coverage: 'comprehensive_protection',
                coverageDetails: [
                    'Manufacturing defects in materials and workmanship',
                    'Hardware failures under normal use',
                    'Accidental damage protection',
                    'Battery replacement',
                    'Screen replacement (one time)'
                ],
                exclusions: [
                    'Intentional damage',
                    'Loss or theft',
                    'Unauthorized repairs',
                    'Cosmetic damage from normal use'
                ],
                registrationRequired: false,
                registrationDeadline: null,
                claimProcess: 'expedited',
                claimMethods: ['online', 'phone'],
                supportChannels: [
                    {
                        type: 'phone',
                        number: '1-800-PREMIUM',
                        hours: '24/7 Support',
                        description: '24/7 premium warranty support'
                    },
                    {
                        type: 'online',
                        url: '/premium-warranty-claim',
                        description: 'Premium online warranty portal'
                    }
                ],
                replacementPolicy: 'replace',
                shippingCoverage: 'free',
                processingTime: '2-3 business days',
                warrantyTransferable: true,
                internationalCoverage: true,
                extendedWarrantyAvailable: true,
                extendedWarrantyOptions: [
                    {
                        duration: 36,
                        price: 79.99,
                        coverage: 'ultimate_protection',
                        description: 'Ultimate 3-year protection with premium support'
                    }
                ],
                warrantyDocument: {
                    title: 'Extended Warranty Document',
                    url: '/documents/warranty-extended.pdf',
                    size: '3.2 MB',
                    lastUpdated: '2023-02-01'
                }
            }
        };

        this.warrantyTypes = {
            'limited': 'Limited Warranty',
            'extended': 'Extended Warranty',
            'comprehensive': 'Comprehensive Protection',
            'accidental': 'Accidental Damage Protection'
        };

        this.claimStatuses = {
            'submitted': 'Claim Submitted',
            'under_review': 'Under Review',
            'approved': 'Approved',
            'processing': 'Processing',
            'shipped': 'Replacement Shipped',
            'completed': 'Completed',
            'denied': 'Denied'
        };
    }

    /**
     * Render the warranty information section
     */
    renderWarrantyInfo(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const warranty = this.warrantyData[productId] || this.warrantyData['1'];
        
        container.innerHTML = `
            <div class="warranty-info-section">
                <div class="warranty-header">
                    <h3><i class="fas fa-shield-alt"></i> Warranty Information</h3>
                    <p>Comprehensive warranty coverage to protect your investment and ensure peace of mind.</p>
                </div>

                <div class="warranty-content">
                    <div class="warranty-overview">
                        <div class="warranty-cards">
                            <div class="warranty-card primary">
                                <div class="warranty-icon">
                                    <i class="fas fa-calendar-check"></i>
                                </div>
                                <div class="warranty-info">
                                    <h4>Warranty Duration</h4>
                                    <p class="warranty-value">${warranty.duration} months</p>
                                    <p class="warranty-note">From date of purchase</p>
                                </div>
                            </div>

                            <div class="warranty-card">
                                <div class="warranty-icon">
                                    <i class="fas fa-tools"></i>
                                </div>
                                <div class="warranty-info">
                                    <h4>Coverage Type</h4>
                                    <p class="warranty-value">${this.warrantyTypes[warranty.warrantyType] || warranty.warrantyType}</p>
                                    <p class="warranty-note">${warranty.coverage.replace('_', ' ').toUpperCase()}</p>
                                </div>
                            </div>

                            <div class="warranty-card">
                                <div class="warranty-icon">
                                    <i class="fas fa-shipping-fast"></i>
                                </div>
                                <div class="warranty-info">
                                    <h4>Processing Time</h4>
                                    <p class="warranty-value">${warranty.processingTime}</p>
                                    <p class="warranty-note">After claim approval</p>
                                </div>
                            </div>

                            <div class="warranty-card">
                                <div class="warranty-icon">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div class="warranty-info">
                                    <h4>Shipping</h4>
                                    <p class="warranty-value">${warranty.shippingCoverage === 'free' ? 'FREE' : 'Customer Paid'}</p>
                                    <p class="warranty-note">Return shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="warranty-details">
                        <div class="warranty-tabs">
                            <button class="warranty-tab active" data-tab="coverage">
                                <i class="fas fa-check-circle"></i> Coverage
                            </button>
                            <button class="warranty-tab" data-tab="exclusions">
                                <i class="fas fa-times-circle"></i> Exclusions
                            </button>
                            <button class="warranty-tab" data-tab="process">
                                <i class="fas fa-cogs"></i> Process
                            </button>
                            <button class="warranty-tab" data-tab="support">
                                <i class="fas fa-headset"></i> Support
                            </button>
                        </div>

                        <div class="warranty-tab-content">
                            <div class="warranty-tab-panel active" id="coverage-panel">
                                ${this.renderCoveragePanel(warranty)}
                            </div>
                            <div class="warranty-tab-panel" id="exclusions-panel">
                                ${this.renderExclusionsPanel(warranty)}
                            </div>
                            <div class="warranty-tab-panel" id="process-panel">
                                ${this.renderProcessPanel(warranty)}
                            </div>
                            <div class="warranty-tab-panel" id="support-panel">
                                ${this.renderSupportPanel(warranty)}
                            </div>
                        </div>
                    </div>

                    ${warranty.extendedWarrantyAvailable ? `
                    <div class="extended-warranty-section">
                        <div class="extended-warranty-header">
                            <h4><i class="fas fa-plus-circle"></i> Extended Warranty Options</h4>
                            <p>Extend your protection beyond the standard warranty period</p>
                        </div>
                        <div class="extended-warranty-options">
                            ${warranty.extendedWarrantyOptions.map(option => `
                                <div class="extended-warranty-option">
                                    <div class="option-header">
                                        <h5>${option.duration} Month Extended Warranty</h5>
                                        <div class="option-price">$${option.price}</div>
                                    </div>
                                    <p class="option-description">${option.description}</p>
                                    <button class="btn btn-outline" onclick="productWarrantyManager.openExtendedWarrantyModal('${productId}', '${option.duration}')">
                                        Learn More
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <div class="warranty-actions">
                        <button class="btn btn-primary" onclick="productWarrantyManager.openWarrantyRegistrationModal('${productId}')">
                            <i class="fas fa-clipboard-check"></i> Register Warranty
                        </button>
                        <button class="btn btn-secondary" onclick="productWarrantyManager.openWarrantyClaimModal('${productId}')">
                            <i class="fas fa-exclamation-triangle"></i> File Claim
                        </button>
                        <button class="btn btn-outline" onclick="productWarrantyManager.openWarrantyStatusModal()">
                            <i class="fas fa-search"></i> Check Status
                        </button>
                        <a href="${warranty.warrantyDocument.url}" class="btn btn-outline" target="_blank">
                            <i class="fas fa-file-pdf"></i> Download Warranty Document
                        </a>
                    </div>
                </div>
            </div>
        `;

        this.initializeWarrantyTabs();
    }

    /**
     * Render coverage panel
     */
    renderCoveragePanel(warranty) {
        return `
            <div class="coverage-content">
                <div class="coverage-details">
                    <h4><i class="fas fa-shield-alt"></i> What's Covered</h4>
                    <div class="coverage-list">
                        ${warranty.coverageDetails.map(detail => `
                            <div class="coverage-item">
                                <i class="fas fa-check"></i>
                                <span>${detail}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="warranty-features">
                    <h4><i class="fas fa-star"></i> Warranty Features</h4>
                    <div class="feature-grid">
                        <div class="feature-item">
                            <i class="fas fa-${warranty.registrationRequired ? 'check' : 'times'}"></i>
                            <span>Registration Required</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-${warranty.warrantyTransferable ? 'check' : 'times'}"></i>
                            <span>Transferable</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-${warranty.internationalCoverage ? 'check' : 'times'}"></i>
                            <span>International Coverage</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-${warranty.shippingCoverage === 'free' ? 'check' : 'times'}"></i>
                            <span>Free Shipping</span>
                        </div>
                    </div>
                </div>

                ${warranty.registrationRequired ? `
                <div class="registration-info">
                    <h4><i class="fas fa-info-circle"></i> Registration Information</h4>
                    <div class="registration-details">
                        <p><strong>Registration Deadline:</strong> ${warranty.registrationDeadline} days from purchase</p>
                        <p><strong>Registration Required:</strong> Yes - Must register within ${warranty.registrationDeadline} days to activate warranty</p>
                        <p><strong>Registration Benefits:</strong> Faster claim processing, direct support access, warranty reminders</p>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Render exclusions panel
     */
    renderExclusionsPanel(warranty) {
        return `
            <div class="exclusions-content">
                <div class="exclusions-details">
                    <h4><i class="fas fa-ban"></i> What's Not Covered</h4>
                    <div class="exclusions-list">
                        ${warranty.exclusions.map(exclusion => `
                            <div class="exclusion-item">
                                <i class="fas fa-times"></i>
                                <span>${exclusion}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="important-notes">
                    <h4><i class="fas fa-exclamation-triangle"></i> Important Notes</h4>
                    <ul>
                        <li>Warranty coverage begins from the date of purchase</li>
                        <li>Proof of purchase is required for all warranty claims</li>
                        <li>Unauthorized repairs will void the warranty</li>
                        <li>Normal wear and tear is not covered under warranty</li>
                        <li>Cosmetic damage that doesn't affect functionality is not covered</li>
                        <li>Warranty is limited to the original purchaser unless transferable</li>
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Render process panel
     */
    renderProcessPanel(warranty) {
        return `
            <div class="process-content">
                <div class="claim-process">
                    <h4><i class="fas fa-route"></i> Warranty Claim Process</h4>
                    <div class="process-steps">
                        <div class="process-step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h5>Submit Claim</h5>
                                <p>File your warranty claim online, by phone, or email with product details and issue description.</p>
                            </div>
                        </div>

                        <div class="process-step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h5>Review & Approval</h5>
                                <p>Our warranty team will review your claim and determine if it's covered under warranty terms.</p>
                            </div>
                        </div>

                        <div class="process-step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h5>Return Instructions</h5>
                                <p>If approved, you'll receive detailed return instructions and a prepaid shipping label (if applicable).</p>
                            </div>
                        </div>

                        <div class="process-step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h5>Repair or Replace</h5>
                                <p>We'll repair your item or send a replacement within ${warranty.processingTime} of receiving your item.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="claim-methods">
                    <h4><i class="fas fa-tools"></i> Available Claim Methods</h4>
                    <div class="method-options">
                        ${warranty.claimMethods.map(method => `
                            <div class="method-option">
                                <div class="method-icon">
                                    <i class="fas fa-${this.getClaimMethodIcon(method)}"></i>
                                </div>
                                <div class="method-info">
                                    <h5>${method.charAt(0).toUpperCase() + method.slice(1)}</h5>
                                    <p>${this.getClaimMethodDescription(method)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render support panel
     */
    renderSupportPanel(warranty) {
        return `
            <div class="support-content">
                <div class="support-channels">
                    <h4><i class="fas fa-headset"></i> Warranty Support Channels</h4>
                    <div class="support-options">
                        ${warranty.supportChannels.map(channel => `
                            <div class="support-option">
                                <div class="support-icon">
                                    <i class="fas fa-${this.getSupportChannelIcon(channel.type)}"></i>
                                </div>
                                <div class="support-info">
                                    <h5>${channel.type.charAt(0).toUpperCase() + channel.type.slice(1)} Support</h5>
                                    ${channel.number ? `<p class="support-contact">${channel.number}</p>` : ''}
                                    ${channel.address ? `<p class="support-contact">${channel.address}</p>` : ''}
                                    ${channel.hours ? `<p class="support-hours">${channel.hours}</p>` : ''}
                                    ${channel.responseTime ? `<p class="support-response">Response: ${channel.responseTime}</p>` : ''}
                                    <p class="support-description">${channel.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="support-resources">
                    <h4><i class="fas fa-book"></i> Additional Resources</h4>
                    <div class="resource-links">
                        <a href="/warranty-faq" class="resource-link">
                            <i class="fas fa-question-circle"></i>
                            <span>Warranty FAQ</span>
                        </a>
                        <a href="/troubleshooting" class="resource-link">
                            <i class="fas fa-wrench"></i>
                            <span>Troubleshooting Guide</span>
                        </a>
                        <a href="/contact-support" class="resource-link">
                            <i class="fas fa-envelope"></i>
                            <span>Contact Support</span>
                        </a>
                        <a href="${warranty.warrantyDocument.url}" class="resource-link" target="_blank">
                            <i class="fas fa-file-pdf"></i>
                            <span>Warranty Document</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Open warranty registration modal
     */
    openWarrantyRegistrationModal(productId) {
        const modal = document.getElementById('warrantyRegistrationModal');
        if (!modal) {
            this.createWarrantyRegistrationModal();
        }
        
        const warranty = this.warrantyData[productId] || this.warrantyData['1'];
        this.populateWarrantyRegistrationForm(productId, warranty);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open warranty claim modal
     */
    openWarrantyClaimModal(productId) {
        const modal = document.getElementById('warrantyClaimModal');
        if (!modal) {
            this.createWarrantyClaimModal();
        }
        
        const warranty = this.warrantyData[productId] || this.warrantyData['1'];
        this.populateWarrantyClaimForm(productId, warranty);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open warranty status modal
     */
    openWarrantyStatusModal() {
        const modal = document.getElementById('warrantyStatusModal');
        if (!modal) {
            this.createWarrantyStatusModal();
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Open extended warranty modal
     */
    openExtendedWarrantyModal(productId, duration) {
        const modal = document.getElementById('extendedWarrantyModal');
        if (!modal) {
            this.createExtendedWarrantyModal();
        }
        
        const warranty = this.warrantyData[productId] || this.warrantyData['1'];
        const option = warranty.extendedWarrantyOptions.find(opt => opt.duration == duration);
        this.populateExtendedWarrantyModal(productId, option);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Create warranty registration modal
     */
    createWarrantyRegistrationModal() {
        const modalHTML = `
            <div id="warrantyRegistrationModal" class="modal warranty-registration-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-clipboard-check"></i> Warranty Registration</h3>
                        <button class="close-btn" onclick="productWarrantyManager.closeWarrantyRegistrationModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="warrantyRegistrationForm" class="warranty-registration-form">
                            <div class="form-section">
                                <h4>Product Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="registrationProductId">Product ID *</label>
                                        <input type="text" id="registrationProductId" name="productId" required readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="registrationSerialNumber">Serial Number *</label>
                                        <input type="text" id="registrationSerialNumber" name="serialNumber" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="registrationPurchaseDate">Purchase Date *</label>
                                        <input type="date" id="registrationPurchaseDate" name="purchaseDate" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="registrationPurchasePrice">Purchase Price *</label>
                                        <input type="number" id="registrationPurchasePrice" name="purchasePrice" step="0.01" required>
                                    </div>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Personal Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="registrationFirstName">First Name *</label>
                                        <input type="text" id="registrationFirstName" name="firstName" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="registrationLastName">Last Name *</label>
                                        <input type="text" id="registrationLastName" name="lastName" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="registrationEmail">Email Address *</label>
                                        <input type="email" id="registrationEmail" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="registrationPhone">Phone Number *</label>
                                        <input type="tel" id="registrationPhone" name="phone" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="registrationAddress">Address *</label>
                                    <textarea id="registrationAddress" name="address" rows="3" required></textarea>
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productWarrantyManager.closeWarrantyRegistrationModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Register Warranty</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create warranty claim modal
     */
    createWarrantyClaimModal() {
        const modalHTML = `
            <div id="warrantyClaimModal" class="modal warranty-claim-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-exclamation-triangle"></i> Warranty Claim</h3>
                        <button class="close-btn" onclick="productWarrantyManager.closeWarrantyClaimModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="warrantyClaimForm" class="warranty-claim-form">
                            <div class="form-section">
                                <h4>Claim Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="claimProductId">Product ID *</label>
                                        <input type="text" id="claimProductId" name="productId" required readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="claimSerialNumber">Serial Number *</label>
                                        <input type="text" id="claimSerialNumber" name="serialNumber" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="claimIssue">Issue Description *</label>
                                    <textarea id="claimIssue" name="issue" rows="4" required placeholder="Please describe the issue you're experiencing..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="claimSteps">Steps to Reproduce</label>
                                    <textarea id="claimSteps" name="steps" rows="3" placeholder="Describe the steps that lead to the issue..."></textarea>
                                </div>
                            </div>

                            <div class="form-section">
                                <h4>Contact Information</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="claimFirstName">First Name *</label>
                                        <input type="text" id="claimFirstName" name="firstName" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="claimLastName">Last Name *</label>
                                        <input type="text" id="claimLastName" name="lastName" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="claimEmail">Email Address *</label>
                                        <input type="email" id="claimEmail" name="email" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="claimPhone">Phone Number *</label>
                                        <input type="tel" id="claimPhone" name="phone" required>
                                    </div>
                                </div>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productWarrantyManager.closeWarrantyClaimModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit Claim</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create warranty status modal
     */
    createWarrantyStatusModal() {
        const modalHTML = `
            <div id="warrantyStatusModal" class="modal warranty-status-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-search"></i> Check Warranty Status</h3>
                        <button class="close-btn" onclick="productWarrantyManager.closeWarrantyStatusModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="warrantyStatusForm" class="warranty-status-form">
                            <div class="form-group">
                                <label for="statusSerialNumber">Serial Number *</label>
                                <input type="text" id="statusSerialNumber" name="serialNumber" required placeholder="Enter your product serial number">
                            </div>
                            <div class="form-group">
                                <label for="statusEmail">Email Address *</label>
                                <input type="email" id="statusEmail" name="email" required placeholder="Enter your email address">
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="productWarrantyManager.closeWarrantyStatusModal()">Cancel</button>
                                <button type="submit" class="btn btn-primary">Check Status</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Create extended warranty modal
     */
    createExtendedWarrantyModal() {
        const modalHTML = `
            <div id="extendedWarrantyModal" class="modal extended-warranty-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-plus-circle"></i> Extended Warranty</h3>
                        <button class="close-btn" onclick="productWarrantyManager.closeExtendedWarrantyModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="extendedWarrantyContent">
                            <!-- Extended warranty content will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Initialize warranty tabs
     */
    initializeWarrantyTabs() {
        const tabs = document.querySelectorAll('.warranty-tab');
        const panels = document.querySelectorAll('.warranty-tab-panel');

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
     * Helper methods
     */
    getClaimMethodIcon(method) {
        switch (method) {
            case 'online': return 'laptop';
            case 'phone': return 'phone';
            case 'email': return 'envelope';
            default: return 'question-circle';
        }
    }

    getClaimMethodDescription(method) {
        switch (method) {
            case 'online': return 'Submit your claim through our online portal';
            case 'phone': return 'Call our warranty support team directly';
            case 'email': return 'Send your claim details via email';
            default: return 'Contact support for assistance';
        }
    }

    getSupportChannelIcon(type) {
        switch (type) {
            case 'phone': return 'phone';
            case 'email': return 'envelope';
            case 'online': return 'laptop';
            default: return 'headset';
        }
    }

    /**
     * Close modals
     */
    closeWarrantyRegistrationModal() {
        const modal = document.getElementById('warrantyRegistrationModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeWarrantyClaimModal() {
        const modal = document.getElementById('warrantyClaimModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeWarrantyStatusModal() {
        const modal = document.getElementById('warrantyStatusModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    closeExtendedWarrantyModal() {
        const modal = document.getElementById('extendedWarrantyModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Populate forms
     */
    populateWarrantyRegistrationForm(productId, warranty) {
        document.getElementById('registrationProductId').value = productId;
    }

    populateWarrantyClaimForm(productId, warranty) {
        document.getElementById('claimProductId').value = productId;
    }

    populateExtendedWarrantyModal(productId, option) {
        const content = document.getElementById('extendedWarrantyContent');
        if (content && option) {
            content.innerHTML = `
                <div class="extended-warranty-details">
                    <div class="warranty-summary">
                        <h4>${option.duration} Month Extended Warranty</h4>
                        <div class="warranty-price">$${option.price}</div>
                        <p class="warranty-description">${option.description}</p>
                    </div>
                    
                    <div class="warranty-benefits">
                        <h5>What's Included:</h5>
                        <ul>
                            <li>Extended coverage beyond standard warranty</li>
                            <li>Priority customer support</li>
                            <li>Free shipping for warranty claims</li>
                            <li>Repair or replacement service</li>
                            <li>Transferable to new owner</li>
                        </ul>
                    </div>
                    
                    <div class="warranty-actions">
                        <button class="btn btn-primary" onclick="productWarrantyManager.purchaseExtendedWarranty('${productId}', ${option.duration})">
                            Purchase Extended Warranty
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Purchase extended warranty
     */
    purchaseExtendedWarranty(productId, duration) {
        // This would integrate with payment processing
        alert(`Extended ${duration}-month warranty purchase initiated for product ${productId}`);
        this.closeExtendedWarrantyModal();
    }
}

// Initialize the manager
const productWarrantyManager = new ProductWarrantyManager();

// Global functions for modal interactions
window.openWarrantyRegistrationModal = (productId) => productWarrantyManager.openWarrantyRegistrationModal(productId);
window.openWarrantyClaimModal = (productId) => productWarrantyManager.openWarrantyClaimModal(productId);
window.openWarrantyStatusModal = () => productWarrantyManager.openWarrantyStatusModal();
window.openExtendedWarrantyModal = (productId, duration) => productWarrantyManager.openExtendedWarrantyModal(productId, duration);
window.closeWarrantyRegistrationModal = () => productWarrantyManager.closeWarrantyRegistrationModal();
window.closeWarrantyClaimModal = () => productWarrantyManager.closeWarrantyClaimModal();
window.closeWarrantyStatusModal = () => productWarrantyManager.closeWarrantyStatusModal();
window.closeExtendedWarrantyModal = () => productWarrantyManager.closeExtendedWarrantyModal();

