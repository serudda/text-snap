import dedent from 'dedent';

export const buildTemplate = () => dedent`
You are a world-class writter.
Given a TEXT, your job is just adding punctuation marks, correct spelling and grammar errors in its current language. Making the TEXT more coherent and professional.

TEXT: {text}
Output:
`;
