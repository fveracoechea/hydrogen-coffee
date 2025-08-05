import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Card} from '~/components/ui/card';
import {Typography} from '~/components/ui/typography';
import {Button} from './ui/button';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

export const PRODUCT_ITEM_FRAGMENT = `#graphql

  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }

  fragment ProductItem on Product {
    id
    title
    category {name}
    tags
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
  }
` as const;

export function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const {open} = useAside();
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <article className="border border-border rounded-md overflow-hidden">
      <Link prefetch="intent" to={variantUrl}>
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="rounded-t-md"
          />
        )}
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <div>
          <Link prefetch="intent" to={variantUrl}>
            <Typography
              variant="h6"
              as="h4"
              className="w-fit hover:text-primary"
            >
              {product.title}
            </Typography>
          </Link>
          {product.category && (
            <Typography muted variant="caption">
              {product.category.name}
            </Typography>
          )}
        </div>

        <div className="flex gap-2">
          {product.tags.map((tag) => (
            <Typography
              key={tag}
              variant="small"
              className="border border-accent text-accent-foreground bg-accent/40 px-2 rounded-full"
            >
              {tag}
            </Typography>
          ))}
        </div>

        <Typography variant="large" className="mt-2 text-right">
          <Money as="span" data={product.priceRange.minVariantPrice} />
        </Typography>

        {/* <AddToCartButton */}
        {/*   variant="outline" */}
        {/*   disabled={!product.availableForSale} */}
        {/*   onClick={() => open('cart')} */}
        {/*   lines={[ */}
        {/*     { */}
        {/*       merchandiseId: product.id, */}
        {/*       quantity: 1, */}
        {/*       selectedVariant: product, */}
        {/*     }, */}
        {/*   ]} */}
        {/* > */}
        {/*   {product.availableForSale ? 'Add to cart' : 'Sold out'} */}
        {/* </AddToCartButton> */}
      </div>
    </article>
  );
}
