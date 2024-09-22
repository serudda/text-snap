import { ChangeScale, FormalityScale, Format } from '@acme/ai';
import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const grammarInput = z.object({
  text: z.string(),
});
export type GrammarInputType = TypeOf<typeof grammarInput>;

/*------------------------------------*/

export const improveConfig = z.object({
  scale: z.nativeEnum(ChangeScale),
});
export const improveInput = z.object({
  text: z.string(),
  config: improveConfig,
});
export type ImproveInputType = TypeOf<typeof improveInput>;

/*------------------------------------*/

export const formalityConfig = z.object({
  formalityScale: z.nativeEnum(FormalityScale),
});
export const formalityInput = z.object({
  text: z.string(),
  config: formalityConfig,
});
export type FormalityInputType = TypeOf<typeof formalityInput>;

/*------------------------------------*/

export const translateConfig = z.object({
  language: z.string(),
});
export const translateInput = z.object({
  text: z.string(),
  config: translateConfig,
});
export type TranslateInputType = TypeOf<typeof translateInput>;

/*------------------------------------*/

export const emojiConfig = z.object({
  position: z.string(),
  scale: z.nativeEnum(ChangeScale),
});
export const emojiInput = z.object({
  text: z.string(),
  config: emojiConfig,
});
export type EmojiInputType = TypeOf<typeof emojiInput>;

/*------------------------------------*/
export const condenseConfig = z.object({
  length: z.number(),
});
export const condenseInput = z.object({
  text: z.string(),
  config: condenseConfig,
});
export type CondenseInputType = TypeOf<typeof condenseInput>;

/*------------------------------------*/

export const dispatchFormatInput = z.object({
  text: z.string(),
  selectedFormat: z.object({
    type: z.nativeEnum(Format),
    config: z
      .object({
        language: z.string().optional(),
        scale: z.nativeEnum(ChangeScale).optional(),
        formalityScale: z.nativeEnum(FormalityScale).optional(),
        position: z.string().optional(),
        length: z.number().optional(),
        tone: z.string().optional(),
      })
      .optional(),
  }),
});
export type DispatchFormatInputType = TypeOf<typeof dispatchFormatInput>;
