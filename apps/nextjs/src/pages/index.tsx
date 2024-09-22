import { useState, type ChangeEvent, type ReactElement } from 'react';
import { api, Format } from '~/utils/api';
import { useHotkeySettings } from '~/common';
import { type NextPageWithLayout } from './_app';
import { RootLayout } from '~layout';
import { useHotkeys } from 'react-hotkeys-hook';
import { Resize, Textarea } from 'side-ui';

const Home: NextPageWithLayout = () => {
  const [text, setText] = useState('');
  const { shortcuts } = useHotkeySettings();
  const [selectedFormat, setSelectedFormat] = useState(Format.grammar);

  const { refetch: dispatchFormat, isFetching } = api.ai.dispatchFormat.useQuery(
    {
      text,
      selectedFormat: {
        type: selectedFormat,
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

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleHotKey = async (formatType: Format) => {
    setSelectedFormat(formatType);
    const response = await dispatchFormat();

    if (!response.data?.data) {
      console.error('Error fetching data');
      return;
    }

    setText(response.data.data.formattedText);
  };

  useHotkeys(shortcuts.translate, (event) => {
    event.preventDefault();
    void handleHotKey(Format.translate);
  });

  useHotkeys(shortcuts.grammar, (event) => {
    event.preventDefault();
    void handleHotKey(Format.grammar);
  });

  useHotkeys(shortcuts.condense, (event) => {
    event.preventDefault();
    void handleHotKey(Format.condense);
  });

  useHotkeys(shortcuts.formality, (event) => {
    event.preventDefault();
    void handleHotKey(Format.formality);
  });

  useHotkeys(shortcuts.emoji, (event) => {
    event.preventDefault();
    void handleHotKey(Format.emoji);
  });

  useHotkeys(shortcuts.improve, (event) => {
    event.preventDefault();
    void handleHotKey(Format.improve);
  });

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
