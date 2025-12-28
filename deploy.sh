#!/bin/bash

# RIRS Deployment Script for Vercel + Railway
echo "🚀 Deploying RIRS SaaS Platform"
echo "================================"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if required tools are installed
check_tools() {
    print_info "Checking required tools..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    print_status "Tools check complete"
}

# Deploy frontend to Vercel
deploy_frontend() {
    print_info "Deploying frontend to Vercel..."
    
    cd client
    
    # Build the project first
    print_info "Building Next.js application..."
    npm run build
    
    # Deploy to Vercel
    print_info "Deploying to Vercel..."
    vercel --prod --yes
    
    cd ..
    print_status "Frontend deployed to Vercel"
}

# Deploy backend to Railway
deploy_backend() {
    print_info "Deploying backend to Railway..."
    
    cd server
    
    # Build the project
    print_info "Building Node.js application..."
    npm run build
    
    # Deploy to Railway
    print_info "Deploying to Railway..."
    railway up
    
    cd ..
    print_status "Backend deployed to Railway"
}

# Main deployment function
main() {
    print_info "Starting RIRS deployment process..."
    
    # Check tools
    check_tools
    
    # Ask user what to deploy
    echo
    echo "What would you like to deploy?"
    echo "1) Frontend only (Vercel)"
    echo "2) Backend only (Railway)"
    echo "3) Both Frontend and Backend"
    echo "4) Exit"
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            deploy_frontend
            ;;
        2)
            deploy_backend
            ;;
        3)
            deploy_frontend
            deploy_backend
            ;;
        4)
            print_info "Deployment cancelled"
            exit 0
            ;;
        *)
            print_warning "Invalid choice. Please run the script again."
            exit 1
            ;;
    esac
    
    echo
    print_status "Deployment completed successfully! 🎉"
    echo
    print_info "Next steps:"
    echo "1. Update environment variables in Vercel and Railway dashboards"
    echo "2. Configure your custom domain (optional)"
    echo "3. Test your deployed application"
    echo
    print_info "Your application should be live at:"
    echo "- Frontend: Check Vercel dashboard for URL"
    echo "- Backend: Check Railway dashboard for URL"
}

# Run main function
main "$@"