import '../styles/globals.css';
import '../styles/vendors/react-command-menu.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { api } from '~/utils/api';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return <SessionProvider session={session as Session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>;
};

export default api.withTRPC(App);
