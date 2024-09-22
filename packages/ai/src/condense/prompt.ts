import { parseExamples } from '../common';
import { getExample } from './example';
import dedent from 'dedent';

export const buildTemplate = () => dedent`
You are a world-class writer in {language}.
Given a ***TEXT***, your job is just to shorten it to {length} characters.
Ensure that you alway reduces the ***TEXT*** to a maximum of {length} characters, without compromising its coherence, grammar or meaning.
The OUTPUT always must be written in {language}.
Include abbreviate words, look for shorter synonyms to achieve your goal of reducing TEXT to maximum {length} characters.

-----

${parseExamples(getExample())}

***TEXT***:
{text}

OUTPUT: 
`;
