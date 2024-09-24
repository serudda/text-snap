import { type GetServerSideProps } from 'next';
import { useEffect, useRef, useState, type ChangeEvent, type ReactElement } from 'react';
import { type DispatchFormatInputType } from '@acme/api/src/schema/ai.schema';
import { api, Format } from '~/utils/api';
import {
  getDefaultShortcuts,
  getOS,
  LocalStorageKeys,
  OperatingSystem,
  translateConfig,
  usePreventHotKey,
} from '~/common';
import { CommandMenu } from '~/components';
import { languages } from '~/data';
import { type NextPageWithLayout } from './_app';
import { RootLayout } from '~layout';
import { useHandleOpenCommandPalette } from 'react-cmdk';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  ConfirmationModal,
  CopyButton,
  Icon,
  IconCatalog,
  IconStyle,
  Resize,
  Spinner,
  SpinnerSize,
  SpinnerVariant,
  Tag,
  TagVariant,
  Textarea,
  useLocalStorage,
  useModal,
} from 'side-ui';

type TextVersion = {
  text: string;
  format?: Format;
};

interface HomePageProps {
  userAgent?: string;
}

const Home: NextPageWithLayout = ({ userAgent }: HomePageProps) => {
  const [textareaValue, setTextareaValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [textVersions, setTextVersions] = useState<Array<TextVersion>>([]);
  const [currentVersion, setCurrentVersion] = useState<TextVersion>();
  const [translateConfigLocalStorage] = useLocalStorage(LocalStorageKeys.translateConfig, translateConfig);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentOS = getOS(userAgent);
  const shortcuts = getDefaultShortcuts(currentOS);
  const currentVersionIndex = textVersions.findIndex((version) => version.text === currentVersion?.text);
  const { modalNode, openModal } = useModal();

  usePreventHotKey();
  useHandleOpenCommandPalette(setIsOpen);

  useEffect(() => {
    setTextareaValue(currentVersion?.text || '');
  }, [currentVersion]);

  const { mutate: dispatchFormat, isLoading } = api.ai.dispatchFormat.useMutation({
    retry: false,
    cacheTime: 0,
    onSuccess(response) {
      if (!response?.data) return;
      if (textVersions.length === 0) {
        setTextVersions((prev) => [
          ...prev,
          {
            text: textareaValue,
          },
          {
            text: response.data.formattedText,
            format: response.data.format,
          },
        ]);
      } else {
        setTextVersions((prev) => [
          ...prev,
          {
            text: response.data.formattedText,
            format: response.data.format,
          },
        ]);
      }

      setCurrentVersion({ text: response.data.formattedText, format: response.data.format });
    },
    onError(error) {
      console.error('dispatchFormat - onError', error);
    },
  });

  const classes = {
    textarea: cn('rounded-lg border border-neutral-800 bg-neutral-950 px-6 py-5', {
      'animate-pulse bg-neutral-900 text-neutral-700': isLoading,
      'text-white': !isLoading,
    }),
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleHotKey = (formatType: Format, config?: DispatchFormatInputType['selectedFormat']['config']) => {
    if (isLoading) return;

    dispatchFormat({
      text: textareaValue,
      selectedFormat: {
        type: formatType,
        config,
      },
    });
  };

  const handlePrevVersionClick = () => {
    if (currentVersionIndex === -1 || currentVersionIndex === 0) return;
    setCurrentVersion(textVersions[currentVersionIndex - 1]);
  };

  const handleNextVersionClick = () => {
    if (currentVersionIndex === -1) return;
    setCurrentVersion(textVersions[currentVersionIndex + 1]);
  };

  useHotkeys(
    shortcuts.translate,

    (event) => {
      const languageConfig = {
        language: translateConfigLocalStorage?.language || languages[0].value,
      };

      event.preventDefault();
      void handleHotKey(Format.translate, languageConfig);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  useHotkeys(
    shortcuts.grammar,
    (event) => {
      event.preventDefault();
      void handleHotKey(Format.grammar);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  useHotkeys(
    shortcuts.condense,
    (event) => {
      event.preventDefault();
      void handleHotKey(Format.condense);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  useHotkeys(
    shortcuts.formality,
    (event) => {
      event.preventDefault();
      void handleHotKey(Format.formality);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  useHotkeys(
    shortcuts.emoji,
    (event) => {
      event.preventDefault();
      void handleHotKey(Format.emoji);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  useHotkeys(
    shortcuts.improve,
    (event) => {
      event.preventDefault();
      void handleHotKey(Format.improve);
    },
    {
      enableOnFormTags: ['TEXTAREA'],
    },
  );

  const handleItemSelect = (itemId: Format, config?: DispatchFormatInputType['selectedFormat']['config']) => {
    setIsOpen(false);
    void handleHotKey(itemId, config);
  };

  const handleCleanClick = async () => {
    await openModal<string | null>((close) => (
      <ConfirmationModal
        header={{
          title: 'Clean Text',
          hasCloseBtn: true,
        }}
        description="Are you sure you want to clean the text?"
        confirmBtnLabel="Clean"
        cancelBtnLabel="Cancel"
        onClose={() => close(null)}
        onConfirm={() => {
          // Clean all states
          setTextareaValue('');
          setTextVersions([]);
          setCurrentVersion(undefined);
          close();
        }}
      />
    ));
  };

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-4 md:px-14">
        <div className="mb-3 flex w-full justify-between">
          {textVersions.length > 0 && (
            <div className="flex items-center gap-1">
              <Button
                className="dark:hover:bg-neutral-900"
                invert
                variant={ButtonVariant.ghost}
                size={ButtonSize.xs}
                onClick={handlePrevVersionClick}
                isDisabled={currentVersionIndex === 0}
              >
                <Icon icon={IconCatalog.chevronRight} iconStyle={IconStyle.regular} className="h-4 w-4 rotate-180" />
              </Button>
              <span className="select-none text-white">v{currentVersionIndex + 1}</span>
              <Button
                className="dark:hover:bg-neutral-900"
                variant={ButtonVariant.ghost}
                size={ButtonSize.xs}
                onClick={handleNextVersionClick}
                isDisabled={currentVersionIndex === textVersions.length - 1}
              >
                <Icon icon={IconCatalog.chevronRight} iconStyle={IconStyle.regular} className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            <CopyButton target={textareaValue}>
              <span>
                <Button
                  className="flex gap-2 dark:border-neutral-800 dark:hover:bg-neutral-900"
                  variant={ButtonVariant.tertiary}
                  size={ButtonSize.sm}
                >
                  <Icon icon={IconCatalog.clipboard} iconStyle={IconStyle.regular} className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
              </span>
            </CopyButton>

            <Button
              className="flex gap-2 dark:border-neutral-800 dark:hover:bg-neutral-900"
              variant={ButtonVariant.tertiary}
              size={ButtonSize.sm}
              onClick={handleCleanClick}
            >
              <Icon icon={IconCatalog.trash} iconStyle={IconStyle.regular} className="h-4 w-4" />
              <span>Clean</span>
            </Button>
          </div>
        </div>

        <Textarea
          ref={textareaRef}
          className={classes.textarea}
          textareaClassName="placeholder:text-neutral-600"
          placeholder="Type or paste your text to format..."
          styleless
          hasAutoSize
          minHeight="30vh"
          resize={Resize.none}
          value={textareaValue}
          onChange={handleTextChange}
        />

        <div className="mt-3 flex items-center justify-between">
          {textVersions[currentVersionIndex]?.format && (
            <div className="flex items-center gap-2 p-2">
              <span className="text-sm text-neutral-500">Format applied:</span>
              {isLoading ? (
                <Spinner variant={SpinnerVariant.primary} size={SpinnerSize.xs} />
              ) : (
                <Tag variant={TagVariant.success}>{textVersions[currentVersionIndex]?.format}</Tag>
              )}
            </div>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="ml-auto flex items-center gap-3 rounded-md border border-neutral-800 px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-900/55 hover:text-white"
          >
            <span>Formats</span>
            <div className="flex items-center gap-2">
              <kbd className="flex h-6 items-center rounded-md bg-neutral-900 p-2 text-xs">
                {currentOS === OperatingSystem.windows ? 'CTRL' : '⌘'}
              </kbd>
              <kbd className="flex aspect-square h-6 items-center rounded-md bg-neutral-900 p-2 text-xs">K</kbd>
            </div>
          </button>

          <CommandMenu isOpen={isOpen} onChangeOpen={setIsOpen} onItemSelect={handleItemSelect} />
        </div>
      </div>
      {modalNode}
    </main>
  );
};

Home.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps<{ userAgent: string }> = async (context) => {
  const userAgent = context.req.headers['user-agent'] as string;
  return {
    props: { userAgent },
  };
};

export default Home;
