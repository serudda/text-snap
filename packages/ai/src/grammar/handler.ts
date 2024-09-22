import { defaultTemperature, defaultModel as modelName } from '../common';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Improve the grammar of the text.
 *
 * @param text The text to improve the grammar.
 * @returns The text with improved grammar.
 */
export const grammarHandler = async (text: string): Promise<Response> => {
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  const model = new OpenAI({ temperature, modelName, frequencyPenalty, presencePenalty });
  const promptTemplate = new PromptTemplate({
    template: buildTemplate(),
    inputVariables: ['text'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const res = await chain.run(text);

  // NOTE: This is just for debugging purposes
  console.log('[grammar] - temperature:', temperature);
  console.log('[grammar] - frequencyPenalty:', frequencyPenalty);
  console.log('[grammar] - presencePenalty:', presencePenalty);
  console.log('[grammar] - modelName:', modelName);
  console.log('[grammar] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[grammar] - input:', text);
  console.log('[grammar] - res:', res);

  return new Response(JSON.stringify(res), { headers: { 'Content-Type': 'application/json' } });
};
