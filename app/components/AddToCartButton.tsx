import { type FetcherWithComponents } from 'react-router';

import { CartForm, type OptimisticCartLineInput } from '@shopify/hydrogen';

import { Button } from '~/components/ui/button';

export type AddToCartButtonProps = {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  variant?: React.ComponentProps<typeof Button>['variant'];
};

export function AddToCartButton(props: AddToCartButtonProps) {
  const { analytics, children, disabled, lines, onClick, variant = 'default' } = props;

  return (
    <CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
          <Button
            type="submit"
            variant={variant}
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className="w-full"
          >
            {children}
          </Button>
        </>
      )}
    </CartForm>
  );
}
