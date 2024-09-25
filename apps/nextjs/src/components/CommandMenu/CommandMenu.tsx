import { useState } from 'react';
import { Format } from '@acme/ai';
import { type DispatchFormatInputType } from '@acme/api/src/schema/ai.schema';
import { definePrimaryHotkey, getOS, KeyboardKey, LocalStorageKeys, translateConfig } from '~/common';
import { languages } from '~/data';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { cn, Icon, IconCatalog, useLocalStorage } from 'side-ui';

enum CommandMenuPages {
  mainMenu = 'maniManu',
  languagesSubMenu = 'languagesSubMenu',
}

interface CommandMenuProps {
  /**
   * Whether the CommandMenu is open.
   */
  isOpen: boolean;

  /**
   * Callback to change the open state of the CommandMenu.
   */
  onChangeOpen: (isOpen: boolean) => void;

  /**
   * Callback when an item is selected.
   */
  onItemSelect: (format: Format, config?: DispatchFormatInputType['selectedFormat']['config']) => void;
}

export const CommandMenu = ({ isOpen, onChangeOpen, onItemSelect }: CommandMenuProps) => {
  const [translateConfigLocalStorage, setTranslateConfigLocalStorage] = useLocalStorage(
    LocalStorageKeys.translateConfig,
    translateConfig,
  );
  const [search, setSearch] = useState('');
  const [translateLanguage, setTranslateLanguage] = useState(translateConfigLocalStorage.language);
  const [page, setPage] = useState<CommandMenuPages>(CommandMenuPages.mainMenu);
  const currentOs = getOS(navigator.userAgent);

  const placeholders: Record<CommandMenuPages, string> = {
    [CommandMenuPages.mainMenu]: 'Search a Command',
    [CommandMenuPages.languagesSubMenu]: 'Search a Language',
  };

  const classes = {
    hotkeysContainer: cn('flex items-center gap-2'),
    hotkeys: cn('flex items-center rounded-md bg-neutral-950 p-2 text-xs transition-colors group-hover:bg-neutral-900'),
  };

  const commandsItems = filterItems(
    [
      {
        heading: 'Commands',
        id: CommandMenuPages.mainMenu,
        items: [
          {
            id: Format.translate,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Translate the text</span>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>T</kbd>
                </div>
              </div>
            ),
            keywords: [Format.translate],
            showType: false,
            icon: 'GlobeAltIcon',
            closeOnSelect: false,
            onClick: () => {
              setPage(CommandMenuPages.languagesSubMenu);
            },
          },
          {
            id: Format.grammar,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Fix spelling & grammar</span>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>G</kbd>
                </div>
              </div>
            ),
            keywords: [Format.grammar],
            showType: false,
            icon: 'DocumentCheckIcon',
            onClick: () => {
              onItemSelect(Format.grammar);
            },
          },
          {
            id: Format.condense,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Make the text shorter</span>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>C</kbd>
                </div>
              </div>
            ),
            keywords: [Format.condense],
            showType: false,
            icon: 'ScissorsIcon',
            onClick: () => {
              onItemSelect(Format.condense);
            },
          },
          {
            id: Format.formality,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <div className="flex w-full items-center space-x-2.5">
                  <Icon icon={IconCatalog.suitcase} className="h-5 w-5 text-gray-500" />
                  <p className="dark:text-white">Adjust the formality</p>
                </div>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>F</kbd>
                </div>
              </div>
            ),
            keywords: [Format.formality],
            showType: false,
            onClick: () => {
              onItemSelect(Format.formality);
            },
          },
          {
            id: Format.emoji,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Add emojis & symbols</span>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>E</kbd>
                </div>
              </div>
            ),
            keywords: [Format.emoji],
            showType: false,
            icon: 'FaceSmileIcon',
            onClick: () => {
              onItemSelect(Format.emoji);
            },
          },
          {
            id: Format.improve,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Improve writing</span>
                <div className={classes.hotkeysContainer}>
                  <kbd className={classes.hotkeys}>{definePrimaryHotkey(currentOs)}</kbd>
                  <kbd className={classes.hotkeys}>{KeyboardKey.ALT}</kbd>
                  <kbd className={classes.hotkeys}>I</kbd>
                </div>
              </div>
            ),
            keywords: [Format.improve],
            showType: false,
            icon: 'SparklesIcon',
            onClick: () => {
              onItemSelect(Format.improve);
            },
          },
        ],
      },
    ],
    search,
  );

  const languagesItems = filterItems(
    [
      {
        heading: 'Select a Language',
        id: CommandMenuPages.languagesSubMenu,
        items: languages.map((language) => ({
          id: language.value,
          children: (
            <div className="flex w-full items-center justify-between text-white">
              <div className="flex w-full items-center gap-4 text-white">
                <span data-language-icon>{language.emoji}</span>
                <span className="">{language.label}</span>
              </div>

              {translateLanguage === language.value && <div className={classes.hotkeys}>default</div>}
            </div>
          ),
          keywords: [language.label, language.value],
          showType: false,

          onClick: () => {
            translateConfig.language = language.value;
            setTranslateLanguage(language.value);
            setTranslateConfigLocalStorage(translateConfig);
            onItemSelect(Format.translate, translateConfig);
            setPage(CommandMenuPages.mainMenu);
          },
        })),
      },
    ],
    search,
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={onChangeOpen}
      search={search}
      isOpen={isOpen}
      page={page}
      placeholder={placeholders[page]}
    >
      <CommandPalette.Page id={CommandMenuPages.mainMenu}>
        {commandsItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem className="group" key={id} index={getItemIndex(commandsItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))}
      </CommandPalette.Page>

      <CommandPalette.Page
        id={CommandMenuPages.languagesSubMenu}
        searchPrefix={['Languages']}
        onEscape={() => setPage(CommandMenuPages.mainMenu)}
      >
        {languagesItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem className="group" key={id} index={getItemIndex(languagesItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))}
      </CommandPalette.Page>
    </CommandPalette>
  );
};
