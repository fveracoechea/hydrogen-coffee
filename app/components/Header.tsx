import { MouseEvent, MouseEventHandler, Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';

import { type CartViewPayload, useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { clsx } from 'clsx';
import { CoffeeIcon, SearchIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import type { CartApiQueryFragment, HeaderQuery } from 'storefrontapi.generated';

import { useAside } from '~/components/Aside';

import { Button } from './ui/button';
import { Typography } from './ui/typography';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({ header, isLoggedIn, cart, publicStoreDomain }: HeaderProps) {
  const { shop, menu } = header;
  return (
    <header className="flex gap-12 border-b px-8 py-4">
      <NavLink
        end
        to="/"
        prefetch="intent"
        className="flex items-center hover:text-primary"
      >
        <Typography variant="title" as="h1" className="flex gap-2 text-inherit">
          <CoffeeIcon className="h-7 w-7 stroke-primary" />
          <span> CoffeeHunt</span>
        </Typography>
      </NavLink>
      <DesktopNavigationMenu
        menu={menu}
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />

      <nav className="flex items-center gap-2.5" role="navigation">
        <SearchToggle />
        <Button asChild variant="outline" size="icon">
          <NavLink prefetch="intent" to="/account">
            <Suspense fallback={<UserIcon className="size-5" />}>
              <Await resolve={isLoggedIn} errorElement="Sign in">
                {isLoggedIn => (
                  <>
                    <UserIcon className="size-5" />
                    <span className="sr-only">{isLoggedIn ? 'Account' : 'Sign in'}</span>
                  </>
                )}
              </Await>
            </Suspense>
          </NavLink>
        </Button>
        <CartToggle cart={cart} />
      </nav>
    </header>
  );
}

function DesktopNavigationMenu(props: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const { menu, publicStoreDomain, primaryDomainUrl } = props;
  return (
    <nav className="flex flex-1 items-center gap-4" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map(item => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <Typography variant="nav" end key={item.id} prefetch="intent" to={url}>
            {item.title}
          </Typography>
        );
      })}
    </nav>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" style={activeLinkStyle} to="/">
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map(item => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button className="header-menu-mobile-toggle reset" onClick={() => open('mobile')}>
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <Button
      variant="outline"
      onClick={() => open('search')}
      className="cursor-pointer justify-start"
    >
      <SearchIcon />
      <Typography variant="xsmall" muted className="">
        Start your coffee search
      </Typography>
    </Button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    open('cart');
    publish('cart_viewed', {
      cart,
      prevCart,
      shop,
      url: window.location.href || '',
    });
  }

  return (
    <Button asChild variant="outline" size="icon">
      <a href="/cart" onClick={onClick} title="Shopping Cart" className="relative block">
        <ShoppingCartIcon className="size-5" />
        {count != null && count > 0 && (
          <span
            className={clsx(
              'absolute top-[-8px] right-[-8px] flex items-center justify-center',
              'h-5 w-5 rounded-full bg-primary text-sm text-white',
            )}
          >
            {count}
          </span>
        )}
      </a>
    </Button>
  );
}

function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
