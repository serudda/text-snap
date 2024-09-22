import { useState } from 'react';
import { DEFAULT_SHORTCUTS, useHotkeySettings, useRecordHotkeys } from '~/common';
import { Button, ButtonSize, cn } from 'side-ui';

export interface SettingsBodyProps {
  /**
   * The CSS class to apply to the SettingsBody.
   */
  className?: string;
}

interface SettingsState {
  translate: string;
  grammar: string;
  condense: string;
  formality: string;
  emoji: string;
  improve: string;
}

type SettingsKey = keyof SettingsState;

export const SettingsBody = ({ className }: SettingsBodyProps) => {
  const classes = {
    container: cn('grid grid-cols-2 gap-6 px-6 py-10 text-white', className),
    shortcutContainer: cn('grid items-center gap-4'),
    shortcutText: cn('min-w-28 text-xl font-semibold'),
  };

  const [currentKey, setCurrentKey] = useState<SettingsKey | null>(null);
  const { shortcuts, handleShortcutChange, resetShortcuts } = useHotkeySettings();
  const { keys, isRecording, start, stop } = useRecordHotkeys();

  // TODO: Obtener formatos de Format <Serudda>
  const settingsArray: Array<{ key: SettingsKey; label: string }> = [
    { key: 'translate', label: 'Translate' },
    { key: 'grammar', label: 'Grammar' },
    { key: 'condense', label: 'Condense' },
    { key: 'formality', label: 'Formality' },
    { key: 'emoji', label: 'Emoji' },
    { key: 'improve', label: 'Improve' },
  ];

  const toggleRecording = (key: SettingsKey) => {
    if (isRecording && currentKey === key) {
      stop();
      if (keys.size > 0) {
        const recordedShortcut = Array.from(keys).join(' + ');
        handleShortcutChange(key, recordedShortcut);
      }
      setCurrentKey(null);
    } else {
      setCurrentKey(key);
      start();
    }
  };

  const renderSettings = () => (
    <>
      {settingsArray.map(({ key, label }) => (
        <div key={key} className={classes.shortcutContainer}>
          <p className={classes.shortcutText}>{label}:</p>
          <div className="flex select-none items-center gap-4">
            <p
              className={cn('uppercase text-white', {
                'text-neutral-400': shortcuts[key] === DEFAULT_SHORTCUTS[key],
              })}
            >
              {shortcuts[key]}
            </p>
            <Button
              onClick={() => toggleRecording(key)}
              size={ButtonSize.sm}
              className={cn('bg-neutral-800 text-white hover:bg-primary-700', {
                'bg-red-500 hover:bg-red-700': isRecording && currentKey === key,
              })}
            >
              {isRecording && currentKey === key ? '■' : '⬤'}
            </Button>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className={classes.container}>
      {renderSettings()}
      <Button className="col-start-1 col-end-3 mt-4" onClick={resetShortcuts}>
        Reset Shortcuts
      </Button>
    </div>
  );
};
