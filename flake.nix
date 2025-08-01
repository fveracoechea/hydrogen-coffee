{
  description = "Shopify Hydrogen development environment with Oxygen Workers support";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          # Node.js LTS - required for Hydrogen/Oxygen
          nodejs_22

          # Essential build tools for native dependencies
          python3
          gcc
          gnumake
          pkg-config

          # Development tools
          git
          curl
          jq

          # Optional: Shopify CLI (if available in nixpkgs)
          shopify-cli

          # Network tools for development server
          netcat-gnu

          # Process management
          procps
        ];

        shellHook = ''
          echo "🚀 Shopify Hydrogen + Oxygen Workers development environment"
          echo "Node.js version: $(node --version)"
          echo "npm version: $(npm --version)"
          echo ""
          echo "🔧 Oxygen Workers Runtime: mini-oxygen"
          echo ""
          echo "Available commands:"
          echo "  npm run dev       - Start Hydrogen dev server with mini-oxygen"
          echo "  npm run build     - Build for Oxygen production"
          echo "  npm run preview   - Preview production build locally"
          echo "  npm run typecheck - Run TypeScript checks"
          echo "  npm run lint      - Run ESLint"
          echo "  npm run codegen   - Generate GraphQL types"
          echo ""

          # Set up environment for Oxygen Workers
          export NODE_ENV="development"

          # Ensure mini-oxygen can bind to ports (helpful on some systems)
          export HOST="127.0.0.1"

          # Install dependencies if node_modules doesn't exist
          if [ ! -d "node_modules" ]; then
            echo "📦 Installing dependencies..."
            npm install
          fi

          # Check if mini-oxygen is properly installed
          if [ -d "node_modules/@shopify/mini-oxygen" ]; then
            echo "✅ Mini-oxygen (local Oxygen runtime) is ready"
          else
            echo "⚠️  Mini-oxygen not found - run 'npm install' first"
          fi
        '';

        # Environment variables for Oxygen Workers development
        NODE_ENV = "development";

        # Ensure compatibility with worker runtime
        NODE_OPTIONS = "--max-old-space-size=4096";

        # Help with any potential networking issues
        HOST = "127.0.0.1";
      };

      formatter = pkgs.nixpkgs-fmt;
    });
}
