import { type ReactNode } from 'react';
import { RootNavbar } from '~components';

export interface RootLayoutProps {
  /**
   * Children to render inside the layout.
   */
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="grid h-dvh grid-rows-[auto,1fr] bg-neutral-950">
      <RootNavbar />

      {children}
    </div>
  );
};
