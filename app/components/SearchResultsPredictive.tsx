import { type Fetcher } from 'react-router';

import { type PredictiveSearchReturn } from '~/lib/search';

type PredictiveSearchItems = PredictiveSearchReturn['result']['items'];

type UsePredictiveSearchReturn = {
  total: number;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  items: PredictiveSearchItems;
  fetcher: Fetcher<PredictiveSearchReturn>;
};

type SearchResultsPredictiveArgs = Pick<
  UsePredictiveSearchReturn,
  'total' | 'inputRef' | 'items'
> & {
  state: Fetcher['state'];
  closeSearch: () => void;
};

export type PartialPredictiveSearchResult<
  ItemType extends keyof PredictiveSearchItems,
  ExtraProps extends keyof SearchResultsPredictiveArgs = 'closeSearch',
> = Pick<PredictiveSearchItems, ItemType> & Pick<SearchResultsPredictiveArgs, ExtraProps>;
