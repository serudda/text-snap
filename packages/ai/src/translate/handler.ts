import { defaultTemperature, defaultModel as modelName, type TranslateFormatConfig } from '../common';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Translate the text to the language.
 *
 * @param text The text to translate.
 * @param config The configuration for the translate
 *   function.
 * @returns The translated text.
 */
export const translateHandler = async (text: string, config: TranslateFormatConfig): Promise<Response> => {
  const { language } = config;
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  const model = new OpenAI({ temperature, modelName, frequencyPenalty, presencePenalty });

  const promptTemplate = new PromptTemplate({
    template: buildTemplate(),
    inputVariables: ['text', 'language'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const res = await chain.call({ text, language });

  // NOTE: This is just for debugging purposes
  console.log('[translate] - temperature:', temperature);
  console.log('[translate] - frequencyPenalty:', frequencyPenalty);
  console.log('[translate] - presencePenalty:', presencePenalty);
  console.log('[translate] - modelName:', modelName);
  console.log('[translate] - input:', { text, language });
  console.log('[translate] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[translate] - res:', res);

  return new Response(JSON.stringify(res.text), {
    headers: { 'Content-Type': 'application/json' },
  });
};
