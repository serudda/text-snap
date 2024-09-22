import { useState } from 'react';
import { cn, TextInput } from 'side-ui';

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
    container: cn('grid gap-6 px-6 py-10 text-white', className),
    shortcutContainer: cn('grid items-center gap-4'),
    shortcutText: cn('min-w-28 text-xl font-semibold'),
  };

  const settingsArray: Array<{ key: SettingsKey; label: string }> = [
    { key: 'translate', label: 'Translate' },
    { key: 'grammar', label: 'Grammar' },
    { key: 'condense', label: 'Condense' },
    { key: 'formality', label: 'Formality' },
    { key: 'emoji', label: 'Emoji' },
    { key: 'improve', label: 'Improve' },
  ];

  const [settings, setSettings] = useState<SettingsState>({
    translate: 'CTRL + T',
    grammar: 'CTRL + G',
    condense: 'CTRL + C',
    formality: 'CTRL + F',
    emoji: 'CTRL + E',
    improve: 'CTRL + I',
  });

  const renderSettings = () => (
    <>
      {settingsArray.map(({ key, label }) => (
        <div key={key} className={classes.shortcutContainer}>
          <p className={classes.shortcutText}>{label}:</p>
          <TextInput
            value={settings[key]}
            onChange={(e) =>
              setSettings((prevSettings) => ({
                ...prevSettings,
                [key]: e.target.value,
              }))
            }
            disabled
            inputContainerClassName="border dark:border-neutral-600 dark:bg-neutral-950 max-w-56"
          />
        </div>
      ))}
    </>
  );

  return <div className={classes.container}>{renderSettings()}</div>;
};
