import '../styles/globals.css';
import '../styles/vendors/react-command-menu.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, type ReactElement, type ReactNode } from 'react';
import { api } from '~/utils/api';
import { env } from '../env.mjs';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',

    loaded: (posthog) => {
      if (env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  // Track page views
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => posthog?.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <SessionProvider session={session as Session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
    </PostHogProvider>
  );
};

export default api.withTRPC(App);
