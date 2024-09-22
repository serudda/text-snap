import { defaultTemperature, defaultModel as modelName } from '../common';
import { detectLanguageHandler } from '../detectLanguage/handler';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Improve a text.
 *
 * @param text The text to improve.
 * @param config The configuration for the improve function.
 * @returns The improved text.
 */
export const improveHandler = async (text: string): Promise<Response> => {
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  // Detect language of the text
  const detectRes = await detectLanguageHandler(text);

  const model = new OpenAI({
    temperature,
    modelName,
    frequencyPenalty,
    presencePenalty,
  });

  const promptTemplate = new PromptTemplate({
    template: buildTemplate(),
    inputVariables: ['text', 'language'],
  });

  const chain = new LLMChain({ llm: model, prompt: promptTemplate });

  const language = (await detectRes.json()) as string;
  const res = await chain.call({ text, language });

  // NOTE: This is just for debugging purposes
  console.log('[improve] - temperature:', temperature);
  console.log('[improve] - frequencyPenalty:', frequencyPenalty);
  console.log('[improve] - presencePenalty:', presencePenalty);
  console.log('[improve] - modelName:', modelName);
  console.log('[improve] - language:', language);
  console.log('[improve] - input:', { text, language });
  console.log('[improve] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[improve] - res:', res);

  return new Response(JSON.stringify(res.text), {
    headers: { 'Content-Type': 'application/json' },
  });
};
