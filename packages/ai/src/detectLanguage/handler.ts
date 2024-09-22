import { defaultTemperature, defaultModel as modelName } from '../common';
import { detectLanguageTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';

/**
 * Detect the language of a text.
 *
 * @param text The text to detect the language.
 * @returns The detected language.
 */
export const detectLanguageHandler = async (text: string): Promise<Response> => {
  const model = new OpenAI({ temperature: defaultTemperature, modelName });

  const promptTemplate = new PromptTemplate({
    template: detectLanguageTemplate,
    inputVariables: ['text'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const res = await chain.run(text);

  // NOTE: This is just for debugging purposes
  console.log('[detectLanguage] - input:', text);
  console.log('[detectLanguage] - res:', res);

  return new Response(JSON.stringify(res), {
    headers: { 'Content-Type': 'application/json' },
  });
};
