#!/bin/bash

# RIRS SaaS Setup Script
# This script sets up the complete development environment

set -e

echo "🛡️  Setting up Retail Investor Risk Shield (RIRS) SaaS Platform"
echo "================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_status "Node.js is installed: $NODE_VERSION"
        
        # Check if version is >= 18
        if [[ $(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
            print_warning "Node.js version 18 or higher is recommended"
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
}

# Check if Docker is installed
check_docker() {
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        print_status "Docker is installed: $DOCKER_VERSION"
    else
        print_warning "Docker is not installed. Some features may not work."
        print_info "Install Docker from https://docs.docker.com/get-docker/"
    fi
}

# Setup environment files
setup_env_files() {
    print_info "Setting up environment files..."
    
    # Server environment
    if [ ! -f "server/.env" ]; then
        cp server/.env.example server/.env
        print_status "Created server/.env from example"
        print_warning "Please update server/.env with your actual configuration"
    else
        print_info "server/.env already exists"
    fi
    
    # Client environment
    if [ ! -f "client/.env.local" ]; then
        cp client/.env.example client/.env.local
        print_status "Created client/.env.local from example"
        print_warning "Please update client/.env.local with your actual configuration"
    else
        print_info "client/.env.local already exists"
    fi
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Root dependencies
    if [ -f "package.json" ]; then
        print_info "Installing root dependencies..."
        npm install
        print_status "Root dependencies installed"
    fi
    
    # Server dependencies
    print_info "Installing server dependencies..."
    cd server
    npm install
    print_status "Server dependencies installed"
    cd ..
    
    # Client dependencies
    print_info "Installing client dependencies..."
    cd client
    npm install
    print_status "Client dependencies installed"
    cd ..
}

# Setup database (if Docker is available)
setup_database() {
    if command -v docker &> /dev/null; then
        print_info "Setting up development database with Docker..."
        
        # Check if MongoDB container is already running
        if [ $(docker ps -q -f name=rirs-mongodb) ]; then
            print_info "MongoDB container is already running"
        else
            print_info "Starting MongoDB container..."
            docker run -d \
                --name rirs-mongodb \
                -p 27017:27017 \
                -e MONGO_INITDB_ROOT_USERNAME=admin \
                -e MONGO_INITDB_ROOT_PASSWORD=password123 \
                -e MONGO_INITDB_DATABASE=rirs \
                mongo:7.0
            print_status "MongoDB container started"
        fi
        
        # Check if Redis container is already running
        if [ $(docker ps -q -f name=rirs-redis) ]; then
            print_info "Redis container is already running"
        else
            print_info "Starting Redis container..."
            docker run -d \
                --name rirs-redis \
                -p 6379:6379 \
                redis:7.2-alpine
            print_status "Redis container started"
        fi
    else
        print_warning "Docker not available. Please install MongoDB and Redis manually."
        print_info "MongoDB: https://docs.mongodb.com/manual/installation/"
        print_info "Redis: https://redis.io/download"
    fi
}

# Build the project
build_project() {
    print_info "Building the project..."
    
    # Build server
    print_info "Building server..."
    cd server
    npm run build
    print_status "Server built successfully"
    cd ..
    
    # Build client
    print_info "Building client..."
    cd client
    npm run build
    print_status "Client built successfully"
    cd ..
}

# Create necessary directories
create_directories() {
    print_info "Creating necessary directories..."
    
    # Server logs directory
    mkdir -p server/logs
    print_status "Created server/logs directory"
    
    # Client public directory (if not exists)
    mkdir -p client/public
    print_status "Ensured client/public directory exists"
}

# Generate development certificates (optional)
generate_dev_certs() {
    if command -v openssl &> /dev/null; then
        print_info "Generating development SSL certificates..."
        mkdir -p ssl
        
        if [ ! -f "ssl/localhost.crt" ]; then
            openssl req -x509 -newkey rsa:4096 -keyout ssl/localhost.key -out ssl/localhost.crt -days 365 -nodes -subj "/C=IN/ST=State/L=City/O=RIRS/CN=localhost"
            print_status "Development SSL certificates generated"
        else
            print_info "SSL certificates already exist"
        fi
    else
        print_warning "OpenSSL not found. Skipping SSL certificate generation."
    fi
}

# Main setup function
main() {
    echo
    print_info "Starting RIRS SaaS setup process..."
    echo
    
    # Pre-flight checks
    print_info "Running pre-flight checks..."
    check_node
    check_docker
    echo
    
    # Setup process
    setup_env_files
    echo
    
    create_directories
    echo
    
    install_dependencies
    echo
    
    setup_database
    echo
    
    # Optional: Generate dev certificates
    read -p "Generate development SSL certificates? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        generate_dev_certs
        echo
    fi
    
    # Optional: Build project
    read -p "Build the project now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        build_project
        echo
    fi
    
    # Success message
    echo
    echo "🎉 RIRS SaaS setup completed successfully!"
    echo
    print_info "Next steps:"
    echo "1. Update environment files with your actual configuration:"
    echo "   - server/.env"
    echo "   - client/.env.local"
    echo
    echo "2. Start the development servers:"
    echo "   npm run dev"
    echo
    echo "3. Or start with Docker:"
    echo "   docker-compose up -d"
    echo
    echo "4. Access the application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend API: http://localhost:5000"
    echo "   - API Health: http://localhost:5000/health"
    echo
    print_info "For more information, check:"
    echo "- README.md - Project overview"
    echo "- FEATURES.md - Detailed feature documentation"
    echo "- DEPLOYMENT.md - Deployment guide"
    echo
    print_status "Happy coding! 🚀"
}

# Run main function
main "$@"