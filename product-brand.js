/**
 * Product Brand Information and Brand Pages Manager
 * Handles brand information, brand pages, brand stories, and brand-related products
 */

class ProductBrandManager {
    constructor() {
        this.brandData = {
            '1': { // Product ID 1
                brandId: 'shopmax_audio',
                brandName: 'ShopMax Audio',
                brandLogo: 'https://via.placeholder.com/200x100?text=ShopMax+Audio',
                brandDescription: 'ShopMax Audio is a leading manufacturer of premium audio equipment, dedicated to delivering exceptional sound quality and innovative technology.',
                brandStory: 'Founded in 2010, ShopMax Audio began as a small startup with a vision to revolutionize the audio industry. Our founders, audio engineers with decades of experience, set out to create products that would bring studio-quality sound to everyday consumers.',
                brandValues: [
                    {
                        title: 'Innovation',
                        description: 'We continuously push the boundaries of audio technology to deliver cutting-edge products.',
                        icon: 'fas fa-lightbulb'
                    },
                    {
                        title: 'Quality',
                        description: 'Every product undergoes rigorous testing to ensure exceptional performance and durability.',
                        icon: 'fas fa-award'
                    },
                    {
                        title: 'Sustainability',
                        description: 'We are committed to environmentally responsible manufacturing and packaging.',
                        icon: 'fas fa-leaf'
                    }
                ],
                brandStats: {
                    founded: '2010',
                    employees: '500+',
                    products: '150+',
                    countries: '50+',
                    customers: '2M+'
                },
                brandAwards: [
                    {
                        name: 'CES Innovation Award 2023',
                        category: 'Audio Technology',
                        year: '2023',
                        description: 'Recognized for breakthrough noise cancellation technology'
                    },
                    {
                        name: 'Red Dot Design Award 2022',
                        category: 'Product Design',
                        year: '2022',
                        description: 'Awarded for exceptional design and user experience'
                    },
                    {
                        name: 'Audio Excellence Award 2021',
                        category: 'Sound Quality',
                        year: '2021',
                        description: 'Recognized for outstanding audio performance'
                    }
                ],
                brandSocialMedia: {
                    website: 'https://shopmaxaudio.com',
                    facebook: 'https://facebook.com/shopmaxaudio',
                    twitter: 'https://twitter.com/shopmaxaudio',
                    instagram: 'https://instagram.com/shopmaxaudio',
                    youtube: 'https://youtube.com/shopmaxaudio'
                },
                brandContact: {
                    headquarters: 'San Francisco, CA, USA',
                    phone: '+1-800-SHOPMAX',
                    email: 'info@shopmaxaudio.com',
                    support: 'support@shopmaxaudio.com'
                }
            },
            '2': { // Product ID 2
                brandId: 'tech_gear',
                brandName: 'TechGear',
                brandLogo: 'https://via.placeholder.com/200x100?text=TechGear',
                brandDescription: 'TechGear specializes in innovative technology accessories and gadgets for modern lifestyles.',
                brandStory: 'TechGear was established in 2015 with the mission to make technology more accessible and user-friendly for everyone.',
                brandValues: [
                    {
                        title: 'Accessibility',
                        description: 'Making technology accessible to users of all skill levels.',
                        icon: 'fas fa-universal-access'
                    },
                    {
                        title: 'Innovation',
                        description: 'Creating innovative solutions for everyday tech challenges.',
                        icon: 'fas fa-rocket'
                    }
                ],
                brandStats: {
                    founded: '2015',
                    employees: '200+',
                    products: '75+',
                    countries: '30+',
                    customers: '500K+'
                },
                brandAwards: [
                    {
                        name: 'Tech Innovation Award 2022',
                        category: 'Accessories',
                        year: '2022',
                        description: 'Recognized for innovative design and functionality'
                    }
                ],
                brandSocialMedia: {
                    website: 'https://techgear.com',
                    facebook: 'https://facebook.com/techgear',
                    twitter: 'https://twitter.com/techgear'
                },
                brandContact: {
                    headquarters: 'Austin, TX, USA',
                    phone: '+1-800-TECHGEAR',
                    email: 'info@techgear.com'
                }
            },
            '3': { // Product ID 3
                brandId: 'premium_tech',
                brandName: 'Premium Tech',
                brandLogo: 'https://via.placeholder.com/200x100?text=Premium+Tech',
                brandDescription: 'Premium Tech delivers high-end technology solutions for professionals and enthusiasts.',
                brandStory: 'Since 2008, Premium Tech has been at the forefront of professional-grade technology solutions.',
                brandValues: [
                    {
                        title: 'Professional Grade',
                        description: 'Products designed for professional use and demanding environments.',
                        icon: 'fas fa-briefcase'
                    }
                ],
                brandStats: {
                    founded: '2008',
                    employees: '1000+',
                    products: '300+',
                    countries: '60+',
                    customers: '5M+'
                },
                brandAwards: [],
                brandSocialMedia: {
                    website: 'https://premiumtech.com'
                },
                brandContact: {
                    headquarters: 'New York, NY, USA',
                    phone: '+1-800-PREMIUM',
                    email: 'info@premiumtech.com'
                }
            }
        };

        this.brandPagesData = {
            'shopmax_audio': {
                brandName: 'ShopMax Audio',
                brandLogo: 'https://via.placeholder.com/300x150?text=ShopMax+Audio',
                heroImage: 'https://via.placeholder.com/1200x400?text=ShopMax+Audio+Hero',
                brandDescription: 'ShopMax Audio is a leading manufacturer of premium audio equipment, dedicated to delivering exceptional sound quality and innovative technology. Our commitment to excellence has made us a trusted name in the audio industry.',
                brandStory: {
                    title: 'Our Story',
                    content: 'Founded in 2010 by a team of passionate audio engineers, ShopMax Audio began with a simple mission: to bring studio-quality sound to everyday consumers. What started as a small startup in a garage has grown into a global company serving millions of customers worldwide. Our founders, John Smith and Sarah Johnson, both with decades of experience in audio engineering, set out to create products that would revolutionize how people experience sound. Today, we continue to push the boundaries of audio technology while maintaining our commitment to quality and innovation.'
                },
                brandMission: {
                    title: 'Our Mission',
                    content: 'To create exceptional audio products that enhance the way people experience music, entertainment, and communication. We believe that great sound should be accessible to everyone, and we work tirelessly to make that vision a reality.'
                },
                brandVision: {
                    title: 'Our Vision',
                    content: 'To be the world\'s most trusted and innovative audio technology company, setting the standard for sound quality and user experience in the industry.'
                },
                brandValues: [
                    {
                        title: 'Innovation',
                        description: 'We continuously push the boundaries of audio technology to deliver cutting-edge products that exceed expectations.',
                        icon: 'fas fa-lightbulb',
                        color: '#FF6B35'
                    },
                    {
                        title: 'Quality',
                        description: 'Every product undergoes rigorous testing to ensure exceptional performance, durability, and reliability.',
                        icon: 'fas fa-award',
                        color: '#4ECDC4'
                    },
                    {
                        title: 'Sustainability',
                        description: 'We are committed to environmentally responsible manufacturing, packaging, and business practices.',
                        icon: 'fas fa-leaf',
                        color: '#45B7D1'
                    },
                    {
                        title: 'Customer Focus',
                        description: 'Our customers are at the heart of everything we do, driving our innovation and product development.',
                        icon: 'fas fa-users',
                        color: '#96CEB4'
                    }
                ],
                brandStats: {
                    founded: '2010',
                    employees: '500+',
                    products: '150+',
                    countries: '50+',
                    customers: '2M+',
                    awards: '25+',
                    patents: '100+'
                },
                brandAwards: [
                    {
                        name: 'CES Innovation Award 2023',
                        category: 'Audio Technology',
                        year: '2023',
                        description: 'Recognized for breakthrough noise cancellation technology that sets new industry standards.',
                        image: 'https://via.placeholder.com/100x100?text=CES+2023'
                    },
                    {
                        name: 'Red Dot Design Award 2022',
                        category: 'Product Design',
                        year: '2022',
                        description: 'Awarded for exceptional design and user experience in our flagship headphone series.',
                        image: 'https://via.placeholder.com/100x100?text=Red+Dot+2022'
                    },
                    {
                        name: 'Audio Excellence Award 2021',
                        category: 'Sound Quality',
                        year: '2021',
                        description: 'Recognized for outstanding audio performance and sound clarity.',
                        image: 'https://via.placeholder.com/100x100?text=Audio+Excellence+2021'
                    },
                    {
                        name: 'TechCrunch Disrupt Award 2020',
                        category: 'Innovation',
                        year: '2020',
                        description: 'Honored for revolutionary audio processing technology.',
                        image: 'https://via.placeholder.com/100x100?text=TechCrunch+2020'
                    }
                ],
                brandTeam: [
                    {
                        name: 'John Smith',
                        position: 'CEO & Co-Founder',
                        image: 'https://via.placeholder.com/150x150?text=John+Smith',
                        bio: 'Audio engineer with 20+ years of experience in the industry.',
                        linkedin: 'https://linkedin.com/in/johnsmith'
                    },
                    {
                        name: 'Sarah Johnson',
                        position: 'CTO & Co-Founder',
                        image: 'https://via.placeholder.com/150x150?text=Sarah+Johnson',
                        bio: 'Technology innovator and product development expert.',
                        linkedin: 'https://linkedin.com/in/sarahjohnson'
                    },
                    {
                        name: 'Mike Chen',
                        position: 'Head of Design',
                        image: 'https://via.placeholder.com/150x150?text=Mike+Chen',
                        bio: 'Award-winning industrial designer with a passion for user experience.',
                        linkedin: 'https://linkedin.com/in/mikechen'
                    }
                ],
                brandSocialMedia: {
                    website: 'https://shopmaxaudio.com',
                    facebook: 'https://facebook.com/shopmaxaudio',
                    twitter: 'https://twitter.com/shopmaxaudio',
                    instagram: 'https://instagram.com/shopmaxaudio',
                    youtube: 'https://youtube.com/shopmaxaudio',
                    linkedin: 'https://linkedin.com/company/shopmaxaudio'
                },
                brandContact: {
                    headquarters: 'San Francisco, CA, USA',
                    phone: '+1-800-SHOPMAX',
                    email: 'info@shopmaxaudio.com',
                    support: 'support@shopmaxaudio.com',
                    sales: 'sales@shopmaxaudio.com',
                    press: 'press@shopmaxaudio.com'
                },
                brandLocations: [
                    {
                        name: 'Headquarters',
                        address: '123 Audio Street, San Francisco, CA 94105',
                        type: 'Corporate Office',
                        phone: '+1-415-555-0100'
                    },
                    {
                        name: 'Research & Development',
                        address: '456 Innovation Drive, Palo Alto, CA 94301',
                        type: 'R&D Center',
                        phone: '+1-650-555-0200'
                    },
                    {
                        name: 'Manufacturing Facility',
                        address: '789 Production Way, Austin, TX 78701',
                        type: 'Manufacturing',
                        phone: '+1-512-555-0300'
                    }
                ]
            }
        };
    }

