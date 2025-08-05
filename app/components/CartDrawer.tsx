import { Suspense } from 'react';
import { Await, Link, useAsyncValue } from 'react-router';

import { useOptimisticCart } from '@shopify/hydrogen';
import { CoffeeIcon } from 'lucide-react';
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

import { CartLineItem } from './CartLineItem';

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
        <ul>
          {(cart?.lines?.nodes ?? []).map(line => (
            <CartLineItem key={line.id} line={line} layout="aside" />
          ))}
        </ul>
      ) : (
        <CartEmpty />
      )}
    </Aside>
  );
}
