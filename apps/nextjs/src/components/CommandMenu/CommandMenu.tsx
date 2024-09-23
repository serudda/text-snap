import { useState } from 'react';
import { Format } from '@acme/ai';
import { GetUserOperatingSystem } from '~/common';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { cn, Icon, IconCatalog } from 'side-ui';

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
}

export const CommandMenu = ({ isOpen, onChangeOpen, onItemSelect }: CommandMenuProps) => {
  const [search, setSearch] = useState('');
  const currentOs = GetUserOperatingSystem();

  const classes = {
    shortcutContainer: cn('flex items-center gap-2'),
    shortcut: cn(
      'flex items-center rounded-md bg-neutral-950 p-2 text-xs transition-colors group-hover:bg-neutral-900',
    ),
  };

  const filteredItems = filterItems(
    [
      {
        heading: 'Commands',
        id: 'commands',

        items: [
          {
            id: Format.translate,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Translate</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
                  <kbd className={classes.shortcut}>ALT</kbd>
                  <kbd className={classes.shortcut}>T</kbd>
                </div>
              </div>
            ),
            keywords: [Format.translate],
            showType: false,
            icon: 'GlobeAltIcon',
            onClick: () => {
              onItemSelect(Format.translate);
            },
          },
          {
            id: Format.grammar,
            children: (
              <div className="flex w-full items-center justify-between text-white">
                <span>Grammar</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
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
                <span>Condense</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
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
                  <p className="dark:text-white">Formality</p>
                </div>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
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
                <span>Emoji</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
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
                <span>Improve</span>
                <div className={classes.shortcutContainer}>
                  <kbd className={classes.shortcut}>{currentOs === 'Windows' ? 'CTRL' : '⌘'}</kbd>
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

  return (
    <CommandPalette
      search={search}
      isOpen={isOpen}
      onChangeSearch={setSearch}
      onChangeOpen={onChangeOpen}
      page={'root'}
    >
      <CommandPalette.Page id="root">
        {filteredItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem className="group" key={id} index={getItemIndex(filteredItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))}
      </CommandPalette.Page>
    </CommandPalette>
  );
};
