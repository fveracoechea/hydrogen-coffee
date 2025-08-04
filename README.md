# Hydrogen template: Skeleton

Hydrogen is Shopify's stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify's full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
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

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

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

#### Component Examples

**Button Usage:**

```tsx
import { Button } from '~/components/ui/button';

<Button variant="default">Add to Cart</Button>      // Medium Brown
<Button variant="secondary">View Details</Button>   // Golden/Tan
<Button variant="outline">Learn More</Button>       // Outline style
```

**Typography System:**

```tsx
import { Typography } from '~/components/ui/typography';

<Typography variant="h1">Main Heading</Typography>
<Typography variant="lead" color="muted">Introduction text</Typography>
<Typography variant="base" color="medium-brown">Accent text</Typography>
<Typography as="a" href="#" link color="primary">Link example</Typography>
```

**Card Components:**

```tsx
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';

<Card className="bg-card">
  <CardHeader>
    <CardTitle className="text-foreground">Product Name</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="bg-secondary p-3 rounded">
      <span className="text-secondary-foreground">Sale Badge</span>
    </div>
  </CardContent>
</Card>;
```

### Dark Mode Support

The theme includes automatic dark mode variants:

- Dark mode primary: Golden/Tan becomes primary
- Dark mode accent: Darker blue for contrast
- Dark mode backgrounds: Adjusted brown tones

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

### Quick Start

```bash
make dev    # Starts development server in Docker
```

### Available Commands

```bash
make build  # Build Docker image
make dev    # Start development environment
make clean  # Remove containers and images
make logs   # View container logs
make shell  # Access container shell
```

### Configuration

- **Hot reloading** enabled
- **Volume mounts** for live code updates
- **Port 3000** exposed for development
- **Node 18** runtime environment

## 🧪 Testing

No test suite is currently configured. Consider adding:

- **Vitest** for unit testing
- **Testing Library** for component testing
- **Playwright** for E2E testing

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

## 🚀 Best Practices

1. **Use semantic tokens** when possible for better theme consistency
2. **Test in both light and dark modes** to ensure proper contrast
3. **Follow accessibility guidelines** - all colors meet WCAG contrast requirements
4. **Use the Typography component** for consistent text styling
5. **Leverage Docker** for consistent development environments

## 📚 Additional Resources

- [Hydrogen Documentation](https://shopify.dev/custom-storefronts/hydrogen)
- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

This template provides a solid foundation for building modern, accessible e-commerce experiences with Shopify Hydrogen.
