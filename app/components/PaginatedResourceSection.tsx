import * as React from 'react';

import { Pagination } from '@shopify/hydrogen';

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
            <div className="flex justify-center p-4">
              <PreviousLink>
                {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
              </PreviousLink>
            </div>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="flex justify-center p-4">
              <NextLink>{isLoading ? 'Loading...' : <span>Load more ↓</span>}</NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
