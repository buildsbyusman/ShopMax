#!/bin/bash

# ShopMax E-commerce Platform Deployment Script
# This script handles the complete deployment of the ShopMax platform

set -e

echo "🚀 Starting ShopMax E-commerce Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Check if .env file exists
check_env_file() {
    print_status "Checking environment configuration..."
    if [ ! -f .env ]; then
        print_warning ".env file not found. Creating from template..."
        if [ -f env.example ]; then
            cp env.example .env
            print_warning "Please update .env file with your actual configuration values"
            print_warning "Required variables: DB_PASSWORD, JWT_SECRET, SENDGRID_API_KEY, STRIPE_SECRET_KEY, etc."
        else
            print_error "env.example file not found. Cannot create .env file."
            exit 1
        fi
    else
        print_success "Environment file found"
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    mkdir -p logs
    mkdir -p uploads
    mkdir -p nginx/ssl
    mkdir -p monitoring/grafana/dashboards
    mkdir -p monitoring/grafana/datasources
    
    print_success "Directories created"
}

# Build and start services
deploy_services() {
    print_status "Building and starting services..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose down --remove-orphans
    
    # Build and start services
    print_status "Building Docker images..."
    docker-compose build --no-cache
    
    print_status "Starting services..."
    docker-compose up -d
    
    print_success "Services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for PostgreSQL
    print_status "Waiting for PostgreSQL..."
    timeout 60 bash -c 'until docker-compose exec -T postgres pg_isready -U shopmax_user -d shopmax_ecommerce; do sleep 2; done'
    print_success "PostgreSQL is ready"
    
    # Wait for Redis
    print_status "Waiting for Redis..."
    timeout 30 bash -c 'until docker-compose exec -T redis redis-cli ping; do sleep 2; done'
    print_success "Redis is ready"
    
    # Wait for application
    print_status "Waiting for application..."
    timeout 60 bash -c 'until curl -f http://localhost:3000/health; do sleep 5; done'
    print_success "Application is ready"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    docker-compose exec -T app npm run migrate
    print_success "Database migrations completed"
}

# Run database seeds (only in development)
run_seeds() {
    if [ "$NODE_ENV" != "production" ]; then
        print_status "Running database seeds..."
        docker-compose exec -T app npm run seed
        print_success "Database seeds completed"
    else
        print_warning "Skipping database seeds in production"
    fi
}

# Display deployment information
show_deployment_info() {
    print_success "🎉 ShopMax E-commerce Platform deployed successfully!"
    echo ""
    echo "📋 Deployment Information:"
    echo "  • Application URL: http://localhost:3000"
    echo "  • API Documentation: http://localhost:3000/api-docs"
    echo "  • Health Check: http://localhost:3000/health"
    echo "  • Grafana Dashboard: http://localhost:3001"
    echo "  • Prometheus: http://localhost:9090"
    echo ""
    echo "🔧 Management Commands:"
    echo "  • View logs: docker-compose logs -f"
    echo "  • Stop services: docker-compose down"
    echo "  • Restart services: docker-compose restart"
    echo "  • Update services: docker-compose pull && docker-compose up -d"
    echo ""
    echo "📊 Monitoring:"
    echo "  • Application logs: docker-compose logs -f app"
    echo "  • Database logs: docker-compose logs -f postgres"
    echo "  • Redis logs: docker-compose logs -f redis"
    echo ""
    print_warning "Remember to:"
    echo "  1. Update your DNS to point to this server"
    echo "  2. Configure SSL certificates in nginx/ssl/"
    echo "  3. Set up proper backup procedures"
    echo "  4. Configure monitoring alerts"
}

# Main deployment function
main() {
    echo "🏪 ShopMax E-commerce Platform Deployment"
    echo "========================================"
    echo ""
    
    check_docker
    check_env_file
    create_directories
    deploy_services
    wait_for_services
    run_migrations
    run_seeds
    show_deployment_info
}

# Handle script arguments
case "${1:-}" in
    "stop")
        print_status "Stopping ShopMax services..."
        docker-compose down
        print_success "Services stopped"
        ;;
    "restart")
        print_status "Restarting ShopMax services..."
        docker-compose restart
        print_success "Services restarted"
        ;;
    "logs")
        docker-compose logs -f
        ;;
    "update")
        print_status "Updating ShopMax services..."
        docker-compose pull
        docker-compose up -d
        print_success "Services updated"
        ;;
    "backup")
        print_status "Creating database backup..."
        docker-compose exec -T postgres pg_dump -U shopmax_user shopmax_ecommerce > backup_$(date +%Y%m%d_%H%M%S).sql
        print_success "Database backup created"
        ;;
    *)
        main
        ;;
esac
