import { defaultTemperature, defaultModel as modelName } from '../common';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Add emojis to the text.
 *
 * @param text The text to add emojis.
 *
 *   - @param config The configuration for the emoji function.
 *
 * @returns The text with emojis.
 */
export const emojiHandler = async (text: string): Promise<Response> => {
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  const model = new OpenAI({ temperature, modelName, frequencyPenalty, presencePenalty });

  const promptTemplate = new PromptTemplate({
    template: buildTemplate(),
    inputVariables: ['text'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const res = await chain.call({ text });

  // NOTE: This is just for debugging purposes
  console.log('[emoji] - temperature:', temperature);
  console.log('[emoji] - frequencyPenalty:', frequencyPenalty);
  console.log('[emoji] - presencePenalty:', presencePenalty);
  console.log('[emoji] - modelName:', modelName);
  console.log('[emoji] - input:', { text });
  console.log('[emoji] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[emoji] - res:', res);

  return new Response(JSON.stringify(res.text), {
    headers: { 'Content-Type': 'application/json' },
  });
};
