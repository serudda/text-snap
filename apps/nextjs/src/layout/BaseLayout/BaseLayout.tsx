import { type ReactNode } from 'react';
import { GetUserOperatingSystem } from '~/common';

export interface RootLayoutProps {
  /**
   * Children to render inside the layout.
   */
  children: ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  const currentOs = GetUserOperatingSystem();

  return (
    <div className="grid h-dvh grid-rows-[1fr,auto] bg-neutral-950">
      {children}
      <footer className="grid place-items-center gap-4">
        <div className="flex select-none items-center gap-2 text-neutral-500">
          The best version of your words
          <kbd className="flex items-center rounded-md bg-neutral-900 p-2 text-xs">
            {currentOs === 'Windows' ? 'CTRL' : '⌘'}
          </kbd>
          <kbd className="flex aspect-square items-center rounded-md bg-neutral-900 p-2 text-xs">K</kbd>
        </div>
        <p className="mb-6 text-center text-lg font-semibold text-neutral-200">
          With 💘 from&nbsp;
          <a href="https://x.com/serudda" className="text-primary-300 transition-colors hover:text-primary-200">
            @serudda
          </a>
          &nbsp;and&nbsp;
          <a href="https://x.com/zyruks" className="text-primary-300 transition-colors hover:text-primary-200">
            @zyruks
          </a>
        </p>
      </footer>
    </div>
  );
};
