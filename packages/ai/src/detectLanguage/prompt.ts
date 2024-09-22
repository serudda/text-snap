import dedent from 'dedent';

export const detectLanguageTemplate = dedent`
You are a world-class translator.
Given a TEXT, your job is just to detect the TEXT language and answer with the name of the detected language.

TEXT: {text}
Language:
`;
