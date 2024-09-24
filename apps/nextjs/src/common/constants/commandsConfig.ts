import { type TranslateInputType } from '@acme/api/src/schema/ai.schema';
import { languages } from '~/data';

export enum LocalStorageKeys {
  translateConfig = 'translateConfig',
}

/*------------------------------------*/

export const translateConfig: TranslateInputType['config'] = {
  language: languages[0].value,
};

/*------------------------------------*/
