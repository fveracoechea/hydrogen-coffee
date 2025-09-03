import { useEffect, useRef, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router';
import { type Fetcher } from 'react-router';

import {
  type PredictiveSearchReturn,
  getEmptyPredictiveSearchResult,
} from '~/lib/search';

import { useAside } from './Aside';

export const SEARCH_ENDPOINT = '/search';

type PredictiveSearchItems = PredictiveSearchReturn['result']['items'];

type UsePredictiveSearchReturn = {
  total: number;
  inputRef: React.Ref<HTMLInputElement | null>;
  items: PredictiveSearchItems;
  fetcher: Fetcher<PredictiveSearchReturn>;
};

type SearchResultsPredictiveArgs = Pick<
  UsePredictiveSearchReturn,
  'total' | 'inputRef' | 'items'
> & {
  state: Fetcher['state'];
  closeSearch: () => void;
  search: string;
  setSearch: (value: string) => void;
  fetchResults: (value: string) => void;
};

export type PartialPredictiveSearchResult<
  ItemType extends keyof PredictiveSearchItems,
  ExtraProps extends keyof SearchResultsPredictiveArgs = 'closeSearch',
> = Pick<PredictiveSearchItems, ItemType> & Pick<SearchResultsPredictiveArgs, ExtraProps>;

export function usePredictiveSearch() {
  const aside = useAside();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fetcher = useFetcher<PredictiveSearchReturn>({ key: 'search' });

  const [search, setSearch] = useState('');

  const { items, total } = fetcher?.data?.result ?? getEmptyPredictiveSearchResult();

  /** Reset the input value and blur the input */
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  /** Navigate to the search page with the current input value */
  function goToSearch() {
    navigate(SEARCH_ENDPOINT + (search ? `?q=${search}` : ''));
    aside.close();
  }

  /** Fetch search results based on the input value */
  function fetchResults(search: string) {
    fetcher.submit(
      { q: search, limit: 6, predictive: true },
      { method: 'GET', action: SEARCH_ENDPOINT },
    );
  }

  /** Utility that resets the search input and closes the search aside */
  function closeSearch() {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    aside.close();
    setSearch('');
    fetchResults('');
  }

  return {
    search,
    setSearch,
    fetcher,
    inputRef,
    goToSearch,
    closeSearch,
    fetchResults,
    handleFormSubmit,
    data: { items, total },
  };
}
