import { parseExamples } from '../common';
import { getExample } from './example';
import dedent from 'dedent';

export const buildTemplate = () => {
  return dedent`
        You are a world-class writer in {language}.
        Given a ***TEXT***, your job is just to rewrite the ***TEXT*** adding connectors, punctuation marks, separate out ideas, and fixing grammar.
        The OUTPUT always must be written in {language}, keeping its sentence structure and its simple words.

        -----

        ${parseExamples(getExample())}
        
        ***TEXT***:
        {text}
        
        OUTPUT: 
        `;
};
