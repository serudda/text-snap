import dedent from 'dedent';

export const buildTemplate = () =>
  dedent`
  You are a world-class {language} translator.
  Given a TEXT, your only job is to write the {language} translation of that TEXT.

  TEXT: {text}
  OUTPUT: 
  `;
