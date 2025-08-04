# Hydrogen Docker Development Makefile
COMPOSE_FILE = docker-compose.dev.yml
SERVICE_NAME = hydrogen-dev

.PHONY: help start up stop down restart logs shell bash install build typecheck lint clean

# Default target
.DEFAULT_GOAL := help

help: ## Show this help message
	@echo "Hydrogen Docker Development Helper"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "Examples:"
	@echo "  make start      # Start development server"
	@echo "  make shell      # Access container shell"
	@echo "  make logs       # View logs"

start: ## Start the development environment
	@echo "🚀 Starting Hydrogen development environment..."
	docker-compose -f $(COMPOSE_FILE) up --build

up: start ## Alias for start

stop: ## Stop the development environment
	@echo "🛑 Stopping Hydrogen development environment..."
	docker-compose -f $(COMPOSE_FILE) down

down: stop ## Alias for stop

restart: ## Restart the development environment
	@echo "🔄 Restarting Hydrogen development environment..."
	docker-compose -f $(COMPOSE_FILE) down
	docker-compose -f $(COMPOSE_FILE) up --build

logs: ## Show container logs
	@echo "📝 Showing logs..."
	docker-compose -f $(COMPOSE_FILE) logs -f

shell: ## Open shell in container
	@echo "🔧 Opening shell in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) bash

bash: shell ## Alias for shell

install: ## Install npm packages in container
	@echo "📦 Installing npm packages in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm install

build: ## Build the project in container
	@echo "🏗️  Building project in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm run build

typecheck: ## Run TypeScript check in container
	@echo "🔍 Running typecheck in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm run typecheck

lint: ## Run ESLint in container
	@echo "🧹 Running lint in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm run lint

codegen: ## Run GraphQL codegen in container
	@echo "🔄 Running GraphQL codegen in container..."
	docker-compose -f $(COMPOSE_FILE) exec $(SERVICE_NAME) npm run codegen

dev-detached: ## Start development environment in detached mode
	@echo "🚀 Starting Hydrogen development environment (detached)..."
	docker-compose -f $(COMPOSE_FILE) up --build -d

status: ## Show container status
	@echo "📊 Container status:"
	docker-compose -f $(COMPOSE_FILE) ps

clean: ## Clean up Docker resources
	@echo "🧽 Cleaning up Docker resources..."
	docker-compose -f $(COMPOSE_FILE) down -v
	docker system prune -f

clean-all: ## Clean up all Docker resources including images
	@echo "🧽 Cleaning up all Docker resources..."
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all
	docker system prune -a -f