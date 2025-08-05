import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

/**
 * Theme Showcase Component
 * Demonstrates the new brown/blue color palette implementation
 */
export function ThemeShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-foreground">Theme Showcase</h1>
        <p className="text-muted-foreground">Brown & Blue Color Palette Implementation</p>
      </div>

      {/* Color Palette Display */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Primary colors used throughout the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="bg-dark-brown mb-2 h-20 rounded-lg"></div>
              <p className="text-dark-brown font-medium">#6C3428</p>
              <p className="text-sm text-muted-foreground">Dark Brown - Text & Headers</p>
            </div>
            <div className="text-center">
              <div className="bg-medium-brown mb-2 h-20 rounded-lg"></div>
              <p className="text-medium-brown font-medium">#BA704F</p>
              <p className="text-sm text-muted-foreground">Medium Brown - Buttons</p>
            </div>
            <div className="text-center">
              <div className="bg-golden-tan mb-2 h-20 rounded-lg"></div>
              <p className="text-golden-tan font-medium">#DFA878</p>
              <p className="text-sm text-muted-foreground">Golden/Tan - Badges</p>
            </div>
            <div className="text-center">
              <div className="bg-light-blue mb-2 h-20 rounded-lg"></div>
              <p className="text-light-blue font-medium">#CEE6F3</p>
              <p className="text-sm text-muted-foreground">Light Blue - Cart Sidebar</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>Different button styles using the new theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </CardContent>
      </Card>

      {/* Text Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Typography & Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Main Heading (Dark Brown)
          </h2>
          <h3 className="text-xl font-semibold text-primary">
            Subheading (Medium Brown)
          </h3>
          <p className="text-foreground">
            Regular paragraph text using the foreground color for excellent readability.
          </p>
          <p className="text-muted-foreground">
            Muted text for secondary information and descriptions.
          </p>
          <div className="inline-block rounded-full bg-secondary px-3 py-1">
            <span className="font-medium text-secondary-foreground">Badge Example</span>
          </div>
        </CardContent>
      </Card>

      {/* Gradient Example */}
      <Card>
        <CardHeader>
          <CardTitle>Gradient Effects</CardTitle>
          <CardDescription>
            Light blue to golden/tan gradient for special elements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gradient-cart flex h-32 items-center justify-center rounded-lg">
            <p className="text-dark-brown text-lg font-bold">Cart Sidebar Gradient</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
