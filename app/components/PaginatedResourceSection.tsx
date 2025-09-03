import * as React from 'react';

import { Pagination } from '@shopify/hydrogen';

import { Button } from './ui/button';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{ node: NodesType; index: number }>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        ) as React.ReactNode;

        return (
          <div>
            <div className="flex justify-end p-4">
              <Button asChild variant="secondary">
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
              </Button>
            </div>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="flex justify-end p-4">
              <Button asChild variant="secondary">
                <NextLink>{isLoading ? 'Loading...' : <span>Load more ↓</span>}</NextLink>
              </Button>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
