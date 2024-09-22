import { CondenseFormatConfig, defaultTemperature, defaultModel as modelName } from '../common';
import { detectLanguageHandler } from '../detectLanguage/handler';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Change tone of a text.
 *
 * @param text The text to be changed.
 * @param config The configuration for the changeTone function.
 * @returns The changed text.
 */
export const condenseHandler = async (text: string, config: CondenseFormatConfig): Promise<Response> => {
  const { length } = config;
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  // Detect language of the text
  const detectRes = await detectLanguageHandler(text);

  const model = new OpenAI({ temperature, modelName, frequencyPenalty, presencePenalty });

  const promptTemplate = new PromptTemplate({
    template: buildTemplate(),
    inputVariables: ['text', 'length', 'language'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const language = (await detectRes.json()) as string;
  const res = await chain.call({ text, length, language });

  // NOTE: This is just for debugging purposes
  console.log('[condense] - temperature:', temperature);
  console.log('[condense] - frequencyPenalty:', frequencyPenalty);
  console.log('[condense] - presencePenalty:', presencePenalty);
  console.log('[condense] - modelName:', modelName);
  console.log('[condense] - language:', language);
  console.log('[condense] - input:', { text, length, language });
  console.log('[condense] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[condense] - res:', res);

  return new Response(JSON.stringify(res.text), {
    headers: { 'Content-Type': 'application/json' },
  });
};
