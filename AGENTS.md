# AGENTS.md - Hydrogen Quickstart Development Guide

## Build/Test Commands

- `npm run build` - Build for production with codegen
- `npm run dev` - Start development server with codegen
- `npm run lint` - Run ESLint on all files
- `npm run typecheck` - Run TypeScript type checking
- `npm run codegen` - Generate GraphQL types
- `npm run preview` - Preview production build

## Code Style & Conventions

- Uses TypeScript with strict mode enabled
- React Router v7 (NOT Remix) - import from `react-router`, never `react-router-dom`
- PascalCase for components, interfaces, types
- camelCase for variables, functions, properties
- Uses Shopify Prettier config for formatting
- Tailwind CSS for styling
- ESLint with React, TypeScript, a11y rules
- File naming: PascalCase for components (.tsx), camelCase for utilities (.ts)

## Import Guidelines

- Use `react-router` for routing imports (Link, useNavigate, etc.)
- Use `@shopify/hydrogen` for Shopify-specific utilities
- Path alias `~/*` maps to `app/*`
- No console.log in production (console.warn/error allowed)

## Error Handling

- TypeScript strict mode enforced
- ESLint warns on array index keys
- Accessibility (a11y) rules enabled
