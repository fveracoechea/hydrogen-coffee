import { Suspense } from 'react';
import { Await, Link, useAsyncValue } from 'react-router';

import { Money, useOptimisticCart } from '@shopify/hydrogen';
import { CartForm, Image, type OptimisticCartLine } from '@shopify/hydrogen';
import { CoffeeIcon, MinusIcon, PlusIcon, Trash2Icon, TrashIcon } from 'lucide-react';
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

import { CartLineItem, getUpdateKey } from './CartLineItem';

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

function RemoveButton(props: { lineIds: string[]; disabled: boolean }) {
  const { lineIds, disabled } = props;
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <Button
        size="icon"
        type="submit"
        variant="ghost"
        className="size-6"
        disabled={disabled}
        aria-label="Remove from cart"
      >
        <TrashIcon className="stroke-muted-foreground" />
      </Button>
    </CartForm>
  );
}

function ItemQuantity(props: { line: CartLine }) {
  const { line } = props;
  if (!line || typeof line?.quantity === 'undefined') return null;

  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center gap-2.5">
      <CartForm
        route="/cart"
        fetcherKey={getUpdateKey([lineId])}
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{ lines: [{ id: lineId, quantity: prevQuantity }] }}
      >
        <Button
          size="icon"
          type="submit"
          variant="outline"
          className="size-6"
          disabled={quantity <= 1 || !!isOptimistic}
          aria-label="Decrease quantity"
        >
          <MinusIcon />
        </Button>
      </CartForm>

      <Typography variant="small">{line.quantity}</Typography>

      <CartForm
        route="/cart"
        fetcherKey={getUpdateKey([lineId])}
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{ lines: [{ id: lineId, quantity: nextQuantity }] }}
      >
        <Button
          size="icon"
          type="submit"
          variant="outline"
          className="size-6"
          aria-label="Increase quantity"
        >
          <PlusIcon />
        </Button>
      </CartForm>
    </div>
  );
}

function CartDrawerLineItem(props: { line: CartLine }) {
  const { line } = props;
  const { id, merchandise, isOptimistic } = line;
  const { product, title, image, selectedOptions } = merchandise;

  const { close } = useAside();
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <li className="flex rounded-md border border-border bg-card">
      {image && (
        <Link
          prefetch="intent"
          to={lineItemUrl}
          className="shrink-0.5 flex min-h-max rounded-l-md"
          onClick={close}
        >
          <Image
            className="h-max rounded-l-md"
            width={120}
            loading="lazy"
            aspectRatio="1/1"
            alt={title}
            data={image}
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col px-4 py-1.5">
        <div className="flex justify-between gap-4">
          <Link prefetch="intent" to={lineItemUrl} onClick={close}>
            <Typography
              as="h4"
              variant="small"
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              {product.title}
            </Typography>
          </Link>
          <RemoveButton lineIds={[id]} disabled={!!isOptimistic} />
        </div>

        {selectedOptions.map(option => (
          <Typography as="span" key={option.name} variant="small" muted>
            {option.name}: {option.value}
          </Typography>
        ))}

        <div className="flex flex-1 items-end justify-between gap-4">
          <ItemQuantity line={line} />

          {line?.cost?.totalAmount && (
            <Typography variant="small">
              <Money as="span" data={line?.cost?.totalAmount} />
            </Typography>
          )}
        </div>
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
          {cartHasItems && (
            <div className="flex gap-2">
              <Typography variant="large">Subtotal</Typography>
              <Typography variant="large">
                {cart.cost?.subtotalAmount ? (
                  <Money data={cart.cost?.subtotalAmount} />
                ) : (
                  '-'
                )}
              </Typography>
            </div>
          )}
          <div className="flex flex-1 gap-2">
            <DrawerClose asChild>
              <Button
                variant={cartHasItems ? 'outline' : 'default'}
                size="lg"
                className="flex-1"
              >
                Continue Shopping
              </Button>
            </DrawerClose>
            {cartHasItems && (
              <DrawerClose asChild>
                <Button size="lg" className="flex-1">
                  Go to Checkout
                </Button>
              </DrawerClose>
            )}
          </div>
        </DrawerFooter>
      }
    >
      {cartHasItems ? (
        <ul className="flex flex-col gap-4">
          {(cart?.lines?.nodes ?? []).map(line => (
            <CartDrawerLineItem key={line.id} line={line} />
          ))}
        </ul>
      ) : (
        <CartEmpty />
      )}
    </Aside>
  );
}
