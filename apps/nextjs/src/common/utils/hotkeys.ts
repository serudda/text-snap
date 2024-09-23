export const getDefaultShortcuts = (os: 'Windows' | 'Mac' | 'Other') => {
  const ctrlOrMeta = os === 'Mac' ? 'META' : os === 'Windows' ? 'CTRL' : 'CTRL';

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
