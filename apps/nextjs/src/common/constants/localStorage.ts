import { ChangeScale, FormalityScale } from '@acme/ai';
import {
  type CondenseInputType,
  type EmojiInputType,
  type FormalityInputType,
  type ImproveInputType,
  type TranslateInputType,
} from '@acme/api/src/schema/ai.schema';
import { languages } from '~/data';

export enum LocalStorageKeys {
  grammarConfig = 'grammarConfig',
  improveConfig = 'improveConfig',
  formalityConfig = 'formalityConfig',
  translateConfig = 'translateConfig',
  emojiConfig = 'emojiConfig',
  condenseConfig = 'condenseConfig',
}

/*------------------------------------*/

export const improveConfig: ImproveInputType['config'] = {
  scale: ChangeScale.moderate,
};

/*------------------------------------*/

export const formalityConfig: FormalityInputType['config'] = {
  formalityScale: FormalityScale.formal,
};

/*------------------------------------*/

export const translateConfig: TranslateInputType['config'] = {
  language: languages[0].value,
};

/*------------------------------------*/

export const emojiConfig: EmojiInputType['config'] = {
  position: '',
  scale: ChangeScale.moderate,
};

/*------------------------------------*/

export const condenseConfig: CondenseInputType['config'] = {
  length: 100,
};

/*------------------------------------*/
