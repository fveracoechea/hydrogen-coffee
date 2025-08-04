# Hydrogen Coffee

Hydrogen is Shopify's stack for headless commerce.
[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)

## What's included

- React Router framework
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes
- **Brown & Blue Theme Implementation**
- **Enhanced Typography System**
- **Docker Development Environment**

## Development

### Commands

```bash
npm run build      # Build for production with codegen
npm run dev        # Start development server with codegen
npm run lint       # Run ESLint on all files
npm run typecheck  # Run TypeScript type checking
npm run codegen    # Generate GraphQL types
npm run preview    # Preview production build
```

### Docker Development (Alternative)

For unsupported platforms or isolated development:

```bash
make dev           # Start Docker development environment
make build         # Build Docker image
make clean         # Clean up containers and images
```

### Code Style & Conventions

- **TypeScript** with strict mode enabled
- **React Router v7** (NOT Remix) - import from `react-router`, NEVER `react-router-dom`
- **PascalCase** for components, interfaces, types
- **camelCase** for variables, functions, properties
- **Shopify Prettier config** for formatting
- **Tailwind CSS** for styling with Radix UI components
- **ESLint** with React, TypeScript, a11y rules
- **File naming**: PascalCase for components (.tsx), camelCase for utilities (.ts)

### Import Guidelines

- Use `react-router` for routing imports (Link, useNavigate, etc.)
- Use `@shopify/hydrogen` for Shopify-specific utilities
- Path alias `~/*` maps to `app/*`
- No console.log in production (console.warn/error allowed)

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>

## 🎨 Brown & Blue Theme

This project implements a cohesive brown and blue color palette for a warm, professional aesthetic.

### Color Palette

- **`#6C3428` (Dark Brown)**: Main text and headers - provides excellent contrast
- **`#BA704F` (Medium Brown)**: Buttons and accent elements
- **`#DFA878` (Golden/Tan)**: Badges and subtle backgrounds
- **`#CEE6F3` (Light Blue)**: Cart sidebar and gradient effects

### Implementation

#### Semantic Color Tokens

Use these primary tokens for most components:

```tsx
className = 'bg-primary text-primary-foreground'; // Medium Brown button
className = 'bg-secondary text-secondary-foreground'; // Golden/Tan badge
className = 'bg-accent text-accent-foreground'; // Light Blue sidebar
className = 'text-foreground'; // Dark Brown text
className = 'text-muted-foreground'; // Muted text
```

#### Direct Color Utilities

For specific color needs:

```tsx
className = 'text-dark-brown bg-golden-tan';
className = 'border-medium-brown';
className = 'gradient-cart'; // Blue to tan gradient
```

## 📝 Typography System

The enhanced Typography component provides a complete typographic hierarchy:

### Heading Variants

- `h1` through `h6`: Responsive semantic headings
- Auto-maps to proper HTML elements

### Content Variants

- `lead`: Introduction paragraphs
- `large`: Prominent body text
- `base`: Standard paragraphs
- `small`: Secondary information
- `xsmall`: Fine print

### Specialized Variants

- `nav`: Navigation links with active states
- `caption`: Uppercase labels
- `code`: Inline code blocks
- `blockquote`: Quote styling

### Color & Weight Options

- **Colors**: `default`, `primary`, `secondary`, `accent`, `muted`, theme colors
- **Weights**: `light`, `normal`, `medium`, `semibold`, `bold`

## 🐳 Docker Development

For consistent development across platforms:

## 📁 Project Structure

```
app/
├── components/
│   ├── ui/           # shadcn-ui components with theme
│   ├── AddToCartButton.tsx
│   ├── Typography.tsx
│   └── ...
├── styles/
│   ├── tailwind.css  # Theme colors and utilities
│   └── app.css      # Component-specific styles
├── routes/          # React Router v7 routes
└── lib/             # Utility functions
```