    /**
     * Render brand information for a product
     */
    renderBrandInfo(productId, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const data = this.brandData[productId] || this.brandData['1'];
        
        container.innerHTML = `
            <div class="brand-info-section">
                <div class="brand-header">
                    <h3><i class="fas fa-building"></i> Brand Information</h3>
                    <p>Learn more about the brand behind this product and their commitment to quality and innovation.</p>
                </div>

                <div class="brand-content">
                    <div class="brand-overview">
                        ${this.renderBrandOverview(data)}
                    </div>

                    <div class="brand-story">
                        ${this.renderBrandStory(data)}
                    </div>

                    <div class="brand-values">
                        ${this.renderBrandValues(data.brandValues)}
                    </div>

                    <div class="brand-stats">
                        ${this.renderBrandStats(data.brandStats)}
                    </div>

                    <div class="brand-awards">
                        ${this.renderBrandAwards(data.brandAwards)}
                    </div>

                    <div class="brand-social">
                        ${this.renderBrandSocial(data.brandSocialMedia)}
                    </div>

                    <div class="brand-contact">
                        ${this.renderBrandContact(data.brandContact)}
                    </div>

                    <div class="brand-actions">
                        <button class="btn btn-primary" onclick="productBrandManager.viewBrandPage('${data.brandId}')">
                            <i class="fas fa-external-link-alt"></i> View Full Brand Page
                        </button>
                        <button class="btn btn-secondary" onclick="productBrandManager.viewBrandProducts('${data.brandId}')">
                            <i class="fas fa-th-large"></i> View All Brand Products
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.initializeBrandHandlers(productId);
    }

    /**
     * Render brand overview
     */
    renderBrandOverview(data) {
        return `
            <div class="brand-overview-card">
                <div class="brand-logo">
                    <img src="${data.brandLogo}" alt="${data.brandName}" />
                </div>
                <div class="brand-details">
                    <h4>${data.brandName}</h4>
                    <p>${data.brandDescription}</p>
                </div>
            </div>
        `;
    }

    /**
     * Render brand story
     */
    renderBrandStory(data) {
        return `
            <div class="brand-story-card">
                <h4>Brand Story</h4>
                <p>${data.brandStory}</p>
            </div>
        `;
    }

    /**
     * Render brand values
     */
    renderBrandValues(values) {
        return `
            <div class="brand-values-card">
                <h4>Brand Values</h4>
                <div class="values-grid">
                    ${values.map(value => `
                        <div class="value-item">
                            <div class="value-icon">
                                <i class="${value.icon}"></i>
                            </div>
                            <div class="value-content">
                                <h5>${value.title}</h5>
                                <p>${value.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render brand stats
     */
    renderBrandStats(stats) {
        return `
            <div class="brand-stats-card">
                <h4>Brand Statistics</h4>
                <div class="stats-grid">
                    ${Object.entries(stats).map(([key, value]) => `
                        <div class="stat-item">
                            <div class="stat-value">${value}</div>
                            <div class="stat-label">${this.getStatLabel(key)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render brand awards
     */
    renderBrandAwards(awards) {
        if (awards.length === 0) return '';

        return `
            <div class="brand-awards-card">
                <h4>Brand Awards & Recognition</h4>
                <div class="awards-list">
                    ${awards.map(award => `
                        <div class="award-item">
                            <div class="award-icon">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="award-content">
                                <h5>${award.name}</h5>
                                <div class="award-meta">
                                    <span class="award-category">${award.category}</span>
                                    <span class="award-year">${award.year}</span>
                                </div>
                                <p>${award.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render brand social media
     */
    renderBrandSocial(socialMedia) {
        return `
            <div class="brand-social-card">
                <h4>Connect With Us</h4>
                <div class="social-links">
                    ${Object.entries(socialMedia).map(([platform, url]) => `
                        <a href="${url}" target="_blank" class="social-link ${platform}">
                            <i class="fab fa-${platform === 'website' ? 'globe' : platform}"></i>
                            <span>${this.getSocialLabel(platform)}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render brand contact
     */
    renderBrandContact(contact) {
        return `
            <div class="brand-contact-card">
                <h4>Contact Information</h4>
                <div class="contact-info">
                    ${Object.entries(contact).map(([key, value]) => `
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-${this.getContactIcon(key)}"></i>
                            </div>
                            <div class="contact-details">
                                <span class="contact-label">${this.getContactLabel(key)}</span>
                                <span class="contact-value">${value}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * View brand page
     */
    viewBrandPage(brandId) {
        // In a real application, this would navigate to a dedicated brand page
        window.open(`brand.html?id=${brandId}`, '_blank');
    }

    /**
     * View brand products
     */
    viewBrandProducts(brandId) {
        // In a real application, this would filter products by brand
        window.location.href = `products.html?brand=${brandId}`;
    }

    /**
     * Initialize brand handlers
     */
    initializeBrandHandlers(productId) {
        // Initialize any interactive elements
    }

    /**
     * Get stat label
     */
    getStatLabel(key) {
        const labels = {
            'founded': 'Founded',
            'employees': 'Employees',
            'products': 'Products',
            'countries': 'Countries',
            'customers': 'Customers',
            'awards': 'Awards',
            'patents': 'Patents'
        };
        return labels[key] || key;
    }

    /**
     * Get social label
     */
    getSocialLabel(platform) {
        const labels = {
            'website': 'Website',
            'facebook': 'Facebook',
            'twitter': 'Twitter',
            'instagram': 'Instagram',
            'youtube': 'YouTube',
            'linkedin': 'LinkedIn'
        };
        return labels[platform] || platform;
    }

    /**
     * Get contact icon
     */
    getContactIcon(key) {
        const icons = {
            'headquarters': 'map-marker-alt',
            'phone': 'phone',
            'email': 'envelope',
            'support': 'headset',
            'sales': 'handshake',
            'press': 'newspaper'
        };
        return icons[key] || 'info-circle';
    }

    /**
     * Get contact label
     */
    getContactLabel(key) {
        const labels = {
            'headquarters': 'Headquarters',
            'phone': 'Phone',
            'email': 'Email',
            'support': 'Support',
            'sales': 'Sales',
            'press': 'Press'
        };
        return labels[key] || key;
    }
}

// Initialize the manager
const productBrandManager = new ProductBrandManager();

// Global functions for brand interactions
window.viewBrandPage = (brandId) => productBrandManager.viewBrandPage(brandId);
window.viewBrandProducts = (brandId) => productBrandManager.viewBrandProducts(brandId);

