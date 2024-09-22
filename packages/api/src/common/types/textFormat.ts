/**
 * FORMATS CONFIG.
 */

export enum ChangeScale {
  subtle = 'subtle',
  moderate = 'moderate',
  wild = 'wild',
}

export enum FormalityScale {
  formal = 'formal',
}

export enum EmojiPosition {
  randomly = 'randomly',
}

// Emoji format
export type EmojiFormatConfig = {
  scale?: ChangeScale;
  position?: EmojiPosition;
};

// Formality format
export type FormalityFormatConfig = {
  formalityScale?: FormalityScale;
};

// Condense format
export type CondenseFormatConfig = {
  length?: number;
};

// Improve format
export type ImproveFormatConfig = {
  scale?: ChangeScale;
};

// Translate format
export type TranslateFormatConfig = {
  language?: string;
};

/**
 * FORMATS.
 */

export enum Format {
  emoji = 'emoji',
  improve = 'improve',
  formality = 'formality',
  translate = 'translate',
  condense = 'condense',
  grammar = 'grammar',
}

export type FormatConfig = CondenseFormatConfig | EmojiFormatConfig | FormalityFormatConfig | TranslateFormatConfig;

// This is the response after formatting the text
export interface FormattedPayload {
  text: string;
}