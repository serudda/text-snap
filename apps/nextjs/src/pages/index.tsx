import { useState, type ReactElement } from 'react';
import { api, Format } from '~/utils/api';
import { type NextPageWithLayout } from './_app';
import { RootLayout } from '~layout';
import { Resize, Textarea } from 'side-ui';

const Home: NextPageWithLayout = () => {
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

  const handleTextChange = async () => {
    const response = await dispatchFormat();

    if (!response.data?.data) {
      console.error('Error fetching data');
      return;
    }

    const formattedText = response.data.data.formattedText;
    setText(formattedText);
  };

  return (
    <main>
      <div className="container mx-auto p-4">
        {isFetching && <span className="animate-pulse text-primary-200">formateando...</span>}
        <Textarea
          className="bg-neutral-950 text-white"
          textareaClassName="placeholder:text-gray-400 hover:placeholder:text-gray-200 focus:placeholder:text-gray-200"
          placeholder="Start your journey..."
          styleless
          hasAutoSize
          resize={Resize.none}
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;
export default Home;
