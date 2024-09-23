import {
  ChangeScale,
  condenseHandler as condenseAIHandler,
  emojiHandler as emojiAIHandler,
  EmojiPosition,
  formalityHandler as formalityAIHandler,
  FormalityScale,
  Format,
  grammarHandler as grammarAIHandler,
  improveHandler as improveAIHandler,
  translateHandler as translateAIHandler,
} from '@acme/ai';
import { Response, TRPCErrorCode, type Params } from '../common';
import type {
  CondenseInputType,
  DispatchFormatInputType,
  EmojiInputType,
  FormalityInputType,
  GrammarInputType,
  ImproveInputType,
  TranslateInputType,
} from '../schema/ai.schema';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const dispatchFormatHandler = async ({ ctx, input }: Params<DispatchFormatInputType>) => {
  try {
    const { text, selectedFormat } = input;

    let formattedText = text;

    console.log('text:', text);
    console.log('selectedFormat:', selectedFormat);

    switch (selectedFormat.type) {
      case Format.grammar: {
        const response = await grammarHandler({ ctx, input: { text: formattedText } });
        formattedText = response?.data.result || formattedText;
        break;
      }

      case Format.improve: {
        const response = await improveHandler({
          ctx,
          input: {
            text: formattedText,
            config: {
              scale: ChangeScale.subtle,
            },
          },
        });
        formattedText = response?.data.result || formattedText;
        break;
      }

      case Format.formality: {
        const response = await formalityHandler({
          ctx,
          input: {
            text: formattedText,
            config: {
              formalityScale: FormalityScale.formal,
            },
          },
        });
        formattedText = response?.data.result || formattedText;
        break;
      }

      case Format.translate: {
        const response = await translateHandler({
          ctx,
          input: {
            text: formattedText,
            config: {
              language: selectedFormat.config?.language || 'English',
            },
          },
        });
        formattedText = response?.data.result || formattedText;
        break;
      }

      case Format.emoji: {
        const response = await emojiHandler({
          ctx,
          input: {
            text: formattedText,
            config: {
              position: EmojiPosition.randomly,
              scale: ChangeScale.subtle,
            },
          },
        });
        formattedText = response?.data.result || formattedText;
        break;
      }

      case Format.condense: {
        const response = await condenseHandler({
          ctx,
          input: {
            text: formattedText,
            config: {
              length: selectedFormat.config?.length || 280,
            },
          },
        });
        formattedText = response?.data.result || formattedText;
        break;
      }

      default:
        break;
    }

    console.log('formattedText RESULT SERVER:', formattedText);

    return {
      status: Response.SUCCESS,
      data: {
        formattedText,
        format: selectedFormat.type,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const grammarHandler = async ({ input }: Params<GrammarInputType>) => {
  try {
    const { text } = input;

    console.log('text - (grammar)', text);

    const response = await grammarAIHandler(text);

    console.log('response - (grammar)', response);
    const result = (await response.json()) as string;
    console.log('result - (grammar)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    console.log('error catch', error);

    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const improveHandler = async ({ input }: Params<ImproveInputType>) => {
  try {
    const { text } = input;

    console.log('text - (improve)', text);

    const response = await improveAIHandler(text);

    console.log('response - (improve)', response);
    const result = (await response.json()) as string;
    console.log('result - (improve)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const formalityHandler = async ({ input }: Params<FormalityInputType>) => {
  try {
    const { text, config } = input;

    console.log('text - (formality)', text);

    const response = await formalityAIHandler(text, config);

    console.log('response - (formality)', response);
    const result = (await response.json()) as string;
    console.log('result - (formality)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const translateHandler = async ({ input }: Params<TranslateInputType>) => {
  try {
    const { text, config } = input;

    console.log('text - (translate)', text);

    const response = await translateAIHandler(text, config);

    console.log('response - (translate)', response);
    const result = (await response.json()) as string;
    console.log('result - (translate)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const emojiHandler = async ({ input }: Params<EmojiInputType>) => {
  try {
    const { text } = input;

    console.log('text - (emoji)', text);

    const response = await emojiAIHandler(text);

    console.log('response - (emoji)', response);
    const result = (await response.json()) as string;
    console.log('result - (emoji)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};

export const condenseHandler = async ({ input }: Params<CondenseInputType>) => {
  try {
    const { text, config } = input;

    console.log('text - (condense)', text);

    const response = await condenseAIHandler(text, config);

    console.log('response - (condense)', response);
    const result = (await response.json()) as string;
    console.log('result - (condense)', result);

    return {
      status: Response.SUCCESS,
      data: {
        result,
      },
    };
  } catch (error: unknown) {
    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = 'api:account.create.error.notFound';
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = 'common:message.error.unauthorized';
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};
