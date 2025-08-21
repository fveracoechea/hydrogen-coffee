import { useId } from 'react';

import { CoffeeIcon, SearchIcon } from 'lucide-react';

import { Aside } from './Aside';
import { SearchFormPredictive } from './SearchFormPredictive';
import { SearchResultsPredictive } from './SearchResultsPredictive';
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

type SearchDrawerProps = {};

export function SearchDrawer(props: SearchDrawerProps) {
  const queriesDatalistId = useId();
  const serachInputId = useId();
  return (
    <Aside
      type="search"
      header={
        <DrawerHeader>
          <DrawerTitle asChild>
            <Typography variant="h5" as="h3">
              Search
            </Typography>
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Use this form to search our store
          </DrawerDescription>

          <SearchFormPredictive className="flex gap-2">
            {({ fetchResults, goToSearch, inputRef }) => (
              <>
                <Input
                  name="q"
                  ref={inputRef}
                  id={serachInputId}
                  onFocus={fetchResults}
                  onChange={fetchResults}
                  list={queriesDatalistId}
                  placeholder="Start your coffee journey here"
                />
              </>
            )}
          </SearchFormPredictive>
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
      <SearchResultsPredictive>
        {({ items, total, term, state, closeSearch }) => {
          const { articles, collections, pages, products, queries } = items;

          if (state === 'loading' && term.current) return <div>Loading...</div>;
          if (!total) return <SearchEmpty type="idle" />;
        }}
      </SearchResultsPredictive>
    </Aside>
  );
}
