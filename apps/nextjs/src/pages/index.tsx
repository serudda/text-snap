import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { api, Format } from '~/utils/api';
import { Icon, IconCatalog } from '~/components';
import { Button, ButtonSize, ButtonVariant } from 'side-ui';

const Home: NextPage = () => {
  const [text, setText] = useState('Holla zoy Cerudda... quiero darte un abraso, y mucho carino');
  const { refetch: dispatchFormat, isFetching } = api.ai.dispatchFormat.useQuery(
    {
      text,
      selectedFormat: {
        type: Format.grammar,
      },
    },
    {
      enabled: false,
      retry: false,
      cacheTime: 0,
      onSuccess() {
        console.log('dispatchFormat - onSuccess');
      },
      onError(error) {
        console.error('dispatchFormat - onError', error);
      },
    },
  );

  const handleClick = async () => {
    const response = await dispatchFormat();

    if (!response.data?.data) {
      console.error('Error fetching data');
      return;
    }

    const formattedText = response.data.data.formattedText;
    setText(formattedText);
  };

  return (
    <>
      <Head>
        <title>Indie Creators HQ - Side Project Starter Kit</title>
        <meta name="description" content="Side Project Starter Kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex h-screen w-full flex-none flex-col items-center justify-center gap-10 overflow-hidden bg-slate-900 p-10">
        {isFetching && <span className="animate-pulse text-primary-200">formateando...</span>}
        <span className="text-white">{text}</span>
        <Button variant={ButtonVariant.secondary} size={ButtonSize.sm} onClick={handleClick}>
          Formatear
        </Button>

        {/* Footer options */}
        <div className="flex flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
          <Link
            className="group relative isolate flex flex-none items-center gap-x-3 rounded-lg px-2 py-0.5 font-medium text-white/30 transition-colors hover:text-primary-200"
            href="https://indiecreatorshq.com/discord"
            target="_blank"
          >
            <Icon icon={IconCatalog.discord} className="h-6 w-6 text-white" isSolid />
            <span className="self-baseline text-white">Discord</span>
          </Link>
          <div className="mx-2 h-[30px] w-[0.5px] rotate-[20deg] transform bg-neutral-700"></div>
          <div className="flex items-center gap-x-1">
            <span className="text-slate-400">Made with</span>
            <Icon icon={IconCatalog.heart} className="h-4 w-4 text-red-500" isSolid />
            <span className="text-slate-400">by the</span>
            <Link
              className="font-medium text-slate-400 underline decoration-dashed decoration-0 underline-offset-4 transition-colors hover:text-primary-200"
              href="https://github.com/Indie-Creator-Community"
              target="_blank"
            >
              Indie Creators HQ
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
