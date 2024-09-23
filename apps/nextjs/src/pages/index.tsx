import { useState, type ChangeEvent, type ReactElement } from 'react';
import { api, Format } from '~/utils/api';
import { useHotkeySettings } from '~/common';
import { type NextPageWithLayout } from './_app';
import { RootLayout } from '~layout';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconCatalog,
  IconStyle,
  Resize,
  Tag,
  TagVariant,
  Textarea,
} from 'side-ui';

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
      <div className="mx-auto max-w-4xl p-4 px-11">
        {isFetching && <span className="animate-pulse text-primary-200">formateando...</span>}
        <div className="mb-3 flex w-full justify-between border-b border-neutral-900 px-2 pb-4">
          <div className="flex items-center gap-1">
            <Button variant={ButtonVariant.ghost} size={ButtonSize.xs}>
              <Icon icon={IconCatalog.chevronRight} iconStyle={IconStyle.regular} className="h-4 w-4 rotate-180" />
            </Button>
            <span className="text-white">3/3</span>
            <Button variant={ButtonVariant.ghost} size={ButtonSize.xs}>
              <Icon icon={IconCatalog.chevronRight} iconStyle={IconStyle.regular} className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button className="flex gap-2" variant={ButtonVariant.tertiary} size={ButtonSize.sm}>
              <Icon icon={IconCatalog.clipboard} iconStyle={IconStyle.regular} className="h-4 w-4" />
              <span>Copy</span>
            </Button>
            <Button className="flex gap-2" variant={ButtonVariant.tertiary} size={ButtonSize.sm}>
              <Icon icon={IconCatalog.trash} iconStyle={IconStyle.regular} className="h-4 w-4" />
              <span>Clean</span>
            </Button>
          </div>
        </div>
        <Textarea
          className="border-b border-neutral-900 bg-neutral-950 p-4 text-white"
          textareaClassName="placeholder:text-neutral-600"
          placeholder="Start your journey..."
          styleless
          hasAutoSize
          minHeight="30vh"
          resize={Resize.none}
          value={text}
          onChange={handleTextChange}
        />
        <div className="flex items-center gap-2 p-4">
          <span className="text-sm text-neutral-500">Format applied:</span>
          <Tag variant={TagVariant.success}>Emoji</Tag>
        </div>
      </div>
    </main>
  );
};

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;
export default Home;
