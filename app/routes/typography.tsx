import { Typography } from '~/components/ui/typography';

export default function TypographyDemo() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Heading Hierarchy */}
      <section>
        <Typography variant="h2" className="mb-6">
          Typography Hierarchy
        </Typography>

        <div className="space-y-4">
          <Typography variant="h1">Heading 1 - Main Page Title</Typography>
          <Typography variant="h2">Heading 2 - Section Title</Typography>
          <Typography variant="h3">Heading 3 - Subsection Title</Typography>
          <Typography variant="h4">Heading 4 - Component Title</Typography>
          <Typography variant="h5">Heading 5 - Small Section</Typography>
          <Typography variant="h6">Heading 6 - Minor Heading</Typography>
        </div>
      </section>

      {/* Content Variants */}
      <section>
        <Typography variant="h2" className="mb-6">
          Content Variants
        </Typography>

        <div className="space-y-4">
          <Typography variant="lead">
            This is a lead paragraph that introduces important content with emphasis and larger
            text.
          </Typography>

          <Typography variant="large">
            This is large body text for important content that needs more prominence than
            regular paragraphs.
          </Typography>

          <Typography variant="base">
            This is the standard body text used throughout the application. It provides the
            baseline reading experience with optimal legibility and comfortable line spacing.
          </Typography>

          <Typography variant="small" muted>
            This is small text often used for captions, metadata, or secondary information.
          </Typography>

          <Typography variant="xsmall" muted>
            This is extra small text for disclaimers, fine print, or tertiary information.
          </Typography>
        </div>
      </section>

      {/* Theme Colors */}
      <section>
        <Typography variant="h2" className="mb-6">
          Theme Colors
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Typography variant="base" color="default">
              Default color text
            </Typography>
            <Typography variant="base" color="primary">
              Primary color text
            </Typography>
            <Typography variant="base" color="secondary">
              Secondary color text
            </Typography>
            <Typography variant="base" color="accent">
              Accent color text
            </Typography>
            <Typography variant="base" color="muted">
              Muted color text
            </Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="base" color="dark-brown">
              Dark Brown theme color
            </Typography>
            <Typography variant="base" color="medium-brown">
              Medium Brown theme color
            </Typography>
            <Typography variant="base" color="golden-tan">
              Golden Tan theme color
            </Typography>
            <Typography variant="base" color="light-blue">
              Light Blue theme color
            </Typography>
          </div>
        </div>
      </section>

      {/* Weight Variants */}
      <section>
        <Typography variant="h2" className="mb-6">
          Font Weights
        </Typography>

        <div className="space-y-2">
          <Typography variant="base" weight="light">
            Light weight text
          </Typography>
          <Typography variant="base" weight="normal">
            Normal weight text
          </Typography>
          <Typography variant="base" weight="medium">
            Medium weight text
          </Typography>
          <Typography variant="base" weight="semibold">
            Semibold weight text
          </Typography>
          <Typography variant="base" weight="bold">
            Bold weight text
          </Typography>
        </div>
      </section>

      {/* Specialized Variants */}
      <section>
        <Typography variant="h2" className="mb-6">
          Specialized Variants
        </Typography>

        <div className="space-y-4">
          <div>
            <Typography variant="caption">Caption Text</Typography>
            <Typography variant="base">Regular content with a caption above</Typography>
          </div>

          <Typography variant="code">const greeting = &quot;Hello, World!&quot;;</Typography>

          <Typography variant="blockquote">
            &ldquo;The best way to predict the future is to create it.&rdquo; - This is a
            blockquote example showcasing the italic styling and left border.
          </Typography>
        </div>
      </section>

      {/* Link Variants */}
      <section>
        <Typography variant="h2" className="mb-6">
          Link Examples
        </Typography>

        <div className="space-y-4">
          <Typography variant="base">
            This paragraph contains a{' '}
            <Typography as="a" href="#" link color="primary">
              primary colored link
            </Typography>{' '}
            and a{' '}
            <Typography as="a" href="#" link color="medium-brown">
              medium brown themed link
            </Typography>
            .
          </Typography>

          <Typography variant="base" muted>
            This muted paragraph has a{' '}
            <Typography as="a" href="#" link muted>
              muted link that changes color on hover
            </Typography>
            .
          </Typography>
        </div>
      </section>

      {/* Auto-mapping Demo */}
      <section>
        <Typography variant="h2" className="mb-6">
          Auto-mapping Elements
        </Typography>

        <div className="space-y-4">
          <Typography variant="h3">This auto-maps to h3 element</Typography>
          <Typography variant="h4">This auto-maps to h4 element</Typography>
          <Typography variant="blockquote">This auto-maps to blockquote element</Typography>
          <Typography variant="code">This auto-maps to code element</Typography>
        </div>
      </section>
    </div>
  );
}
