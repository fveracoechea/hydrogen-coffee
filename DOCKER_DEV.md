# Docker Development Setup

This setup allows you to run the Hydrogen project in a Docker container with mini-oxygen, perfect for systems where mini-oxygen isn't natively supported.

## Quick Start

1. **Start the development environment:**

   ```bash
   make start
   ```

2. **Access your app:**
   - App: http://localhost:3000
   - GraphiQL: http://localhost:3000/graphiql
   - Network requests: http://localhost:3000/subrequest-profiler

## Development Commands

### Basic Commands

```bash
make start         # Start development server
make stop          # Stop development server
make restart       # Restart development server
make logs          # View container logs
make dev-detached  # Start in background
make status        # Show container status
```

### Development Tools

```bash
make shell         # Access container shell
make install       # Install npm packages
make build         # Build the project
make typecheck     # Run TypeScript check
make lint          # Run ESLint
make codegen       # Run GraphQL codegen
make clean         # Clean up Docker resources
```

### Help

```bash
make help          # Show all available commands
```

## How It Works

- **Hot Reloading**: Your source code is mounted as a volume, so changes are reflected immediately
- **Node Modules**: Preserved in container to avoid platform conflicts
- **Environment**: Uses your local `.env` file for Shopify configuration
- **Mini-Oxygen**: Runs the mini-oxygen runtime in the container where it's fully supported

## File Structure

```
├── Dockerfile.dev          # Development-optimized Dockerfile
├── docker-compose.dev.yml  # Development docker-compose
├── Makefile                # Development commands
└── .env                    # Your Shopify environment variables
```

## Troubleshooting

### Container won't start

```bash
make clean
make start
```

### Need to install new packages

```bash
make install
```

### Access container for debugging

```bash
make shell
```

### Check container logs

```bash
make logs
```

## Environment Variables

Make sure your `.env` file contains:

```env
SESSION_SECRET=your_session_secret
PUBLIC_STOREFRONT_API_TOKEN=your_token
PUBLIC_STORE_DOMAIN=your_store.myshopify.com
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=your_client_id
PUBLIC_CHECKOUT_DOMAIN=your_checkout_domain
SHOP_ID=your_shop_id
```

2. **Access your app:**
   - App: http://localhost:3000
   - GraphiQL: http://localhost:3000/graphiql
   - Network requests: http://localhost:3000/subrequest-profiler

## Development Commands

### Basic Commands

```bash
./dev.sh start     # Start development server
./dev.sh stop      # Stop development server
./dev.sh restart   # Restart development server
./dev.sh logs      # View container logs
```

### Development Tools

```bash
./dev.sh shell     # Access container shell
./dev.sh install   # Install npm packages
./dev.sh build     # Build the project
./dev.sh typecheck # Run TypeScript check
./dev.sh lint      # Run ESLint
./dev.sh clean     # Clean up Docker resources
```

## How It Works

- **Hot Reloading**: Your source code is mounted as a volume, so changes are reflected immediately
- **Node Modules**: Preserved in container to avoid platform conflicts
- **Environment**: Uses your local `.env` file for Shopify configuration
- **Mini-Oxygen**: Runs the mini-oxygen runtime in the container where it's fully supported

## File Structure

```
├── Dockerfile.dev          # Development-optimized Dockerfile
├── docker-compose.dev.yml  # Development docker-compose
├── dev.sh                  # Development helper script
└── .env                    # Your Shopify environment variables
```

## Troubleshooting

### Container won't start

```bash
./dev.sh clean
./dev.sh start
```

### Need to install new packages

```bash
./dev.sh install
```

### Access container for debugging

```bash
./dev.sh shell
```

### Check container logs

```bash
./dev.sh logs
```

## Environment Variables

Make sure your `.env` file contains:

```env
SESSION_SECRET=your_session_secret
PUBLIC_STOREFRONT_API_TOKEN=your_token
PUBLIC_STORE_DOMAIN=your_store.myshopify.com
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=your_client_id
PUBLIC_CHECKOUT_DOMAIN=your_checkout_domain
SHOP_ID=your_shop_id
```
