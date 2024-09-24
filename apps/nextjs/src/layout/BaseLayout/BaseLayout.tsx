import { useEffect, useState, type ReactNode } from 'react';
import { RootFooter } from '~/components';

export interface RootLayoutProps {
  /**
   * Children to render inside the layout.
   */
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <div className="grid min-h-dvh grid-rows-[1fr,auto] bg-neutral-950">
      {children}

      <RootFooter />
    </div>
  );
};
