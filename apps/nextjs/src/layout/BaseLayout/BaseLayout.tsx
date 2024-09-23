import { type ReactNode } from 'react';
import { RootFooter } from '~/components';

export interface RootLayoutProps {
  /**
   * Children to render inside the layout.
   */
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="grid h-dvh grid-rows-[1fr,auto] bg-neutral-950">
      {children}

      <RootFooter />
    </div>
  );
};
