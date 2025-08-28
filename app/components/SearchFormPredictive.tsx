import React, { useEffect, useRef } from 'react';
import { type Fetcher, type FormProps, useFetcher, useNavigate } from 'react-router';

import type { PredictiveSearchReturn } from '~/lib/search';

import { useAside } from './Aside';

type SearchFormPredictiveChildren = (args: {
  fetchResults: (event: React.ChangeEvent<HTMLInputElement>) => void;
  goToSearch: () => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  fetcher: Fetcher<PredictiveSearchReturn>;
}) => React.ReactNode;

type SearchFormPredictiveProps = Omit<FormProps, 'children'> & {
  children: SearchFormPredictiveChildren | null;
};

export const SEARCH_ENDPOINT = '/search';

/**
 *  Search form component that sends search requests to the `/search` route
 **/
export function SearchFormPredictive(props: SearchFormPredictiveProps) {
  const { children, ...formProps } = props;
  const fetcher = useFetcher<PredictiveSearchReturn>({ key: 'search' });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const aside = useAside();

  /** Reset the input value and blur the input */
  function resetInput(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (inputRef?.current?.value) {
      inputRef.current.blur();
    }
  }

  /** Navigate to the search page with the current input value */
  function goToSearch() {
    const term = inputRef?.current?.value;
    navigate(SEARCH_ENDPOINT + (term ? `?q=${term}` : ''));
    aside.close();
  }

  /** Fetch search results based on the input value */
  function fetchResults(event: React.ChangeEvent<HTMLInputElement>) {
    fetcher.submit(
      { q: event.target.value || '', limit: 5, predictive: true },
      { method: 'GET', action: SEARCH_ENDPOINT },
    );
  }

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (typeof children !== 'function') {
    return null;
  }

  return (
    <fetcher.Form {...formProps} onSubmit={resetInput}>
      {children({ inputRef, fetcher, fetchResults, goToSearch })}
    </fetcher.Form>
  );
}
