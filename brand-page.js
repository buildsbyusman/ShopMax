/**
 * Brand Page Manager
 * Handles dedicated brand pages with comprehensive brand information
 */

class BrandPageManager {
    constructor() {
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
                        bio: 'Audio engineer with 20+ years of experience in the industry. John leads our vision and strategic direction.',
                        linkedin: 'https://linkedin.com/in/johnsmith'
                    },
                    {
                        name: 'Sarah Johnson',
                        position: 'CTO & Co-Founder',
                        image: 'https://via.placeholder.com/150x150?text=Sarah+Johnson',
                        bio: 'Technology innovator and product development expert. Sarah drives our technical innovation.',
                        linkedin: 'https://linkedin.com/in/sarahjohnson'
                    },
                    {
                        name: 'Mike Chen',
                        position: 'Head of Design',
                        image: 'https://via.placeholder.com/150x150?text=Mike+Chen',
                        bio: 'Award-winning industrial designer with a passion for user experience and aesthetic excellence.',
                        linkedin: 'https://linkedin.com/in/mikechen'
                    },
                    {
                        name: 'Emily Rodriguez',
                        position: 'Head of Marketing',
                        image: 'https://via.placeholder.com/150x150?text=Emily+Rodriguez',
                        bio: 'Marketing strategist with expertise in brand building and customer engagement.',
                        linkedin: 'https://linkedin.com/in/emilyrodriguez'
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
                        phone: '+1-415-555-0100',
                        image: 'https://via.placeholder.com/300x200?text=Headquarters'
                    },
                    {
                        name: 'Research & Development',
                        address: '456 Innovation Drive, Palo Alto, CA 94301',
                        type: 'R&D Center',
                        phone: '+1-650-555-0200',
                        image: 'https://via.placeholder.com/300x200?text=R%26D+Center'
                    },
                    {
                        name: 'Manufacturing Facility',
                        address: '789 Production Way, Austin, TX 78701',
                        type: 'Manufacturing',
                        phone: '+1-512-555-0300',
                        image: 'https://via.placeholder.com/300x200?text=Manufacturing'
                    }
                ],
                brandProducts: [
                    {
                        id: '1',
                        name: 'AeroSound Pro Headphones',
                        price: 79.99,
                        image: 'https://via.placeholder.com/200x200?text=AeroSound+Pro',
                        rating: 4.8,
                        reviews: 1250
                    },
                    {
                        id: '2',
                        name: 'StudioMax Wireless Earbuds',
                        price: 129.99,
                        image: 'https://via.placeholder.com/200x200?text=StudioMax',
                        rating: 4.7,
                        reviews: 890
                    },
                    {
                        id: '3',
                        name: 'BassBoost Speaker System',
                        price: 199.99,
                        image: 'https://via.placeholder.com/200x200?text=BassBoost',
                        rating: 4.9,
                        reviews: 567
                    }
                ]
            }
        };
    }

    /**
     * Load brand page content
     */
    loadBrandPage(brandId) {
        const container = document.getElementById('brandPageContent');
        if (!container) return;

        const data = this.brandPagesData[brandId];
        if (!data) {
            container.innerHTML = `
                <div class="brand-not-found">
                    <h2>Brand Not Found</h2>
                    <p>The requested brand page could not be found.</p>
                    <a href="index.html" class="btn btn-primary">Return to Home</a>
                </div>
            `;
            return;
        }

        // Update page title
        document.title = `${data.brandName} - ShopMax`;

        container.innerHTML = `
            <div class="brand-page-content">
                ${this.renderBrandHero(data)}
                ${this.renderBrandOverview(data)}
                ${this.renderBrandStory(data)}
                ${this.renderBrandMission(data)}
                ${this.renderBrandVision(data)}
                ${this.renderBrandValues(data)}
                ${this.renderBrandStats(data)}
                ${this.renderBrandAwards(data)}
                ${this.renderBrandTeam(data)}
                ${this.renderBrandLocations(data)}
                ${this.renderBrandProducts(data)}
                ${this.renderBrandContact(data)}
                ${this.renderBrandSocial(data)}
            </div>
        `;

        this.initializeBrandPageHandlers(brandId);
    }

    /**
     * Render brand hero section
     */
    renderBrandHero(data) {
        return `
            <section class="brand-hero">
                <div class="hero-background">
                    <img src="${data.heroImage}" alt="${data.brandName}" />
                    <div class="hero-overlay"></div>
                </div>
                <div class="hero-content">
                    <div class="brand-logo">
                        <img src="${data.brandLogo}" alt="${data.brandName}" />
                    </div>
                    <h1>${data.brandName}</h1>
                    <p>${data.brandDescription}</p>
                    <div class="hero-actions">
                        <button class="btn btn-primary" onclick="brandPageManager.scrollToSection('products')">
                            <i class="fas fa-th-large"></i> View Products
                        </button>
                        <button class="btn btn-secondary" onclick="brandPageManager.scrollToSection('contact')">
                            <i class="fas fa-envelope"></i> Contact Us
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand overview
     */
    renderBrandOverview(data) {
        return `
            <section class="brand-overview">
                <div class="container">
                    <h2>About ${data.brandName}</h2>
                    <p>${data.brandDescription}</p>
                </div>
            </section>
        `;
    }

    /**
     * Render brand story
     */
    renderBrandStory(data) {
        return `
            <section class="brand-story">
                <div class="container">
                    <h2>${data.brandStory.title}</h2>
                    <p>${data.brandStory.content}</p>
                </div>
            </section>
        `;
    }

    /**
     * Render brand mission
     */
    renderBrandMission(data) {
        return `
            <section class="brand-mission">
                <div class="container">
                    <h2>${data.brandMission.title}</h2>
                    <p>${data.brandMission.content}</p>
                </div>
            </section>
        `;
    }

    /**
     * Render brand vision
     */
    renderBrandVision(data) {
        return `
            <section class="brand-vision">
                <div class="container">
                    <h2>${data.brandVision.title}</h2>
                    <p>${data.brandVision.content}</p>
                </div>
            </section>
        `;
    }

    /**
     * Render brand values
     */
    renderBrandValues(data) {
        return `
            <section class="brand-values">
                <div class="container">
                    <h2>Our Values</h2>
                    <div class="values-grid">
                        ${data.brandValues.map(value => `
                            <div class="value-card">
                                <div class="value-icon" style="background-color: ${value.color}">
                                    <i class="${value.icon}"></i>
                                </div>
                                <h3>${value.title}</h3>
                                <p>${value.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand stats
     */
    renderBrandStats(data) {
        return `
            <section class="brand-stats">
                <div class="container">
                    <h2>By the Numbers</h2>
                    <div class="stats-grid">
                        ${Object.entries(data.brandStats).map(([key, value]) => `
                            <div class="stat-card">
                                <div class="stat-value">${value}</div>
                                <div class="stat-label">${this.getStatLabel(key)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand awards
     */
    renderBrandAwards(data) {
        return `
            <section class="brand-awards">
                <div class="container">
                    <h2>Awards & Recognition</h2>
                    <div class="awards-grid">
                        ${data.brandAwards.map(award => `
                            <div class="award-card">
                                <div class="award-image">
                                    <img src="${award.image}" alt="${award.name}" />
                                </div>
                                <div class="award-content">
                                    <h3>${award.name}</h3>
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
            </section>
        `;
    }

    /**
     * Render brand team
     */
    renderBrandTeam(data) {
        return `
            <section class="brand-team">
                <div class="container">
                    <h2>Meet Our Team</h2>
                    <div class="team-grid">
                        ${data.brandTeam.map(member => `
                            <div class="team-card">
                                <div class="member-image">
                                    <img src="${member.image}" alt="${member.name}" />
                                </div>
                                <div class="member-info">
                                    <h3>${member.name}</h3>
                                    <p class="member-position">${member.position}</p>
                                    <p class="member-bio">${member.bio}</p>
                                    <a href="${member.linkedin}" target="_blank" class="linkedin-link">
                                        <i class="fab fa-linkedin"></i> LinkedIn
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand locations
     */
    renderBrandLocations(data) {
        return `
            <section class="brand-locations">
                <div class="container">
                    <h2>Our Locations</h2>
                    <div class="locations-grid">
                        ${data.brandLocations.map(location => `
                            <div class="location-card">
                                <div class="location-image">
                                    <img src="${location.image}" alt="${location.name}" />
                                </div>
                                <div class="location-info">
                                    <h3>${location.name}</h3>
                                    <p class="location-type">${location.type}</p>
                                    <p class="location-address">${location.address}</p>
                                    <p class="location-phone">${location.phone}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand products
     */
    renderBrandProducts(data) {
        return `
            <section class="brand-products" id="products">
                <div class="container">
                    <h2>Our Products</h2>
                    <div class="products-grid">
                        ${data.brandProducts.map(product => `
                            <div class="product-card">
                                <div class="product-image">
                                    <img src="${product.image}" alt="${product.name}" />
                                </div>
                                <div class="product-info">
                                    <h3>${product.name}</h3>
                                    <div class="product-rating">
                                        <div class="stars">
                                            ${this.renderStars(product.rating)}
                                        </div>
                                        <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                                    </div>
                                    <div class="product-price">$${product.price}</div>
                                    <button class="btn btn-primary" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                        View Product
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand contact
     */
    renderBrandContact(data) {
        return `
            <section class="brand-contact" id="contact">
                <div class="container">
                    <h2>Contact Us</h2>
                    <div class="contact-content">
                        <div class="contact-info">
                            <h3>Get in Touch</h3>
                            <div class="contact-details">
                                ${Object.entries(data.brandContact).map(([key, value]) => `
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
                        <div class="contact-form">
                            <h3>Send us a Message</h3>
                            <form>
                                <div class="form-group">
                                    <input type="text" placeholder="Your Name" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" placeholder="Your Email" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="Subject" required>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder="Your Message" rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render brand social media
     */
    renderBrandSocial(data) {
        return `
            <section class="brand-social">
                <div class="container">
                    <h2>Follow Us</h2>
                    <div class="social-links">
                        ${Object.entries(data.brandSocialMedia).map(([platform, url]) => `
                            <a href="${url}" target="_blank" class="social-link ${platform}">
                                <i class="fab fa-${platform === 'website' ? 'globe' : platform}"></i>
                                <span>${this.getSocialLabel(platform)}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * Render stars for rating
     */
    renderStars(rating) {
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

    /**
     * Scroll to section
     */
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Initialize brand page handlers
     */
    initializeBrandPageHandlers(brandId) {
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
const brandPageManager = new BrandPageManager();

