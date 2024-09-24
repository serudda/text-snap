import { useState } from 'react';
import { Format } from '@acme/ai';
import { getOS, OperatingSystem } from '~/common';
import { languages, type LanguageValue } from '~/data';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { cn, Icon, IconCatalog } from 'side-ui';

enum CommandMenuPages {
  commands = 'commands',
  languages = 'languages',
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
  onItemSelect: (format: Format) => void;

  /**
   * The default language.
   */
  defaultLanguage: LanguageValue;

  /**
   * Callback to set the default language.
   */
  setDefaultLanguage: (language: LanguageValue) => void;
}

export const CommandMenu = ({
  isOpen,
  onChangeOpen,
  onItemSelect,
  defaultLanguage,
  setDefaultLanguage,
}: CommandMenuProps) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState<CommandMenuPages>(CommandMenuPages.commands);
  const currentOs = getOS(navigator.userAgent);
  const placeholder = page === CommandMenuPages.commands ? 'Search a Command' : 'Search a Language';

  const classes = {
    shortcutContainer: cn('flex items-center gap-2'),
    shortcut: cn(
      'flex items-center rounded-md bg-neutral-950 p-2 text-xs transition-colors group-hover:bg-neutral-900',
    ),
  };

  const commandsItems = filterItems(
    [
      {
        heading: 'Commands',
        id: CommandMenuPages.commands,
        items: [
          {
            id: Format.translate,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Select a default language for translation</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>T</kbd>
                </div>
              </div>
            ),
            keywords: [Format.translate],
            showType: false,
            icon: 'GlobeAltIcon',
            closeOnSelect: false,
            onClick: () => {
              setPage(CommandMenuPages.languages);
            },
          },
          {
            id: Format.grammar,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Fix spelling & grammar</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>G</kbd>
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
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>C</kbd>
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
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>F</kbd>
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
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>E</kbd>
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
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === OperatingSystem.windows ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>I</kbd>
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
        id: CommandMenuPages.languages,
        items: languages.map((language) => ({
          id: language.value,
          children: (
            <div className="flex w-full items-center justify-between text-white">
              <div className="flex w-full items-center gap-4 text-white">
                <span data-language-icon>{language.emoji}</span>
                <span className="">{language.label}</span>
              </div>

              {defaultLanguage === language.value && <div className={classes.shortcut}>default</div>}
            </div>
          ),
          keywords: [language.label, language.value],
          showType: false,

          onClick: () => {
            setDefaultLanguage(language.value);
            setPage(CommandMenuPages.commands);
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
      placeholder={placeholder}
    >
      <CommandPalette.Page id={CommandMenuPages.commands}>
        {commandsItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem className="group" key={id} index={getItemIndex(commandsItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))}
      </CommandPalette.Page>

      <CommandPalette.Page
        id={CommandMenuPages.languages}
        searchPrefix={['Languages']}
        onEscape={() => setPage(CommandMenuPages.commands)}
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
