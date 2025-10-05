import * as React from 'react';
import { ReactNode } from 'react';

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
  children: (args: { node: NodesType; index: number }) => ReactNode;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        return (
          <>
            <div className="flex justify-end p-4">
              <Button asChild variant="secondary">
                <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
              </Button>
            </div>
            <div className="grid-auto-fill">
              {nodes.map((node, index) => children({ node, index }))}
            </div>
            <div className="flex justify-end p-4">
              <Button asChild variant="secondary">
                <NextLink>{isLoading ? 'Loading...' : <span>Load more ↓</span>}</NextLink>
              </Button>
            </div>
          </>
        );
      }}
    </Pagination>
  );
}
