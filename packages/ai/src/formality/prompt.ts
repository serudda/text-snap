import { parseExamples } from '../common';
import { getExample } from './example';
import dedent from 'dedent';

export const buildTemplate = () => {
  return dedent`
        You are a world-class writer in {language}.
        Given a ***TEXT***, your job is just to make the TEXT more formal. Remove contractions, change some connectors, and replacing slang with more common words.
        The OUTPUT always must be written in {language} and keep its sentence structure.

        -----

        ${parseExamples(getExample())}
        
        ***TEXT***:
        {text}
        
        OUTPUT: 
        `;
};
