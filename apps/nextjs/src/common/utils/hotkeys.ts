import { OperatingSystem } from '../constants';

export const getDefaultShortcuts = (os: OperatingSystem) => {
  const ctrlOrMeta = os === OperatingSystem.mac ? 'META' : os === OperatingSystem.windows ? 'CTRL' : 'CTRL';

  return {
    translate: `${ctrlOrMeta} + ALT + T`,
    grammar: `${ctrlOrMeta} + ALT + U`,
    condense: `${ctrlOrMeta} + ALT + C`,
    formality: `${ctrlOrMeta} + ALT + F`,
    emoji: `${ctrlOrMeta} + ALT + E`,
    improve: `${ctrlOrMeta} + ALT + I`,
  };
};

export type ShortcutType = ReturnType<typeof getDefaultShortcuts>;
