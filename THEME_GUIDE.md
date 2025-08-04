# Brown & Blue Theme Implementation

Your Hydrogen Quickstart project has been updated with a beautiful brown and blue color palette. Here's how to use the new theme effectively.

## 🎨 Color Palette

The theme implements the following colors:

- **`#6C3428` (Dark Brown)**: Main text and headers - provides excellent contrast
- **`#BA704F` (Medium Brown)**: Buttons and accent elements
- **`#DFA878` (Golden/Tan)**: Badges and subtle backgrounds
- **`#CEE6F3` (Light Blue)**: Cart sidebar and gradient effects

## 🎯 Implementation Details

### 1. **Tailwind CSS v4 Integration**

The theme uses OKLCH color space for better color consistency:

```css
:root {
  --foreground: oklch(0.32 0.06 30); /* Dark Brown for text */
  --primary: oklch(0.54 0.08 35); /* Medium Brown for buttons */
  --secondary: oklch(0.88 0.04 50); /* Golden/Tan for badges */
  --accent: oklch(0.88 0.04 200); /* Light Blue for cart sidebar */
}
```

### 2. **Custom Utility Classes**

Additional utility classes for direct color access:

```css
.text-dark-brown {
  color: #6c3428;
}
.text-medium-brown {
  color: #ba704f;
}
.text-golden-tan {
  color: #dfa878;
}
.text-light-blue {
  color: #cee6f3;
}

.bg-dark-brown {
  background-color: #6c3428;
}
.bg-medium-brown {
  background-color: #ba704f;
}
.bg-golden-tan {
  background-color: #dfa878;
}
.bg-light-blue {
  background-color: #cee6f3;
}

.gradient-cart {
  background: linear-gradient(135deg, #cee6f3 0%, #dfa878 100%);
}
```

## 🧩 Component Usage

### **Buttons (shadcn-ui)**

```tsx
import { Button } from '~/components/ui/button';

// Primary button (Medium Brown)
<Button variant="default">Add to Cart</Button>

// Secondary button (Golden/Tan)
<Button variant="secondary">View Details</Button>

// Outline button
<Button variant="outline">Learn More</Button>
```

### **Text Styling**

```tsx
<h1 className="text-foreground">Main Heading</h1>      {/* Dark Brown */}
<h2 className="text-primary">Subheading</h2>           {/* Medium Brown */}
<p className="text-muted-foreground">Description</p>   {/* Muted text */}
<span className="text-golden-tan">Special Text</span>  {/* Golden accent */}
```

### **Cards and Backgrounds**

```tsx
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';

<Card className="bg-card">
  <CardHeader>
    <CardTitle className="text-foreground">Product Name</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="bg-secondary p-3 rounded">
      <span className="text-secondary-foreground">Badge Content</span>
    </div>
  </CardContent>
</Card>;
```

### **Cart Sidebar Styling**

The cart sidebar automatically uses the light blue background:

```css
aside {
  background: var(--color-light); /* Light Blue (#CEE6F3) */
}
```

### **Gradient Effects**

```tsx
<div className="gradient-cart h-32 rounded-lg flex items-center justify-center">
  <p className="text-dark-brown font-bold">Special Promotion</p>
</div>
```

## 🌙 Dark Mode Support

The theme includes dark mode variants:

- **Dark mode primary**: Golden/Tan becomes the primary color
- **Dark mode accent**: Darker blue for better contrast
- **Dark mode backgrounds**: Adjusted brown tones

## 📱 Component Examples

### **Product Card**

```tsx
<div className="bg-card rounded-lg border p-4">
  <h3 className="text-foreground font-bold mb-2">Product Name</h3>
  <p className="text-muted-foreground mb-4">Product description...</p>
  <div className="flex items-center justify-between">
    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">
      Sale
    </span>
    <Button variant="default">Add to Cart</Button>
  </div>
</div>
```

### **Navigation Header**

```tsx
<header className="bg-background border-b border-dark-brown">
  <nav className="flex items-center justify-between p-4">
    <h1 className="text-foreground font-bold text-xl">Store Name</h1>
    <Button variant="ghost" className="text-primary">
      Menu
    </Button>
  </nav>
</header>
```

## 🔄 Updated Files

The following files have been modified to implement the theme:

- **`app/styles/tailwind.css`**: Main theme colors and utility classes
- **`app/styles/app.css`**: Cart sidebar and component-specific colors
- **`app/components/AddToCartButton.tsx`**: Updated to use shadcn Button
- **`app/components/ThemeShowcase.tsx`**: Example component showcasing all colors

## 🚀 Getting Started

1. **Use semantic color tokens** when possible:

   ```tsx
   className = 'bg-primary text-primary-foreground';
   ```

2. **Use utility classes** for direct color access:

   ```tsx
   className = 'bg-golden-tan text-dark-brown';
   ```

3. **Test in both light and dark modes** to ensure proper contrast.

4. **View the theme showcase** by importing and using the `ThemeShowcase` component.

The theme maintains excellent accessibility with high contrast ratios and follows modern design principles for e-commerce applications.
