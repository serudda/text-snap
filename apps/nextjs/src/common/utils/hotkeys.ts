import { OperatingSystem } from '../constants';

export type DefaultHotkeys = {
  translate: string;
  grammar: string;
  condense: string;
  formality: string;
  emoji: string;
  improve: string;
};

export const getDefaultHotkeys = (os: OperatingSystem): DefaultHotkeys => {
  const ctrlOrMeta = os === OperatingSystem.mac ? 'meta' : os === OperatingSystem.windows ? 'ctrl' : 'ctrl';

  return {
    translate: `${ctrlOrMeta}+alt+t`,
    grammar: `${ctrlOrMeta}+alt+g`,
    condense: `${ctrlOrMeta}+alt+c`,
    formality: `${ctrlOrMeta}+alt+f`,
    emoji: `${ctrlOrMeta}+alt+e`,
    improve: `${ctrlOrMeta}+alt+i`,
  };
};
