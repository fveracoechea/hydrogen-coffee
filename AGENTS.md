# Agent Guidelines for Hydrogen React Router Project

This is a Hydrogen ecommerce project using React Router v7, Chadcn/UI components, and TailwindCSS v4.

## Build/Lint/Test Commands

- `npm run build` - Build project with codegen
- `npm run lint` - Run ESLint on all files
- `npm run typecheck` - Run TypeScript type checking
- `npm run dev` - Start development server with codegen
- `npm run preview` - Preview production build
- `npm run codegen` - Generate GraphQL types

## Critical React Router Import Rule

**NEVER use `@remix-run/*` or `react-router-dom` imports!**

- Use `react-router` for hooks like `useLoaderData`, `Link`, `Form`, `useActionData`, `useNavigation`, `useSubmit`
- Use `@react-router/*` packages for dev tools and adapters

## Code Style Guidelines

- Use TypeScript with explicit types for props and API responses
- Components: PascalCase, files end with `.tsx`
- Functions/variables: camelCase
- Use `clsx` for conditional classes, `cn` utility for class merging
- Prefer named exports over default exports
- Import order: React → external libs → internal (`~/`)

## Error Handling & Performance

- Use Suspense boundaries with fallbacks for async data
- Prefer `react-router` Await component for promises
- Use optimistic updates for cart operations
- Handle loading states explicitly
