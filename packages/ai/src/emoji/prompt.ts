import { parseExamples } from '../common';
import { getExample } from './example';
import dedent from 'dedent';

export const buildTemplate = () => {
  return dedent`
        You are a world-class writer.
        Given a ***TEXT***, your job is just adding emoji on the best position:
        - As bullet points.
        - Ending a phrase.
        - Just to the right side of the most relevant keywords.
         
        In order to highlight the message the TEXT wants to convey.
        The OUTPUT always must have 2 or 3 emojis.

        -----
  
        ${parseExamples(getExample())}
        
        ***TEXT***:
        {text}
        
        OUTPUT: 
        `;
};
