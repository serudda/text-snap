import { defaultTemperature, FormalityFormatConfig, defaultModel as modelName } from '../common';
import { detectLanguageHandler } from '../detectLanguage/handler';
import { buildTemplate } from './prompt';
import { PromptTemplate } from '@langchain/core/prompts';
import { OpenAI } from '@langchain/openai';
import dedent from 'dedent';
import { LLMChain } from 'langchain/chains';

/**
 * Change the formality of a text.
 *
 * @param text The text to change the formality.
 * @param config The configuration for the formality function.
 * @returns The changed text.
 */
export const formalityHandler = async (text: string, config: FormalityFormatConfig): Promise<Response> => {
  const { formalityScale } = config;
  const temperature = defaultTemperature;
  const frequencyPenalty = 0;
  const presencePenalty = 0;

  // Detect language of the text
  const detectRes = await detectLanguageHandler(text as string);

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
  console.log('[formality] - temperature:', temperature);
  console.log('[formality] - frequencyPenalty:', frequencyPenalty);
  console.log('[formality] - presencePenalty:', presencePenalty);
  console.log('[formality] - modelName:', modelName);
  console.log('[formality] - language:', language);
  console.log('[formality] - input:', { text, formalityScale, language });
  console.log('[formality] - promptTemplate:', dedent`${promptTemplate.template}`);
  console.log('[formality] - res:', res);

  return new Response(JSON.stringify(res.text), {
    headers: { 'Content-Type': 'application/json' },
  });
};
