import { DetailedHTMLProps, HTMLAttributes, useId, useState } from 'react';
import { Link } from 'react-router';

import { Image, Money } from '@shopify/hydrogen';
import { clsx } from 'clsx';
import { CoffeeIcon, SearchIcon } from 'lucide-react';

import { urlWithTrackingParams } from '~/lib/search';

import { Aside } from './Aside';
import {
  PartialPredictiveSearchResult,
  usePredictiveSearch,
} from './SearchFormPredictive';
import { Button } from './ui/button';
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { Input } from './ui/input';
import { Typography } from './ui/typography';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function SearchLoading() {
  const placeholderProps: DivProps = {
    className: 'h-19 w-full rounded-md bg-muted cursor-wait',
    role: 'presentation',
    ['aria-busy']: 'true',
  };

  return (
    <div className="flex animate-pulse flex-col gap-4">
      <div {...placeholderProps} className="h-4 w-28 cursor-wait rounded-md bg-muted" />
      <div {...placeholderProps} />
      <div {...placeholderProps} />
      <div {...placeholderProps} />
      <div {...placeholderProps} />
    </div>
  );
}

function SearchEmpty(props: { type: 'not-found' | 'idle' }) {
  const { type } = props;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center">
      {type === 'idle' && (
        <>
          <SearchIcon className="size-32 stroke-secondary" />
          <div>
            <Typography variant="small" as="p" muted>
              Looks like you haven&rsquo;t searched for anything yet
            </Typography>
            <Typography variant="small" as="p" muted>
              Let&rsquo;s get you started!
            </Typography>
          </div>
        </>
      )}

      {type === 'not-found' && (
        <>
          <CoffeeIcon className="size-32 stroke-secondary" />
          <div>
            <Typography variant="small" as="p" muted>
              We couldn&rsquo;t find any results for your search
            </Typography>
            <Typography variant="small" as="p" muted>
              Please try a different search term
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}

function SearchResultsSuggestedQueries(
  props: PartialPredictiveSearchResult<
    'queries',
    'fetchResults' | 'setSearch' | 'search'
  >,
) {
  const [selected, setSelected] = useState('');
  const { queries, setSearch, fetchResults, search } = props;

  const hide = selected === search;
  if (!queries.length || hide) return null;

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="caption" as="h5">
        Suggestions
      </Typography>
      <ul className="flex flex-wrap gap-2">
        {queries.map(suggestion => {
          if (!suggestion) return null;
          return (
            <Button
              key={suggestion.text}
              variant="outline"
              size="sm"
              className="h-7 rounded-full border border-accent bg-accent/40 px-2 font-normal text-accent-foreground"
              onClick={() => {
                setSearch(suggestion.text);
                setSelected(suggestion.text);
                fetchResults(suggestion.text);
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: suggestion.styledText }} />
            </Button>
          );
        })}
      </ul>
    </div>
  );
}

function SearchResultsProducts(
  props: PartialPredictiveSearchResult<'products', 'search' | 'closeSearch'>,
) {
  const { search, products, closeSearch } = props;

  if (!products.length) return null;

  return (
    <div key="products" className="flex flex-col gap-4">
      <Typography variant="caption" as="h5">
        Products
      </Typography>
      <ul className="flex flex-col gap-4">
        {products.map(product => {
          const image = product.selectedOrFirstAvailableVariant?.image;
          const price = product.selectedOrFirstAvailableVariant?.price;
          const url = urlWithTrackingParams({
            baseUrl: `/products/${product.handle}`,
            trackingParams: product.trackingParameters,
            term: search,
          });

          return (
            <li key={product.id}>
              <Link
                to={url}
                prefetch="intent"
                className="group flex min-h-max w-full rounded-md"
                onClick={closeSearch}
              >
                <article
                  className={clsx(
                    'w-full overflow-hidden rounded-md border border-border bg-card',
                    'flex gap-2 transition-shadow hover:ring-2 hover:ring-primary',
                  )}
                >
                  {image && (
                    <Image
                      className="h-max rounded-l-md"
                      width={75}
                      loading="lazy"
                      aspectRatio="1/1"
                      alt={product.title}
                      data={image}
                    />
                  )}

                  <div className="flex flex-1 flex-col p-2">
                    <Typography
                      as="h6"
                      variant="base"
                      className="font-medium group-hover:text-primary"
                    >
                      {product.title}
                    </Typography>
                    {price && (
                      <div className="flex flex-1 items-end justify-end gap-4">
                        <Typography>
                          <Money as="span" data={price} />
                        </Typography>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SearchDrawer() {
  const serachInputId = useId();

  const {
    search,
    setSearch,
    fetcher,
    inputRef,
    fetchResults,
    handleFormSubmit,
    data: {
      total,
      items: { products, queries },
    },
    closeSearch,
  } = usePredictiveSearch();

  const state = fetcher.state;
  const isEmpty = products.length < 1;

  return (
    <Aside
      type="search"
      header={
        <DrawerHeader>
          <DrawerTitle asChild>
            <Typography variant="title" as="h3">
              Start your coffee journey here
            </Typography>
          </DrawerTitle>
          {total < 1 ? (
            <DrawerDescription>Use this form to search our store</DrawerDescription>
          ) : (
            <DrawerDescription>{total} Items matched your search</DrawerDescription>
          )}
          <fetcher.Form onSubmit={handleFormSubmit} className="flex gap-2 pt-4">
            <Input
              name="q"
              value={search}
              ref={inputRef}
              id={serachInputId}
              autoComplete="off"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              placeholder="Find your coffee"
              onChange={e => {
                setSearch(e.currentTarget.value);
                fetchResults(e.currentTarget.value);
              }}
            />
          </fetcher.Form>
        </DrawerHeader>
      }
      footer={
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" size="lg">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      }
    >
      {state === 'loading' && isEmpty && <SearchLoading />}

      {state === 'idle' && isEmpty && (
        <SearchEmpty type={search ? 'not-found' : 'idle'} />
      )}

      {!isEmpty && (
        <div
          className={clsx(
            'flex flex-col gap-8 transition-opacity',
            state === 'loading' && !isEmpty && 'pointer-events-none opacity-50',
          )}
        >
          <SearchResultsSuggestedQueries
            search={search}
            queries={queries}
            setSearch={setSearch}
            fetchResults={fetchResults}
          />
          <SearchResultsProducts
            search={search}
            products={products}
            closeSearch={closeSearch}
          />
        </div>
      )}
    </Aside>
  );
}
