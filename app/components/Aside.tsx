import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';

type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

type AsideProps = {
  type: AsideType;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside(props: AsideProps) {
  const { children, header, footer, type } = props;

  const { type: activeType, close } = useAside();
  const expanded = type === activeType;

  return (
    <Drawer
      direction="right"
      open={expanded}
      onOpenChange={open => {
        if (!open) close();
      }}
    >
      <DrawerContent>
        {header}
        <main className="h-full max-h-full overflow-y-auto p-4">{children}</main>
        {footer}
      </DrawerContent>
    </Drawer>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
