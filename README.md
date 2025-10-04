# ShopMax E-commerce Platform

A professional, full-stack e-commerce platform built with Node.js, Express.js, PostgreSQL, and modern web technologies. Features complete product management, order processing, payment integration, and CJ Dropshipping support.

## 🚀 Features

### Core E-commerce Features
- **Product Management**: Complete product catalog with categories, variants, and inventory tracking
- **Shopping Cart**: Advanced cart functionality with persistent storage and guest cart merging
- **Order Processing**: Full order lifecycle management from creation to delivery
- **Payment Integration**: Stripe, PayPal, Apple Pay, and Google Pay support
- **User Management**: Registration, authentication, profiles, and role-based access control
- **Admin Dashboard**: Comprehensive admin panel for managing all aspects of the store

### Advanced Features
- **CJ Dropshipping Integration**: Seamless integration with CJ Dropshipping API
- **Real-time Notifications**: Email, SMS, and in-app notifications
- **Analytics & Reporting**: Detailed analytics and reporting dashboard
- **Search & Filtering**: Advanced product search with filters and sorting
- **Reviews & Ratings**: Product review system with moderation
- **Wishlist**: User wishlist functionality
- **Product Comparison**: Side-by-side product comparison
- **Recently Viewed**: Track and display recently viewed products
- **Quick View Modal**: Quick product preview without page reload

### Technical Features
- **RESTful API**: Well-documented REST API with Swagger documentation
- **Database**: PostgreSQL with comprehensive schema and migrations
- **Caching**: Redis for session management and performance optimization
- **Security**: JWT authentication, rate limiting, input validation, and security headers
- **Monitoring**: Prometheus and Grafana integration for monitoring
- **Docker**: Complete containerization with Docker Compose
- **CI/CD Ready**: Production-ready deployment configuration

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Knex.js** - SQL query builder and migrations
- **JWT** - Authentication and authorization
- **Stripe** - Payment processing
- **PayPal** - Payment processing
- **SendGrid** - Email services
- **Twilio** - SMS services

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Modern JavaScript features
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 compliance
- **Performance** - Optimized loading and caching

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards
- **SSL/TLS** - Secure communication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** and **Docker Compose**
- **PostgreSQL** (if running locally)
- **Redis** (if running locally)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/shopmax-ecommerce.git
cd shopmax-ecommerce
```

### 2. Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your configuration
nano .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
```bash
# Run migrations
npm run migrate

# Seed database (development only)
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🐳 Docker Deployment

### Quick Deployment
```bash
# Make deployment script executable (Linux/Mac)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Manual Docker Deployment
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the server is running, you can access the API documentation at:
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`

### Key API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - Get products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search` - Search products

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove cart item

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

#### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Manage users
- `GET /api/admin/products` - Manage products
- `GET /api/admin/orders` - Manage orders

## 🔧 Configuration

### Environment Variables

#### Database Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopmax_ecommerce
DB_USER=shopmax_user
DB_PASSWORD=your_secure_password
```

#### Redis Configuration
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

#### JWT Configuration
```env
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
```

#### Payment Configuration
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

#### Email Configuration
```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@shopmax.com
```

#### CJ Dropshipping Configuration
```env
CJ_API_KEY=your_cj_api_key
CJ_API_SECRET=your_cj_api_secret
CJ_BASE_URL=https://api.cjdropshipping.com
```

## 📊 Monitoring

### Grafana Dashboard
Access the monitoring dashboard at `http://localhost:3001`
- Default credentials: `admin` / `admin123`

### Prometheus Metrics
Access metrics at `http://localhost:9090`

### Health Checks
- Application: `http://localhost:3000/health`
- Database: Built into Docker health checks
- Redis: Built into Docker health checks

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and profiles
- **products** - Product catalog
- **categories** - Product categories
- **orders** - Order information
- **order_items** - Order line items
- **payments** - Payment records
- **cart** - Shopping cart items
- **wishlist** - User wishlists
- **reviews** - Product reviews
- **notifications** - User notifications

### Key Relationships
- Users have many orders
- Orders have many order items
- Products belong to categories
- Users have many cart items and wishlist items

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with configurable rounds
- **Rate Limiting** - API rate limiting to prevent abuse
- **Input Validation** - Joi schema validation
- **SQL Injection Protection** - Parameterized queries with Knex.js
- **XSS Protection** - Input sanitization and output encoding
- **CSRF Protection** - CSRF tokens for state-changing operations
- **Security Headers** - Helmet.js for security headers
- **CORS Configuration** - Proper CORS setup

## 🚀 Production Deployment

### 1. Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

### 2. SSL Configuration
```bash
# Generate SSL certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem
```

### 3. Environment Setup
```bash
# Set production environment
export NODE_ENV=production

# Update .env with production values
nano .env
```

### 4. Deploy
```bash
# Run deployment script
./deploy.sh
```

### 5. Monitoring Setup
- Configure Grafana dashboards
- Set up Prometheus alerts
- Configure log rotation
- Set up backup procedures

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Categories
- **Unit Tests** - Individual function testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full user journey testing

## 📈 Performance Optimization

### Backend Optimizations
- **Database Indexing** - Optimized database queries
- **Redis Caching** - Frequently accessed data caching
- **Connection Pooling** - Database connection optimization
- **Compression** - Gzip compression for responses
- **Rate Limiting** - API abuse prevention

### Frontend Optimizations
- **Image Optimization** - WebP format and lazy loading
- **Code Splitting** - Modular JavaScript loading
- **CDN Integration** - Static asset delivery
- **Caching Headers** - Browser caching optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Follow semantic versioning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](http://localhost:3000/api-docs)
- [Database Schema](docs/database-schema.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [GitHub Issues](https://github.com/your-username/shopmax-ecommerce/issues)
- [Discord Community](https://discord.gg/shopmax)
- [Email Support](mailto:support@shopmax.com)

### Professional Support
For enterprise support and custom development:
- **Email**: enterprise@shopmax.com
- **Phone**: +1 (555) 123-4567
- **Website**: https://shopmax.com/enterprise

## 🎯 Roadmap

### Version 2.0 (Q2 2024)
- [ ] Multi-vendor marketplace support
- [ ] Advanced inventory management
- [ ] Subscription products
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard

### Version 2.1 (Q3 2024)
- [ ] AI-powered product recommendations
- [ ] Advanced search with Elasticsearch
- [ ] Multi-language support
- [ ] Advanced reporting tools
- [ ] API rate limiting improvements

### Version 3.0 (Q4 2024)
- [ ] Microservices architecture
- [ ] GraphQL API
- [ ] Real-time chat support
- [ ] Advanced fraud detection
- [ ] Machine learning integration

---

**Built with ❤️ by the ShopMax Team**

For more information, visit [https://shopmax.com](https://shopmax.com)