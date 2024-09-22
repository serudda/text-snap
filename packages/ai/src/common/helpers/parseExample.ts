import { type Example } from '../types';

export const parseExamples = (examples: Array<Example>): string => {
  const parsedExamples = examples.map((example) => {
    const { text, output } = example;
    return `TEXT:\n${text}\n\nOUTPUT:\n${output} \n\n -----`;
  });

  return parsedExamples.join('\n\n');
};
