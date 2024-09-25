import { type SelectOption } from 'side-ui';

interface LanguageOption extends SelectOption {
  /**
   * This emoji is displayed in place of an icon to visually
   * represent the language. Ensure the `Noto Color Emoji`
   * font is used for proper display.
   *
   * - @reference
   *   https://fonts.google.com/noto/specimen/Noto+Color+Emoji.
   */
  emoji: string;
}

export const languages = [
  {
    label: 'English',
    code: 'en',
    value: 'English',
    emoji: '🇬🇧',
  },
  {
    label: 'Spanish',
    code: 'es',
    value: 'Spanish',
    emoji: '🇪🇸',
  },
  {
    label: 'French',
    code: 'fr',
    value: 'French',
    emoji: '🇫🇷',
  },
  {
    label: 'German',
    code: 'de',
    value: 'German',
    emoji: '🇩🇪',
  },
  {
    label: 'Italian',
    code: 'it',
    value: 'Italian',
    emoji: '🇮🇹',
  },
  {
    label: 'Portuguese',
    code: 'pt',
    value: 'Portuguese',
    emoji: '🇵🇹',
  },
  {
    label: 'Japanese',
    code: 'ja',
    value: 'Japanese',
    emoji: '🇯🇵',
  },
  {
    label: 'Korean',
    code: 'ko',
    value: 'Korean',
    emoji: '🇰🇷',
  },
  {
    label: 'Simplified Chinese',
    code: 'zh',
    value: 'Simplified Chinese',
    emoji: '🇨🇳',
  },
  {
    label: 'Traditional Chinese',
    code: 'zh-TW',
    value: 'Traditional Chinese',
    emoji: '🇹🇼',
  },
  {
    label: 'Arabic',
    code: 'ar',
    value: 'Arabic',
    emoji: '🇸🇦',
  },
  {
    label: 'Russian',
    code: 'ru',
    value: 'Russian',
    emoji: '🇷🇺',
  },
  {
    label: 'Hindi',
    code: 'hi',
    value: 'Hindi',
    emoji: '🇮🇳',
  },
  {
    label: 'Dutch',
    code: 'nl',
    value: 'Dutch',
    emoji: '🇳🇱',
  },
  {
    label: 'Swedish',
    code: 'sv',
    value: 'Swedish',
    emoji: '🇸🇪',
  },
  {
    label: 'Norwegian',
    code: 'no',
    value: 'Norwegian',
    emoji: '🇳🇴',
  },
  {
    label: 'Danish',
    code: 'da',
    value: 'Danish',
    emoji: '🇩🇰',
  },
  {
    label: 'Finnish',
    code: 'fi',
    value: 'Finnish',
    emoji: '🇫🇮',
  },
  {
    label: 'Polish',
    code: 'pl',
    value: 'Polish',
    emoji: '🇵🇱',
  },
  {
    label: 'Turkish',
    code: 'tr',
    value: 'Turkish',
    emoji: '🇹🇷',
  },
  {
    label: 'Hebrew',
    code: 'he',
    value: 'Hebrew',
    emoji: '🇮🇱',
  },
  {
    label: 'Thai',
    code: 'th',
    value: 'Thai',
    emoji: '🇹🇭',
  },
  {
    label: 'Greek',
    code: 'el',
    value: 'Greek',
    emoji: '🇬🇷',
  },
  {
    label: 'Czech',
    code: 'cs',
    value: 'Czech',
    emoji: '🇨🇿',
  },
  {
    label: 'Indonesian',
    code: 'id',
    value: 'Indonesian',
    emoji: '🇮🇩',
  },
  {
    label: 'Malay',
    code: 'ms',
    value: 'Malay',
    emoji: '🇲🇾',
  },
  {
    label: 'Vietnamese',
    code: 'vi',
    value: 'Vietnamese',
    emoji: '🇻🇳',
  },
  {
    label: 'Romanian',
    code: 'ro',
    value: 'Romanian',
    emoji: '🇷🇴',
  },
] as const satisfies ReadonlyArray<LanguageOption>;

export type LanguageValue = (typeof languages)[number]['value'];
