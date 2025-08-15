import type { ComponentPropsWithRef, ElementType } from 'react';
import { Link, type LinkProps, NavLink, type NavLinkProps } from 'react-router';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/lib/utils';

type H1Props = {
  as: 'h1';
} & ComponentPropsWithRef<'h1'>;

type H2Props = {
  as: 'h2';
} & ComponentPropsWithRef<'h2'>;

type H3Props = {
  as: 'h3';
} & ComponentPropsWithRef<'h3'>;

type H4Props = {
  as: 'h4';
} & ComponentPropsWithRef<'h4'>;

type H5Props = {
  as: 'h5';
} & ComponentPropsWithRef<'h5'>;

type H6Props = {
  as: 'h6';
} & ComponentPropsWithRef<'h6'>;

type PProps = {
  as: 'p';
} & ComponentPropsWithRef<'p'>;

type LabelProps = {
  as: 'label';
} & ComponentPropsWithRef<'label'>;

type SpanProps = {
  as: 'span';
} & ComponentPropsWithRef<'span'>;

type RouterLinkProps = {
  as: 'link';
} & LinkProps;

type ALinkProps = {
  as: 'a';
} & ComponentPropsWithRef<'a'>;

type RouterNavLinkProps = {
  as: 'nav';
} & NavLinkProps;

const typography = cva('transition-colors', {
  variants: {
    variant: {
      // Heading variants with proper hierarchy
      h1: 'text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl',
      h2: 'text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl',
      h3: 'text-2xl leading-snug font-semibold tracking-normal text-foreground md:text-3xl lg:text-4xl',
      h4: 'text-xl leading-snug font-medium tracking-normal text-foreground md:text-2xl lg:text-3xl',
      h5: 'text-lg leading-normal font-medium tracking-normal text-foreground md:text-xl lg:text-2xl',
      h6: 'text-base leading-normal font-medium tracking-normal text-foreground md:text-lg lg:text-xl',

      // Content variants
      title: 'text-xl leading-normal font-medium text-foreground',
      lead: 'text-xl leading-relaxed font-light text-muted-foreground md:text-2xl',
      large: 'text-lg leading-relaxed font-normal text-foreground',
      base: 'text-base leading-normal font-normal text-foreground',
      small: 'text-sm leading-relaxed font-normal text-foreground',
      xsmall: 'text-xs leading-relaxed font-normal text-foreground',

      // Navigation variant with theme colors
      nav: [
        'text-base leading-none font-normal text-muted-foreground transition-colors hover:text-foreground',
        '[&.active]:font-medium [&.active]:text-primary',
      ],

      // Specialized variants
      caption:
        'text-xs leading-tight font-normal tracking-wide text-muted-foreground uppercase',
      code: 'rounded bg-muted px-1.5 py-0.5 font-mono text-sm leading-relaxed text-muted-foreground',
      blockquote:
        'border-l-4 border-primary pl-4 text-lg leading-relaxed font-normal text-muted-foreground italic',
    },
    color: {
      default: '',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      accent: 'text-accent-foreground',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
      // Custom brown/blue theme colors
      'dark-brown': 'text-dark-brown',
      'medium-brown': 'text-medium-brown',
      'golden-tan': 'text-golden-tan',
      'light-blue': 'text-light-blue',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    muted: {
      true: 'text-muted-foreground',
      false: '',
    },
    link: {
      true: 'underline underline-offset-4 hover:no-underline',
      false: '',
    },
  },
  compoundVariants: [
    {
      link: true,
      muted: true,
      className: ['text-muted-foreground hover:text-foreground'],
    },
    {
      link: true,
      muted: false,
      className: ['text-primary hover:text-primary/80'],
    },
    {
      link: true,
      color: 'primary',
      className: ['text-primary hover:text-primary/80'],
    },
    {
      link: true,
      color: 'medium-brown',
      className: ['text-medium-brown hover:opacity-80'],
    },
  ],
  defaultVariants: {
    muted: false,
    link: false,
    variant: 'base',
    color: 'default',
  },
});

type Props = (
  | H1Props
  | H2Props
  | H3Props
  | H4Props
  | H5Props
  | H6Props
  | PProps
  | LabelProps
  | SpanProps
  | RouterLinkProps
  | RouterNavLinkProps
  | ALinkProps
) &
  VariantProps<typeof typography>;

export function Typography(props: Partial<Props>) {
  const {
    as: element,
    variant,
    className,
    muted,
    color,
    weight,
    link: isLink,
    ...otherProps
  } = props;

  const linkProps: Partial<LinkProps> = {};

  let link = isLink ?? false;
  let Element: ElementType = element ?? 'span';

  // Auto-map heading variants to appropriate elements if not specified
  if (!element && variant) {
    const headingMap: Record<string, ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      blockquote: 'blockquote',
      code: 'code',
    };
    Element = headingMap[variant] || Element;
  }

  if (Element === 'link') {
    Element = Link;
    link = true;
  }

  if (variant === 'nav') {
    Element = NavLink;
    linkProps.prefetch = 'intent';
  }

  return (
    <Element
      {...otherProps}
      {...linkProps}
      className={cn(typography({ variant, className, link, muted, color, weight }))}
    />
  );
}
