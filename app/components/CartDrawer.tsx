import { Suspense } from 'react';
import { Await, Link, useAsyncValue } from 'react-router';

import { Money, useOptimisticCart } from '@shopify/hydrogen';
import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import { CoffeeIcon, PlusIcon } from 'lucide-react';
import { CartApiQueryFragment } from 'storefrontapi.generated';

import { Aside, useAside } from '~/components/Aside';
import { Button } from '~/components/ui/button';
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';
import { Typography } from '~/components/ui/typography';
import { useVariantUrl } from '~/lib/variants';

import { CartLineItem } from './CartLineItem';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

type Props = {};

function CartEmpty() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <CoffeeIcon className="size-32 stroke-secondary" />
      <div>
        <Typography variant="small" as="p" muted>
          Looks like you haven&rsquo;t added anything yet
        </Typography>
        <Typography variant="small" as="p" muted>
          Let&rsquo;s get you started!
        </Typography>
      </div>
    </div>
  );
}

function CartDrawerLineItem(props: { line: CartLine }) {
  const { line } = props;
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;

  const { close } = useAside();
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li className="flex rounded-md border border-border bg-card">
      {image && (
        <Link
          prefetch="intent"
          to={lineItemUrl}
          className="shrink-0 rounded-l-md"
          onClick={close}
        >
          <Image
            className="rounded-l-md"
            width={100}
            loading="lazy"
            aspectRatio="1/1"
            alt={title}
            data={image}
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-0 px-4 py-1.5">
        <Link prefetch="intent" to={lineItemUrl} onClick={close}>
          <Typography
            as="h4"
            variant="small"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            {product.title}
          </Typography>
        </Link>
        <Typography variant="small">
          <Money as="span" data={line.cost.totalAmount} />
        </Typography>
        {selectedOptions.map(option => (
          <Typography as="span" key={option.name} variant="xsmall">
            {option.name}: {option.value}
          </Typography>
        ))}
      </div>
      <div className="flex flex-col">
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
      </div>
    </li>
  );
}

export function CartDrawer(props: Props) {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  return (
    <Aside
      type="cart"
      header={
        <DrawerHeader>
          <DrawerTitle asChild>
            <Typography variant="h5" as="h3">
              Shopping Cart
            </Typography>
          </DrawerTitle>
          <DrawerDescription>
            {cartHasItems
              ? 'You have ' + cart?.totalQuantity + ' items in your cart.'
              : 'Your cart is empty.'}
          </DrawerDescription>
        </DrawerHeader>
      }
      footer={
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant={cartHasItems ? 'outline' : 'default'} size="lg">
              Continue Shopping
            </Button>
          </DrawerClose>
          {cartHasItems && (
            <DrawerClose asChild>
              <Button size="lg">Go to Checkout</Button>
            </DrawerClose>
          )}
        </DrawerFooter>
      }
    >
      {cartHasItems ? (
        <ul className="flex flex-col gap-4">
          {(cart?.lines?.nodes ?? []).map(line => (
            <CartDrawerLineItem key={line.id} line={line} layout="aside" />
          ))}
        </ul>
      ) : (
        <CartEmpty />
      )}
    </Aside>
  );
}
