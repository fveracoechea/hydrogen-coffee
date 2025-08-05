import { Suspense } from 'react';
import { Await, Link, type MetaFunction, useLoaderData } from 'react-router';

import { Image, Money } from '@shopify/hydrogen';
import { type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { clsx } from 'clsx';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

import heroImage from '~/assets/hero.jpg?url';
import { PRODUCT_ITEM_FRAGMENT, ProductItem } from '~/components/ProductItem';
import { Button } from '~/components/ui/button';
import { Typography } from '~/components/ui/typography';

export const meta: MetaFunction = () => {
  return [{ title: 'Hydrogen | Home' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch(error => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollection({ collection }: { collection: FeaturedCollectionFragment }) {
  if (!collection) return null;

  const image = collection?.image;
  if (!image) return null;

  return (
    <section className="flex flex-col gap-2 p-8 justify-center items-center relative aspect-video overflow-hidden">
      <img
        src={heroImage}
        alt={image.altText || 'Featured Collection'}
        className="absolute left-[50%] top-[50%] translate-[-50%] object-center object-cover"
      />
      <Image
        className="absolute left-[50%] top-[50%] translate-[-50%] object-center object-cover hidden"
        data={image}
        sizes="100vw"
      />
      <div className="inset-0 absolute bg-gradient-to-r from-accent/70 to-secondary/70" />
      <Typography variant="h2" className="text-balance relative">
        Premium Coffee, Delivered Fresh
      </Typography>
      <div
        className={clsx(
          'relative gap-2 text-center w-full max-w-2xl',
          'flex flex-col justify-center items-center',
        )}
      >
        <Typography as="p" variant="large" className="text-balance">
          Discover our carefully curated selection of single-origin and specialty blend
          coffees, roasted to perfection and delivered straight to your door.
        </Typography>
      </div>
      <div className="flex gap-4 relative">
        <Button size="lg" variant="secondary" className="w-fit">
          Shop Now
        </Button>
        <Button size="lg" className="w-fit">
          Subscribe & Save
        </Button>
      </div>
    </section>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="flex flex-col gap-4 px-8 py-12 border-t border-t-border">
      <Typography variant="h4" as="h3">
        Best sellers
      </Typography>
      <Suspense fallback={<div>Loading collections</div>}>
        <Await resolve={products}>
          {response => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {response
                ? response.products.nodes.map(product => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductItem
      }
    }
  }
` as const;
